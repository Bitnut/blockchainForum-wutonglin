import {RECEIVE_HOMEDATA, REQUEST_HOMEDATA, FETCH_ERR} from '../actions/homeData'

const initialState = {
    isFetching: false,
    hotArticles: [],
    hotUsers: [],
};

export function homeData(state=initialState, action) {
    switch(action.type){
        case RECEIVE_HOMEDATA:
        return {
            ...state,
            hotArticles: [...action.homeData.hotArticles],
            hotUsers: [...action.homeData.hotUsers],
            isFetching: false,
            lastUpdated: action.receivedAt
        };
        case REQUEST_HOMEDATA:
        return {
            ...state,
            isFetching: true,
        };
        case FETCH_ERR:
        return {
            ...state,
            isFetching: false,
        };
        default:
        return state;
    }
}

