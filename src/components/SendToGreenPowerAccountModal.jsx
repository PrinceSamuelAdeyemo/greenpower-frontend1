import React from 'react'
import { Button, Select, TextInput } from 'flowbite-react';
import CustomModal from './CustomModal'

const SendToGreenPowerAccountModal = ({ showModal2, openModal2, closeModal2, cookieDetails, openModal }) => {

    const backToSendMoneyModal = (event) => {
        closeModal2()
        openModal()
    }

  return (
    <CustomModal showModal={showModal2} openModal={openModal2} closeModal={closeModal2}>
        <div className='flex flex-col items-center gap-5 w-full' onClick={() => console.log(2)}>
            <form className='flex flex-col gap-8 w-full'>
                <div className='flex gap-4'>
                    <p>Recipient</p>
                    <Select className='w-full'>
                        <option value="">A</option>
                        <option value="">B</option>
                    </Select>
                </div>
                <div className='flex gap-4'>
                    <p>Amount:</p>
                    <TextInput className='w-full'></TextInput>
                </div>

                <div className='flex justify-between'>
                    <Button type='button' className='bg-red-600' onClick={backToSendMoneyModal}>Back</Button>
                    <Button type='submit' className='bg-c-lightgreen'>Send</Button>
                </div>
            </form> 
        </div>
    </CustomModal>
  )
}

export default SendToGreenPowerAccountModal