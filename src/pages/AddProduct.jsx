import { Avatar, Button, Card, FileInput, Label, Select, TextInput, ToggleSwitch } from 'flowbite-react'
import React, { useRef, useState } from 'react'
import { FaBell, FaCamera, FaEdit, FaImage, FaLock, FaSignOutAlt, FaUserCheck } from 'react-icons/fa'
import profilePic from "../assets/Rectangle 37.png"

const AddProduct = () => {
    const [email, setEmail] = useState('')
    

    const product_nameRef = useRef(null)
    const product_serialNumRef = useRef(null)
    const product_imageRef = useRef(null)
    const product_outrightpriceRef = useRef(null)
    const product_outrightcommissionRef = useRef(null)

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };


    return (
        <div>
            <div className='px-4 pb-2'>
                <p className='font-bold text-gray-400 text-3xl'>Add Product</p>
            </div>
            <Card>
                {/* <form> */}
                    <div className='flex gap-0'>
                        <p className='font-bold mb-2 flex-grow block'>Product details</p>
                        <div className='w-[80%] flex-shrink bg-black h-[2px]'></div>
                    </div>
                    <div className='flex flex-col gap-3 w-full md:w-3/5 rounded-none'>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Product Name' htmlFor='product_name' className='w-3/4' />
                            <TextInput type='text' id='product_name' ref={product_nameRef} className='flex-grow w-[60rem]' required />
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Serial Number' htmlFor='serial_number' className='w-3/4' />
                            <TextInput type='text' id='serial_number' ref={product_serialNumRef} className='flex-grow w-[60rem]' />
                        </div>

                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Product Image' htmlFor='product_image' className='w-3/4' />
                            
                        </div>
                    </div>


                    <div className='flex gap-0'>
                        <p className='font-bold mb-2 flex-grow block'>Product details</p>
                        <div className='w-[80%] flex-shrink bg-black h-[2px]'></div>
                    </div>

                    <div className='flex flex-col gap-3 w-full md:w-3/5 rounded-none'>   
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Payment Plan' htmlFor='payment_plan' className='w-3/4' />
                            <Select id='payment_plan' className='flex-grow w-[60rem]'>
                                <option></option>
                            </Select>
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Outright Price' htmlFor='outright_price' className='w-3/4' />
                            <Select id='outright_price' className='w-[60rem]'>
                                <option></option>
                            </Select>
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Commission' htmlFor='commission' className='w-3/4' />
                            <Select id='commission' className='w-[60rem]'>
                                <option></option>
                            </Select>
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Weighted Points' htmlFor='weighted_points' className='w-3/4' />
                            <TextInput type='text' id='weighted_points' className='flex-grow w-[60rem]' />
                        </div>
                    </div>
                    <p className='text-c-lightgreen font-semibold'>Click to add more payment plan +</p>
                    <div className='w-full flex justify-center'>
                        <button className='bg-c-lightgreen text-white w-[40%] h-10 rounded'>Save</button>
                    </div>
                {/* </form> */}
                
                
            </Card>

        </div>
    )
}

export default AddProduct