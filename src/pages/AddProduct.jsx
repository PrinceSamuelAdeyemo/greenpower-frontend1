import { Avatar, Button, Card, FileInput, Label, Select, TextInput, ToggleSwitch } from 'flowbite-react'
import React, { useRef, useState } from 'react'
import { FaBell, FaCamera, FaEdit, FaImage, FaLock, FaSignOutAlt, FaUserCheck } from 'react-icons/fa'
import profilePic from "../assets/Rectangle 37.png"

import products_api from '../utils/products_api'
import upload_product_by_csv from '../utils/upload_product_by_csv'
import { useLocation } from 'react-router-dom'

import SuccessfulHubModal from '../components/SuccessfulHubModal'
import ErrorModal from '../components/ErrorModal'

const AddProduct = (props) => {
    const location = useLocation()
    var cookieDetails = props.myCookie
    const [email, setEmail] = useState('')
    const [showModal2, setShowModal2] = useState(false)
    const [errorModal, setErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorMessage2, setErrorMessage2] = useState('')
    const [showInstallment, setShowInstallment] = useState(false)

    // Refs
    const product_nameRef = useRef(null)
    const product_serialNumRef = useRef(null)
    const product_imageRef = useRef(null)
    const product_outrightpriceRef = useRef(null)
    const product_outrightCommissionRef = useRef(null)
    const product_logisticsFeesRef = useRef(null)
    const weightedPointRef = useRef(null)
    const fileInputRef = useRef(null);
    const serialNumberFileRef = useRef(null)

    const downPaymentRef = useRef(null)
    const installmentCommissionRef = useRef(null)
    const durationRef = useRef(null)
    const installmentAmountRef = useRef(null)

    var {"hubToken": hub_token} = location.state || {}
    console.log(hub_token)
    

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const toggleInstallmentDiv = () => {
        durationRef.current.value === "0" ? setShowInstallment(false) : setShowInstallment(true);
    }

    const saveProduct = () => {
        
        
        if (serialNumberFileRef.current.value){
            // Compute if serial number file is to be included.
            if (!(/^\s$/.test(product_nameRef.current.value.trim())) && !(/^\s$/.test(product_outrightpriceRef.current.value.trim())) && serialNumberFileRef.current.value != ""){
                if (durationRef.current.value === "0"){
                    const formData = new FormData()
                    formData.append("hubToken", hub_token);
                    formData.append("userToken", cookieDetails["userToken"]);
                    formData.append("pdtSerialNumbers", serialNumberFileRef.current.files[0]);
                    formData.append("pdtName", product_nameRef.current.value);
                    formData.append("pdtImage", "");//product_imageRef.current.value);
                    formData.append("outrightPrice", Number(product_outrightpriceRef.current.value));
                    formData.append("outrightCommission", Number(product_outrightCommissionRef.current.value));
                    formData.append("logisticsFees", Number(product_logisticsFeesRef.current.value)); //static for now
                    formData.append("weightedPoints", Number(weightedPointRef.current.value));
                    
                    upload_product_by_csv.post("addProduct_csv_fd.php", formData)
                    .then((response) => {
                        console.log(response)
                        if (response.data["status_code"] === 200){
                            setShowModal2(true)
                        }
                        else{
                            setErrorMessage('Error in adding product to hub. Kindly check your inputs and make sure you fill in all required fields appropriately.')
                            setErrorModal(true)
                        }
                    })
                }
                else{
                    if (/\d/.test(installmentCommissionRef.current.value.trim()) && /\d/.test(downPaymentRef.current.value.trim()) && /\d/.test(installmentAmountRef.current.value.trim())) {
                        setErrorMessage2('')
                        var paymentPlan = [
                            {
                                "commissionEarned": Number(installmentCommissionRef.current.value.trim()),
                                "downPayment": Number(downPaymentRef.current.value.trim()),
                                "duration": Number(durationRef.current.value.trim()),
                                "installment_amount": Number(installmentAmountRef.current.value.trim())
                            }
                        ]

                        const formData = new FormData()
                        formData.append("hubToken", hub_token);
                        formData.append("userToken", cookieDetails["userToken"]);
                        formData.append("pdtSerialNumbers", serialNumberFileRef.current.files[0]);
                        formData.append("pdtName", product_nameRef.current.value);
                        formData.append("pdtImage", "");//product_imageRef.current.value);
                        formData.append("outrightPrice", Number(product_outrightpriceRef.current.value));
                        formData.append("outrightCommission", Number(product_outrightCommissionRef.current.value));
                        formData.append("logisticsFees", Number(product_logisticsFeesRef.current.value)); //static for now
                        formData.append("weightedPoints", Number(weightedPointRef.current.value));
                        formData.append("paymentPlan", paymentPlan);
                        
                        upload_product_by_csv.post("addProduct_csv_fd.php", formData)
                        .then((response) => {
                            console.log(response)
                            if (response.data["status_code"] === 200){
                                setShowModal2(true)
                            }
                            else{
                                setErrorMessage('Error in adding product to hub. Kindly check your inputs and make sure you fill in all required fields appropriately.')
                                setErrorModal(true)
                            }
                        })
                    }
                    else{
                        setErrorMessage2('Fields must be a valid number and not empty')
                    }
                }
            }
            else{
                setErrorMessage('Fields must not be empty.')
            }
        }
        else{
            // Compute if serial number only is to be included.
            if ((product_nameRef.current.value && product_serialNumRef.current.value && product_outrightpriceRef.current.value) != ""){
                if (durationRef.current.value === "0"){
                    alert("ee")
                    var data = {
                        "hubToken": hub_token,
                        "userToken": cookieDetails["userToken"],
                        "pdtSerialNumber": product_serialNumRef.current.value,
                        "pdtName": product_nameRef.current.value,
                        "pdtImage": product_imageRef.current.value,
                        "outrightPrice": Number(product_outrightpriceRef.current.value),
                        "outrightCommission": Number(product_outrightCommissionRef.current.value),
                        "logisticsFees": Number(product_logisticsFeesRef.current.value),
                        "weightedPoints": Number(weightedPointRef.current.value)
                        }
                    console.log(data)
                    products_api.post("addProduct.php", data)
                    .then((response) => {
                        console.log(response)
                        if (response.data["status_code"] === 200){
                            setShowModal2(true)
                        }
                        else{
                            setErrorMessage('Error in adding product to hub. Kindly check your inputs and make sure you fill in all required fields appropriately.')
                            setErrorModal(true)
                        }
                    })
                }
                else{
                    if (/\d/.test(installmentCommissionRef.current.value.trim()) && /\d/.test(downPaymentRef.current.value.trim()) && /\d/.test(installmentAmountRef.current.value.trim())) {
                        var data = {
                            "hubToken": hub_token,
                            "userToken": cookieDetails["userToken"],
                            "pdtSerialNumber": product_serialNumRef.current.value,
                            "pdtName": product_nameRef.current.value,
                            "pdtImage": product_imageRef.current.value,
                            "outrightPrice": Number(product_outrightpriceRef.current.value),
                            "outrightCommission": Number(product_outrightCommissionRef.current.value),
                            "logisticsFees": Number(product_logisticsFeesRef.current.value),
                            "weightedPoints": Number(weightedPointRef.current.value),
                            "paymentPlan": [
                                    {
                                        "commissionEarned": Number(installmentCommissionRef.current.value.trim()),
                                        "downPayment": Number(downPaymentRef.current.value.trim()),
                                        "duration": Number(durationRef.current.value.trim()),
                                        "installment_amount": Number(installmentAmountRef.current.value.trim())
                                    }
                                ]
                            }
                        console.log(data)
                        products_api.post("addProduct.php", data)
                        .then((response) => {
                            console.log(response)
                            if (response.data["status_code"] === 200){
                                setShowModal2(true)
                            }
                            else{
                                setErrorMessage('Error in adding product to hub. Kindly check your inputs and make sure you fill in all required fields appropriately.')
                                setErrorModal(true)
                            }
                        })
                    }
                    else{
                        setErrorMessage('Error in adding product to hub. Kindly check your inputs and make sure you fill in all required fields appropriately.')
                        setErrorModal(true)
                    }
                }
            }
            else{
                setErrorMessage('Error in adding product to hub. Kindly check your inputs and make sure you fill in all required fields appropriately.')
                setErrorModal(true)
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
                            <input type="file" ref={serialNumberFileRef} alt="File containing list of all the serial numbers of a product to be added." accept='.csv' className='' />
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
                            <Label value='Outright Price' htmlFor='outright_price' className='w-3/4' />
                            <TextInput type='text' id='product_name' ref={product_outrightpriceRef} className='flex-grow w-[60rem]' required />

                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Commission' htmlFor='commission' className='w-3/4' />
                            <TextInput type='text' id='product_name' ref={product_outrightCommissionRef} className='flex-grow w-[60rem]' required />
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Weighted Points' htmlFor='weighted_points' className='w-3/4' />
                            <TextInput type='text' id='weighted_points' ref={weightedPointRef} className='flex-grow w-[60rem]' />
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Logistics Fees' htmlFor='logistics_fees' className='w-3/4' />
                            <TextInput type='text' id='logistics_fees' ref={product_logisticsFeesRef} className='flex-grow w-[60rem]' />
                        </div>
                        <div className='flex items-center gap-2 mb-3'>
                            <Label value='Payment Plan' htmlFor='payment_plan' className='w-3/4' />
                            <Select onChange={toggleInstallmentDiv} id='payment_plan' ref={durationRef} className='flex-grow w-[60rem]'>
                                <option value={0}>---</option>
                                <option value={3}>3 months</option>
                                <option value={6}>6 months</option>
                                <option value={9}>9 months</option>
                                <option value={12}>12 months</option>
                            </Select>
                        </div>

                        {showInstallment &&
                        <div className='flex flex-col gap-2'>
                            <p className='text-center font-bold text-red-500'>{errorMessage2}</p>
                            <p className='font-bold'>Installment details</p>
                            <div className='flex flex-col gap-3'>
                                <div className='flex items-center gap-2 mb-3'>
                                    <Label value='Down Payment' htmlFor='downpayment' className='w-3/4' />
                                    <TextInput type='text' id='downpayment' ref={downPaymentRef} className='flex-grow w-[60rem]' required />
                                </div>
                                <div className='flex items-center gap-2 mb-3'>
                                    <Label value='Installment Amount' htmlFor='installmentAmount' className='w-3/4' />
                                    <TextInput type='text' id='installmentAmount' ref={installmentAmountRef} className='flex-grow w-[60rem]' required />
                                </div>
                                <div className='flex items-center gap-2 mb-3'>
                                    <Label value='Installment Commission' htmlFor='installmentCommission' className='w-3/4' />
                                    <TextInput type='text' id='installmentCommission' ref={installmentCommissionRef} className='flex-grow w-[60rem]' required />
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className='w-full flex justify-center'>
                        <button className='bg-c-lightgreen text-white w-[40%] h-10 rounded' onClick={saveProduct}>Save</button>
                    </div>
                    
                {/* </form> */}
                {showModal2 && <SuccessfulHubModal showModal2={showModal2} openModal2={() => setShowModal2(true)} closeModal2={() => setShowModal2(false)} title={"Add Product"} message={'Product added to hub successfully.'} />}
                {errorModal && <ErrorModal showModal2={errorModal} openModal2={() => setErrorModal(true)} closeModal2={() => setErrorModal(false)} message={errorMessage} />}
                
            </Card>

        </div>
    )
}

export default AddProduct