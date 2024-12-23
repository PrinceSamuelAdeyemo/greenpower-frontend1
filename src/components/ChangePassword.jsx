import React, {useRef, useState} from 'react'
import { TextInput, Button } from 'flowbite-react'

import users_api from '../utils/users_api'
import CustomModal from './CustomModal'

const ChangePassword = ({ showModal, openModal, closeModal, userToken}) => {
    const oldPasswordRef = useRef(null)
    const newPasswordRef = useRef(null)
    const verifyNewPasswordRef = useRef(null)
    const [passwordInform, setPasswordInform] = useState('') 

    const sendToResetPassword = () => {
        if (oldPasswordRef.current.value === '' || newPasswordRef.current.value === '' || verifyNewPasswordRef.current.value === ''){
            setPasswordInform("Kindly fill all the fields")
        }
        else if ((oldPasswordRef.current.value !== '') && (newPasswordRef.current.value !== verifyNewPasswordRef.current.value)){
            setPasswordInform("Password doesn't match (New Password and Confirm New Password)")
        }
        else{
            setPasswordInform("")
            users_api.post("changePassword.php", {
            "userToken": userToken,
            "oldPassword": oldPasswordRef.current.value,
            "newPassword": newPasswordRef.current.value,
            "verifyNewPassword": verifyNewPasswordRef.current.value
        })
        .then((response) => {
            console.log(response)
            if (response.data["status_code"] === 200){
                oldPasswordRef.current.value = ""
                newPasswordRef.current.value = ""
                verifyNewPasswordRef.current.value = ""
                setPasswordInform(response.data["data"])
                setTimeout(() => {
                closeModal()
                }, 1000)
            }
            else{
                setPasswordInform(response.data["message"])
            }
        })
        }        
    }

  return (
    <CustomModal showModal={showModal} openModal={openModal} closeModal={closeModal} >
        <p className='font-semibold'>Kindly proceed to change your password</p>
        <p className='text-red-500 font-semibold mb-4'>{passwordInform}</p>
        <div className='flex flex-col gap-4 w-full'>
            <div>
                <p className='text-c-lightgreen'>Old Password</p>
                <TextInput ref={oldPasswordRef} />
            </div>
            <div>
                <p className='text-c-lightgreen'>New Password</p>
                <TextInput ref={newPasswordRef} />
            </div>
            <div>
                <p className='text-c-lightgreen'>Confirm New Password</p>
                <TextInput ref={verifyNewPasswordRef} />
            </div>
            <div className='flex justify-end'>
                <Button onClick={sendToResetPassword} className='bg-success'>Change</Button>
            </div>
        </div>
    </CustomModal>
)
}

export default ChangePassword