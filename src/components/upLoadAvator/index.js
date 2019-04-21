import React from 'react';
import { Upload, Icon, Modal, Button, message } from 'antd';



class PicturesWall extends React.Component {
    state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      fileErr: false,
    };
  
    handleCancel = () => this.setState({ previewVisible: false })
  
    handlePreview = (file) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
        uploading: false,
      });
    }

    handleRemove = (info) => {
        if (info.uid==='-1')
            return false
    }
    
    
    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        const isGif = file.type === 'image/gif';
        const isPng = file.type === 'image/png';
        var isRight = true;
        if (isJPG||isGif||isPng) {
          
        } else {
            message.error('你只能上传jpg、png 或 gif 图!');
            isRight = false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('图片大小必须小于 2MB!');
        }
        if (isRight && isLt2M) {
            
        } else {
            this.setState({
                fileErr: true,
            })
        }
        return isRight && isLt2M;
    }

    handleChange = ({ fileList }) => {
        if (this.state.fileErr) {
            this.setState({
                fileList:[{
                    uid: '-1',
                    name: 'xxx.png',
                    status: 'done',
                    url: this.props.user_avatar,
                  }],
                fileErr:false
            })
        } else {
            this.setState({ fileList })
        }
        
    }
    
    handleUpload = () => {

        const { fileList } = this.state;
        const formData = new FormData();
        for (var key in fileList[1]){
            formData.append(key, fileList[1][key]);
        }

        this.setState({
        uploading: true,
        });
        let token = localStorage.getItem('Forum-token')
        fetch(`/api/uploadpicture/${this.props.user_name}`, {
            headers:{
            "Authorization": 'Bearer ' + token,
            },
            method:'POST',body: formData}).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    return Promise.reject({
                        status: response.status,
                        statusText: response.statusText
                    })
                }
            })
            .then(data =>{
                if(data.success) {
                    this.props.onSubmitAvatar(data.user_avatar)
                    message.success(data.info);
                    this.setState({
                        uploading: false,
                        fileList:[{
                            uid: '-1',
                            name: 'xxx.png',
                            status: 'done',
                            url: data.user_avatar,
                          }]
                        });
                } else {
                    message.error(data.info);
                } 
            })
            .catch(err => {
                message.error('出现错误： '+err.statusText);
            })

    }

    componentDidMount () {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.setState({fileList:[{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: userInfo.user_avatar,
          }]})
    }
    
    render() {
      const { previewVisible, previewImage, fileList, uploading } = this.state;
      
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">上传图片</div>
        </div>
      );
      return (
        <div className="clearfix">
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                onRemove={this.handleRemove.bind(this)}
                beforeUpload={this.beforeUpload}
            >
                {fileList.length >= 2 ? null : uploadButton}
            </Upload>
            <Button className='avatar-uploader'
            onClick={this.handleUpload}
            disabled={fileList.length === 1}
            loading={uploading}
            >更新头像</Button>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        </div>
      );
    }
  }

export default PicturesWall