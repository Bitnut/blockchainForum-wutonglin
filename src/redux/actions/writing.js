import { notification } from 'antd';

export const NEW_ARTICLE = 'NEW_ARTICLE'
export const DELETE_ARTICLE = 'DELETE_ARTICLE'

export const newArticle = (data) => ({
    type: 'NEW_ARTICLE',
    articles: data,

})
export const delArticle = (data) => ({
    type: 'DELETE_ARTICLE',
    articles: data,

})
const openNotification = (info) => {
    const args = {
      message: info,
      duration: 2,
    };
    notification.open(args);
};

export const getArticleInfo = () => {
    return (dispatch) => {
        const userArticles = JSON.parse(localStorage.getItem('userArticles'))
        dispatch(newArticle(userArticles));
    }
}

export const addNewArticle = (userId) => {
    const newArticleData = {
        corpus: '默认文集',
        release_status: 'no',
        title: '新建文章',
        rawContent: '',
        htmlContent: '',
        authorId : userId,
    }
    return (dispatch, getState) => {
        let token = localStorage.getItem('Forum-token')
        fetch('/api/user/newarticle', {
            headers:{
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
            },
            method:'POST',body: JSON.stringify(newArticleData)}).then(response => response.json())
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
                console.log(err)
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
            method:'POST',body: JSON.stringify({articleId: Id})}).then(response => response.json())
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
                console.log(err)
            })
    }
}