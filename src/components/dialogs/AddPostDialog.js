import React, { useState } from 'react'
import AddPostDialogForm from './AddPostDialogForm'

function AddPostDialog() {
    const [showDialog, setShowDialog] = useState(false)

    function handleModalClose(e) {
        if(e.target.className === "modal-overlay") {
            setShowDialog(false)
        }
    }

    return (
        <>
            <button onClick={() => setShowDialog(true)}>Add Post</button>
            { showDialog && <AddPostDialogForm handleModalClose={handleModalClose}/>}
        </>
    )
}

export default AddPostDialog
