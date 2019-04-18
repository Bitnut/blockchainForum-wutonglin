import React, { Component } from 'react'
class ReplyList extends Component {
    render() {
        const comments = [
            {username: 'Jerry', content: 'Hello'},
            {username: 'Tomy', content: 'World'},
            {username: 'Lucy', content: 'Good'}
        ]
        return (
            <div>
                {comments.map((comment, i) => <Comment comment={comment} key={i} />)}
            </div>
        )
    }
}

class Comment extends Component {
    render () {
      return (
        <div className='comment'>
          <div className='comment-user'>
            <span>{this.props.comment.username} </span>：
          </div>
          <p>{this.props.comment.content}</p>
        </div>
      )
    }
}

export default ReplyList