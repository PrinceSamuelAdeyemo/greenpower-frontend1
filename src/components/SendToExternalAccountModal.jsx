import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Button, Select, TextInput } from 'flowbite-react';
import CustomModal from './CustomModal'

import wallets_api from '../utils/wallets_api';

const SendToExternalAccountModal = ({ showModal3, openModal3, closeModal3, cookieDetails, openModal }) => {
    const bankCodeRef = useRef(null)
    const accountNumberRef = useRef(null)
    const amountRef = useRef(null)

    const [bankList, setBankList] = useState([])
    const [accountName, setAccountName] = useState('')

    // Functions
    const getBankList = () => {
        try{
            wallets_api.post("/bankList", {
                "userToken": cookieDetails["userToken"]
            })
            .then((response) => {
                console.log(response)
                if (response.data["status_code"] === 200){
                    setBankList((response.data["data"]["data"]))
                }
            })
        }
        catch(error){

        }
    }

    const verifyBankAccount = () => {
        let test_pattern = /^\d{10}$/
        if (test_pattern.test(accountNumberRef.current.value)){
            console.log(cookieDetails["userToken"], bankCodeRef.current.value, accountNumberRef.current.value)
            try{
                wallets_api.post("/verifyBankAccount.php", {
                    "usertoken": cookieDetails["userToken"],
                    "bankCode": bankCodeRef.current.value,
                    "accNo": accountNumberRef.current.value
                })
                .then((response) => {
                    console.log(response)
                    if (response.data["status_code"] === 200){
                        setAccountName(response.data["data"]["accountName"])
                    }
                })
            }
            catch(error){

            }
        }
    }

    const transferMoney = (event) => {
        event.preventDefault();
        try {
            wallets_api.post('interBankTransfer.php', {
                "userid": cookieDetails["userToken"],
                "payeeName": accountName,
                "amount": amountRef.current.value,
                "bankCode": bankCodeRef.current.value,
                "accNo": accountNumberRef.current.value
            })
            .then((response) => {
                console.log(response)
            })
        } catch (error) {
            
        }
    }

    const backToSendMoneyModal = (event) => {
        closeModal3()
        openModal()
    }

    useEffect(() => {
        console.log("hhhhhhhhhh",cookieDetails)
        getBankList()
    }, [])

  return (
    <CustomModal showModal={showModal3} openModal={openModal3} closeModal={closeModal3}>
        <div className='flex flex-col items-center gap-5 w-full' onClick={() => console.log(2)}>
            <form onSubmit={(event) => transferMoney(event)} className='flex flex-col gap-8 w-full'>
                <div className='flex flex-col gap-2'>
                    <p>Bank</p>
                    <Select ref={bankCodeRef} className='w-full'>
                    {
                            bankList.map((bank, index) => (
                                <option value={bank["bankCode"]}>{bank["bankName"]}</option>
                            ))
                        }
                        
                    </Select>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>Account Number:</p>
                    <TextInput pattern='[0-9]{10}' onChange={verifyBankAccount} ref={accountNumberRef} className='w-full'></TextInput>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>Account Name</p>
                    <TextInput className='w-full focus:ring-0 border-0 outline-0' value={accountName}></TextInput>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>Amount:</p>
                    <TextInput pattern='[0-9]{0,10}' ref={amountRef} className='w-full'></TextInput>
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

export default SendToExternalAccountModal