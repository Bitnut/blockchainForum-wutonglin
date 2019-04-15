import { LOGGED_IN, LOGGED_OUT, LOGGING_IN, LOGIN_ERR ,
    ON_WRITING, EXIT_WRITING, SKIP_LOGIN} from '../actions/userAction';
import { NEW_ARTICLE, DELETE_ARTICLE } from '../actions/writing';
import {SAVE_CHANGES, CHANGES_SUCCESS, CHANGE_ERR } from '../actions/settings';

const initialState = {
    isLoggedIn: false,
    login_display: '',
    logout_display: 'none',
    login_info: '',
    userInfo: {},
    changingSettings: false,
    settings_info: '',
    userArticles: {},
    header_display: '',
    status: null,
};

export function user(state=initialState, action) {
    switch(action.type){
        case LOGGED_IN:
        return {
            ...state,
            isLoggedIn: true,
            login_display: 'none',
            logout_display: '',
            login_info: '登录成功',
            userInfo: action.success,
            userArticles: action.userArticles
        };
        case LOGGING_IN:
        return {
            ...state,
            isLoggedIn: false,
            login_display: 'none',
            logout_display: '',
        };
        case SKIP_LOGIN:
        return {
            ...state,
            isLoggedIn: false,
            login_display: 'none',
            logout_display: '',
            userInfo: action.success,
            userArticles: action.userArticles
        };
        case LOGGED_OUT:
        return {
            ...state,
            isLoggedIn: false,
            login_display: '',
            login_info: '退出登录',
            logout_display: 'none',
        };
        case LOGIN_ERR:
        return {
            ...state,
            isLoggedIn: false,
            login_display: '',
            logout_display: 'none',
            login_info: action.info,
        };
        case ON_WRITING:
        return {
            ...state,
            header_display: 'none',
        };
        case EXIT_WRITING:
        return {
            ...state,
            header_display: '',
        };
        case NEW_ARTICLE:
        return {
            ...state,
            userArticles: action.articles,
        }
        case DELETE_ARTICLE:
        return {
            ...state,
            userArticles: action.articles,
        }
        default:
        return state;
    }
}
export  function changeSettings(state=initialState, action) {
    switch(action.type){
        case SAVE_CHANGES:
        return {
            ...state,
            changeSettings: true
        };
        case CHANGES_SUCCESS:
        return {
            ...state,
            settings_info: '设置保存成功！',
            userInfo: action.info
        };
        case CHANGE_ERR:
        return {
            ...state,
            settings_info: '出现错误！'
        };
        default:
        return state;
    }
}