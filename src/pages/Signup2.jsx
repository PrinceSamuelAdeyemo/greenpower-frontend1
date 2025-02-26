import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import { TextInput, Button, Label, Select } from 'flowbite-react'
import SignupRightImage from "../assets/Rectangle 8.png"

import EmailConfirmationModal from '../components/EmailConfirmationModal'
import ReloadPage from '../components/ReloadPage'

import emailconfirmpic from "../assets/3001931-removebg-preview 1.png"
//import axios from 'axios'
import users_api from "../utils/users_api"

const Signup2 = () => {
    const [showModal, setShowModal] = useState(false);
    const [show_helpertext, setShow_helpertext] = useState(false)
    const [helpertext, setHelpertext] = useState("")
    const [offlineStatus, setOfflineStatus] = useState(false)

    const location = useLocation();
    const {"data": receivedData} = location.state || {}
    
    const [data, setData] = useState({
        "bvn": receivedData["bvn"], 
        "password": receivedData["password"],
        "firstName": "",
        "lastName": "",
        "email": "",
        "phoneNumber": "",
        "gender": ""
    })

    var firstNameRef = useRef(null)
    var lastNameRef = useRef(null)
    var emailRef = useRef(null)
    var phoneNumberRef = useRef(null)
    var genderRef = useRef(null)

    var saveTempData = (event, input_data) => {
        switch(input_data){
            case "lastName":
                setData(prevData => ({...prevData, "lastName": lastNameRef.current.value}))
                break;
            case "firstName":
                setData(prevData => ({...prevData, "firstName": firstNameRef.current.value}))
                break;
            case "email":
                setData(prevData => ({...prevData, "email": emailRef.current.value}))
                break;
            case "phoneNumber":
                setData(prevData => ({...prevData, "phoneNumber": phoneNumberRef.current.value}))
                break;
            case "gender":
                setData(prevData => ({...prevData, "gender": genderRef.current.value}))
        }
    }

    

    var submitData = (event) => {
        event.preventDefault()

        try {
            console.log("eeee")
            users_api.post("/register.php", {
                ...data
            })
            .then((response) => {
                console.log(response)
                if (response.data["data"]){
                    setHelpertext("")
                    console.log("HHHH", response)
                    if (response.data["status_code"] === 200){
                        setShowModal(true)
                    }
                    
                }
                else if (response.data["message"]){
                    setHelpertext(response.data["message"])
                    console.log(response)
                }
                else{
                    setHelpertext("An error occured during the registration. Please try again.")
                    console.log(response)
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
            console.log("Error in submitting data", error)
           }
        
        /* Object.keys(data).map((key) => {
            if (Number(data[key]) === 0){
                setHelpertext("Incomplete details")
                setShow_helpertext(true)
            }
            else{
                setHelpertext("")
                setShow_helpertext(false)
                
               try {
                console.log("eeee")
                users_api.post("/register.php", {
                    ...data
                })
                .then((response) => {
                    console.log(response)
                    if (response.data["data"]){
                        setHelpertext("")
                        console.log("HHHH", response)
                        setShowModal(true)
                    }
                    else if (response.data["message"]){
                        setHelpertext(response.data["message"])
                        console.log(response)
                    }
                })
                
               } 
               catch (error) {
                console.log("Error in submitting data", error)
               }
               
            }
        }) */
    }

    useEffect(() => {
        console.log("HI")
    })


  return (
    <div className='flex flex-row w-full h-screen'>
        {offlineStatus && <ReloadPage offlineStatus={offlineStatus} />}
        <div className='flex justify-center items-center w-full lg:w-1/2'>
            <form onSubmit={submitData} className='flex flex-col justify-center items-center w-[80%] h-full'>
                <div className='flex flex-col gap-4 md:w-full lg:w-[100%] xl:w-[80%] h-[70%]'>

                    {show_helpertext && 
                        <div>
                            <p className='font-bold text-center'>{helpertext}</p>
                        </div>
                    }

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='surname' value='Surname' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='surname' type='text' placeholder='Adeyemo' ref={lastNameRef} onChange={() => saveTempData(event, "lastName")} required />
                    </div>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='other_names' value='Other Names' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='other_names' type='text' placeholder='Samuel Prince' ref={firstNameRef} onChange={() => saveTempData(event, "firstName")} required />
                    </div>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='address' value='Home Address' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='address' type='text' placeholder='1, Adam Street, Garden of Eden, Oyo State' required />
                    </div>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='email' value='Email' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='email' type='email' placeholder='Enter your mail address' ref={emailRef} onChange={() => saveTempData(event, "email")} required />
                    </div>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='phone_number' value='Phone Number' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='phone_number' type='number' placeholder='07012345678' ref={phoneNumberRef} onChange={() => saveTempData(event, "phoneNumber")} required />
                    </div>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='gender' value='Gender' className='font-bold' />
                        </div>
                        <Select className='flex-grow border-c-lightgreen text-c-lightgreen' id='gender'  placeholder='Male/Female' ref={genderRef} onChange={() => saveTempData(event, "gender")} required >
                            <option value="">----</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </Select>
                    </div>

                    <div>
                        <Button type='submit' className='bg-c-lightgreen text-white w-full'>Proceed</Button>
                    </div>
                    {showModal && <EmailConfirmationModal showModal={showModal} openModal={() => setShowModal(true)} closeModal={() => setShowModal(false)} pic={emailconfirmpic} email={data["email"]} />}

                    <div className='mb-2 flex gap-2'>
                        <p>Already have an account?</p>
                        <Link to="/login" className='text-c-lightgreen font-bold'>Sign in</Link>
                    </div>
                </div>
            </form>
        </div>
        {/* <div className='w-0 lg:w-1/2'>
            <img src={SignupRightImage} alt="" className='w-full h-full' />
        </div> */}
    </div>
  )
}

export default Signup2