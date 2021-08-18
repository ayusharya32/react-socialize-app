import React from 'react'
import { useHistory } from 'react-router-dom'
import NoUserImg from '../images/no_user.jpg'

function User({ user }) {
    const history = useHistory()

    function onUserClick() {
        if(window.location.pathname === '/profile') {
            return
        }
        history.push({
            pathname: '/profile',
            state: { user: user }
        })
    }

    return (
        <div className="user" onClick={onUserClick}>
            <div className="img-container">
                <img src={user.profilePhotoUrl || NoUserImg} alt="profile" />
            </div>
            <div className="user-content"> 
                <h1 className="email">{user.email}</h1>
                <p>{user.name}</p>
            </div>
        </div>
    )
}

export default User
