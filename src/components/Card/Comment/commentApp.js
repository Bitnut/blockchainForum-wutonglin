import React, { Component } from 'react'
import CommentInput from './commentInput'
import CommentList from './commentList'
import {connect} from 'react-redux'
import {getComment, addNewComment} from '../../../redux/actions/comment'
import {FormatTime} from '../../utils/formatTime'
import './index.css'
class CommentApp extends Component {
    componentDidMount () {
        this.props.dispatch(getComment(this.props.post_id))
    }

    handleSubmitComment = (comment) => {
        if (!comment) return
        if (!comment.content) return alert('请输入评论内容')
        const format_time = FormatTime("yyyy-MM-dd hh:mm", comment.createdTime)
        const newComment = {
            post_id: this.props.post_id,
            parent_id: comment.parent_id,
            user_name: this.props.userInfo.user_name,
            user_avatar: this.props.userInfo.user_avatar,
            content: comment.content,
            format_time: format_time,
            time_string: comment.createdTime,
        }
        this.props.dispatch(addNewComment(newComment))
    }
    
    render() {
        return (
        <div className='comment-wrapper'>
            <CommentInput userInfo={this.props.userInfo} onSubmit={this.handleSubmitComment}/>
            <CommentList userInfo={this.props.userInfo} comments={this.props.commentList} onSubmit={this.handleSubmitComment}/>
        </div>
        )
    }
}

const mapStateToProps = state => {
    const {comment} = state
    return {
        userInfo: state.user.userInfo,
        commentList: comment.commentList,
        isFetching: comment.isFetching
    }
}

export default connect(mapStateToProps)(CommentApp)