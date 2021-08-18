import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/user/userContext'
import NoUserImg from '../../images/no_user.jpg'
import { toast } from 'react-toastify'

function UpdateProfileDialog({ user }) {
    const userContext = useContext(UserContext)
    const { updateUser, userLoading, userError, clearUserErrors } = userContext

    const [showDialog, setShowDialog] = useState(false)

    const [selectedFile, setSelectedFile] = useState(null)
    const [nameValue, setNameValue] = useState('')

    function handleInputImageChange(e) {
        const imageFile = e.target.files[0]
        setSelectedFile(imageFile)
    }   

    function handleModalClose(e) {
        if(e.target.className === "modal-overlay" && !userLoading) {
            setShowDialog(false)
        }
    }

    function onUpdateProfileFormSubmit(e) {
        e.preventDefault()

        if(selectedFile === null && nameValue.trim() === ''){
            return 
        }

        updateUser(selectedFile, nameValue)
        e.target.reset()
        setSelectedFile(null)
        setNameValue('')
    }

    useEffect(() => {
        if(userError !== null) {
            toast.error(userError.message)
            clearUserErrors()
        }

        // eslint-disable-next-line
    }, [userError])

    return (
        <>
            <img 
                style={{ cursor: 'pointer' }} 
                onClick={() => setShowDialog(true)} 
                src={user.profilePhotoUrl || NoUserImg} alt="profile"     
            />
            { showDialog && 
                <div 
                    className="modal-overlay" 
                    onClick={(e) => {
                        if(!userLoading) handleModalClose(e)
                    }}
                >
                <div className="update-profile-dialog">
                    <img src={selectedFile ? URL.createObjectURL(selectedFile) : NoUserImg} alt="profile" />
                    <form onSubmit={onUpdateProfileFormSubmit}>
                        <input 
                            onChange={handleInputImageChange}
                            type="file"
                            name="profileImage" 
                            accept="image/jpeg, image/png, image/jpg" />
                        <input
                            value={nameValue}
                            onChange={(e) => setNameValue(e.target.value)} 
                            className="name" 
                            placeholder="Name"
                            disabled={userLoading} />
                        <button disabled={userLoading} type="submit">Update</button>
                    </form>
                </div>
            </div>
            }
        </>
    )
}

export default UpdateProfileDialog
