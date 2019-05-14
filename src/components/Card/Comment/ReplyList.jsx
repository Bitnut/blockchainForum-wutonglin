import React, { Component } from 'react'
import {Icon, Avatar} from 'antd'
import './comment.css'
class ReplyList extends Component {
    render() {
        return (
            <div>
                {this.props.replyList.map((comment, i) => <Comment comment={comment} key={i} />)}
            </div>
        )
    }
}

class Comment extends Component {
    render () {
      return (
        <div className='comment'>
            <div className='comment-user'>
                <Avatar size={64} src={this.props.comment.user_avatar}></Avatar>
            </div>
            <div className='right'>
                <span><p>{this.props.comment.user_name}：</p> </span>
                <p dangerouslySetInnerHTML={{
                __html: this.props.comment.content
                }} />
                <span >
                    <a onClick={this.showReplyEditor}>回复</a>&nbsp;&nbsp;
                    <a><Icon type="like" /></a>&nbsp;&nbsp;
                    <a># {this.props.comment.floor} 楼</a>&nbsp;&nbsp;
                </span>
                <span >
                    {this.props.comment.format_time}
                </span>   
            </div>
        </div>
      )
    }
}

export default ReplyList