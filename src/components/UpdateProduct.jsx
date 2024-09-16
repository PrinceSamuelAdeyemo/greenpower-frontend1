import React, {useEffect} from 'react'
import { Card, Label, TextInput, Select } from 'flowbite-react'

import CustomModal from './CustomModal'

import products_api from '../utils/products_api'

const UpdateProduct = ({ showModal, closeModal }) => {
    const getProfileForUpdate = () => {
        products_api.post("/updateProduct.php", {

        })
    }

    useEffect(() => {

    })

  return (
    <CustomModal showModal={showModal} closeModal={closeModal}>
        <div className='w-full'>
                {/* <form> */}
            <div className='flex gap-0'>
                <p className='font-bold mb-2 flex-grow block'>Product details</p>
            </div>
            <div className='flex flex-col gap-3 w-full md:w-3/5 rounded-none'>
                <div className='flex items-center gap-2 mb-3'>
                    <Label value='Product Name' htmlFor='product_name' className='w-3/4' />
                    <TextInput type='text' id='product_name' className='flex-grow w-[60rem]' required />
                </div>
                <div className='flex items-center gap-2 mb-3'>
                    <Label value='Serial Number' htmlFor='serial_number' className='w-3/4' />
                    <TextInput type='text' id='serial_number' className='flex-grow w-[60rem]' />
                </div>

                <div className='flex items-center gap-2 mb-3'>
                    <Label value='Product Image' htmlFor='product_image' className='w-3/4' />
                    <input type="file" alt="" accept='image/*' className='' />
                    
                </div>
            </div>


            <div className='flex gap-0'>
                <p className='font-bold mb-2 flex-grow block'>Product details</p>
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
                    <TextInput type='text' id='product_name' className='flex-grow w-[60rem]' required />

                </div>
                <div className='flex items-center gap-2 mb-3'>
                    <Label value='Commission' htmlFor='commission' className='w-3/4' />
                    <TextInput type='text' id='product_name' className='flex-grow w-[60rem]' required />
                </div>
                <div className='flex items-center gap-2 mb-3'>
                    <Label value='Weighted Points' htmlFor='weighted_points' className='w-3/4' />
                    <TextInput type='text' id='weighted_points' className='flex-grow w-[60rem]' />
                </div>
            </div>
            <p className='text-c-lightgreen font-semibold'>Click to add more payment plan +</p>
            <div className='w-full flex justify-center'>
                <button className='bg-c-lightgreen text-white w-[40%] h-10 rounded' >Save</button>
            </div>
        {/* </form> */}
                
                
        </div>
    </CustomModal>
  )
}

export default UpdateProduct