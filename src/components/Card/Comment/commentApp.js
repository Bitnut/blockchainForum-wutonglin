import React, { Component } from 'react'
import CommentInput from './commentInput'
import CommentList from './commentList'
import {connect} from 'react-redux'
import {getComment, addNewComment} from '../../../redux/actions/comment'
import {FormatTime} from '../../utils/formatTime'
import './index.css'
class CommentApp extends Component {
    componentDidMount () {
        this.props.dispatch(getComment('1'))
    }

    handleSubmitComment = (comment) => {
        if (!comment) return
        if (!comment.content) return alert('请输入评论内容')
        const format_time = FormatTime("yyyy-MM-dd hh:mm", comment.createdTime)
        const newComment = {
            post_id: '1',
            parent_id: comment.parent_id,
            user_name: this.props.user_name,
            content: comment.content,
            format_time: format_time,
            time_string: comment.createdTime,
        }
        this.props.dispatch(addNewComment(newComment))
    }
    
    render() {
        return (
        <div className='comment-wrapper'>
            <CommentInput user_name={this.props.user_name} onSubmit={this.handleSubmitComment}/>
            <CommentList user_name={this.props.user_name} comments={this.props.commentList} onSubmit={this.handleSubmitComment}/>
        </div>
        )
    }
}

const mapStateToProps = state => {
    const {comment} = state
    return {
        user_name: state.user.userInfo.user_name,
        commentList: comment.commentList,
        isFetching: comment.isFetching
    }
}

export default connect(mapStateToProps)(CommentApp)