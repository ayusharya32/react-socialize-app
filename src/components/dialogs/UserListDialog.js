import React, { useContext, useEffect, useState } from 'react'
import SearchContext from '../../context/search/searchContext'
import { LIST_TYPE_FOLLOWERS, LIST_TYPE_FOLLOWING } from '../../utils/Constants'
import User from '../User'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'

function UserListDialog({ user, listType }) {
    const searchContext = useContext(SearchContext)
    const { searchUsers, getFollowingUsers, getFollowers, searchLoading, searchError, clearSearchErrors } = searchContext

    const countMarkup = listType === LIST_TYPE_FOLLOWERS
        ? <h1 onClick={() => setShowDialog(true)}>{user.followers}<br/><span>Followers</span></h1>
        : <h1 onClick={() => setShowDialog(true)}>{user.following.length}<br/><span>Following</span></h1>

    const [showDialog, setShowDialog] = useState(false) 

    useEffect(() => {
        if(showDialog) {
            if(listType === LIST_TYPE_FOLLOWERS) {
                getFollowers(user.userId)
            } else if(listType === LIST_TYPE_FOLLOWING) {
                getFollowingUsers(user.userId)
            }
        }

        if(searchError !== null) {
            toast.error(searchError.message)
            clearSearchErrors()
        }

        // eslint-disable-next-line
    }, [showDialog, searchError])

    function handleModalClose(e) {
        if(e.target.className === "modal-overlay") {
            setShowDialog(false)
        }
    }

    const usersMarkup = (searchUsers.length !== 0) 
        ? searchUsers.map(user => <User key={user.userId} user={user} />)
        : <h3 style={{ textAlign: 'center'}}>No Users</h3>
    
    return (
        <>
            { countMarkup }
            {   showDialog &&
                <div className="modal-overlay" onClick={handleModalClose}>
                    <div className="user-list-dialog">
                        <div className="user-container">
                            { searchLoading ? <Loader /> : usersMarkup }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default UserListDialog
