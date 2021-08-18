import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'
import { toast } from 'react-toastify'

function Login(props) {
    const authContext = useContext(AuthContext)
    const { loginUser, authSuccessMessage, loading, isAuthenticated, authError,
         clearAuthSuccess, clearAuthErrors } = authContext

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function onLoginFormSubmitted(e) {
        e.preventDefault()

        if(email === '' || password === '') {
            toast.dismiss()
            toast.error('Email and Password Required')
            return 
        }

        loginUser(email, password)
    }

    function getAuthErrorMessage(err) {
        if('message' in err) {
            return err.message
        } 
        
        return `${err.name || ""} ${err.email || ""} ${err.password || ""}`
    }

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/')
        }

        if(authSuccessMessage !== "") {
            toast.success(authSuccessMessage)
            clearAuthSuccess()
        }

        if(authError !== null) {
            toast.error(getAuthErrorMessage(authError))
            clearAuthErrors()
        }

        // eslint-disable-next-line
    }, [isAuthenticated, authSuccessMessage, authError, props.history])

    return (
        <div className="login">
            <div className="login-content">
                <h1>Socialize</h1>
                <form onSubmit={onLoginFormSubmitted}>            
                    <input 
                        onChange={(e) => {
                            toast.dismiss()
                            setEmail(e.target.value)
                        }}
                        value={email}
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        disabled={loading}
                    />                
                    <input
                        onChange={(e) => {
                            toast.dismiss()
                            setPassword(e.target.value)
                        }}
                        value={password} 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        disabled={loading}
                    />
                    <button disabled={loading} className="btn-primary" type="submit">Log In</button>                
                </form>
            </div>
            <div className="sign-up">
                <p>
                    Don't have an account? 
                    <Link disabled={loading} to="/register">Sign up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
