import React from 'react';
import { Button, Modal, ModalBody } from 'flowbite-react';

const CustomModal = ({ showModal, openModal, closeModal, title, children }) => {
    return (
        <Modal dismissible show={showModal} onClick={openModal} onClose={closeModal}>
             <Modal.Header className='border-none flex justify-center items-center h-20 py-0 ps-0'>
                <div className='w-[34rem] text-center'><p className='font-bold text-4xl my-3 text-c-gray '>{title}</p></div>
                </Modal.Header>
            <Modal.Body>
                <div className='flex flex-col justify-center items-center py-10 w-full max-h-screen'>
               
                {children}
            </div>
            </Modal.Body>
            
        </Modal>
    );
}

export default CustomModal;
