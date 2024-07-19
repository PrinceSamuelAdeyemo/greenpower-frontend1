import { Button, Card, Table } from 'flowbite-react';
import React from 'react';
import image from '../assets/dashImage2.png';
import { BiRefresh } from 'react-icons/bi';
import { FaEyeSlash, FaPaperPlane, FaWallet } from 'react-icons/fa';

const Wallet = () => {
    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className='flex flex-col md:flex-row mb-4'>
                <div className='flex flex-col md:flex-row bg-c-lightgreen md:w-2/3 rounded-2xl md:mb-0 md:mr-4 shadow-xl pt-4 lg:px-2 xl:px-5 text-white'>
                    <div className='text-white lg:p-2 xl:p-4 flex-grow'>
                        <div className='absolute'>
                            <p className='font-bold text-xl w-full'>Welcome, Afolabi Seunfunmi Ayomide</p>
                        </div>
                        <div className="mt-16 mb-4">
                            <p className="text-sm">Bank Name</p>
                            <p className="text-lg font-bold">Reni Trust</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm">Account Name</p>
                            <p className="text-lg font-bold">John Doe</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm">Account Number</p>
                            <p className="text-lg font-bold">0234567899</p>
                        </div>
                    </div>
                    <img src={image} alt="Dashboard" className="rounded-b md:rounded-none md:rounded-r" />
                </div>
                <Card className="w-1/3">
                    <div className='flex flex-col justify-center items-center'>
                        <p className='mb-4 text-2xl font-bold text-c-gray opacity-90'>Account Balance</p>
                        <div className='flex text-3xl items-center lg:gap-2 xl:gap-4 mb-4'>
                            <BiRefresh/> 
                            <p className='lg:text-xl xl:text-4xl font-bold text-c-lightgreen'>#150946.55</p> 
                            <FaEyeSlash/>
                        </div>
                        <p className='mb-3 text-md text-c-gray opacity-90 font-bold'>January 24, 2024   12.45pm</p>
                        <div className='lg:px-60 flex justify-center'>
                            <Card className='lg:w-[80%] xl:w-full flex justify-center items-center'>
                                <div className='flex lg:px-2 xl:px-4 lg:py-0 lg:gap-1 xl:gap-3'>
                                <Button className='bg-c-lightgreen w-1/2'>
                                    <div className='flex flex-col justify-center items-center'>
                                        <FaPaperPlane className='mb-1'/>
                                        <p>Send</p>
                                    </div>
                                </Button>
                                <Button className='bg-c-lightgreen w-1/2'>
                                    <div className='flex flex-col justify-center items-center'>
                                        <FaWallet className='mb-1'/>
                                        <p>Deposit</p>
                                    </div>
                                </Button>
                                </div>
                            </Card>
                        </div>
                        
                    </div>
                </Card>
            </div>
            <Card>
                <p className="font-bold mb-2">Transactions</p>
                <div className="overflow-x-auto">
                    <Table className="min-w-full">
                        <Table.Head className='normal-case border-y-2 border-c-lightgreen'>
                            <Table.HeadCell>Recipient</Table.HeadCell>
                            <Table.HeadCell>Type</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Date</Table.HeadCell>
                            <Table.HeadCell>Amount</Table.HeadCell>
                            <Table.HeadCell></Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {/* Example rows */}
                            <Table.Row className='border-b-2 border-c-lightgreen'>
                                <Table.Cell>John Smith</Table.Cell>
                                <Table.Cell>Transfer</Table.Cell>
                                <Table.Cell className='flex items-center'><p className='bg-c-pendingblue text-c-pendingyellow text-center rounded-lg w-20 h-6 font-bold opacity-90'>Pending</p></Table.Cell>
                                <Table.Cell>01/24/2024</Table.Cell>
                                <Table.Cell>$500</Table.Cell>
                                <Table.Cell><button className='text-c-lightgreen border-2 border-c-lightgreen lg:w-full xl:w-1/2 py-1 rounded-xl font-semibold'>Details</button></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jane Doe</Table.Cell>
                                <Table.Cell>Deposit</Table.Cell>
                                <Table.Cell className='flex items-center'><p className='text-white bg-c-lightgreen text-center rounded-lg w-20 h-6 font-bold opacity-90'>Done</p></Table.Cell>
                                <Table.Cell>01/23/2024</Table.Cell>
                                <Table.Cell>$150</Table.Cell>
                                <Table.Cell><button className='text-c-lightgreen border-2 border-c-lightgreen lg:w-full xl:w-1/2 py-1 rounded-xl font-semibold'>Details</button></Table.Cell>
                            </Table.Row>
                            {/* Add more rows as needed */}
                        </Table.Body>
                    </Table>
                </div>
            </Card>
        </div>
    );
}

export default Wallet;
