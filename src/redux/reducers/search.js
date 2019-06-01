import {SEARCHING, SEARCH_ERR, SEARCH_SUCCESS} from '../actions/search'

const initialState = {
    isFetching: false,
    fetchStatus: true,
    listData: [],
};

export function searchData(state=initialState, action) {
    switch(action.type){
        case SEARCHING:
        return {
            ...state,
            isFetching:true,
        }
        case SEARCH_ERR:
        return {
            ...state,
            isFetching:false,
            fetchStatus: false,
            listData: []
        }
        case SEARCH_SUCCESS:
        return {
            ...state,
            isFetching:false,
            listData: action.data
        }
        default:
        return state;
    }
}