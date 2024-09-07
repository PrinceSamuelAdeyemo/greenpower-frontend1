import React from 'react'
import { Modal } from 'flowbite-react'

const CustomModal3 = ({ showModal, openModal, closeModal, children }) => {
  return (
    <Modal dismissible show={showModal} onClose={closeModal}>
        <div className='flex flex-col'>
            { children }
        </div>
    </Modal>
  )
}

export default CustomModal3