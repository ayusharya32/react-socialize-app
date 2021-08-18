import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import PostList from '../components/PostList'
import Search from '../components/Search'
import Loader from '../components/Loader'
import PostContext from '../context/post/postContext'
import SearchState from '../context/search/SearchState'
import UserContext from '../context/user/userContext'
import { isObjectEmpty } from '../utils/Other'
import { toast } from 'react-toastify'

function Home() {
    const userContext = useContext(UserContext)
    const { user, getCurrentUser, userLoading, userError, clearUserErrors } = userContext

    const postContext = useContext(PostContext)
    const { posts, getCurrentUserFeedPosts, postLoading, postError, clearPostErrors } = postContext

    useEffect(() => {
        getCurrentUser()
        getCurrentUserFeedPosts()

        if(userError !== null) {
            toast.error(userError.message)
            clearUserErrors()
        }

        if(postError !== null) {
            toast.error(postError.message) 
            clearPostErrors()
        }

        // eslint-disable-next-line
    }, [userError, postError])

    return (
        <section className="home">
            <Navbar />
            <SearchState>
                <Search />
            </SearchState>
            <div className="home-container">
                { 
                    (!postLoading && !userLoading) 
                    ? !isObjectEmpty(user) && <PostList posts={posts} currentUser={user}/>
                    : <Loader />
                }
            </div>
        </section>
    )
}

export default Home
