import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS, READ_POST, FETCH_ERR
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
    isFetching: false,
    didInvalidate: false,
    fetchStatus: true,
    items: [],
    readingPost: []
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
            lastUpdated: action.receivedAt
        }
        case READ_POST:
        return {
            ...state,
            isFetching: false,
            readingPost: action.post,

        }
        case FETCH_ERR:
        return {
            ...state,
            isFetching: false,
            fetchStatus: false,
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
