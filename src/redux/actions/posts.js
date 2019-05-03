import { message} from 'antd';

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const READ_POST = 'READ_POST'
export const FETCH_ERR = 'FETCH_ERR'
// 点赞收藏
export const ADD_LIKE = 'ADD_LIKE'
export const ADD_COLLECT = 'ADD_COLLECT'
export const CANCEL_LIKE = 'CANCEL_LIKE'
export const CANCEL_COLLECT = 'CANCEL_COLLECT'
export const ADD_FOLLOW = 'ADD_FOLLOW'
export const CANCEL_FOLLOW = 'CANCEL_FOLLOW'

export const selectSubreddit = subreddit => ({
  type: SELECT_SUBREDDIT,
  subreddit
})

export const invalidateSubreddit = subreddit => ({
  type: INVALIDATE_SUBREDDIT,
  subreddit
})

export const requestPosts = subreddit => ({
  type: REQUEST_POSTS,
  subreddit
})
//
export const receivePosts = (subreddit, data) => ({
  type: RECEIVE_POSTS,
  subreddit,
  posts: data,
  receivedAt: Date.now()
})
// 只获取一篇文章
export const readPost = (post, Status) => ({
    type : READ_POST,
    post : post,
    status: Status
})

export const fetchErr = () => ({
    type : FETCH_ERR,
})

export const addLike = (data) => ({
    type : ADD_LIKE,
    like_status : true,
})

export const addCollect = (data) => ({
    type : ADD_COLLECT,
    collect_status : true,
})

export const cancelLike = (data) => ({
    type : CANCEL_LIKE,
    like_status : false,
})

export const cancelCollect = (data) => ({
    type : CANCEL_COLLECT,
    collect_status : false,
})

export const addFollow = (data) => ({
    type : ADD_FOLLOW,
    follow_status : true,
})

export const cancelFollow = (data) => ({
    type : CANCEL_FOLLOW,
    follow_status : false,
})

const fetchPosts = subreddit => dispatch => {
  dispatch(requestPosts(subreddit))
  let token = localStorage.getItem('Forum-token') 
  fetch('/api/articles', {
    headers:{
    "Content-Type": "application/json",
    "Authorization": 'Bearer ' + token,
    },
    method:'GET'}).then(response => {
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
        if (data.success) {
            dispatch(receivePosts(subreddit, data.hotArticles))
        } else {
        }
    })
    .catch(err => {
        console.log('error is', err)
        message.error('出现错误： '+err.statusText);
        dispatch(fetchErr())
    })
}
// 获取文章和点赞收藏信息用
export const fetchPostById = (data) =>  (dispatch) => {
    let token = localStorage.getItem('Forum-token')
    fetch(`/api/article/${data.post_id}`, {
    headers:{
    "Content-Type": "application/json",
    "Authorization": 'Bearer ' + token,
    },
    method:'POST',body: JSON.stringify(data)}).then(response => {
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
        if (data.success) {
            var articleStatus = {
                like_status: false,
                collect_status: false
            }
            if(data.article_status.like_status!==null) {
                if(data.article_status.like_status.like_status === "yes") {
                    articleStatus.like_status = true
                }
            }
            
            if(data.article_status.collect_status!==null) {
                if(data.article_status.collect_status.collect_status === "yes") {
                    articleStatus.collect_status = true
                }
            }
            if(data.article_status.follow_status!==null) {
                if(data.article_status.follow_status.follow_status === "yes") {
                    articleStatus.follow_status = true
                }
            }
            const newPost = [data.articleData]
            dispatch(readPost(newPost, articleStatus))
        } else {
        }
    })
    .catch(err => {
        console.log('error is', err)
        message.error('出现错误： '+err.statusText);
        dispatch(fetchErr())
    })

}
const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit))
  }
}


export const solveLike = (data) => {
    return (dispatch) => {
        let token = localStorage.getItem('Forum-token')
        if (data.action==='add') {
            fetch('/api/newlike', {
                headers:{
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
                },
                method:'POST',body: JSON.stringify(data)}).then(response => {
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
                        dispatch(addLike())
                        message.success(data.info)
                    } else {
                        message.warning(data.info);
                    } 
                })
                .catch(err => {
                    message.error('出现错误： '+err.statusText);
                    
                })
        } else {
            fetch('/api/cancellike', {
                headers:{
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
                },
                method:'POST',body: JSON.stringify(data)}).then(response => {
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
                        dispatch(cancelLike())
                        message.success(data.info)
                    } else {
                        message.warning(data.info);
                    } 
                })
                .catch(err => {
                    message.error('出现错误： '+err.statusText);
                    
                })
        }
        
    }
}

export const solveCollect= (data) => {
    return (dispatch) => {
        let token = localStorage.getItem('Forum-token')
        if (data.action==='add') {
            fetch('/api/newcollect', {
                headers:{
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
                },
                method:'POST',body: JSON.stringify(data)}).then(response => {
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
                        dispatch(addCollect())
                        message.success(data.info)
                    } else {
                        message.warning(data.info);
                    } 
                })
                .catch(err => {
                    message.error('出现错误： '+err.statusText);
                    
                })
        } else {
            fetch('/api/cancelcollect', {
                headers:{
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
                },
                method:'POST',body: JSON.stringify(data)}).then(response => {
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
                        dispatch(cancelCollect())
                        message.success(data.info)
                    } else {
                        message.warning(data.info);
                    } 
                })
                .catch(err => {
                    message.error('出现错误： '+err.statusText);
                    
                })
        }
        
    }
}


export const solveFollow = (data) => {
    return (dispatch) => {
        let token = localStorage.getItem('Forum-token')
        if (data.action==='add') {
            fetch('/api/newfollow', {
                headers:{
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
                },
                method:'POST',body: JSON.stringify(data)}).then(response => {
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
                        dispatch(addFollow())
                        message.success(data.info)
                    } else {
                        message.warning(data.info);
                    } 
                })
                .catch(err => {
                    message.error('出现错误： '+err.statusText);
                    
                })
        } else {
            fetch('/api/cancelfollow', {
                headers:{
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + token,
                },
                method:'POST',body: JSON.stringify(data)}).then(response => {
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
                        dispatch(cancelFollow())
                        message.success(data.info)
                    } else {
                        message.warning(data.info);
                    } 
                })
                .catch(err => {
                    message.error('出现错误： '+err.statusText);
                    
                })
        }
        
    }
}