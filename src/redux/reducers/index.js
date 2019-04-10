import {
    combineReducers
} from 'redux';
import user from './user';
import {postsBySubreddit, selectedSubreddit, posts} from './posts'

const rootReducer = combineReducers({
    postsBySubreddit,
    selectedSubreddit,
    posts,
    user
})

export default rootReducer