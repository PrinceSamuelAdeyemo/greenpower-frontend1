import React, { useState } from 'react';
import { Button, Modal, ModalBody } from 'flowbite-react';
import { FaTimes } from "react-icons/fa"


const CustomModal = ({ showModal, openModal, closeModal, title, children, dismissibleStatus }) => {
    //const [ showModal, setShowModal ] = useState(false)

    return (
        <Modal dismissible show={showModal} onClose={closeModal}>
             {/* <Modal.Header className='border-none flex justify-center items-center h-20 py-0 ps-0'> */}
             <div onClick={closeModal} className='flex justify-end'>
                <FaTimes className='mt-2 me-2 h-7 w-7' />
             </div>
             
                {/* <div className='w-[34rem] text-center'><p className='font-bold text-4xl my-3 text-c-gray '>{title}</p></div> */}
                {/* </Modal.Header> */}
            <Modal.Body>
                <div className='flex flex-col justify-center items-center py-10 w-full max-h-screen'>
               
                {children}
            </div>
            </Modal.Body>
            
        </Modal>
    );
}

export default CustomModal;
