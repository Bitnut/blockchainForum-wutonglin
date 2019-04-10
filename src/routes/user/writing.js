import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { Form, Input, Button, Layout, Tree, notification } from 'antd'
import {
  Link
} from 'react-router-dom'
import { leaveWriting} from '../../redux/actions/userAction'
import { addNewArticle, newArticle, getArticleInfo } from '../../redux/actions/writing'
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

class Wirting extends React.Component {
    state = {
        theme: 'dark',
        current: '1',
        treeData: [
            { title: '默认文集' , key: '0-0' }
        ],
        expandedKeys: ['0-0'],
        selectedKeys: [],
        editArticle: ['0'],
    }
    onSelect = (selectedKeys) => {
        this.setState({ selectedKeys });
        if(selectedKeys[0] === '0-0' || selectedKeys.length === 0){
            return
        }
        this.setState({ editArticle: selectedKeys });
        const content = this.props.userArticles[selectedKeys].post_content_html
        const title = this.props.userArticles[selectedKeys].post_title
        setTimeout(() => {
            this.props.form.setFieldsValue({
                content: BraftEditor.createEditorState(content),
                title: title
            })
            }, 10)
    }

    onExpand = () => {
        console.log('Trigger Expand');
    };
    addArticle = () => {
        this.props.dispatch(addNewArticle(this.props.userId));
    }
    componentDidMount () {
        // 异步设置编辑器内容
        this.props.dispatch(getArticleInfo())
        setTimeout(() => {
        this.props.form.setFieldsValue({
            content: BraftEditor.createEditorState(''),
            title: ''
        })
        }, 1000)

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
        this.renderTreeNodes(this.state.treeData);
    }
    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
        return (
            <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
            </TreeNode>
        );
        }
        return <TreeNode {...item} dataRef={item} />;
    })

    onLoadData = treeNode => new Promise((resolve) => {
        console.log(treeNode)
        if (treeNode.props.children) {
        resolve();
        return;
        }
        setTimeout(() => {
        treeNode.props.dataRef.children = [];
        const article = this.props.userArticles.map(item => {return item.post_title})
        article.forEach((item, index) => {
            treeNode.props.dataRef.children.push({ title: [item, <Button shape="circle" icon="minus" size='small' />], key: `${index}`, isLeaf: true })
        })
        this.setState({
            treeData: [...this.state.treeData],
        });
        resolve();
        }, 10);
    })

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
            <Sider 
            width= '380'
            theme= 'light'
            style={{
                overflow: 'auto', height: '100vh', position: 'fixed', left: 0, width: 400 
            }}
            >
                <br />
                <div className="exit-btn"></div>
                <Button type="primary" shape="round" size='large' style={{ width: 300 }}  onClick={this.handleExit}><Link to="/">回首页</Link></Button>
                <Button shape="circle" icon="plus" size='small' onClick={this.addArticle}/>
                <br />
                <br />
                <Tree 
                loadData={this.onLoadData}
                defaultExpandedKeys={this.state.expandedKeys}
                defaultSelectedKeys={['0']}
                onSelect={this.onSelect}
                >
                    {this.renderTreeNodes(this.state.treeData)}
                </Tree>
            </Sider>
            <Layout style={{ marginLeft: 400, height: '100vh'  }} className="editor-container" >
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
                    <Form.Item  label="文章正文" style={{height: '80vh'}}>
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
                        placeholder="请输入正文内容"
                        />
                    )}
                    </Form.Item>
                    <Form.Item >
                    <Button size="large" type="primary" htmlType="submit">提交</Button>
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