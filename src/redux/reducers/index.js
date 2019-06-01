import {
    combineReducers
} from 'redux';
import {user, changeSettings} from './user';
import {posts} from './posts'
import {comment} from './comment'
import {homeData} from './homeData'
import {visitData} from './visit'
import {searchData} from './search'

const rootReducer = combineReducers({
    posts,
    user,
    changeSettings,
    comment,
    homeData,
    visitData,
    searchData
})

export default rootReducer