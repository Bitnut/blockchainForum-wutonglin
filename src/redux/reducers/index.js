import {
    combineReducers
} from 'redux';
import {user, changeSettings} from './user';
import {postsBySubreddit, selectedSubreddit, posts} from './posts'
import {comment} from './comment'

const rootReducer = combineReducers({
    postsBySubreddit,
    selectedSubreddit,
    posts,
    user,
    changeSettings,
    comment
})

export default rootReducer