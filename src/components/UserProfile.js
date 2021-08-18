import React, { useContext, useEffect } from 'react'
import SearchState from '../context/search/SearchState'
import UserContext from '../context/user/userContext'
import { LIST_TYPE_FOLLOWERS, LIST_TYPE_FOLLOWING } from '../utils/Constants'
import UpdateProfileDialog from './dialogs/UpdateProfileDialog'
import UserListDialog from './dialogs/UserListDialog'
import NoUserImg from '../images/no_user.jpg'
import { toast } from 'react-toastify'

function UserProfile({ user, currentUser, postsCount }) {
    const userContext = useContext(UserContext)
    const { followUser, unfollowUser, userLoading, userError, clearUserErrors } = userContext

    const isFollowing = currentUser.following.includes(user.userId)
    const btnFollowToggleStyles = {
        backgroundColor: isFollowing ? '#fff' : '#145DA0',
        color: isFollowing ? '#145DA0' : '#fff'
    }

    const btnFollowToggleMarkup = user.userId !== currentUser.userId 
        && <button 
                disabled={userLoading}
                onClick={onBtnFollowToggleClicked}
                style={btnFollowToggleStyles} 
                className="btn-follow">
                    {isFollowing ? 'UnFollow' : 'Follow'}
            </button>

    function onBtnFollowToggleClicked() {
        if(!isFollowing) {
            followUser(user.userId)
        } else {
            unfollowUser(user.userId)
        }
    }

    useEffect(() => {
        if(userError !== null) {
            toast.error(userError.message)
            clearUserErrors()
        }

        // eslint-disable-next-line
    }, [userError])

    return (
        <SearchState>
            <section className="profile">
                <div className="container">
                    <div className="profile-img">
                        { user.userId === currentUser.userId 
                            ? <UpdateProfileDialog user={user} />
                            : <img src={user.profilePhotoUrl || NoUserImg} alt="profile" />}
                    </div>
                    <div className="profile-content">
                        <h1 className="name">{user.name}</h1>
                        <div className="interactions">
                            <div className="posts-count">
                                <h1>{postsCount}<br/><span>Posts</span></h1>
                            </div>
                            <div className="followers-count">
                                <UserListDialog user={user} listType={LIST_TYPE_FOLLOWERS} />
                            </div>
                            <div className="following-count">
                                <UserListDialog user={user} listType={LIST_TYPE_FOLLOWING} />
                            </div>
                        </div>
                        { btnFollowToggleMarkup }
                    </div>
                </div>
            </section>
        </SearchState>
    )
}

export default UserProfile
