import React from 'react'
import CustomModal2 from './CustomModal2'
import { TextInput } from 'flowbite-react'
import SuccessImage from "../assets/Group 485.png"

const ErrorModal = ({showModal2, openModal2, closeModal2, message }) => {
  return (
    <CustomModal2 
    showModal={showModal2}
    openModal={openModal2}
    closeModal={closeModal2}>
        <div className='flex flex-col gap-4 w-[80%] h-72'>
            <p className='font-semibold text-red-500 text-center'>Error</p>
            <div className='flex flex-col justify-center items-center gap-2 w-full'>
                <img src={SuccessImage} className="w-40" alt="" />
                <p className='font-bold text-red-500'>{message}</p>
            </div>
            <button className='h-10 rounded-xl text-c-lightgreen bg-white font-semibold  border-2 shadow-lg' onClick={closeModal2} >Close</button>
        </div>
        
    </CustomModal2>
  )
}

export default ErrorModal