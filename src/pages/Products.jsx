import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa"

import AddHubModal from '../components/AddHubModal';
import HubDisplay from '../components/HubDisplay';

const Products = () => {
    const [showModal, setShowModal] = useState(false);

    const [notdata_available, setNotdata_available] = useState(false)
    var addToHub = () => {
        setShowModal(true)
    }

  return (
    <div className=''>
        <div>
            <p className='font-bold text-2xl text-gray-500 ps-8'>Select Hub</p>
        </div>
        <div className='flex-grow h-full absolute left-0 right-0 bottom-10 bg-inherit flex justify-center items-center' >
        {notdata_available && 
            <div className='w-40 h-40 border-3 border-c-lightgreen rounded-full flex justify-center items-center' onClick={addToHub} >
                <FaPlus size="40" title='A plus sign' color='#388F36' />
            </div>}
            {showModal && <AddHubModal showModal={showModal} openModal={() => setShowModal(true)} closeModal={() => setShowModal(false)} />}
        </div>

        <div className='flex gap-4 flex-wrap mt-10 px-2'>
            <HubDisplay hubname="Abuja Hub" />
            <HubDisplay hubname="Southwest Hub" />
            
            <div className='flex justify-center items-center text-white w-[14rem] h-[8rem] rounded-xl relative'>
                <div className='w-[7rem] h-[7rem] border-3 border-c-lightgreen rounded-full flex justify-center items-center' onClick={addToHub} >
                    <FaPlus size="40" title='A plus sign' color='#388F36' />
                </div>
            </div>
            
            
        </div>

        
        
    </div>
  )
}

export default Products