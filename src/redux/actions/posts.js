import { message} from 'antd';

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export const READ_POST = 'READ_POST'
export const FETCH_ERR = 'FETCH_ERR'

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

export const readPost = (data) => ({
    type : READ_POST,
    post : data,
})

export const fetchErr = () => ({
    type : FETCH_ERR,
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

export const fetchPostById = (Id,subreddit) =>  (dispatch, getState) => {

    let token = localStorage.getItem('Forum-token')
    fetch(`/api/article/${Id}`, {
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
            const newPost = [data.articleData]
            dispatch(readPost(newPost))
        } else {
        }
    })
    .catch(err => {
        console.log('error is', err)
        message.error('出现错误： '+err.statusText);
        dispatch(fetchErr())
    })

}
/*
const shouldGetPosts = (state, subreddit) => {
    const posts = state.posts.readingPost
    if (!posts) {
      return true
    }
    if (posts.isFetching) {
      return false
    }
    return posts.didInvalidate
  }
*/
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
