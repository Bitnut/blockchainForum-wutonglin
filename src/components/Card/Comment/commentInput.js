import React, {Component} from 'react'
import { Input, message } from 'antd';
import sanitizeHtml from 'sanitize-html';
import './index.css'

const { TextArea } = Input;

class CommentInput extends Component {
    constructor () {
        super()
        this.state = {
          username: 'hpc',
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
        if (this.props.onSubmit) {
          this.props.onSubmit({
            username: this.state.username,
            content: clean,
            createdTime: +new Date()
          })
        }
        message.success('评论成功！', 1);
    }
    render() {
      return (
        <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <p>{this.state.username}</p>
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