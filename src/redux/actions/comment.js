import { notification, message } from 'antd';

export const ADD_COMMENT = 'ADD_COMMENT'
export const INIT_COMMENT = 'INIT_COMMENT'
export const FETCH_COMMENT = 'FETCH_COMMENT'
export const ADD_REPLY = 'ADD_REPLY'

export const addComment = (data) => ({
    type: 'ADD_COMMENT',
    comment: data,
})
export const addReply = (data) => ({
    type: 'ADD_REPLY',
    reply: data,
})
export const initComment = (data) => ({
    type: 'INIT_COMMENT',
    commentList: data,
})
export const fetchComment = () => ({
    type: 'FETCH_COMMENT',
})

const openNotification = (info) => {
    const args = {
      message: info,
      duration: 2,
    };
    notification.open(args);
};

export const addNewComment = (comment) => {
    return (dispatch) => {
        let token = localStorage.getItem('Forum-token')
        fetch('/api/newcomment', {
            headers:{
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
            },
            method:'POST',body: JSON.stringify(comment)}).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    return Promise.reject({
                        status: response.status,
                        statusText: response.statusText
                    })
                }
            })
            .then(data =>{
                if(data.success) {
                    if(data.comment.parent_id === '') {
                        const result = {
                            id: data.comment.id,
                            post_id: data.comment.post_id,
                            parent_id: '',
                            user_name: data.comment.user_name,
                            user_avatar: data.comment.user_avatar,
                            content: data.comment.content,
                            format_time: data.comment.format_time,
                            time_string: data.comment.time_string,
                            floor: data.comment.floor,
                            likes: data.comment.likes,
                            replyList: []
                        }
                        dispatch(addComment(result));
                    } else {
                        dispatch(addReply(data.comment));
                    }
                    message.success(data.info);
                } else {
                    message.error(data.info);
                } 
            })
            .catch(err => {
                message.error('出现错误： '+err.statusText);
                
            })
    }
}

export const getComment = (postId) => {
    return (dispatch) => {
        dispatch(fetchComment())
        let token = localStorage.getItem('Forum-token')
        fetch(`/api/getcomment/${postId}`, {
            headers:{
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
            },
            method:'GET' }).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    return Promise.reject({
                        status: response.status,
                        statusText: response.statusText
                    })
                }
            })
            .then(data =>{
                if(data.success) {
                    dispatch(initComment(data.commentList));
                    message.success(data.info);
                } else {
                    message.error(data.info);
                }
            })
            .catch(err => {
                message.error('出现错误： '+err.statusText);
                
            })
    }
}