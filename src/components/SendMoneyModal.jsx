import React from 'react'
import { Button } from 'flowbite-react';
import CustomModal from './CustomModal'

const SendMoneyModal = ({ showModal, openModal, closeModal, cookieDetails, openModal2, openModal3}) => {

  return (
    <div>
        <CustomModal showModal={showModal} openModal={openModal} closeModal={closeModal}>
            <div className='flex flex-col items-center gap-4 w-full'>
                <p className='self-start text-c-lightgreen font-semibold'>Transfer to:</p>
                <div className='flex flex-col gap-4 w-full lg:w-[80%]'>
                    <Button className='w-full bg-c-lightgreen h-16 flex items-center justify-center focus:ring-0' onClick={openModal2}>GreenPower Account</Button>
                    <Button className='w-full bg-c-lightgreen h-16 flex items-center justify-center focus:ring-0' onClick={openModal3}>External Account</Button>
                </div>
            </div>
        </CustomModal>
    </div>
    
  )
}

export default SendMoneyModal