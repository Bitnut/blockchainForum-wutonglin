import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { Form, Input, Button, Layout, Row, Col, List, Modal, message } from 'antd'
import {
  Link
} from 'react-router-dom'
import { leaveWriting} from '../../redux/actions/userAction'
import { addNewArticle, deleteArticle, saveEditArticle, releaseArticle } from '../../redux/actions/writing'
import { connect } from 'react-redux'
import './writing.css';

const {
  Sider,
} = Layout;

class Wirting extends React.Component {
    state = {
        theme: 'dark',
        current: '1',
        articleData: [],
        userCorpus: [],
        modal1Visible: false,
        modal2Visible: false,
        onDeleteArticle: [],
        editArticle: 1,
        editorState: BraftEditor.createEditorState(null)

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
        this.setState({editArticle: index})
    }

    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });

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
            articleTitle.push({ title: item.post_title, Id: item.post_id, release: item.release_status })
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
            const index = this.state.editArticle
            const postId = this.props.userArticles[index].post_id
            const submitData = {
                corpus: '默认文集',
                title: values.title,
                rawContent: values.content.toRAW(), // or values.content.toHTML()
                htmlContent: values.content.toHTML(),
                postId : postId,
                release_status: 'yes'
            }
            this.props.dispatch(releaseArticle(submitData, index))
            const articles = this.props.userArticles
            setTimeout(() => {
            const articleTitle = []
            articles.forEach((item) => {
                articleTitle.push({ title: item.post_title, Id: item.post_id, release: item.release_status })
            })
            this.setState({
                articleData: [...articleTitle],
            })
            }, 10)
        }
        })
    }
    handleSave = () => {
        const index = this.state.editArticle
        const postId = this.props.userArticles[index].post_id
        const saveData = this.props.form.getFieldsValue()
        const submitData = {
            corpus: '默认文集',
            title: saveData.title,
            rawContent: saveData.content.toRAW(), // or values.content.toHTML()
            htmlContent: saveData.content.toHTML(),
            postId : postId,
        }
        this.props.dispatch(saveEditArticle(submitData, index))
        const articles = this.props.userArticles
        setTimeout(() => {
        const articleTitle = []
        articles.forEach((item) => {
            articleTitle.push({ title: item.post_title, Id: item.post_id, release: item.release_status })
        })
        this.setState({
            articleData: [...articleTitle],
        })
        }, 10)
    }

    handleChange = (editorState) => {
        this.setState({ editorState })
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
    visitArticle = () => {
        const index = this.state.editArticle
        const release = this.state.articleData[index].release
        if (release==='yes') {
            const postId = this.props.userArticles[index].post_id
            this.handleExit()
            this.props.history.push(`/article/${postId}`)
        } else {
            message.warning('亲，要先发布文章才能查看哦');
        }
    }
    preview = () => {

        if (window.previewWindow) {
          window.previewWindow.close()
        }
    
        window.previewWindow = window.open()
        window.previewWindow.document.write(this.buildPreviewHtml())
        window.previewWindow.document.close()
    
    }
    buildPreviewHtml () {
        const saveData = this.props.form.getFieldsValue()
        return `
          <!Doctype html>
          <html>
            <head>
              <title>Preview Content</title>
              <style>
                html,body{
                  height: 100%;
                  margin: 0;
                  padding: 0;
                  overflow: auto;
                  background-color: #f1f2f3;
                }
                .container{
                  box-sizing: border-box;
                  width: 1200px;
                  max-width: 100%;
                  min-height: 100%;
                  margin: 0 auto;
                  padding: 30px 20px;
                  overflow: hidden;
                  background-color: #fff;
                  border-right: solid 1px #eee;
                  border-left: solid 1px #eee;
                }
                .container img,
                .container audio,
                .container video{
                  max-width: 100%;
                  height: auto;
                }
                .container p{
                  white-space: pre-wrap;
                  min-height: 1em;
                }
                .container pre{
                  padding: 15px;
                  background-color: #f1f1f1;
                  border-radius: 5px;
                }
                .container blockquote{
                  margin: 0;
                  padding: 15px;
                  background-color: #f1f1f1;
                  border-left: 3px solid #d1d1d1;
                }
              </style>
            </head>
            <body>
                
              <div class="container"><h1 align="center">${saveData.title}</h1>${saveData.content.toHTML()}</div>
            </body>
          </html>
        `
    
    }

    render () {
        const extendControls = [
            'separator',
            {
                key: 'save-button', // 控件唯一标识，必传
                type: 'button',
                title: '保存文章，但不改变发布状态', // 指定鼠标悬停提示文案
                className: 'my-button', // 指定按钮的样式名
                html: null, // 指定在按钮中渲染的html字符串
                text: '保存文章', // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
                onClick: () => {this.handleSave()},
            },
            {
                key: 'preview-button',
                type: 'button',
                text: '预览',
                onClick: this.preview
            },
            {
                key: 'go-button',
                type: 'button',
                text: '查看文章',
                onClick: this.visitArticle
            }
        ]
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
            <Layout style={{ marginLeft: 600, }} className="editor-container" >
                <Form onSubmit={this.handleSubmit} style={{ marginLeft: 20, marginRight: 20}}>
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
                        onSave={this.handleSave}
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