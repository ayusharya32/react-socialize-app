import { ADD_COMMENT, CLEAR_COMMENT_ERROR, CLEAR_COMMENT_SUCCESS, COMMENT_ERROR, COMMENT_LOADING, REMOVE_COMMENT, SET_COMMENTS } from "../types";

export function commentReducer(state, action) {
    switch(action.type) {
        case COMMENT_LOADING:
            return {
                ...state,
                commentLoading: true
            }

        case SET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                commentLoading: false
            }

        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload],
                commentLoading: false
            }

        case REMOVE_COMMENT: 
            return {
                ...state, 
                comments: state.comments.filter(comment => comment.commentId !== action.payload),
                commentLoading: false,
                commentSuccessMessage: "Comment Removed Successfully"
            }

        case COMMENT_ERROR:
            return {
                ...state,
                commentLoading: false,
                commentError: action.payload
            }

        case CLEAR_COMMENT_SUCCESS:
            return {
                ...state,
                commentSuccessMessage: ""
            }

        case CLEAR_COMMENT_ERROR:
            return {
                ...state,
                commentError: null
            }
            
        default:
            return state
    }
}