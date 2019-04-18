import { notification, message } from 'antd';

export const ADD_COMMENT = 'ADD_COMMENT'
export const INIT_COMMENT = 'INIT_COMMENT'
export const FETCH_COMMENT = 'FETCH_COMMENT'

export const addComment = (data) => ({
    type: 'ADD_COMMENT',
    comment: data,
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
    const newComment = {
        article_id: comment.article_id,
        parient_id: comment.parient_id,
        user_id: comment.user_id,
        content: comment.content,
        create_time: comment.create_time,
        likes : comment.likes,
    }
    return (dispatch) => {
        let token = localStorage.getItem('Forum-token')
        fetch('/api/newcomment', {
            headers:{
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
            },
            method:'POST',body: JSON.stringify(newComment)}).then(response => {
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
                    const userArticles = JSON.parse(localStorage.getItem('userArticles'))
                    userArticles.push(data.articleData)
                    dispatch(newArticle(userArticles));
                    openNotification(data.info);
                    localStorage.setItem('userArticles', JSON.stringify(userArticles))
                } else {
                    openNotification(data.info);
                }
                
            })
            .catch(err => {
                console.log('error is', err)
                message.error('出现错误： '+err.statusText);
                
            })
    }
}

export const releaseArticle = (releaseData, index) => {
    return (dispatch) => {
        let token = localStorage.getItem('Forum-token')
        fetch('/api/user/releaseArticle', {
            headers:{
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
            },
            method:'POST',body: JSON.stringify(releaseData)}).then(response => {
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
                    const userArticles = JSON.parse(localStorage.getItem('userArticles'))
                    userArticles.splice(index,1,data.articleData)
                    dispatch(relArticle(userArticles));
                    openNotification(data.info);
                    localStorage.setItem('userArticles', JSON.stringify(userArticles))
                } else {
                    openNotification(data.info);
                }
                
            })
            .catch(err => {
                console.log('error is', err)
                message.error('出现错误： '+err.statusText);
                
            })
    }
}

export const saveEditArticle = (saveData, index) => {
    return (dispatch) => {
        let token = localStorage.getItem('Forum-token')
        fetch('/api/user/savearticle', {
            headers:{
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
            },
            method:'POST',body: JSON.stringify(saveData)}).then(response => {
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
                    const userArticles = JSON.parse(localStorage.getItem('userArticles'))
                    userArticles.splice(index,1,data.articleData)
                    dispatch(saveArticle(userArticles));
                    openNotification(data.info);
                    localStorage.setItem('userArticles', JSON.stringify(userArticles))
                } else {
                    openNotification(data.info);
                }
                
            })
            .catch(err => {
                console.log('error is', err)
                message.error('出现错误： '+err.statusText);
                
            })
    }
}

export const deleteArticle = (Id, index) => {
    return (dispatch) => {
        let token = localStorage.getItem('Forum-token')
        fetch('/api/user/deletearticle', {
            headers:{
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
            },
            method:'POST',body: JSON.stringify({articleId: Id})}).then(response => {
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
                    const userArticles = JSON.parse(localStorage.getItem('userArticles'))
                    userArticles.splice(index,1)
                    dispatch(delArticle(userArticles));
                    openNotification(data.info);
                    localStorage.setItem('userArticles', JSON.stringify(userArticles))
                } else {
                    openNotification(data.info);
                }
                
            })
            .catch(err => {
                console.log('error is', err)
                message.error('出现错误： '+err.statusText);
            })
    }
}

