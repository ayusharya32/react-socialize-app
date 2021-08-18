import React, { useContext, useEffect, useState } from 'react'
import CommentContext from '../../context/comment/commentContext'
import UserContext from '../../context/user/userContext'
import Comment from '../Comment'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'

function CommentDialog({ postId }) {
    const commentContext = useContext(CommentContext)
    const { comments, getPostComments, addComment, commentLoading, commentError, 
        commentSuccessMessage, clearCommentErrors, clearCommentSuccess } = commentContext

    const userContext = useContext(UserContext)
    const { user } = userContext
    
    const [showDialog, setShowDialog] = useState(false)
    const [commentInputValue, setCommentInputValue] = useState('')

    function handleModalClose(e) {
        if(e.target.className === "modal-overlay" && !commentLoading) {
            setShowDialog(false)
        }
    }

    function onCommentFormSubmit(e) {
        e.preventDefault()

        if(commentInputValue.trim() === '') {
            return
        }

        addComment(postId, commentInputValue.trim())
        setCommentInputValue('')
    }

    useEffect(() => {
        if(showDialog) {
            getPostComments(postId)
        }

        if(commentError !== null) {
            toast.error(commentError.message)
            clearCommentErrors()
        }

        if(commentSuccessMessage !== "") {
            toast.success(commentSuccessMessage)
            clearCommentSuccess()
        }

        // eslint-disable-next-line
    }, [showDialog, commentError, commentSuccessMessage])

    const commentsMarkup = 
        (comments && comments.length !== 0) 
        ? comments.map(comment => <Comment key={comment.commentId} comment={comment} currentUser={user}/>)
        : <h1 style={{textAlign: 'center'}}>No Comments</h1>

    return (
        <>
            <span onClick={() => setShowDialog(true)}><i className="far fa-comment"></i></span>
            { showDialog && 
                (<div className="modal-overlay" onClick={handleModalClose}>
                    <div className="comment-dialog">
                        <div className="comment-container">
                            { commentLoading ? <Loader /> : commentsMarkup }
                        </div>
                        <form className="comment-form" onSubmit={onCommentFormSubmit}>
                            <input 
                                type="text" 
                                name="comment-text" 
                                placeholder="Add Comment.." 
                                value={commentInputValue}
                                disabled={commentLoading}
                                onChange={(e) => {
                                    toast.dismiss()
                                    setCommentInputValue(e.target.value)
                                }}
                            />
                            <button 
                                disabled={commentLoading} 
                                type="submit">
                                    <i className="far fa-paper-plane"></i>
                            </button>
                        </form> 
                    </div>
                </div>)
            }
        </>
    )
}

export default CommentDialog
