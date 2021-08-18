import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'
import UserContext from '../context/user/userContext'
import AddPostDialog from './dialogs/AddPostDialog'
import { toast } from 'react-toastify'

function Navbar() {
    const authContext = useContext(AuthContext)
    const { logOut, authSuccessMessage, clearAuthSuccess } = authContext

    const userContext = useContext(UserContext)
    const { user } = userContext

    const history = useHistory()

    function onProfileButtonClicked() {
        history.push({
            pathname: '/profile',
            state: { user: user }
        })
    }

    function onLogOutButtonClicked(e) {
        logOut()
    }

    useEffect(() => {
        if(authSuccessMessage !== "") {
            toast.success(authSuccessMessage)
            clearAuthSuccess()
        }

        // eslint-disable-next-line
    }, [authSuccessMessage])

    return (
        <nav>
            <div className="nav-center">
                <div className="left">
                    <h1>Socialize</h1>
                </div>
                <div className="right">
                    <AddPostDialog />
                    <button onClick={onProfileButtonClicked}>My Profile</button>
                    <button onClick={onLogOutButtonClicked}>Log Out</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
