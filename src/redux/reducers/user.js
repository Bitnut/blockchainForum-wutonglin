import { combineReducers } from 'redux';
import { LOGGED_IN, LOGGED_OUT} from '../actions/login';
const initialState = {
    isLoggedIn: false,
    user: {},
    status: null,
};

function user(state=initialState, action) {
    switch(action.type){
        case LOGGED_IN:
        return {
            ...state,
            isLoggedIn: true,
            user: action.user,
            status: 'done'
        };
        case LOGGED_OUT:
        return {
            ...state,
            isLoggedIn: false,
            user: {},
            status: null
        };
        default:
        return state;
    }
}

const userReducer = combineReducers({user});

export default userReducer;