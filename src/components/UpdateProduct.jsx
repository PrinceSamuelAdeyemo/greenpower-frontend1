import React, {useEffect, useRef} from 'react'
import { Card, Label, TextInput, Select } from 'flowbite-react'

import CustomModal from './CustomModal'

import products_api from '../utils/products_api'

const UpdateProduct = ({ showModal, closeModal, data_update }) => {
    console.log(data_update)
    const product_nameRef = useRef(null)
    const serial_numberRef = useRef(null)
    const product_imageRef = useRef(null)
    const outright_priceRef = useRef(null)
    const commissionRef = useRef(null)
    const weighted_pointsRef = useRef(null)
    const logistics_feeRef = useRef(null)

    const getProfileForUpdate = () => {
        products_api.post("/updateProduct.php", {
                "hubToken": data_update["hubToken"],
                "userToken": data_update["userToken"],
                "pdtToken": data_update["pdtToken"],
                "pdtSerialNumber": serial_numberRef.current.value,
                "pdtName": product_nameRef.current.value,
                "pdtImage": product_imageRef.current.value,
                "outrightPrice": outright_priceRef.current.value,
                "outrightCommission":commissionRef.current.value,
                "logisticsFees": logistics_feeRef.current.value,
                "weightedPoints": weighted_pointsRef.current.value,
        })
        .then((response) => {
            console.log(response)
        })
    }

    useEffect(() => {

    })

  return (
    <CustomModal showModal={showModal} closeModal={closeModal}>
        <div className='flex flex-col gap-2 w-full lg:px-2 xl:px-4'>
                {/* <form> */}
            <div className='flex gap-0 mb-2'>
                <p className='font-bold mb-2 flex-grow block'>Product details</p>
            </div>
            <div className='flex flex-col gap-3 w-full rounded-none'>
                <div className='flex items-center gap-2 mb-3'>
                    <Label value='Product Name' htmlFor='product_name' className='w-3/4' />
                    <TextInput type='text' defaultValue={data_update["pdtName"]} id='product_name' ref={product_nameRef} className='flex-grow w-[60rem]' required />
                </div>
                <div className='flex items-center gap-2 mb-3'>
                    <Label value='Serial Number' htmlFor='serial_number' className='w-3/4' />
                    <TextInput type='text' defaultValue={data_update["pdtSerialNumber"]} id='serial_number' ref={serial_numberRef} className='flex-grow w-[60rem]' />
                </div>

                <div className='flex items-center gap-2 mb-3'>
                    <Label value='Product Image' htmlFor='product_image' className='w-3/4' />
                    <input type="file" alt="" ref={product_imageRef} accept='image/*' className='' />
                    
                </div>
            </div>

            <div className='flex gap-0 mb-2'>
                <p className='font-bold mb-2 flex-grow block'>Payment details</p>
            </div>

            <div className='flex flex-col gap-3 w-full rounded-none'>
                <div className='flex items-center gap-2 mb-3'>
                    <Label value='Outright Price' htmlFor='outright_price' className='w-3/4' />
                    <TextInput type='text' defaultValue={data_update["outrightPrice"]} id='outright_price' ref={outright_priceRef} className='flex-grow w-[60rem]' required />

                </div>
                <div className='flex items-center gap-2 mb-3'>
                    <Label value='Commission' htmlFor='commission' className='w-3/4' />
                    <TextInput type='text' defaultValue={data_update["outrightCommission"]} id='commission' ref={commissionRef} className='flex-grow w-[60rem]' required />
                </div>
                <div className='flex items-center gap-2 mb-3'>
                    <Label value='Weighted Points' htmlFor='weighted_points' className='w-3/4' />
                    <TextInput type='text' defaultValue={data_update["weightedPoints"]} id='weighted_points' ref={weighted_pointsRef} className='flex-grow w-[60rem]' />
                </div>
                <div className='flex items-center gap-2 mb-3'>
                    <Label value='Logistics Fee' htmlFor='logistics_fee' className='w-3/4' />
                    <TextInput type='text' defaultValue={data_update["logisticsFees"]} id='logistics_fee' ref={logistics_feeRef} className='flex-grow w-[60rem]' required />
                </div>
            </div>
            <p className='text-c-lightgreen font-semibold'>Click to add more payment plan +</p>
            <div className='w-full flex justify-center'>
                <button onClick={getProfileForUpdate} className='bg-c-lightgreen text-white w-[40%] h-10 rounded' >Save</button>
            </div>
        {/* </form> */}
                
                
        </div>
    </CustomModal>
  )
}

export default UpdateProduct