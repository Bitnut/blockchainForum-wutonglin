import React, { Component } from 'react'
import Comment from './comment'
class CommentList extends Component {
    render() {
    
        return (
            <div>
                {this.props.comments.map((comment, i) => 
                <Comment userInfo={this.props.userInfo} onSubmit={this.props.onSubmit} comment={comment} key={i} />
                )}
            </div>
        )
    }
}

export default CommentList