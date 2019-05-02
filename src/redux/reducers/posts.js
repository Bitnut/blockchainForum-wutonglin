import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS, READ_POST, FETCH_ERR, ADD_LIKE, CANCEL_LIKE, 
  ADD_COLLECT, CANCEL_COLLECT
} from '../actions/posts'

export const selectedSubreddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

export const posts = (state = {
    isFetching: true,
    didInvalidate: false,
    fetchStatus: true,
    items: [],
    readingPost: [],
    like_status: false,
    collect_status: false
    }, action) => {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
        return {
            ...state,
            didInvalidate: true
        }
        case REQUEST_POSTS:
        return {
            ...state,
            isFetching: true,
            didInvalidate: false
        }
        case RECEIVE_POSTS:
        return {
            ...state,
            isFetching: false,
            didInvalidate: false,
            items: action.posts,
            fetchStatus: true,
            lastUpdated: action.receivedAt
        }
        case READ_POST:
        return {
            ...state,
            isFetching: false,
            readingPost: action.post,
            like_status: action.status.like_status,
            collect_status: action.status.collect_status,
            fetchStatus: true,
        }
        case FETCH_ERR:
        return {
            ...state,
            isFetching: false,
            fetchStatus: false,
        }
        case ADD_LIKE:
        return {
            ...state,
            like_status: action.like_status
        }
        case CANCEL_LIKE:
        return {
            ...state,
            like_status: action.like_status
        }
        case ADD_COLLECT:
        return {
            ...state,
            collect_status: action.collect_status
        }
        case CANCEL_COLLECT:
        return {
            ...state,
            collect_status: action.collect_status
        }
        default:
        return state
    }
}


export const postsBySubreddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      }
    default:
      return state
  }
}