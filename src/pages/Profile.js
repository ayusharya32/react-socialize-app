import React, { useContext, useEffect } from 'react'
import PostList from '../components/PostList'
import UserProfile from '../components/UserProfile'
import PostContext from '../context/post/postContext'
import UserContext from '../context/user/userContext'
import Loader from '../components/Loader'
import { isObjectEmpty } from '../utils/Other'
import { toast } from 'react-toastify'


function Profile(props) {
    const { user } = props.location.state

    const postContext = useContext(PostContext)
    const { posts, getUserPosts, postLoading, postError, 
        clearPostErrors, postSuccessMessage, clearPostSuccess  } = postContext

    const userContext = useContext(UserContext)
    const { user: currentUser, getCurrentUser, userLoading, userError, clearUserErrors } = userContext

    useEffect(() => {
        if(isObjectEmpty(currentUser)) {
            getCurrentUser()
        }

        getUserPosts(user.userId)

        if(userError !== null) {
            toast.error(userError.message)
            clearUserErrors()
        }

        if(postError !== null) {
            toast.error(postError.message) 
            clearPostErrors()
        }

        if(postSuccessMessage !== "") {
            toast.success(postSuccessMessage)
            clearPostSuccess()
        }

        // eslint-disable-next-line
    }, [userError, postError, postSuccessMessage])

    return (
        <section className="profile-page">
            { 
                !userLoading
                ? (!isObjectEmpty(currentUser) && !isObjectEmpty(user)) &&
                    <UserProfile 
                        user={user.userId === currentUser.userId ? currentUser : user} 
                        currentUser={currentUser} 
                        postsCount={posts.length} />
                : <Loader />
            }
            { 
                !postLoading
                ? !isObjectEmpty(user) && <PostList posts={posts} currentUser={currentUser}/>
                : <Loader />
            }
        </section>
    )
}

export default Profile
