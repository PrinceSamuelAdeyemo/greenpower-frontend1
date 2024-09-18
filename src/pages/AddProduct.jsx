import { Avatar, Button, Card, FileInput, Label, Select, TextInput, ToggleSwitch } from 'flowbite-react'
import React, { useRef, useState } from 'react'
import { FaBell, FaCamera, FaEdit, FaImage, FaLock, FaSignOutAlt, FaUserCheck } from 'react-icons/fa'
import profilePic from "../assets/Rectangle 37.png"

import products_api from '../utils/products_api'
import { useLocation } from 'react-router-dom'

const AddProduct = (props) => {
    const location = useLocation()
    var cookieDetails = props.myCookie
    const [email, setEmail] = useState('')

    // Refs
    const product_nameRef = useRef(null)
    const product_serialNumRef = useRef(null)
    const product_imageRef = useRef(null)
    const product_outrightpriceRef = useRef(null)
    const product_outrightcommissionRef = useRef(null)
    const commissionRef = useRef(null)
    const weightedPointRef = useRef(null)
    const fileInputRef = useRef(null);
    const serialNumberFileRef = useRef(null)

    var {"hubToken": hub_token} = location.state || {}
    console.log(hub_token)
    

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const saveProduct = () => {
        
        
        if (serialNumberFileRef.current.value){
            
            if ((product_nameRef.current.value && serialNumberFileRef.current.value && product_outrightpriceRef.current.value) != ""){
                var data = {
                    "hubToken": hub_token,
                    "userToken": cookieDetails["userToken"],
                    "pdtSerialNumbers": btoa(serialNumberFileRef.current.value),
                    "pdtName": product_nameRef.current.value,
                    "pdtImage": product_imageRef.current.value,
                    "outrightPrice": Number(product_outrightpriceRef.current.value),
                    "outrightCommission": Number(commissionRef.current.value),
                    "logisticsFees": 12,
                    "weightedPoints": Number(weightedPointRef.current.value)
                    }
                    console.log(data)
                products_api.post("addProduct_csv.php", data)
                .then((response) => {
                    console.log(response)
                })
            }
        }
        else{
            if ((product_nameRef.current.value && product_serialNumRef.current.value && product_outrightpriceRef.current.value) != ""){
                var data = {
                    "hubToken": hub_token,
                    "userToken": cookieDetails["userToken"],
                    "pdtSerialNumber": product_serialNumRef.current.value,
                    "pdtName": product_nameRef.current.value,
                    "pdtImage": product_imageRef.current.value,
                    "outrightPrice": Number(product_outrightpriceRef.current.value),
                    "outrightCommission": Number(commissionRef.current.value),
                    "logisticsFees": 12,
                    "weightedPoints": Number(weightedPointRef.current.value)
                    }
                    console.log(data)
                products_api.post("addProduct.php", data)
                .then((response) => {
                    console.log(response)
                })
            }
        }
 
        
    }
    
    
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
                            <Label value='Serial Number File' htmlFor='serial_number_file' className='w-3/4' />
                            <input type="file" ref={serialNumberFileRef} alt="File containing list of all the serial numbers of a product to be added." accept='.csv, .xls, .xlsm, .xlsx' className='' />
                        </div>

                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Product Image' htmlFor='product_image' className='w-3/4' />
                            <input type="file" ref={product_imageRef} alt="" accept='image/*' className='' />
                            
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
                                <option>3 months</option>
                                <option>6 months</option>
                                <option>9 months</option>
                                <option>12 months</option>
                            </Select>
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Outright Price' htmlFor='outright_price' className='w-3/4' />
                            <TextInput type='text' id='product_name' ref={product_outrightpriceRef} className='flex-grow w-[60rem]' required />

                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Commission' htmlFor='commission' className='w-3/4' />
                            <TextInput type='text' id='product_name' ref={commissionRef} className='flex-grow w-[60rem]' required />
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Weighted Points' htmlFor='weighted_points' className='w-3/4' />
                            <TextInput type='text' id='weighted_points' ref={weightedPointRef} className='flex-grow w-[60rem]' />
                        </div>
                    </div>
                    <p className='text-c-lightgreen font-semibold'>Click to add more payment plan +</p>
                    <div className='w-full flex justify-center'>
                        <button className='bg-c-lightgreen text-white w-[40%] h-10 rounded' onClick={saveProduct}>Save</button>
                    </div>
                {/* </form> */}
                
                
            </Card>

        </div>
    )
}

export default AddProduct