import React, { useState } from 'react';
import { Button, Label, Select } from 'flowbite-react';
import { FaTimes } from "react-icons/fa"
import CustomModal from './CustomModal';
import addSalesImage from '../assets/addsalesImage.png';
import UploadComplete from './UploadComplete';

const AddSalesModal = ({ showModal, openModal, closeModal }) => {
    const [showModal2, setShowModal2] = useState(false)
    const handleClick =() =>{
        closeModal()
        setShowModal2(true)
    }
    const closeMenu = () =>{
        closeModal()
    }
    return (
        <CustomModal 
            showModal={showModal} 
            openModal={openModal} 
            closeModal={closeModal}
            title="Add Sales"
         >
            <img src={addSalesImage} alt="Add Sales" />


            <div className='w-full my-3 px-4'>
                <div className='my-3'>
                    <Label value='Select Hub' htmlFor='hub' />
                    <Select id='hub' className='flex-grow'>
                        <option className='bg-c-lightgreen'></option>
                    </Select>
                </div>
                <div className=' my-3'>
                    <Label value='Select Product' htmlFor='product' />
                    <Select id='product' className='flex-grow'>
                        <option></option>
                    </Select>
                </div>
                <div className='my-3'>
                    <Label value='Serial Number' htmlFor='serialNumber' />
                    <Select id='serialNumber' className='flex-grow'>
                        <option></option>
                    </Select>
                </div>
                <div className='my-3'>
                    <Label value='Select Payment Option' htmlFor='paymentOption' />
                    <Select id='paymentOption' className='flex-grow'>
                        <option></option>
                    </Select>
                </div>
                <div className='my-3'>
                    <Button className='w-full bg-c-lightgreen' onClick={handleClick}>Submit</Button>
                    {showModal2 && <UploadComplete showModal={showModal2} openModal={()=>setShowModal2(true)} closeModal={()=>setShowModal2(false)}/>}
                </div>
            </div>
        </CustomModal>
    );
}

export default AddSalesModal;
