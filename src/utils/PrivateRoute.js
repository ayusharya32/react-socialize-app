import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'

function PrivateRoute({ component: Component, ...rest }) {
    const authContext = useContext(AuthContext)
    const { isAuthenticated, loading } = authContext

    return (
        <Route 
            {...rest}
            render={ props => {
                return (isAuthenticated && !loading) ? <Component {...props} /> : <Redirect to="/login" />
            }}
        />
    )
}

export default PrivateRoute
