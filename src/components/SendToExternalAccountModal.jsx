import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Button, Select, Spinner, TextInput } from 'flowbite-react';
import CustomModal from './CustomModal'

import wallets_api from '../utils/wallets_api';

const SendToExternalAccountModal = ({ showModal3, openModal3, closeModal3, cookieDetails, openModal, walletBalance }) => {
    const bankCodeRef = useRef(null)
    const accountNumberRef = useRef(null)
    const amountRef = useRef(null)

    const [bankList, setBankList] = useState([])
    const [accountName, setAccountName] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    // Functions
    const validateAllFields = () => {
        let pattern = /^[0-9]{2,10}$/
        if ((bankCodeRef.current.value) && (pattern.test(amountRef.current.value))){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    }

    const getBankList = () => {
        try{
            wallets_api.post("/bankList", {
                "userToken": cookieDetails["userToken"]
            })
            .then((response) => {
                console.log(response)
                if (response.data["status_code"] === 200){
                    setBankList((response.data["data"]["data"]))
                    console.log(bankList.length)
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
        if (walletBalance < 1){
            setErrorMessage('Your account is currently low, and transfers cannot be made. Kindly deposit some funds in order to proceed')
        }
    }, [])

  return (
    <CustomModal showModal={showModal3} openModal={openModal3} closeModal={closeModal3}>
        <div className='flex flex-col items-center gap-5 w-full' onClick={() => console.log(2)}>
            <form onSubmit={(event) => transferMoney(event)} className='flex flex-col gap-8 w-full'>
                <p className='text-center text-red-600 w-[90%]'>{errorMessage}</p>
                <div className='flex flex-col gap-2'>
                    <p>Bank</p>
                    {bankList.length !== 0 ?
                    <Select ref={bankCodeRef} className='w-full'>
                        {
                            bankList?.map((bank, index) => (
                                <option value={bank["bankCode"]}>{bank["bankName"]}</option>
                            ))
                        }
                        
                    </Select>
                    : <Spinner color='success' />
                    }
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
                    <Button type='submit' className='bg-c-lightgreen' disabled={!buttonDisabled}>Send</Button>
                </div>
            </form> 
        </div>
    </CustomModal>
  )
}

export default SendToExternalAccountModal