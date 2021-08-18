import { CLEAR_SEARCH_ERROR, CLEAR_SEARCH_SUCCESS, SEARCH_ERROR, SEARCH_LOADING, SET_SEARCH_USERS } from "../types";

export function searchReducer(state, action){
    switch(action.type) {
        case SEARCH_LOADING:
            return {
                ...state,
                searchLoading: true,
            }

        case SET_SEARCH_USERS:
            return {
                ...state,
                searchUsers: action.payload,
                searchLoading: false
            }

        case SEARCH_ERROR:
            return {
                ...state, 
                searchLoading: false,
                searchError: action.payload
            }

        case CLEAR_SEARCH_SUCCESS:
            return {
                ...state,
                searchSuccessMessage: ""
            }

        case CLEAR_SEARCH_ERROR:
            return {
                ...state,
                searchError: null
            }

        default:
            return state
    }
}