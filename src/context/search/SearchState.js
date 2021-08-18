import axios from "axios";
import { useReducer } from "react";
import { CLEAR_SEARCH_ERROR, CLEAR_SEARCH_SUCCESS, SEARCH_ERROR, SEARCH_LOADING, SET_SEARCH_USERS } from "../types";
import SearchContext from "./searchContext";
import { searchReducer } from "./searchReducer";

function SearchState(props) {
    const intialState = {
        searchUsers: [],
        searchLoading: false,
        searchSuccessMessage: "",
        searchError: null
    }

    const [state, dispatch] = useReducer(searchReducer, intialState)

    async function searchForUsers(searchQuery) {
        console.log('searchUsers() called');
        dispatch({ type: SEARCH_LOADING })

        try {
            const res = await axios.get('/search', {
                params: { searchQuery: searchQuery }
            })

            dispatch({ type: SET_SEARCH_USERS, payload: res.data })
            console.log(res.data);
        } catch(err) {
            console.log(err.response);
            dispatch({ type: SEARCH_ERROR, payload: err.response })
        }
    }

    async function getFollowingUsers(userId) {
        console.log('getFollowingUsers() called');
        dispatch({ type: SEARCH_LOADING })

        try {
            const res = await axios.get(`/following/${userId}`)

            dispatch({ type: SET_SEARCH_USERS, payload: res.data })
            console.log(res.data);
        } catch(err) {
            console.log(err.response);
            dispatch({ type: SEARCH_ERROR, payload: err.response })
        }
    }

    async function getFollowers(userId) {
        console.log('getFollowers() called');
        dispatch({ type: SEARCH_LOADING })

        try {
            const res = await axios.get(`/followers/${userId}`)

            dispatch({ type: SET_SEARCH_USERS, payload: res.data })
            console.log(res.data);
        } catch(err) {
            console.log(err.response);
            dispatch({ type: SEARCH_ERROR, payload: err.response })
        }
    }

    function clearSearchSuccess() {
        dispatch({ type: CLEAR_SEARCH_SUCCESS })
    }

    function clearSearchErrors() {
        dispatch({ type: CLEAR_SEARCH_ERROR })
    }

    return (
        <SearchContext.Provider
            value={{
                searchUsers: state.searchUsers,
                searchLoading: state.searchLoading,
                searchSuccessMessage: state.searchSuccessMessage,
                searchError: state.searchError,
                searchForUsers,
                getFollowingUsers,
                getFollowers,
                clearSearchSuccess,
                clearSearchErrors
            }}
        >
            { props.children }
        </SearchContext.Provider>
    )
}

export default SearchState