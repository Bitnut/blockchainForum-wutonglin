import {ADD_COMMENT, INIT_COMMENT, FETCH_COMMENT, ADD_REPLY} from '../actions/comment'
 
const initialState = {
    isFetching: false,
    commentList: []
};


export function comment(state=initialState, action) {
    switch(action.type){
        case ADD_COMMENT:
        return {
            ...state,
            commentList: [...state.commentList, action.comment],
            isFetching: false,
        };
        case ADD_REPLY:
        {
            for (var i=0; i<state.commentList.length; i++) {
                if (state.commentList[i].id.toString() === action.reply.parent_id) {
                    state.commentList[i].replyList = [...state.commentList[i].replyList, action.reply]
                    break
                }
            }
            return {
                ...state,
                commentList: [...state.commentList],
                isFetching: false,
            };
        }
        case INIT_COMMENT:
        return {
            ...state,
            commentList: action.commentList,
            isFetching: false,
        };
        case FETCH_COMMENT:
        return {
            ...state,
            isFetching: true,
        };
        default:
        return state;
    }
}