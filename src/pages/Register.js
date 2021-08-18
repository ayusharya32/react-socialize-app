import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/auth/authContext'
import { toast } from 'react-toastify'

function Register(props) {
    const authContext = useContext(AuthContext)
    const { registerUser, loading, isAuthenticated, authSuccessMessage, 
        authError, clearAuthSuccess, clearAuthErrors  } = authContext

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function onRegisterFormSubmitted(e) {
        e.preventDefault()

        if(password !== confirmPassword) {
            toast.dismiss()
            toast.error('Passwords do not match')
            return 
        }

        registerUser(name, email, password)
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
    }, [isAuthenticated, authError, authSuccessMessage, props.history])

    return (
        <div className="register">
            <div className="register-content">
                <h1>Socialize</h1>
                <form onSubmit={onRegisterFormSubmitted}>
                    <input 
                        onChange={(e) => {
                            setName(e.target.value)
                            toast.dismiss()
                        }} 
                        value={name} 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        disabled={loading}
                    />                
                    <input 
                        onChange={(e) => {
                            setEmail(e.target.value)
                            toast.dismiss()
                        }}
                        value={email}
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        disabled={loading}
                    />                
                    <input
                        onChange={(e) => {
                            setPassword(e.target.value)
                            toast.dismiss()
                        }}
                        value={password} 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        disabled={loading}
                    />
                    <input 
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                            toast.dismiss()
                        }}
                        value={confirmPassword}
                        type="password" 
                        name="confirmPassword"
                        placeholder="Confirm Password" 
                        disabled={loading}
                    />
                    <button disabled={loading} className="btn-primary" type="submit">Register</button>                
                </form>
            </div>
        </div>
    )
}

export default Register
