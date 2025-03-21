import React, { useEffect, useRef, useState} from 'react'
import { Button, Select, Spinner, TextInput } from 'flowbite-react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import CustomModal from './CustomModal'

import users_api from '../utils/users_api';
import wallets_api from '../utils/wallets_api';

const SendToGreenPowerAccountModal = ({ showModal2, openModal2, closeModal2, cookieDetails, openModal, walletBalance }) => {
    const emailRef = useRef(null)
    const amountRef = useRef(null)
    const [userAvailability, setUserAvailability] = useState()
    const [users, setUsers] = useState()
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [emailValidated, setEmailValidated] = useState()
    const [amountValidated, setAmountValidated] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const [successMessage, setSuccessMessage] = useState()
    const [loading, setLoading] = useState(false)


    const backToSendMoneyModal = (event) => {
        closeModal2()
        openModal()
    }

    const validateEmail = async () => {
        if (/^$/.test(emailRef.current.value.trim())){
            setLoading(false)
        }
        else{
            setLoading(true)
            try {
                await users_api.post('userData', {
                    "identifier": emailRef.current.value
                })
                .then((response) => {
                    console.log(response)
                    if (response.data["status_code"] === 200){
                        setLoading(false)
                        setUserAvailability(true)
                        setEmailValidated(true)
                    }
                    else{
                        setLoading(false)
                        setUserAvailability(false)
                        setEmailValidated(true)
                    }
    
                    if ((response.data["status_code"] === 200) && (response.data["data"].length === 1)){
                        setUsers(response.data["data"][0])
                        console.log(response.data["data"][0])
                    }
                })
            } catch (error) {
            }   
        }
    }

    const validateAmount = () => {
        let amount_pattern = /\d{2,10}$/
        if (amount_pattern.test(amountRef.current.value)){
            setAmountValidated(true)
        }
        else{
            setAmountValidated(false)
        }
    }

    const transferMoney = (event) => {
        event.preventDefault();
        try {
            wallets_api.post('localTransfer.php', {
                "r_userToken": users["userToken"],
                "amount": amountRef.current.value
            })
            .then((response) => {
                if (response.data["status_code"] === 200){
                    setErrorMessage("")
                    setSuccessMessage("Transfer successful")
                }
                else{
                    setSuccessMessage("")
                    setErrorMessage("Something went wrong with the transfer.")
                }
                console.log(response)
                console.log({
                    "r_userToken": users["userToken"],
                    "amount": amountRef.current.value
                })
            })
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if (walletBalance < 1){
            setErrorMessage('Your account is currently low, and transfers cannot be made. Kindly deposit some funds in order to proceed')
        }
    })

  return (
    <CustomModal showModal={showModal2} openModal={openModal2} closeModal={closeModal2}>
        <div className='flex flex-col items-center gap-5 w-full' onClick={() => console.log(2)}>
            <div className=''>
                <p>{successMessage}</p>
                <p>{errorMessage}</p>
            </div>
            <form onSubmit={transferMoney} className='flex flex-col gap-8 w-full'>
                <div className='flex gap-4'>
                    <p>Walet Balance:</p>
                    <p className='font-semibold'>₦{walletBalance}</p>
                </div>
                <p className='text-center text-red-600 w-[90%]'>{errorMessage}</p>
                <div className='flex gap-4'>
                    <p>Recipient</p>
                    <div className='flex gap-2 w-full items-center'>
                        <TextInput onChange={validateEmail} ref={emailRef} className='w-full'></TextInput>
                        {
                            emailValidated === true ? 
                            userAvailability === true ? <span><FaCheck className='text-c-lightgreen' /></span> : <span><FaTimes className='text-red-500' /></span>
                            : 
                            <Spinner />
                        }
                        
                    </div>
                    
                </div>
                <div className='flex gap-4'>
                    <p>Amount:</p>
                    <TextInput onChange={validateAmount} ref={amountRef} pattern='[0-9]{2,10}' className='w-full'></TextInput>
                </div>

                <div className='flex justify-between'>
                    <Button type='button' className='bg-red-600' onClick={backToSendMoneyModal}>Back</Button>
                    <Button type='submit' className='bg-c-lightgreen' disabled={!(userAvailability && amountValidated && (walletBalance > 0))}>Send</Button>
                </div>
            </form> 
        </div>
    </CustomModal>
  )
}

export default SendToGreenPowerAccountModal