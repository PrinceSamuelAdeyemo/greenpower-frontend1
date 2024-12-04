import React, { useRef, useState} from 'react'
import { Button, Select, TextInput } from 'flowbite-react';
import CustomModal from './CustomModal'

import users_api from '../utils/users_api';
import wallets_api from '../utils/wallets_api';

const SendToGreenPowerAccountModal = ({ showModal2, openModal2, closeModal2, cookieDetails, openModal }) => {
    const emailRef = useRef(null)
    const amountRef = useRef(null)
    const [users, setUsers] = useState()

    const backToSendMoneyModal = (event) => {
        closeModal2()
        openModal()
    }

    const checkPayeeAvailability = (event) => {
        users_api.post('userData', {
            "identifier": emailRef.current.value
        })
        .then((response) => {
            console.log(response.data["data"].length)
            if ((response.data["status_code"] === 200) && (response.data["data"].length === 1)){
                setUsers(response.data["data"][0])
                console.log(response.data["data"][0])
            }
        })
    }

    const transferMoney = (event) => {
        event.preventDefault();
        try {
            wallets_api.post('localTransfer.php', {
                "r_userToken": users["userToken"],
                "amount": amountRef.current.value
            })
            .then((response) => {
                console.log(response)
            })
        } catch (error) {
            
        }
    }

  return (
    <CustomModal showModal={showModal2} openModal={openModal2} closeModal={closeModal2}>
        <div className='flex flex-col items-center gap-5 w-full' onClick={() => console.log(2)}>
            <form onSubmit={transferMoney} className='flex flex-col gap-8 w-full'>
                <div className='flex gap-4'>
                    <p>Recipient</p>
                    <TextInput onBlur={checkPayeeAvailability} ref={emailRef} className='w-full'></TextInput>
                </div>
                <div className='flex gap-4'>
                    <p>Amount:</p>
                    <TextInput ref={amountRef} pattern='[0-9]{0,10}' className='w-full'></TextInput>
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