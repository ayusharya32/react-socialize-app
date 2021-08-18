import { ADD_LIKE, ADD_POST, CLEAR_POST_ERROR, CLEAR_POST_SUCCESS, POST_ERROR, POST_LOADING, REMOVE_LIKE, REMOVE_POST, SET_POSTS } from "../types"

export function postReducer(state, action) {
    switch(action.type) {
        case POST_LOADING: 
            return {
                ...state,
                postLoading: true
            }

        case SET_POSTS:
            return {
                ...state,
                postLoading: false,
                posts: action.payload
            }

        case ADD_POST: 
            return {
                ...state,
                postSuccessMessage: "Post Added Successfully" 
            }

        case REMOVE_POST:
            return {
                ...state,
                postLoading: false,
                posts: state.posts.filter(post => post._id !== action.payload),
                postSuccessMessage: "Post Removed Successfully"
            }
        
        case ADD_LIKE:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if(post._id === action.payload.postId) {
                        return {
                            ...post,
                            likedBy: [...post.likedBy, action.payload.userId]
                        }
                    }  
                    return post
                }),
                postLoading: false
            }
        case REMOVE_LIKE:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if(post._id === action.payload.postId){
                        return {
                            ...post,
                            likedBy: post.likedBy.filter(userId => userId !== action.payload.userId)
                        }
                    }  
                    return post
                }),
                postLoading: false
            }

        case POST_ERROR:
            return {
                ...state,
                postLoading: false,
                postError: action.payload
            }

        case CLEAR_POST_SUCCESS:
            return {
                ...state,
                postSuccessMessage: ""
            }

        case CLEAR_POST_ERROR:
            return {
                ...state,
                postError: null
            }
            
        default:
            return state
    }
}