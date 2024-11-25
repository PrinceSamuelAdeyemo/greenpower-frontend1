import React, { useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { TextInput, Button, Label, } from 'flowbite-react'
import SignupRightImage from "../assets/Rectangle 8.png"

import Signup2 from './Signup2'

import users_api from '../utils/users_api'
import axios from 'axios'

const Signup1 = () => {
    const navigate = useNavigate()

    const [show_helpertext, setShow_helpertext] = useState(false)
    const [helpertext, setHelpertext] = useState("")
    const [data, setData] = useState({"bvn": "", "password": ""})

    var bvnRef = useRef(null)
    var password1Ref = useRef(null)
    var password2Ref = useRef(null)
    var buttonRef = useRef(null)

    const validatePassword = (password_value) => {
        let special_symbol_pattern = /[!@#$%^&*(),.?":{}|<>]/g
        let capital_letter_pattern = /[A-Z]/g

        return special_symbol_pattern.test(password_value) && capital_letter_pattern.test(password_value)
    }


    var inputData = (event, input_type) => {
        switch (input_type) {
            case "bvn":
                setData(prevData => ({...prevData, "bvn": bvnRef.current.value}))
                break;
            case "password":
                setData(prevData => ({...prevData, "password": password1Ref.current.value}))
                break;
        }
    }


    var openSignup2 = async (event) => {
        event.preventDefault();
        
        if ((bvnRef.current.value && password1Ref.current.value && password2Ref.current.value) !== ""){
            if (password1Ref.current.value === password2Ref.current.value){
                if (validatePassword(password1Ref.current.value) === true){
                    console.log(validatePassword(password1Ref.current.value))
                    setHelpertext("")
                    setShow_helpertext(false)
                    users_api.post("/verifyBVN.php", {
                        "bvn": data["bvn"]
                    }).then((response) => {
                        console.log(response)
                        if (response.data["status_code"] === 200){
                            setHelpertext("")
                            setShow_helpertext(false)
                            navigate("/proceed-signup", {state: {"data": data}})
                        }
                    })
                    
                }
                else{
                    console.log(validatePassword(password1Ref.current.value))
                    setHelpertext("Password must be at least 8 characters, must contain a special symbol and a capital letter.")
                    setShow_helpertext(true)
                }

            }
            else{
                setHelpertext("Passwords don't match")
                setShow_helpertext(true)
            }
        } 
        else {
            setHelpertext("Incomplete details.")
            setShow_helpertext(true)
        }
        
    }

  return (
    <div className='flex flex-row w-full h-screen'>
        <div className='flex justify-center items-center w-1/2'>
            <form onSubmit={openSignup2} className='flex flex-col justify-center items-center w-[80%] h-full'>
                <div className='flex flex-col gap-8 lg:w-[100%] xl:w-[80%] h-[70%]'>
                    <div className='flex flex-col items-center'>
                        <p className='font-bold text-2xl text-c-lightgreen'>SIGN UP</p>
                        <p>Please, enter your details to continue</p>
                    </div>

                    {show_helpertext && 
                    <div>
                        <p className='font-bold text-center text-red-500'>{helpertext}</p>
                    </div>
                    }
                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='bvn' value='BVN' className='font-bold' />
                        </div>
                        <TextInput onChange={() => inputData(event, "bvn")} className='flex-grow border-c-lightgreen text-c-lightgreen' id='bvn' type='number' placeholder='Enter your bvn' name='bvn' ref={bvnRef} required />
                    </div>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='password1' value='Password' className='font-bold' />
                        </div>
                        <TextInput onChange={() => inputData(event, "password")} className='flex-grow border-c-lightgreen text-c-lightgreen' id='password1' type='password' placeholder='Enter your password' name='password' ref={password1Ref} required />
                    </div>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='password2' value='Confirm Password' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='password2' type='password' placeholder='Confirm your password' ref={password2Ref} required />
                    </div>

                    <div>
                        <Button type='submit' className='bg-c-lightgreen text-white w-full' ref={buttonRef}>Sign up</Button>
                    </div>
                    

                    <div className='mb-2 flex gap-2'>
                        <p>Already have an account?</p>
                        <Link to="/login" className='text-c-lightgreen font-bold'>Sign in</Link>
                    </div>
                </div>
            </form>
        </div>
        <div className='w-1/2 bg-signuprightImage bg-cover bg-no-repeat'>

        </div>
    </div>
  )
}

export default Signup1