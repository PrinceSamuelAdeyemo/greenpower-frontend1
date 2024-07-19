import React from 'react'
import { Link } from "react-router-dom"
import { TextInput, Button, Label, } from 'flowbite-react'
import SignupRightImage from "../assets/Rectangle 8.png"

const Signup1 = () => {
  return (
    <div className='flex flex-row w-full h-screen'>
        <div className='flex justify-center items-center w-1/2'>
            <form action="" className='flex flex-col justify-center items-center w-[80%] h-full'>
                <div className='flex flex-col gap-8 lg:w-[100%] xl:w-[80%] h-[70%]'>
                    <div className='flex flex-col items-center'>
                        <p className='font-bold text-2xl text-c-lightgreen'>SIGN UP</p>
                        <p>Please, enter your details to continue</p>
                    </div>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='bvn' value='BVN' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='bvn' type='text' placeholder='Enter your bvn' required />
                    </div>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='password1' value='Password' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='password1' type='password' placeholder='Enter your password' required />
                    </div>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='password2' value='Confirm Password' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='password2' type='password' placeholder='Confirm your password' required />
                    </div>

                    <div>
                        <Button className='bg-c-lightgreen text-white w-full'>Sign up</Button>
                    </div>
                    

                    <div className='mb-2 flex gap-2'>
                        <p>Already have an account?</p>
                        <Link to="/signin" className='text-c-lightgreen font-bold'>Sign in</Link>
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