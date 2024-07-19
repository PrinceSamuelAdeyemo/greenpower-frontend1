import React from 'react';
import { Modal } from 'flowbite-react';

const CustomModal2 = ({ showModal, openModal, closeModal, children }) => {
    return (
        <Modal dismissible show={showModal} onClick={openModal} onClose={closeModal}>
            <div className='flex flex-col justify-center items-center py-10 w-full max-h-screen'>
                {children}
            </div>
        </Modal>
    );
}

export default CustomModal2;
