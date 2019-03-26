import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { Form, Input, Button,  Menu,  Layout, Tree, notification } from 'antd'
import {
  Link
} from 'react-router-dom'
import http from '../../services/server';
import './writing.css';
const SubMenu = Menu.SubMenu;
const {
  Sider,
} = Layout;

const DirectoryTree = Tree.DirectoryTree;
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
  }
  onSelect = () => {
    console.log('Trigger Select');
  };

  onExpand = () => {
    console.log('Trigger Expand');
  };

  componentDidMount () {

    // 异步设置编辑器内容
    setTimeout(() => {
      this.props.form.setFieldsValue({
        content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
      })
    }, 1000)

  }

  handleSubmit = (event) => {

    event.preventDefault()

    this.props.form.validateFields((error, values) => {
      if (!error) {
        const submitData = {
          tag: '默认文集',
          title: values.title,
          rawContent: values.content.toRAW(), // or values.content.toHTML()
          htmlContent: values.content.toHTML(),
          authorId : this.props.userInfo.user_id,
        }
        const result = http.post('/auth/user/newarticle', submitData)
        result.then((res) => {
          if (res.data.success) { // 如果成功
            openNotification( // 登录成功，显示提示语
              res.data.info
            )
            this.props.history.push('/') 
            this.props.exitWriting();
          } 
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

  render () {

    const { getFieldDecorator } = this.props.form
    const controls = [
    'undo', 'redo', 'separator',
    'font-size', 'line-height', 'letter-spacing', 'separator',
    'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
    'superscript', 'subscript', 'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
    'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
    'link', 'separator', 'hr', 'separator',
    'media', 'separator',
    'clear'
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
              <Button type="primary" shape="round" size='large' style={{ width: 300 }}  onClick={this.props.exitWriting}><Link to="/">回首页</Link></Button>
            <br />
            <br />
            <DirectoryTree
              multiple
              defaultExpandAll
              onSelect={this.onSelect}
              onExpand={this.onExpand}
            >
              <TreeNode title="parent 0" key="0-0">
                <TreeNode title="leaf 0-0" key="0-0-0" isLeaf />
                <TreeNode title="leaf 0-1" key="0-0-1" isLeaf />
              </TreeNode>
              <TreeNode title="parent 1" key="0-1">
                <TreeNode title="leaf 1-0" key="0-1-0" isLeaf />
                <TreeNode title="leaf 1-1" key="0-1-1" isLeaf />
              </TreeNode>
            </DirectoryTree>
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

export default Form.create()(Wirting)