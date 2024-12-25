import React, {useRef, useState} from 'react'
import { Link, useNavigate } from "react-router-dom"

import { TextInput, Button, Label, } from 'flowbite-react'

import users_api from '../utils/users_api'
import ReloadPage from '../components/ReloadPage'


const ForgotPassword = (event) => {
    var [error_details, setError_details] = useState("")
    const [offlineStatus, setOfflineStatus] = useState(false)
    const emailRef = useRef(null)

    const resetPassword = (event) => {
        event.preventDefault();
        if (emailRef.current.value != Number(0)){
            setError_details("")
            users_api.post("forgotPassword.php", {
                "email": emailRef.current.value
            })
            .then((response) => {
                console.log(response)
                if (response.data["status_code"] === 200){
                    setError_details("A new password has been sent to your email, kindly check your email and try again with your phone number and the new password sent to your email.")
                }
                else if (response.data["status_code"] === 400){
                    setError_details("We don't have this email address in our record, kindly check your input and try again.")
                }
            })
            .catch((error) => {
                if (error.message.includes("Network Error")){
                    console.log("error is here", error)
                setOfflineStatus(true);
                }
            })

        }
        else{
            setError_details("Kindly enter your email in the email input field to reset your email")
        }
    }


  return (
    <div className='flex justify-center items-center h-screen'>
        {offlineStatus && <ReloadPage offlineStatus={offlineStatus} />}
            <form onSubmit={resetPassword} className='flex flex-col justify-center items-center w-[90%] lg:w-[50%] h-full'>
                <div className='flex flex-col gap-8 w-[100%] xl:w-[80%] h-[70%]'>
                    <div className='flex flex-col items-center text-center'>
                        <p className='font-bold text-2xl text-c-lightgreen'>RESET PASSWORD</p>
                        <p>Please, enter your details to continue</p>
                        <p className='font-bold mt-3 text-red-500'>{ error_details }</p>
                    </div>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='email' value='Email' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' ref={emailRef} id='email' type='text' placeholder='Enter your email' required />
                    </div>

                    
                    
                    <div>
                        <Button type='submit' className='bg-c-lightgreen text-white w-full'>Reset my password</Button>
                    </div>

                    <div className='mb-2 flex justify-center gap-2'>
                        <Link to="/login" className='text-c-lightgreen font-bold'>Sign In</Link>
                    </div>
                </div>
            </form>
        </div>
  )
}

export default ForgotPassword