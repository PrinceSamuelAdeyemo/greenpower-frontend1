import React from 'react'
import { Link } from "react-router-dom"
import { TextInput, Button, Label, } from 'flowbite-react'
import SignupRightImage from "../assets/Rectangle 8.png"

const Signin = () => {
  return (
    <div className='flex flex-row w-full h-screen'>
        <div className='flex justify-center items-center w-1/2'>
            <form action="" className='flex flex-col justify-center items-center w-[80%] h-full'>
                <div className='flex flex-col gap-8 lg:w-[100%] xl:w-[80%] h-[70%]'>
                    <div className='flex flex-col items-center'>
                        <p className='font-bold text-2xl text-c-lightgreen'>SIGN IN</p>
                        <p>Please, enter your details to continue</p>
                    </div>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='email' value='Email' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='email' type='text' placeholder='Enter your email' required />
                    </div>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='password1' value='Password' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='password1' type='password' placeholder='Enter your password' required />
                        <div className='w-full flex justify-end'>
                            <Link to="/signin" className='text-c-lightgreen font-semibold'>Forgot My Password</Link>
                        </div>
                    </div>
                    
                    

                    <div>
                        <Button className='bg-c-lightgreen text-white w-full'>Sign In</Button>
                    </div>
                    

                    <div className='mb-2 flex justify-center gap-2'>
                        <p>Don't have an account?</p>
                        <Link to="/signin" className='text-c-lightgreen font-bold'>Sign Up</Link>
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