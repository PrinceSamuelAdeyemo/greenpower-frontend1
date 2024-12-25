import React, { useEffect, useRef, useState } from 'react'
import CustomModal2 from './CustomModal2'
import SuccessfulHubModal from './SuccessfulHubModal'
import ErrorModal from './ErrorModal'
import { TextInput } from 'flowbite-react'


const AddHubModal = ({showModal, openModal, closeModal, createHub, hubName, setHubname, showModal2, openModal2, closeModal2, errorMessage }) => {
    var inputRef = useRef()
    const [button_state, setButton_state] = useState(true)
    
    var handleHubInput = () => {
        setHubname(inputRef.current.value)
        Number(hubName) !==0 ? setButton_state(false) : setButton_state(true)
    }

    useEffect(() => {
        console.log("Show modal again here", showModal)
        Number(hubName) !==0 ? setButton_state(false) : setButton_state(true)
    }, [hubName, closeModal])

  return (
    
    <CustomModal2 
    dismissible
    showModal={showModal}
    openModal={openModal}
    closeModal={closeModal}>
        <div className='flex flex-col gap-4 w-[80%] h-72'>
            <p className='font-semibold text-c-lightgreen text-center'>Add Hub</p>
            <div className='flex flex-col gap-2 w-full'>
                <TextInput className='font-semibold' onChange={handleHubInput} ref={inputRef} />
                <button className='text-c-lightgreen text-start'>Click to add more +</button>
            </div>
            <button className={`h-10 rounded ${(Number(hubName) !==0 ) ?  'text-white bg-c-lightgreen font-semibold': 'text-c-lightgreen bg-gray-300' }`} disabled={button_state} onClick={createHub}>Save</button>
            <button className='text-center text-c-lightgreen font-semibold' onClick={closeModal}>Close</button>
        </div>
        {/* {show_modal2 && <SuccessfulHubModal showModal={showModal2} openModal={openModal2} closeModal2={closeModal2} />}
        {!errorModal && <ErrorModal showModal2={showModal2} openModal2={() => setShowModal2(true)} closeModal2={() => setShowModal2(false)} message={errorMessage} />}
 */}
    </CustomModal2>
  )
}

export default AddHubModal