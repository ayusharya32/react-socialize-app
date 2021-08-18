import React from 'react'
import Post from './Post'

function PostList({ posts, currentUser }) {
    const noPostsMarkup = (
        <div className="no-posts">
            <h1>No Posts</h1>
        </div>
    )
    return (
        <section className="posts-list">
            <div className="container">
                { posts.length !== 0 
                    ? posts.map( post => <Post key={post._id} post={post} currentUser={currentUser} />)
                    : noPostsMarkup
                }
            </div>
        </section>
    )
}

export default PostList
