import axios from "axios"
import { useReducer } from "react"
import { ADD_LIKE, ADD_POST, CLEAR_POST_ERROR, CLEAR_POST_SUCCESS, POST_ERROR, POST_LOADING, REMOVE_LIKE, REMOVE_POST, SET_POSTS } from "../types"
import PostContext from "./postContext"
import { postReducer } from "./postReducer"

function PostState(props) {

    const initialState = {
        posts: [],
        postLoading: false,
        postSuccessMessage: "",
        postError: null
    }

    const [state, dispatch] = useReducer(postReducer, initialState)

    async function addPost(imageFile, caption) {
        console.log('addPost() called');

        const config = {
            headers: { 'Content-Type': 'multipart/form-data'}
        }

        const formData = new FormData()
        formData.append('postImage', imageFile)
        formData.append('caption', caption)

        try {
            const res = await axios.post('/posts/add', formData, config)
            console.log(res.data);

            dispatch({ type: ADD_POST, payload: res.data.post })
        } catch(err) {
            console.log(err.response);
            dispatch({ type: POST_ERROR, payload: err.response })
        }
    }

    async function removePost(postId) {
        console.log('removePost() called');

        try {
            const res = await axios.delete('/posts/remove', {
                params: { postId: postId }
            })
            console.log(res.data);

            dispatch({ type: REMOVE_POST, payload: postId })
        } catch(err) {
            console.log(err.response);
            dispatch({ type: POST_ERROR, payload: err.response })
        }
    }

    async function getCurrentUserPosts() {
        console.log('getCurrentUserPosts() called');
        dispatch({ type: POST_LOADING })
        try {
            const res = await axios.get('/posts')
            console.log(res.data);

            dispatch({ type: SET_POSTS, payload: res.data })
        } catch(err) {
            console.log(err.response);
            dispatch({ type: POST_ERROR, payload: err.response })
        }
    }

    async function getUserPosts(userId) {
        console.log('getUserPosts() called');
        dispatch({ type: POST_LOADING })
        try {
            const res = await axios.get(`/posts/${userId}`)
            console.log(res.data);

            dispatch({ type: SET_POSTS, payload: res.data })
        } catch(err) {
            console.log(err.response);
            dispatch({ type: POST_ERROR, payload: err.response })
        }
    }

    async function getCurrentUserFeedPosts() {
        console.log('getCurrentUserFeedPosts() called');
        dispatch({ type: POST_LOADING })
        try {
            const res = await axios.get('/posts/followed')
            console.log(res.data);

            dispatch({ type: SET_POSTS, payload: res.data })
        } catch(err) {
            console.log(err.response);
            dispatch({ type: POST_ERROR, payload: err.response })
        }
    }

    async function addLike(postId, userId) {
        console.log('addLike() called');

        try {
            const res = await axios.put('/posts/likes/add', null, {
                params: { postId: postId }
            })

            dispatch({ type: ADD_LIKE, payload: { postId, userId } })
            console.log(res.data);

        } catch(err) {
            console.log(err.response);
            dispatch({ type: POST_ERROR, payload: err.response })
        }
    } 

    async function removeLike(postId, userId) {
        console.log('removeLike() called');

        try {
            const res = await axios.put('/posts/likes/remove', null, {
                params: { postId: postId }
            })

            dispatch({ type: REMOVE_LIKE, payload: { postId, userId } })
            console.log(res.data);
            
        } catch(err) {
            console.log(err.response);
            dispatch({ type: POST_ERROR, payload: err.response })
        }
    } 

    function clearPostSuccess() {
        dispatch({ type: CLEAR_POST_SUCCESS })
    }

    function clearPostErrors() {
        dispatch({ type: CLEAR_POST_ERROR })
    } 

    return (
        <PostContext.Provider
            value={{
                posts: state.posts,
                postLoading: state.postLoading,
                postSuccessMessage: state.postSuccessMessage,
                postError: state.postError,
                addPost,
                removePost,
                getCurrentUserPosts,
                getUserPosts,
                getCurrentUserFeedPosts,
                addLike,
                removeLike,
                clearPostSuccess,
                clearPostErrors
            }}
        >
            {props.children}
        </PostContext.Provider>
    )
}

export default PostState