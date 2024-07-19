import { Avatar, Button, Card, FileInput, Label, Select, TextInput, ToggleSwitch } from 'flowbite-react'
import React, { useRef, useState } from 'react'
import { FaBell, FaCamera, FaEdit, FaImage, FaLock, FaSignOutAlt, FaUserCheck } from 'react-icons/fa'
import profilePic from "../assets/Rectangle 37.png"

const Settings = () => {
    const [email, setEmail] = useState('')
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    return (
        <div>
            <Card>
                <div className='flex flex-col gap-3 w-full md:w-3/5 rounded-none'>
                    <p className='font-bold mb-2'>Account Information</p>
                    <div className='flex items-center gap-12 mb-3'>
                        <Label value='Email' htmlFor='email' />
                        <div className='flex gap-4'>
                            <TextInput type="email" value={email} id='email' sizing="xl" className='rounded-r-none border-r-0 outline-none rounded-none w-1/2' />
                            <Button outline>Edit</Button>
                        </div>
                        
                    </div>
                    <div className='flex items-center gap-6'>
                        <Label value='Password' htmlFor='id' />
                        <Button className='bg-c-lightgreen'>Reset Password</Button>
                    </div>
                </div>
            </Card>
            <Card className='mt-4 rounded-none'>
                <p className='font-bold mb-2'>Profile Information</p>
                <div className='flex flex-col md:flex-row gap-4 '>
                    <div className='flex flex-col gap-4 w-full md:w-4/6'>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='First Name' htmlFor='firstName' className='w-2/4' />
                            <TextInput value={email} id='firstName' className='flex-grow w-[60rem]' />
                            <div className='w-20' /> {/* Placeholder for alignment */}
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Last Name' htmlFor='lastName' className='w-2/4' />
                            <TextInput value={email} id='lastName' className='flex-grow w-[60rem] border-c-lightgreen' />
                            <div className='w-20' /> {/* Placeholder for alignment */}
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Phone Number' htmlFor='phoneNumber' className='w-1/4' />
                            <TextInput value={email} id='phoneNumber' className='flex-grow' />
                            <Button outline className='flex-none w-20'>Edit</Button>
                        </div>
                    </div>
                    <div className=' flex flex-col gap-2 items-center w-2/6'>
                        <img src={profilePic} alt="" className='w-[50%] h-[50%]' />
                        <div className='relative mt-1'>
                            <input
                                type='file'
                                ref={fileInputRef}
                                className='hidden'
                                onChange={(e) => console.log(e.target.files)}
                            />
                            <input type="file" ref={fileInputRef} className='hidden' />
                            <Button outline className='flex items-center' onClick={handleButtonClick}>
                                <div className='flex items-center gap-2'>
                                    <FaCamera />
                                    Change image
                                </div>
                            </Button>
                        </div>
                        <p className='mt-2 font-medium'>Delete image</p>
                    </div>
                </div>
            </Card>
            <Card className='mt-4 rounded-none'>
                <p className='font-bold mb-2'>KYC</p>
                <div className='flex gap-4 '>
                    <div className='w-3/5'>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Full Address' htmlFor='address' className='w-1/4' />
                            <TextInput value={email} id='address' className='flex-grow' />
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='State' htmlFor='state' className='w-1/4' />
                            <TextInput value={email} id='state' className='flex-grow' />
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='DocumentType' htmlFor='docType' className='w-1/4' />
                            {/* <TextInput value={email} id='phoneNumber' className='flex-grow' /> */}
                            <Select value={email} id='docType' className='flex-grow'>
                                <option></option>
                            </Select>
                        </div>
                    </div>
                    <div className=' w-2/5'>
                        <div className='flex gap-3 justify-center '>
                            <p className='mt-2 font-light'>Upload </p>
                            <div className=' mt-1'>
                                <input
                                    type='file'
                                    ref={fileInputRef}
                                    className='hidden'
                                    onChange={(e) => console.log(e.target.files)}
                                />
                                <Button outline className='flex items-center' onClick={handleButtonClick}>
                                    <div className='flex items-center gap-2'>
                                        Change image
                                        <FaImage />
                                    </div>
                                </Button>
                            </div>
                        </div>


                    </div>
                </div>
            </Card>


        </div>
    )
}

export default Settings