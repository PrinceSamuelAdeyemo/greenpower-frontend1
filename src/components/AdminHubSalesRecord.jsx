import React, { useEffect, useState } from 'react'
import { Button, Card, Table } from "flowbite-react"

import { FaAngleDown, FaAngleUp } from "react-icons/fa"

import sales_api from '../utils/sales_api'

const AdminHubSalesRecord = ({ hub }) => {
    const [salesRecordExist, setSalesRecordExist] = useState(false)
    const [showSalesRecord, setShowSalesRecord] = useState(false)
    const [toggleSalesCard, setToggleSalesCard] = useState(false)
    const [eachHubSales, setEachHubSales] = useState([])

    var month_map = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "Aug",
        "09": "Sept",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec"
    }


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
                console.log(response.data["data"])
                var response_data = response.data["data"]
                setEachHubSales(response_data)
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
    }, [sales_api])
    

  return (
    <div>
        <div className='flex items-center justify-center pt-4'>
            <Button onClick={toggleHubDropdown} className='bg-c-lightgreen text-white font-semibold rounded-2xl py-1'>{hub["hubName"]} {toggleSalesCard ? <FaAngleUp className='ms-4 w-4 h-5' />: <FaAngleDown className='ms-4 w-4 h-5' />} </Button>
        </div>
        
        <Card className='mt-4'>
        <p className=''>Sales Record</p>
        <div className='overflow-x-auto'>
            <Table className='w-full lg:table-fixed'>
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
                <Table.Body className={`font-semibold ${showSalesRecord ? '' : 'hidden'} `}>
                    {
                        eachHubSales?.map((eachHubSale, index) => (
                            <Table.Row className='border-b-2 border-c-lightgreen'>
                                <Table.Cell className=''>Product Img</Table.Cell>
                                <Table.Cell>Recurrent</Table.Cell>
                                <Table.Cell className=''>
                                    <div className='border flex items-center justify-center bg-blue-100 rounded'>Pending
                                    </div>
                                </Table.Cell>
                                <Table.Cell className='w-full text-center'>{eachHubSale["pdtSerialNumber"]}</Table.Cell>
                                <Table.Cell className='w-full text-center'>N32,800</Table.Cell>
                                <Table.Cell className='w-full text-center'>{`${month_map[eachHubSale["created_at"].split(" ")[0].split("-")[1]]} ${eachHubSale["created_at"].split(" ")[0].split("-")[2]}, ${eachHubSale["created_at"].split(" ")[0].split("-")[0]}`}</Table.Cell>
                                <Table.Cell className='w-full flex justify-center'>
                                    <Button outline className='text-c-lightgreen'>View</Button>
                                </Table.Cell>
                            </Table.Row>
                            
                        ))
                    }
                
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