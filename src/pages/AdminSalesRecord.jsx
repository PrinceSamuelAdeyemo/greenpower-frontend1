import { Button, Card, Dropdown, Table, Select } from 'flowbite-react';
import React, {  useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddSalesModal from '../components/AddSalesModal';
import { FaDownload } from "react-icons/fa"

"use client"


const AdminSalesRecord = () => {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    var { hubName } = useParams()

    return (
        <div className='p-4'>
            <div className='flex items-center'>
                <p className='text-3xl font-bold text-gray-500'>Sales Record</p>
                <div className='flex ml-auto gap-3'>
                    <Button className='text-c-lightgreen' outline color="green" onClick={()=>setShowModal(true)}>View User WP</Button>
                    {showModal && <AddSalesModal showModal={showModal} openModal={()=>setShowModal(true)} closeModal={()=>setShowModal(false)}/>}
                    <Button className='bg-c-lightgreen text-white' onClick={()=>navigate('/sales/user/wp')}><FaDownload className='mr-2' />Download Record</Button>
                </div>
            </div>
            <div className='p-4'>
            
            <Card className='mt-4'>
                <p className='font-bold text-xl'>Sales history</p>
                <div className='overflow-x-auto'>
                    <Table className='w-full'>
                        <Table.Head className='normal-case border-y-2 border-c-lightgreen font-bold text-lg text-c-gray opacity-70'>
                            <Table.HeadCell className='bg-white'>Product</Table.HeadCell>
                            <Table.HeadCell className='bg-white w-56'>Payment Types</Table.HeadCell>
                            <Table.HeadCell className='bg-white text-center'>Status</Table.HeadCell>
                            <Table.HeadCell className='bg-white text-center'>Serial Number</Table.HeadCell>
                            <Table.HeadCell className='bg-white text-center'>Prices</Table.HeadCell>
                            <Table.HeadCell className='bg-white text-center'>Date</Table.HeadCell>
                            <Table.HeadCell className='bg-white text-center'>Action</Table.HeadCell>
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
                                <Table.Cell className='text-center'>Jan 2, 2024</Table.Cell>
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
                                <Table.Cell className='text-center'>Jan 2, 2024</Table.Cell>
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
                                <Table.Cell className='text-center'>Jan 2, 2024</Table.Cell>
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
                                <Table.Cell className='text-center'>Jan 2, 2024</Table.Cell>
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
                                <Table.Cell className='text-center'>Jan 2, 2024</Table.Cell>
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
                                <Table.Cell className='text-center'>Jan 2, 2024</Table.Cell>
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
                                <Table.Cell className='text-center'>Jan 2, 2024</Table.Cell>
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
