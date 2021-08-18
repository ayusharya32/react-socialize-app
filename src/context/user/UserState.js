import axios from "axios"
import { useReducer } from "react"
import UserContext from "./userContext"
import { userReducer } from "./userReducer"
import { ADD_FOLLOWING, CLEAR_USER_ERROR, CLEAR_USER_SUCCESS, REMOVE_FOLLOWING, SET_CURRENT_USER, USER_ERROR, USER_LOADING } from "../types"
import { setTokenHeader } from "../../utils/AxiosUtils"

function UserState(props) {
    setTokenHeader()

    const initialState = {
        user: {},
        userLoading: false,
        userSuccessMessage: "",
        userError: null
    }

    const [state, dispatch] = useReducer(userReducer, initialState)

    async function getCurrentUser() {
        console.log('getCurrentUser() called');
        dispatch({ type: USER_LOADING })
        try {
            const res = await axios.get('/user')
            console.log(res.data);

            dispatch({ type: SET_CURRENT_USER, payload: res.data })
        } catch(err) {
            console.log(err.response);
            dispatch({ type: USER_ERROR, payload: err.response })
        }
    }

    async function followUser(userId) {
        console.log('followUser() called');
        dispatch({ type: USER_LOADING })
        try {
            const res = await axios.put('/following/add', null, {
                params: { followingId: userId } 
            })

            console.log(res.data);
            dispatch({ type: ADD_FOLLOWING, payload: userId })

        } catch(err) {
            console.log(err.response);
            dispatch({ type: USER_ERROR, payload: err.response })
        }
    }

    async function unfollowUser(userId) {
        console.log('unfollowUser() called');
        dispatch({ type: USER_LOADING })
        try {
            const res = await axios.put('/following/remove', null,{
                params: { followingId: userId } 
            })

            console.log(res.data);
            dispatch({ type: REMOVE_FOLLOWING, payload: userId })

        } catch(err) {
            console.log(err.response);
            dispatch({ type: USER_ERROR, payload: err.response })
        }
    }

    async function updateUser(imageFile, name) {
        console.log('updateUser() called');
        dispatch({ type: USER_LOADING })

        const config = {
            headers: { 'Content-Type': 'multipart/form-data'}
        }

        const formData = new FormData()
        formData.append('profileImage', imageFile)
        formData.append('name', name)

        try {
            const res = await axios.put('/user', formData, config)
            console.log(res.data);

            dispatch({ type: SET_CURRENT_USER, payload: res.data.user })
        } catch(err) {
            console.log(err.response);
            dispatch({ type: USER_ERROR, payload: err.response })
        }
    }

    function clearUserSuccess() {
        dispatch({ type: CLEAR_USER_SUCCESS })
    }

    function clearUserErrors() {
        dispatch({ type: CLEAR_USER_ERROR })
    }

    return (
        <UserContext.Provider
            value={{
                user: state.user,
                loading: state.userLoading,
                userSuccessMessage: state.userSuccessMessage,
                userError: state.userError,
                getCurrentUser,
                followUser,
                unfollowUser,
                updateUser,
                clearUserSuccess,
                clearUserErrors
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState