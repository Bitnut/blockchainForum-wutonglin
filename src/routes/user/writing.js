import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { Form, Input, Button, Layout, Tree, notification, Row, Col, List, Card, Modal } from 'antd'
import {
  Link
} from 'react-router-dom'
import { leaveWriting} from '../../redux/actions/userAction'
import { addNewArticle, newArticle, deleteArticle } from '../../redux/actions/writing'
import { connect } from 'react-redux'
import './writing.css';

const {
  Sider,
} = Layout;


const { TreeNode } = Tree;
const openNotification = (info) => {
  const args = {
    message: info,
    duration: 2,
  };
  notification.open(args);
};
const extendControls = [
    'separator',
    {
        key: 'my-button', // 控件唯一标识，必传
        type: 'button',
        title: '保存文章', // 指定鼠标悬停提示文案
        className: 'my-button', // 指定按钮的样式名
        html: null, // 指定在按钮中渲染的html字符串
        text: 'Hello', // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
        onClick: () => {
            console.log('Hello World!');
        },
    }
]

class Wirting extends React.Component {
    state = {
        theme: 'dark',
        current: '1',
        articleData: [],
        userCorpus: [],
        modal1Visible: false,
        modal2Visible: false,
        onDeleteArticle: [],
    }
    onSelect = (index) => {
        const content = this.props.userArticles[index].post_content_html
        const title = this.props.userArticles[index].post_title
        setTimeout(() => {
            this.props.form.setFieldsValue({
                content: BraftEditor.createEditorState(content),
                title: title
            })
            }, 10)
    }

    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });

    }
    
    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }
    
    onDelete = (index) => {
        this.setState({modal1Visible: true, onDeleteArticle: index});
    }
    handleDelete = () => {
        const index = this.state.onDeleteArticle
        const articleId = this.state.articleData[index].Id
        this.props.dispatch(deleteArticle(articleId, index));
        const newArticleTitle = this.state.articleData
        newArticleTitle.splice(index,1)
        this.setState({
            articleData: [...newArticleTitle],
            modal1Visible: false,
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    hideModal = () => {
        this.setState({
          visible: false,
        });
    }
    addArticle = () => {
        this.props.dispatch(addNewArticle(this.props.userId));
        const newArticleTitle = [...this.state.articleData, {title: '新建文章'}]
        this.setState({ articleData: newArticleTitle})
    }
    componentWillMount () {
        const articles = JSON.parse(localStorage.getItem('userArticles'))
        setTimeout(() => {
        this.props.form.setFieldsValue({
            content: BraftEditor.createEditorState(articles[0].post_content_html),
            title: articles[0].post_title
        })
        const articleTitle = []
        articles.forEach((item, index) => {
            articleTitle.push({ title: item.post_title, Id: item.post_id })
        })
        this.setState({
            articleData: [...articleTitle],
            userCorpus: ['默认文集']
        })
        }, 20)
        console.log(this.state.articleData[0])

    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.form.validateFields((error, values) => {
        if (!error) {
            const index = parseInt(this.state.editArticle,10);
            const postId = parseInt(this.props.userArticles[index].post_id,10)
            const submitData = {
                corpus: '默认文集',
                title: values.title,
                rawContent: values.content.toRAW(), // or values.content.toHTML()
                htmlContent: values.content.toHTML(),
                postId : postId,
                release_status: 'yes'
            }
            let token = localStorage.getItem('Forum-token')
            fetch('/api/user/releaseArticle', {
                headers:{
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
                },
                method:'POST',body: JSON.stringify(submitData)}).then(response => response.json())
                .then(data =>{
                    if(data.success) {
                        const userArticles = JSON.parse(localStorage.getItem('userArticles'))
                        userArticles.splice(index,1,data.articleData)
                        this.props.dispatch(newArticle(userArticles));
                        openNotification(data.info);
                        localStorage.setItem('userArticles', JSON.stringify(userArticles))
                    } else {
                        openNotification(data.info);
                    }
                    
                })
                .catch(err => {
                    console.log(err)
                })
            console.log(submitData);
        }
        })

    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
        current: e.key,
        });
    }
    handleExit = () => {
        this.props.dispatch(leaveWriting());
    }
    edit = () => {
        console.log('edit')
    }
    render () {

        const { getFieldDecorator } = this.props.form
        const controls = [
        'undo', 'redo', 'separator',
        'font-size', 'line-height', 'letter-spacing', 'separator',
        'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
        
        ]

        return (
        <div className="forum-editor">
            <Layout>
                <Modal
                title="操作确认"
                style={{ top: 20 }}
                visible={this.state.modal1Visible}
                onOk={this.handleDelete}
                onCancel={() => this.setModal1Visible(false)}
                >
                <p>确定要删除文章吗？</p>
                </Modal>
                <Modal
                title="20px to Top"
                style={{ top: 20 }}
                visible={this.state.modal2Visible}
                onOk={() => this.setModal2Visible(false)}
                onCancel={() => this.setModal2Visible(false)}
                >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
                </Modal>
            <Sider 
            width= '600'
            theme= 'light'
            style={{
                overflow: 'auto', height: '100vh', position: 'fixed', left: 0, width: 600 
            }}
            >
            <br />
            <Button type="primary" shape="round" size='large' style={{ width: 200, marginLeft: 50}}  onClick={this.handleExit}><Link to="/">回首页</Link></Button>
            <Row gutter={24} justify="center" >
                <Col span={9}>
                    <br />
                    <div className="exit-btn"></div>
                    
                    <List
                    size="small"
                    dataSource={this.state.userCorpus}
                    style={{marginLeft: 20}}
                    renderItem={
                        item =>(<List.Item actions={[<a onClick={this.addArticle}>增加文章</a>]}>{item}</List.Item>
                    )}
                    />
                    <br />
                    <br />
                </Col>
                <Col span={15} className='article-list'>
                    <List
                    dataSource={this.state.articleData}
                    renderItem={
                        (item, index) =>(<List.Item actions={[<a onClick={this.onSelect.bind(this, index)}>修改</a>, <a onClick={this.onDelete.bind(this, index)}>删除</a>]}>{item.title}</List.Item>
                    )}
                    />
                </Col>
            </Row>
            </Sider>
            <Layout style={{ marginLeft: 600, height: '110vh', position: 'fixed'  }} className="editor-container" >
                <Form onSubmit={this.handleSubmit} >
                    <Form.Item  label="文章标题">
                    {getFieldDecorator('title', {
                        rules: [{
                        required: true,
                        message: '请输入标题',
                        }],
                    })(
                        <Input size="large" placeholder="请输入标题"/>
                    )}
                    </Form.Item>
                    <Form.Item  label="文章正文" style={{height: 790}}>
                    {getFieldDecorator('content', {
                        validateTrigger: 'onBlur',
                        rules: [{
                        required: true,
                        validator: (_, value, callback) => {
                            if (value.isEmpty()) {
                            callback('请输入正文内容')
                            } else {
                            callback()
                            }
                        }
                        }],
                    })(
                        <BraftEditor
                        className="my-editor"
                        controls={controls}
                        extendControls={extendControls}
                        placeholder="请输入正文内容"
                        style={{height: 800}}
                        />
                    )}
                    </Form.Item>
                    <Form.Item >
                    <Button size="large" type="primary" htmlType="submit" >发布文章</Button>
                    </Form.Item>
                </Form>
            </Layout> 
            </Layout>
        </div>
        )

    }

}

const mapStateToProps = state => {
    const {user} = state
    return {
        corpus:user.userInfo.user_corpus,
        userArticles: user.userArticles,
        userId: user.userInfo.user_id
    }
}

const WrappedWriting = Form.create()(Wirting)

export default connect(mapStateToProps)(WrappedWriting)