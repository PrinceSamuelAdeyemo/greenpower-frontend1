import React from 'react'
import CustomModal2 from './CustomModal2'
import { TextInput } from 'flowbite-react'
import SuccessImage from "../assets/Group 485.png"

const SuccessfulHubModal = ({showModal, openModal, closeModal }) => {
  return (
    <CustomModal2 
    showModal={showModal}
    openModal={openModal}
    closeModal={closeModal}>
        <div className='flex flex-col gap-4 w-[80%] h-72'>
            <p className='font-semibold text-c-lightgreen text-center'>Add Hub</p>
            <div className='flex flex-col justify-center items-center gap-2 w-full'>
                <img src={SuccessImage} className="w-40" alt="" />
                <p className='font-bold text-c-lightgreen'>Hub Created succesfully</p>
            </div>
            <button className='h-10 rounded-xl text-c-lightgreen bg-white font-semibold  border-2 shadow-lg'>Close</button>
        </div>
        
    </CustomModal2>
  )
}

export default SuccessfulHubModal