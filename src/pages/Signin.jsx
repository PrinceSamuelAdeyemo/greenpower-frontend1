import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { TextInput, Button, Label, } from 'flowbite-react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SignupRightImage from "../assets/Rectangle 8.png"

import ReloadPage from '../components/ReloadPage'

import users_api from '../utils/users_api'

const Signin = () => {
    const [offlineStatus, setOfflineStatus] = useState(false);
    /////////////    COOKIE DETAILS  ///////////////////
    var COOKIE_NAME = "GREENPOWER_USERDETAILS"
    var COOKIE_PATH = "/cookie/auth_greenpower"
    // Cookie expiry date/time is set to 3 days (36 hours)
    var CURRENT_TIME_LOGGED_IN = (new Date(Date.now() + 259200000)).toUTCString()
    var COOKIE_VALUE;

    var emailRef = useRef(null)
    var passwordRef = useRef(null)
    var [error_details, setError_details] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false)
    var response_data;

    const navigate = useNavigate()

    var submitData = async (event) => {
        event.preventDefault();
        try{
            users_api.post("/login.php", {
                "identifier": emailRef.current.value,
                "password": passwordRef.current.value
            }).then((response) => {
                response_data = response.data["data"]
                console.log(response_data)

                if (response.data["status_code"] === 200 && response.data["data"]){
                    setError_details("")
                    response_data = response.data["data"]
                    console.log("LOGGGGEDDDDD IN DAAAAATTTTA",response_data)
                    if ((response_data !== "") && ("userToken" in response_data)){
                        var COOKIE_VALUE = {
                            "email": response_data['email'],
                            "firstName": response_data['firstName'],
                            "lastName": response_data['lastName'],
                            "userToken": response_data['userToken'],
                            "phoneNumber": response_data['phoneNumber'],
                            "profilePicture": response_data['profilePicture'],
                            "kycDetails": response_data['kycDetails'],
                            "ADMIN": response_data["ADMIN"],
                            "can_switch": 0,
                            "gender": response_data['gender'],
                            "userHubToken": response_data['hubToken'],
                            "userReni": response_data['renitoken'],
                        }
                        if (COOKIE_VALUE["ADMIN"] === 1){
                            COOKIE_VALUE["can_switch"] = 1
                        }
                        if (response_data["bvn_on_reni"] === 0){
                            try {
                                users_api.post('/updateReniUserBVN.php', {
                                    "userToken": response_data["userToken"]
                                })
                                .then((response) => {
                                    console.log("Update reni bvn response here", response)
                                    if (response.data["status_code"] === 200){
                                        console.log("update reni bvn",response.data)
                                    }
                                    else{
                                        //navigate('/login')
                                    }
                                    
                                })
                            } catch (error) {
                                console.log(error)
                                setOfflineStatus(true);
                            }
                        }
                        localStorage.setItem('dataValue', JSON.stringify(COOKIE_VALUE))
                        console.log(COOKIE_VALUE)
                        navigate("/")
                    }
                }
                else if (response.data["status_code"] !== 200 && response.data["message"]){
                    setError_details(response.data["message"])
                }
            })
            .catch((error) => {
                if (error.message.includes("Network Error")){
                    console.log("error is here", error)
                setOfflineStatus(true);
                }
            })
        }
        catch (error) {
            
            
        }
        
    }

  return (
    <div className='flex flex-col md:flex-row w-full h-screen'>
        {offlineStatus && <ReloadPage offlineStatus={offlineStatus} />}
        <div className='flex justify-center items-center md:w-1/2'>
            <form onSubmit={submitData} className='flex flex-col justify-center items-center w-[90%] lg:w-[70%] h-full'>
                <div className='flex flex-col gap-8 w-[100%] xl:w-[80%] h-[70%]'>
                    <p className="text-red-500">{error_details}</p>
                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='email' value='Email' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' ref={emailRef} id='email' type='text' placeholder='Enter your email' required />
                    </div>

                    <div className='w-full relative'>
                        <div className='mb-2 block'>
                            <Label htmlFor='password1' value='Password' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' ref={passwordRef} id='password1' type={`${passwordVisible ? 'text' : 'password'}`} placeholder='Enter your password' required />
                        <div className='absolute right-2 top-11'>
                            {passwordVisible ? <FaEye className='text-c-lightgreen' onClick={() => setPasswordVisible(!passwordVisible)} /> : <FaEyeSlash className='text-c-lightgreen' onClick={() => setPasswordVisible(!passwordVisible)} />}
                        </div>
                        <div className='w-full flex justify-end'>
                            <Link to="/resetpassword" className='text-c-lightgreen font-semibold'>Forgot My Password</Link>
                        </div>
                    </div>
                    
                    <div>
                        <Button type='submit' className='bg-c-lightgreen text-white w-full'>Sign In</Button>
                    </div>

                    <div className='mb-2 flex justify-center gap-2'>
                        <p>Don't have an account?</p>
                        <Link to="/signup" className='text-c-lightgreen font-bold'>Sign Up</Link>
                    </div>
                </div>
            </form>
        </div>
        <div className='w-1/2 bg-signuprightImage bg-cover bg-no-repeat'>

        </div>
    </div>
  )
}

export default Signin