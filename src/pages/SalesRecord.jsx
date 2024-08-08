import { Button, Card, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddSalesModal from '../components/AddSalesModal';

import sales_api from '../utils/sales_api';

const SalesRecord = (props) => {
    var cookieDetails = props.myCookie
    var userToken = cookieDetails["userToken"]
    var admin_status = cookieDetails["admin_status"]

    const navigate = useNavigate()
    const [salesRecordExist, setSalesRecordExist] = useState(false)
    const [showModal, setShowModal] = useState(false)


    // For Users
    var getUserSalesHistory = () => {
        sales_api.post("/getSalesByUser.php", {
            "userToken": userToken
        })
        .then((response) => {
            if (response.data["message"] == "Sales record does not exist"){
                setSalesRecordExist(false)
            }
            else{
                setSalesRecordExist(true)
            }
            
        })
    }

    useEffect(() => {
        console.log("EEE")
        if (admin_status == 1){
        }
        else{
            getUserSalesHistory()
        }
        
    })

    return (
        <div className='p-4'>
            <div className='flex items-center'>
                <p className='text-xl font-bold'>Sales</p>
                <div className='flex ml-auto gap-3'>
                    <Button className='text-c-lightgreen' outline color="green" onClick={()=>setShowModal(true)}>All Sales</Button>
                    {showModal && <AddSalesModal showModal={showModal} openModal={()=>setShowModal(true)} closeModal={()=>setShowModal(false)} cookieDetails={cookieDetails} />}
                    <Button className='bg-c-lightgreen text-white' onClick={()=>navigate('/sales/user/wp')}>View overall WP</Button>
                </div>
            </div>
            <Card className='mt-4'>
                <p className=''>Sales History</p>
                <div className='overflow-x-auto'>
                    <Table className='w-full'>
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
                        <Table.Body className='font-semibold'>
                        <Table.Row className='border-b-2 border-c-lightgreen'>
                            <Table.Cell>Yellow Box</Table.Cell>
                            <Table.Cell>Recurrent</Table.Cell>
                            <Table.Cell className=''>
                                <div className='border flex items-center justify-center bg-blue-100 rounded'>Pending
                                </div>
                            </Table.Cell>
                            <Table.Cell className='text-center'>AZXHE636672GE82</Table.Cell>
                            <Table.Cell className='text-center'>N32,800</Table.Cell>
                            <Table.Cell className='text-center'>Jan 2, 2024</Table.Cell>
                            <Table.Cell className='flex justify-center'>
                                <Button outline className='text-c-lightgreen'>Update</Button>
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
    );
}

export default SalesRecord;
