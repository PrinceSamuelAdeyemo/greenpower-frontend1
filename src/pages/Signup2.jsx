import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom"
import { TextInput, Button, Label, } from 'flowbite-react'
import SignupRightImage from "../assets/Rectangle 8.png"

import EmailConfirmatioModal from '../components/EmailConfirmationModal'

import emailconfirmpic from "../assets/3001931-removebg-preview 1.png"

const Signup1 = () => {
    const [showModal, setShowModal] = useState(false);

  return (
    <div className='flex flex-row w-full h-screen'>
        <div className='flex justify-center items-center w-1/2'>
            <form action="" className='flex flex-col justify-center items-center w-[80%] h-full'>
                <div className='flex flex-col gap-4 lg:w-[100%] xl:w-[80%] h-[70%]'>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='surname' value='Surname' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='surname' type='text' placeholder='Afolabi' required />
                    </div>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='other_names' value='Other Names' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='other_names' type='text' placeholder='Seunfunmi Ayomide' required />
                    </div>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='address' value='Home Address' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='address' type='text' placeholder='No 52, Lane 2, Ladigbolu Estate, Oyo town, Oyo Stare.' required />
                    </div>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='email' value='Email' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='email' type='email' placeholder='Enter your mail address' required />
                    </div>

                    <div className='w-full'>
                        <div className='mb-2 block'>
                            <Label htmlFor='phone_number' value='Phone Number' className='font-bold' />
                        </div>
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='phone_number' type='text' placeholder='09066099325' required />
                    </div>

                    <div>
                        <Button className='bg-c-lightgreen text-white w-full' onClick={() => setShowModal(true)}>Proceed</Button>
                    </div>
                    {showModal && <EmailConfirmatioModal showModal={showModal} openModal={() => setShowModal(true)} closeModal={() => setShowModal(false)} pic={emailconfirmpic} />}

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