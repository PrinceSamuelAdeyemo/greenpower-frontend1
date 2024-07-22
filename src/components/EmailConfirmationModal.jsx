import React, { useRef, useState } from 'react'
import CustomModal2 from './CustomModal2'
import { Button } from 'flowbite-react'
import SmsConfirmationModal from './SmsConfirmationModal'
import smsconfirmpic from "../assets/3d-mobile-phone-with-security-code-padlock-removebg-preview 1.png"


const EmailConfirmationModal = ({showModal, openModal, closeModal, pic, phoneNumber}) => {

  const [showSmsModal, setShowSmsModal] = useState(false)
  const [emailCode, setEmailCode] = useState("")

  const emailCodeRef = useRef(null)
  const openSmsConfirmation = () =>{
    closeModal();
    setShowSmsModal(true)
  }

  return (
    <CustomModal2 showModal={showModal} openModal={openModal} closeModal={closeModal}>
      <div className='flex flex-col gap-4'>
        <div className='w-full flex flex-col justify-center items-center relative'>
          <img className='object-cover h-1/2 w-1/2 bg-white' src={pic} alt="" />
          <p className='font-bold text-3xl absolute bottom-0'>Email Confirmation</p>
        </div>

        <div className='flex flex-col justify-center items-center text-center gap-3'>
          <p className='w-[85%] text-xl font-medium text-center'>We have sent a verification code to phone number {phoneNumber}. Please enter the code below</p>
          <input className='text-3xl font-semibold border-x-0 border-t-0 border-b-2 border-b-c-lightgreen hover:border-0 hover:outline-none active:border-0 active:outline-none w-1/2 text-center focus:border-0 focus:outline-none' type="text" ref={emailCodeRef} maxLength="6" onChange={() => setEmailCode(emailCodeRef.current.value) } />
          <Button className='bg-c-lightgreen w-[80%]'>Confirm</Button>
          <p className='text-c-lightgreen border-none outline-none underline' onClick={openSmsConfirmation}>Send SMS Instead</p>
        </div>
      </div>

      {showSmsModal && <SmsConfirmationModal showModal={showSmsModal} openModal={openModal} closeModal={closeModal} pic={smsconfirmpic} />}

    </CustomModal2>
  )
}

export default EmailConfirmationModal