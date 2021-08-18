import dayjs from 'dayjs'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import CommentState from '../context/comment/CommentState'
import PostContext from '../context/post/postContext'
import CommentDialog from './dialogs/CommentDialog'
import NoUserImg from '../images/no_user.jpg'

function Post({ post, currentUser }) {
    const postContext = useContext(PostContext)
    const { addLike, removeLike, removePost } = postContext

    const history = useHistory()

    const isLiked = post.likedBy.includes(currentUser.userId)
    const formattedDate = dayjs(post.createdAt).format('MMMM DD, YYYY')

    const likeButtonStyle = {
        color: isLiked ? 'red' : '#ccc'
    }

    const emailStyle = {
        cursor: window.location.pathname === '/profile' ? 'auto' : 'pointer'
    }

    function onLikeButtonClicked() {
        if(isLiked) {
            removeLike(post._id, currentUser.userId)
        } else {
            addLike(post._id, currentUser.userId)
        }
    }

    function onEmailClicked() {
        if(window.location.pathname === '/profile') {
            return
        }

        history.push({
            pathname: '/profile',
            state: { user: post.postUser }
        })
    }

    function onDeleteButtonClicked() {
        removePost(post._id)
    }

    return (
        <CommentState>
            <div className="post">
                <div className="post-header">
                    <div className="left">
                        <img src={post.postUser.profilePhotoUrl || NoUserImg} alt="profile" />
                        <p style={emailStyle} onClick={onEmailClicked} className="email">{post.postUser.email}</p>
                    </div>
                    <div className="right">
                        { post.postUser.userId === currentUser.userId 
                            && <span onClick={onDeleteButtonClicked}><i className="far fa-trash-alt"></i></span> }
                    </div>
                </div>
                <div className="post-img">
                    <img src={post.postImageUrl} alt="random" />
                </div>
                <div className="post-content">
                    <p className="likes">{post.likedBy.length} Likes</p>
                    <div className="post-icons">
                        <span onClick={onLikeButtonClicked}>
                            <i style={likeButtonStyle} className="fas fa-heart"></i>
                        </span>
                        <CommentDialog postId={post._id}/>
                    </div>
                    <p className="description">{post.caption}</p>
                    <p className="date">{formattedDate}</p>
                </div>
            </div>
        </CommentState>
    )
}

export default Post
