import React, { useEffect, useRef, useState } from 'react'
import CustomModal2 from './CustomModal2'
import SuccessfulHubModal from './SuccessfulHubModal'
import { TextInput } from 'flowbite-react'

import hubs_api from '../utils/hubs_api';

const AddHubModal = ({showModal, openModal, closeModal }) => {
    const [hubname, setHubname] = useState("")
    var inputRef = useRef()
    const [button_state, setButton_state] = useState(true)
    const [show_modal2, setShowModal2] = useState(false)
    
    var handleHubInput = () => {
        setHubname(inputRef.current.value)
        Number(hubname) !==0 ? setButton_state(false) : setButton_state(true)
        console.log(Number(hubname))
    }

    var createHub = () => {
        setShowModal2(true)
        hubs_api.post("/createHub.php", {
            "userToken": "",
            "hubName": hubname.trim()
        })
    }

    useEffect(() => {
        Number(hubname) !==0 ? setButton_state(false) : setButton_state(true)
    }, [hubname])

  return (
    <CustomModal2 
    showModal={showModal}
    openModal={openModal}
    closeModal={closeModal}>
        <div className='flex flex-col gap-4 w-[80%] h-72'>
            <p className='font-semibold text-c-lightgreen text-center'>Add Hub</p>
            <div className='flex flex-col gap-2 w-full'>
                <TextInput className='font-semibold' onChange={handleHubInput} ref={inputRef} />
                <p className='text-c-lightgreen'>Click to add more +</p>
            </div>
            <button className={`h-10 rounded ${(Number(hubname) !==0 ) ?  'text-white bg-c-lightgreen font-semibold': 'text-c-lightgreen bg-gray-300' }`} disabled={button_state} onClick={createHub}>Save</button>
            <p className='text-center text-c-lightgreen font-semibold'>Close</p>
        </div>
        {show_modal2 && <SuccessfulHubModal showModal={show_modal2} openModal={() => setShowModal2(true)} closeModal={() => setShowModal2(false)} />}
    </CustomModal2>
  )
}

export default AddHubModal