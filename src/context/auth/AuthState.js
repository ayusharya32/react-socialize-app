import axios from 'axios'
import { useReducer } from 'react'
import { checkAuth } from '../../utils/AuthUtils'
import { jsonContentTypeConfig } from '../../utils/AxiosUtils'
import { STORED_AUTH_TOKEN } from '../../utils/Constants'
import { AUTH_ERROR, AUTH_LOADING, CLEAR_AUTH_ERROR, CLEAR_AUTH_SUCCESS, LOGIN_SUCCESS, LOG_OUT, REGISTER_SUCCESS } from '../types'
import AuthContext from './authContext'
import authReducer from './authReducer'

function AuthState(props) {
    axios.defaults.baseURL = 'http://192.168.43.74:3000'

    const initialState = {
        authToken: localStorage.getItem(STORED_AUTH_TOKEN),
        loading: false,
        isAuthenticated: checkAuth(),
        authSuccessMessage: "",
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    async function loginUser(email, password) {
        const requestBody = { email, password }
        dispatch({ type: AUTH_LOADING })
        
        try {
            const res = await axios.post('/auth/login', requestBody, jsonContentTypeConfig)

            console.log(res.data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        } catch(err) {
            console.log(err.response.data)
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data
            })
        }
    }

    async function registerUser(name, email, password) {
        const requestBody = { name, email, password }
        dispatch({ type: AUTH_LOADING })
        
        try {
            const res = await axios.post('/auth/register', requestBody, jsonContentTypeConfig)

            console.log(res.data);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        } catch(err) {
            console.log(err.response.data)
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data
            })
        }
    }

    function logOut() {
        dispatch({ type: LOG_OUT })
    }

    function clearAuthSuccess() {
        dispatch({ type: CLEAR_AUTH_SUCCESS })
    }

    function clearAuthErrors() {
        dispatch({ type: CLEAR_AUTH_ERROR })
    }

    return (
        <AuthContext.Provider
            value={{
                authToken: state.authToken,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                authSuccessMessage: state.authSuccessMessage,
                authError: state.error,
                loginUser,
                registerUser,
                logOut,
                clearAuthSuccess,
                clearAuthErrors
            }}
        >
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthState
