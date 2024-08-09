import React, { useEffect, useState } from 'react'
import { Button, Card, Table } from "flowbite-react"

import { FaAngleDown, FaAngleUp } from "react-icons/fa"

import sales_api from '../utils/sales_api'

const AdminHubSalesRecord = ({ hub }) => {
    const [salesRecordExist, setSalesRecordExist] = useState(false)
    const [showSalesRecord, setShowSalesRecord] = useState(false)
    const [toggleSalesCard, setToggleSalesCard] = useState(false)

    var toggleHubDropdown = () => {
        setToggleSalesCard(!toggleSalesCard)
        setShowSalesRecord(!showSalesRecord)
    }

    var getSpecificHub = () => {
        try{
            console.log("About to send ", hub["hubToken"])
            sales_api.post("/getSalesByHub.php", {
            "hubToken": hub["hubToken"]
        })
        .then((response) => {
            console.log(response.data["status_code"])
            if (response.data["status_code"] == 200){
                setSalesRecordExist(true)
            }
            else{
                setSalesRecordExist(false)
            }
        })
        }catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getSpecificHub()
    })
    

  return (
    <div>
        <div className='flex items-center justify-center pt-4'>
            <Button onClick={toggleHubDropdown} className='bg-c-lightgreen text-white font-semibold rounded-2xl py-1'>{hub["hubName"]} {toggleSalesCard ? <FaAngleUp className='ms-4 w-4 h-5' />: <FaAngleDown className='ms-4 w-4 h-5' />} </Button>
        </div>
        
        <Card className='mt-4'>
        <p className=''>Sales Record</p>
        <div className='overflow-x-auto'>
            <Table className='w-full table-fixed'>
                <Table.Head className='normal-case border-y-2 border-c-lightgreen font-bold text-lg text-c-gray opacity-70'>
                    <Table.HeadCell className='bg-white'>Product</Table.HeadCell>
                    <Table.HeadCell className='bg-white'>Payment Types</Table.HeadCell>
                    <Table.HeadCell className='bg-white text-center'>Status</Table.HeadCell>
                    <Table.HeadCell className='bg-white text-center'>Serial Number</Table.HeadCell>
                    <Table.HeadCell className='bg-white text-center'>Prices</Table.HeadCell>
                    <Table.HeadCell className='bg-white text-center'>Date</Table.HeadCell>
                    <Table.HeadCell className='bg-white text-center'>Action</Table.HeadCell>
                </Table.Head>
                {salesRecordExist ?
                <Table.Body className={`font-semibold ${showSalesRecord ? 'block' : 'hidden'} `}>
                <Table.Row className='border-b-2 border-c-lightgreen'>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>Recurrent</Table.Cell>
                    <Table.Cell className=''>
                        <div className='border flex items-center justify-center bg-blue-100 rounded'>Pending
                        </div>
                    </Table.Cell>
                    <Table.Cell className='text-center'>AZXHE636672GE82</Table.Cell>
                    <Table.Cell className='text-center'>N32,800</Table.Cell>
                    <Table.Cell className='text-center'>Jan 2, 2024</Table.Cell>
                    <Table.Cell className='flex justify-center'>
                        <Button outline className='text-c-lightgreen'>View</Button>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
            :
            <></>
            }
            </Table>
        </div>
        {
            !salesRecordExist ?
            <p className='text-center font-bold w-full text-red-700'>Sales history not available</p>
            :
            <></>
        }
        </Card>
    </div>
  )
}

export default AdminHubSalesRecord