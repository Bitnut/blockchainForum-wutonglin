import {REQUEST_VISITDATA, RECEIVE_VISITDATA, FETCH_ERR} from '../actions/visit'

const initialState = {
    isFetching: false,
    userInfo: {},
    userArticles: [],
    fetchStatus: true,
};

export function visitData(state=initialState, action) {
    switch(action.type){
        case RECEIVE_VISITDATA:
        return {
            ...state,
            userInfo: action.visitData.userInfo,
            userArticles: [...action.visitData.userArticles],
            isFetching: false,
            lastUpdated: action.receivedAt,
        };
        case REQUEST_VISITDATA:
        return {
            ...state,
            isFetching: true,
            fetchStatus: true
        };
        case FETCH_ERR:
        return {
            ...state,
            isFetching: false,
            fetchStatus: false
        };
        default:
        return state;
    }
}

