import React, {Component} from 'react'
import { Input, Avatar } from 'antd';
import sanitizeHtml from 'sanitize-html';
import './index.css'

const { TextArea } = Input;

class CommentInput extends Component {
    constructor () {
        super()
        this.state = {
          content: ''
        }
    }
    handleContentChange (event) {
        this.setState({
          content: event.target.value
        })
    }
    handleSubmit () {
        var dirty = this.state.content;
        var clean = sanitizeHtml(dirty, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
            allowedAttributes: {
              'a': [ 'href' ]
            },
          });
        // 主评论，没有父节点
        if (this.props.onSubmit) {
          this.props.onSubmit({
            parent_id: '',
            content: clean,
            createdTime: +new Date()
          })
        }
    }
    render() {
      return (
        <div className='comment-input'>
        <div className='comment-field'>
            <Avatar size={64} src={this.props.userInfo.user_avatar}></Avatar>
          <div className='comment-field-input'>
            <p>{this.props.userInfo.user_name}</p>
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <TextArea 
            placeholder="说点啥～"
            rows={4}
            onPressEnter= {this.handleSubmit.bind(this)}
            onChange={this.handleContentChange.bind(this)}
            />
          </div>
        </div>
        <div className='comment-field-button'>
          <button
            onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
      </div>
      )
    }
  }
  
  export default CommentInput