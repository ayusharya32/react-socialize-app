import { setTokenHeader } from "../../utils/AxiosUtils";
import { STORED_AUTH_TOKEN } from "../../utils/Constants";
import { AUTH_ERROR, AUTH_LOADING, CLEAR_AUTH_ERROR, CLEAR_AUTH_SUCCESS, LOGIN_SUCCESS, LOG_OUT, REGISTER_SUCCESS } from "../types";

export default function authReducer(state, action) {
    
    switch(action.type) {
        case AUTH_LOADING:
            return {
                ...state,
                loading: true
            }

        case LOGIN_SUCCESS: 
            localStorage.setItem(STORED_AUTH_TOKEN, action.payload.accessToken)
            setTokenHeader()
            return {
                ...state, 
                authToken: action.payload.accessToken,
                isAuthenticated: true,
                loading: false,
                authSuccessMessage: "Logged In Successfully"
            }
        
        case REGISTER_SUCCESS:
            localStorage.setItem(STORED_AUTH_TOKEN, action.payload.accessToken)
            setTokenHeader()
            return {
                ...state, 
                authToken: action.payload.accessToken,
                isAuthenticated: true,
                loading: false,
                authSuccessMessage: "User Registered Successfully"
            }
        
        case LOG_OUT:
            localStorage.removeItem(STORED_AUTH_TOKEN)
            setTokenHeader()
            return {
                ...state,
                authToken: null,
                isAuthenticated: false,
                authSuccessMessage: "Logged Out Successfully"
            }

        case AUTH_ERROR: 
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case CLEAR_AUTH_SUCCESS:
            return {
                ...state,
                authSuccessMessage: ""
            }

        case CLEAR_AUTH_ERROR:
            return {
                ...state,
                error: null
            }
        default: 
            return state
    }
}
