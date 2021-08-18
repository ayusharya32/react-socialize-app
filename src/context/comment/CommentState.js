import axios from "axios"
import { useReducer } from "react"
import { ADD_COMMENT, CLEAR_COMMENT_ERROR, CLEAR_COMMENT_SUCCESS, COMMENT_ERROR, COMMENT_LOADING, REMOVE_COMMENT, SET_COMMENTS } from "../types";
import CommentContext from "./commentContext";
import { commentReducer } from "./commentReducer";

function CommentState(props) {

    const initialState = {
        comments: [],
        commentLoading: false,
        commentSuccessMessage: "", 
        commentError: null
    }

    const [state, dispatch] = useReducer(commentReducer, initialState)

    async function getPostComments(postId) {
        console.log('getPostComments() called');
        dispatch({ type: COMMENT_LOADING })
        try {
            const res = await axios.get('/comments', {
                params: { postId: postId }
            })
            dispatch({ type: SET_COMMENTS, payload: res.data })
            console.log(res.data);

        } catch(err) {
            console.log(err.response);
            dispatch({ type: COMMENT_ERROR, payload: err.response })
        }
    }

    async function addComment(postId, commentText) {
        console.log('addComment() called');
        const requestBody = { postId, commentText }
        
        try {
            const res = await axios.post('/comments/add', requestBody)

            dispatch({ type: ADD_COMMENT, payload: res.data.responseComment })
            console.log(res.data);

        } catch(err) {
            console.log(err.response);
            dispatch({ type: COMMENT_ERROR, payload: err.response })
        }
    }

    async function removeComment(commentId) {
        console.log('removeComment() called');

        try {
            const res = await axios.delete('/comments/remove', {
                params: { commentId: commentId }
            })

            dispatch({ type: REMOVE_COMMENT, payload: commentId })
            console.log(res.data);

        } catch(err) {
            console.log(err.response);
            dispatch({ type: COMMENT_ERROR, payload: err.response })
        }
    }

    function clearCommentSuccess() {
        dispatch({ type: CLEAR_COMMENT_SUCCESS })
    }

    function clearCommentErrors() {
        dispatch({ type: CLEAR_COMMENT_ERROR })
    }

    return (
        <CommentContext.Provider
            value={{
                comments: state.comments,
                commentLoading: state.commentLoading,
                commentSuccessMessage: state.commentSuccessMessage,
                commentError: state.commentError,
                getPostComments,
                addComment,
                removeComment,
                clearCommentSuccess,
                clearCommentErrors
            }}
        >
            {props.children}
        </CommentContext.Provider>
    )
}

export default CommentState