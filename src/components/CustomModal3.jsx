import React from 'react'
import { Modal } from 'flowbite-react'

const CustomModal3 = ({ showModal, openModal, closeModal, children, dismissibleStatus, title, description }) => {
  return (
    <Modal dismissible={dismissibleStatus} show={showModal} onClose={closeModal}>
        <div>
          <p className='text-center text-c-lightgreen font-bold mt-4'>{ title }</p>
          <p className='text-center text-c-lightgreen'>{ description }</p>
        </div>

        <div className='flex flex-col'>
            { children }
        </div>
    </Modal>
  )
}

export default CustomModal3