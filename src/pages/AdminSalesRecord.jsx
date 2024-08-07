import { Button, Card, Dropdown, Table, Select } from 'flowbite-react';
import React, {  useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AddSalesModal from '../components/AddSalesModal';
import { FaDownload } from "react-icons/fa"

import hubs_api from '../utils/hubs_api';

"use client"


const AdminSalesRecord = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [showModal, setShowModal] = useState(false)
    const [hub_details, setHub_details] = useState()

    var { "data": hub_data} = location.state || {}
    var { "hub_token": hub_token, "hub_name": hub_name} = hub_data
    //var { hubName } = useParams()

    var getHubByToken = (hub_token) => {
        try{
            hubs_api.post("/getHubById.php", {
            "hubToken": hub_token
            })
            .then((response) => {
                if (response.data["data"]){
                    console.log(response.data["data"])
                    setHub_details(response.data["data"])
                }
            })
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        console.log("EEEEEEEEE")
        getHubByToken(hub_token);
    }, [hubs_api])

    return (
        <div className='p-4'>
            <div>
                <p className='text-3xl font-bold text-gray-700'>Products</p>
            </div>
            <div className='flex justify-center items-center my-4'>
                <p className='text-xl text-center text-white bg-c-lightgreen px-12 py-1 rounded'>{hub_name}</p>
            </div>
            
            <div className='flex items-center'>
                <div className='flex lg:gap-3'>
                    <div className='w-3 h-10 bg-c-lightgreen rounded-md'></div>
                    <div className='flex items-center justify-center'><p className='text-gray-600 text-xl font-medium'>Product List</p></div>
                </div>
                <div className='flex ml-auto gap-3'>
                    <Button className='text-c-lightgreen' outline color="green" onClick={()=>setShowModal(true)}>Filter</Button>
                    {showModal && <AddSalesModal showModal={showModal} openModal={()=>setShowModal(true)} closeModal={()=>setShowModal(false)}/>}
                    <Button className='bg-c-lightgreen text-white' onClick={()=>navigate('/admin_addproducts')}><FaDownload className='mr-2' />Add Product</Button>
                </div>
            </div>
            
            <div className='p-4'>
            <Card className='mt-4'>
                <p className='font-bold text-xl'>Products</p>
                <div className='overflow-x-auto'>
                    
                    <Table className='w-full'>
                        <Table.Head className='normal-case border-y-2 border-c-lightgreen font-bold text-lg text-c-gray opacity-70'>
                            <Table.HeadCell className='bg-white'>S/N</Table.HeadCell>
                            <Table.HeadCell className='bg-white px-0'>Product Images</Table.HeadCell>
                            <Table.HeadCell className='bg-white'>Product name</Table.HeadCell>
                            <Table.HeadCell className='bg-white'>Serial Number</Table.HeadCell>
                            <Table.HeadCell className='bg-white'>Product Price</Table.HeadCell>
                            <Table.HeadCell className='bg-white'>Action</Table.HeadCell>
                        </Table.Head>
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
                                <Table.Cell className='flex justify-center'>
                                    <Button outline className='text-c-lightgreen'>Update</Button>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className='border-b-2 border-c-lightgreen'>
                                <Table.Cell>APOLLO</Table.Cell>
                                <Table.Cell>Outright</Table.Cell>
                                <Table.Cell>
                                    <div className='border flex items-center justify-center bg-c-lightgreen rounded text-white'>Paid
                                    </div>
                                </Table.Cell>
                                <Table.Cell className='text-center'>AZXHE636672GE82</Table.Cell>
                                <Table.Cell className='text-center'>N32,800</Table.Cell>
                                <Table.Cell className='flex justify-center'>
                                    <Button outline className='border border-c-lightgreen text-c-lightgreen'>View</Button>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className='border-b-2 border-c-lightgreen'>
                                <Table.Cell>MBOX</Table.Cell>
                                <Table.Cell>Outright</Table.Cell>
                                <Table.Cell>
                                    <div className='border flex items-center justify-center bg-c-lightgreen rounded text-white'>Paid
                                    </div>
                                </Table.Cell>
                                <Table.Cell className='text-center'>AZXHE636672GE82</Table.Cell>
                                <Table.Cell className='text-center'>N32,800</Table.Cell>
                                <Table.Cell className='flex justify-center'>
                                    <Button outline className='text-c-lightgreen'>Update</Button>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className='border-b-2 border-c-lightgreen'>
                                <Table.Cell>Yellow Box+</Table.Cell>
                                <Table.Cell>Outright</Table.Cell>
                                <Table.Cell>
                                    <div className='border flex items-center justify-center bg-c-lightgreen rounded text-white'>Paid
                                    </div>
                                </Table.Cell>
                                <Table.Cell className='text-center'>AZXHE636672GE82</Table.Cell>
                                <Table.Cell className='text-center'>N32,800</Table.Cell>
                                <Table.Cell className='flex justify-center'>
                                    <Button outline className='text-c-lightgreen'>Update</Button>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className='border-b-2 border-c-lightgreen'>
                                <Table.Cell>APOLLO</Table.Cell>
                                <Table.Cell>Outright</Table.Cell>
                                <Table.Cell>
                                    <div className='border flex items-center justify-center bg-c-lightgreen rounded text-white'>Paid
                                    </div>
                                </Table.Cell>
                                <Table.Cell className='text-center'>AZXHE636672GE82</Table.Cell>
                                <Table.Cell className='text-center'>N32,800</Table.Cell>
                                <Table.Cell className='flex justify-center'>
                                    <Button outline className='text-c-lightgreen'>Update</Button>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className='border-b-2 border-c-lightgreen'>
                                <Table.Cell>Yellow Box</Table.Cell>
                                <Table.Cell>Recurrent</Table.Cell>
                                <Table.Cell>
                                    <div className='border flex items-center justify-center bg-c-lightgreen rounded text-white'>Paid
                                    </div>
                                </Table.Cell>
                                <Table.Cell className='text-center'>AZXHE636672GE82</Table.Cell>
                                <Table.Cell className='text-center'>N32,800</Table.Cell>
                                <Table.Cell className='flex justify-center'>
                                    <Button outline className='text-c-lightgreen'>Update</Button>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className='border-b-2 border-c-lightgreen'>
                                <Table.Cell>Yellow Box</Table.Cell>
                                <Table.Cell>Recurrent</Table.Cell>
                                <Table.Cell>
                                    <div className='border flex items-center justify-center bg-blue-100 rounded'>Pending
                                    </div>
                                </Table.Cell>
                                <Table.Cell className='text-center'>AZXHE636672GE82</Table.Cell>
                                <Table.Cell className='text-center'>N32,800</Table.Cell>
                                <Table.Cell className='flex justify-center'>
                                    <Button outline className='text-c-lightgreen'>Update</Button>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </Card>
            </div>
        </div>
    );
}

export default AdminSalesRecord;
