import React, { useContext, useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import DotBackground from '../../images/bg_dot.jpg'
import PostContext from '../../context/post/postContext'
import { toast } from 'react-toastify'

function AddPostForm({ handleModalClose }) {
    const postContext = useContext(PostContext)
    const { addPost, postLoading, postError, postSuccessMessage, clearPostErrors, clearPostSuccess } = postContext

    const [selectedFile, setSelectedFile] = useState(null)
    const [captionValue, setCaptionValue] = useState('')

    function handleInputImageChange(e) {
        const imageFile = e.target.files[0]
        setSelectedFile(imageFile)
    }   

    function onAddPostFormSubmit(e) {
        e.preventDefault()
        if(selectedFile === null) return

        addPost(selectedFile, captionValue.trim())
        e.target.reset()
        setSelectedFile(null)
        setCaptionValue('')
    }

    useEffect(() => {
        if(postError !== null) {
            toast.error(postError.message)
            clearPostErrors()
        }

        if(postSuccessMessage !== "") {
            toast.success(postSuccessMessage)
            clearPostSuccess()
        }

        // eslint-disable-next-line
    }, [postError, postSuccessMessage])

    return ReactDom.createPortal(
        <div className="modal-overlay" onClick={handleModalClose}>
            <div className="add-post-dialog">
                <img src={selectedFile ? URL.createObjectURL(selectedFile) : DotBackground} alt="random" />
                <form onSubmit={onAddPostFormSubmit}>
                    <input 
                        type="file" 
                        name="postImage" 
                        accept="image/jpeg, image/png, image/jpg"
                        onChange={handleInputImageChange}
                    />
                    <textarea 
                        value={captionValue}
                        onChange={(e) => setCaptionValue(e.target.value)}
                        className="post-caption" 
                        placeholder="Caption...">
                    </textarea>
                    <button disabled={postLoading} type="submit">Post</button>
                </form>
            </div>
        </div>,
        document.getElementById('portal')
    )
}

export default AddPostForm
