import {
    combineReducers
} from 'redux';
import {user, changeSettings} from './user';
import {posts} from './posts'
import {comment} from './comment'
import {homeData} from './homeData'
import {visitData} from './visit'

const rootReducer = combineReducers({
    posts,
    user,
    changeSettings,
    comment,
    homeData,
    visitData
})

export default rootReducer