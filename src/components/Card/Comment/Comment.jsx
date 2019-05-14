import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './comment.css'
import {Icon} from 'antd'
import ReplyEditor from './ReplyEditor'
import ReplyList from './ReplyList'

class Comment extends Component {
    static propTypes = {
        comment: PropTypes.object.isRequired
    }
    constructor () {
        super()
        this.state = { 
            timeString: '' ,
            replyEditorDisplay: 'none'
        }
    }

    componentWillMount () {
        this._initTimeString()
        this._timer = setInterval(
            this._updateTimeString.bind(this),
            60000
        )
    }
    // 初始化时间，避免一天以上的时间数据被重复更新
    _initTimeString () {
        const comment = this.props.comment
        const duration = (+Date.now() - comment.time_string) / 60000 // 发布分钟数
        if (duration < 1) {
            this.setState({timeString: '刚刚'})
        } else if ( duration < 1440 ) {
            this.setState({timeString: duration > 60
                ? `${Math.round(duration/ 60)} 小时前`
                : `${Math.round(duration)} 分钟前`})
        } else {
            this.setState({timeString: comment.format_time})
        }
    }
    // 实时更新时间方法
    _updateTimeString () {
        const comment = this.props.comment
        const duration = (+Date.now() - comment.time_string) / 60000 // 发布分钟数
        if (duration < 1) {
            this.setState({timeString: '刚刚'})
        } else if ( duration < 1440 ) {
            this.setState({timeString: duration > 60
                ? `${Math.round(duration/ 60)} 小时前`
                : `${Math.round(duration)} 分钟前`})
        }
    }

    showReplyEditor = () => {
        this.setState({replyEditorDisplay: ''})
    }

    render () {
        return (
            <div className='comment-reply-wrapper'>
                <div className='comment'>
                    <div className='comment-user'>
                        <img src={this.props.comment.user_avatar} height="60" alt=""></img>
                    </div>
                    <div className='right'>
                        <span><h2>{this.props.comment.user_name}：</h2> </span>
                        <p dangerouslySetInnerHTML={{
                        __html: this.props.comment.content
                        }} />
                        <span >
                            <a onClick={this.showReplyEditor}>回复</a>&nbsp;&nbsp;
                            <a><Icon type="like" /></a>&nbsp;&nbsp;
                            <a># {this.props.comment.floor} 楼</a>&nbsp;&nbsp;
                        </span>
                        <span >
                            {this.state.timeString}
                        </span>   
                    </div>
                </div>
                <div className='replyList-wrapper'>
                    <ReplyList replyList={this.props.comment.replyList}/>
                </div>
                <div  className='replyEditor-wrapper' style={{display: this.state.replyEditorDisplay}}>
                    <ReplyEditor onSubmit={this.props.onSubmit}  comment_id={this.props.comment.id} userInfo={this.props.userInfo}/>
                </div>
            </div>
        )
    }  
}


export default Comment