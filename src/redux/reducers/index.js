import {
    combineReducers
} from 'redux';
import {user, changeSettings} from './user';
import {postsBySubreddit, selectedSubreddit, posts} from './posts'

const rootReducer = combineReducers({
    postsBySubreddit,
    selectedSubreddit,
    posts,
    user,
    changeSettings
})

export default rootReducer