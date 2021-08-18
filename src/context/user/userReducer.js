import { ADD_FOLLOWING, REMOVE_FOLLOWING, SET_CURRENT_USER, USER_ERROR, USER_LOADING } from "../types";

export function userReducer(state, action) {

    switch(action.type) {
        case USER_LOADING:  
            return {
                ...state,
                userLoading: true
            }
            
        case SET_CURRENT_USER:
            return {
                ...state,
                userLoading: false,
                user: action.payload
            }

        case ADD_FOLLOWING:
            return {
                ...state,
                userLoading: false,
                user: { 
                    ...state.user, 
                    following: [...state.user.following, action.payload]
                }
            }

        case REMOVE_FOLLOWING:
            return {
                ...state,
                userLoading: false,
                user: {
                    ...state.user,
                    following: state.user.following.filter(userId => userId !== action.payload)
                }
            }

        case USER_ERROR:
            return {
                ...state,
                userLoading: false,
                userError: action.payload
            }
            
        default:    
            return state
    }
}