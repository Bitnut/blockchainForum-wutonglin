import React, {Component} from 'react'
import { Input, message } from 'antd';
import sanitizeHtml from 'sanitize-html';
import './replyEditor.css'

const { TextArea } = Input;

class ReplyEditor extends Component {
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
        if (this.props.onSubmit) {
          this.props.onSubmit({
            parent_id: this.props.comment_id.toString(),
            content: clean,
            createdTime: +new Date()
          })
        }
    }
    render() {
      return (
          <div className='reply-wrapper'>
            <div className='reply-username'>
                <p>{this.props.user_name}</p>
            </div>
            <div className='reply-field-input'>
                <TextArea 
                placeholder="说点啥～"
                rows={2}
                style={{ width: 660}}
                onPressEnter= {this.handleSubmit.bind(this)}
                onChange={this.handleContentChange.bind(this)}
                />
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
  
  export default ReplyEditor