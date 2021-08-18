import React, { useContext } from 'react'
import CommentContext from '../context/comment/commentContext'

function Comment({ comment, currentUser }) {
    const commentContext = useContext(CommentContext)
    const { removeComment, commentLoading } = commentContext

    function onDeleteButtonClick(e) {
        if(!commentLoading) {
            removeComment(comment.commentId)
        }
    }

    return (
        <div className="comment">
            <div className="content">
                <h1 className="email">{comment.commentUser.email}</h1>
                <div className="comment-text">{comment.commentText}</div>
            </div>
            {(comment.commentUser.userId === currentUser.userId)  
                && (
                    <div className="btn-delete-container" onClick={onDeleteButtonClick}>
                        <i className="far fa-trash-alt"></i>
                    </div>
                )
            }
        </div>
    )
}

export default Comment
