import { Modal } from 'flowbite-react'
import React from 'react'

const SalesRecordModal = ({showModal, setShowModal}) => {
  return (
    <Modal show={showModal} onClose={()=>{setShowModal(false)}}>
        <p>Sale Record View</p>
        <Modal.Body>
            <div>
                
            </div>
        </Modal.Body>
    </Modal>
  )
}

export default SalesRecordModal