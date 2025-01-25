import { Modal, Button } from 'flowbite-react'
import React, { useState, useEffect } from 'react'
import sales_api from '../utils/sales_api'
import installments_api from '../utils/installments_api'


const SalesRecordModal = ({currentSalesToken, showModal, setShowModal}) => {
  //const [ showModal, setShowModal ] = useState(false)
  const [currentSale, setCurrentSale] = useState({})
  const [currentInstallment, setCurrentInstallment] = useState({})
  const [approvalStatus, setApprovalStatus] = useState("")
  
  const getUserSale = (currentSalesToken) => {
    sales_api.post("/getSalesById.php", {
      "salesToken": currentSalesToken
    })
    .then((response) => {
      console.log(response)
      if (response.data["status_code"] === 200){
        setCurrentSale(response.data["data"])
        if (response.data["data"]["payment_status"] === "ongoing") {
          //setApprovalStatus(response.data["data"]["approval_status"])
          getUserinstallmentSale(currentSalesToken);
        }
        }
        else{
          getUserinstallmentSale(currentSalesToken);
          console.log("Error")
        }
    })
  }

  const getUserinstallmentSale = (currentSalesToken) => {
    installments_api.post("/getPaymentsBySales.php", {
      "salesToken": currentSalesToken
    })
    .then((response) => {
      console.log("SUUUUUUUUUDDDDDDDDD",response.data["data"]);
      if (response.data["status_code"] === 200){
        setCurrentInstallment(response.data["data"])
        
      }
        else{
          console.log("Error")
        }
    })
  }

  const approveSale = (currentSalesToken) => {
    installments_api.post("/approvePayment.php", {
      "salesToken": currentSalesToken,
      "installmentToken": currentInstallment[0]["installmentToken"]
    })
    .then((response) => {
      console.log(response)
    })
  }

  const declineSale = (currentSalesToken) => {
    installments_api.post("/declinePayment.php", {
      "salesToken": currentSalesToken,
      "installmentToken": currentInstallment[0]["installmentToken"]
    })
    .then((response) => {
      console.log(response)
    })
  }

  useEffect(() => {
    getUserSale(currentSalesToken);
    //getUserinstallmentSale(currentSalesToken);
  }, [])

  return (
    <Modal show={showModal} dismissible onClose={()=>{setShowModal(false)}} className='h-[80vh]'>
        <p className='text-center text-3xl justify-center items-center h-10 mt-4'>User Sales Record</p>
        <Modal.Body>
            <div className='flex flex-col items-center gap-8'>
                <div className='flex flex-col gap-4 lg:w-[85%] '>
                  <div className='flex gap-2'>
                    <p>Full Name: </p>
                    <p className='font-semibold text-c-lightgreen'>{currentSale[""]}</p>
                  </div>
                  <div className='flex gap-2'>
                    <p>Product Name: </p>
                    <p className='font-semibold text-c-lightgreen'>{currentSale["pdtName"]}</p>
                  </div>
                  <div className='flex gap-2'>
                    <p>Payment Plans: </p>
                    
                      <p className='font-semibold text-c-lightgreen'>{currentSale["payment_type"] === "outright" ? "Outright" : "Installment"}</p>
                  </div>
                  <div className='flex gap-2'>
                    <p>{currentSale["payment_type"] === "outright" ? "Amount paid:  " : "Down Payment:  "}</p>
                    <p className='font-semibold text-c-lightgreen'>{currentSale["payment_type"] === "outright" ? `${currentSale["amountPaid"]}` : `${currentSale["downPayment"]}`}</p>
                  </div>
                  {currentSale["payment_type"] === "outright" ? "" :  <div className='flex gap-2'>
                    <p>Monthly Payment: </p>
                    <p className='font-semibold text-c-lightgreen'></p>
                  </div>}
                  
                  <div className='flex gap-2'>
                    <p>{currentSale["payment_type"] === "outright" ? "Commission (Outright Payment)" : "Commission (Down Payment)"}</p>
                    <p className='font-semibold text-c-lightgreen'>{currentSale["payment_type"] === "outright" ? currentSale["commissionEarned"] : `${currentSale["commission_on_down_payment"]}`}</p>
                  </div>
                  <div className='flex gap-2'>
                    <p>Logistic Fee: </p>
                    <p className='font-semibold text-c-lightgreen'>{currentSale["logisticsFees"]}</p>
                  </div>
                </div>

                { (currentSale["approval_status"] == "pending") && 
                  <div className='flex justify-center w-full gap-20'>
                    <button className='bg-c-lightgreen text-white px-5 h-10 rounded' onClick={() => approveSale(currentSalesToken)}>Approve</button>
                    <button className='text-red-600 h-10 rounded font-bold' onClick={() => declineSale(currentSalesToken)}>Decline</button>
                </div>
                  }

                { (currentSale["approval_status"] == "declined") && 
                  <div className='flex justify-center w-full'>
                    <p className='text-red-600 font-bold'>Declined</p>
                </div>
                  }
                
            </div>
        </Modal.Body>
    </Modal>
  )
}

export default SalesRecordModal