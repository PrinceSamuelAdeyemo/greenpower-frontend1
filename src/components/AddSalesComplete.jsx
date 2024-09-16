import React from 'react'
import CustomModal from './CustomModal'
import uploadImage from '../assets/UploadImage.png'
import { Button } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

const AddSalesComplete = ({ showModal, openModal, closeModal }) => {
    const navigate = useNavigate()
    return (
        <CustomModal
            showModal={showModal}
            openModal={openModal}
            closeModal={closeModal}>
            <div className='w-full flex flex-col items-center justify-center'>
                <div className='text-center'>
                    <img src={uploadImage} />
                    <p className='text-2xl font-bold'>Thank you for your purchase</p>
                    <p className='font-normal'>Your order has been received</p>
                </div>
                <div className='w-full flex justify-center mt-4'>
                    <Button className='bg-green-500' onClick={closeModal}>Close</Button>
                </div>
            </div>

        </CustomModal>
    )
}

export default AddSalesComplete