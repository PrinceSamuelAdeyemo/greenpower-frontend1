import { Card, Progress, Table } from 'flowbite-react';
import React from 'react';
import { BiRefresh } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


import cart from '../assets/cart.png';
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import dashImage from '../assets/dash-image.png';

const AdminDashboard = (props) => {
    var user_type = props.user_type

    return (
        
        <div>
            <div className='px-4 pb-2'>
                <p className='font-bold text-gray-400 text-3xl'>Dashboard</p>
            </div>
            <div className="flex flex-col md:flex-row md:gap-1 lg:gap-4 xl:gap-5 lg:px-4 mb-3">
                <div className="md:w-2/3 space-y-5 bg-white py-6 border-1 shadow-xl">
                    <div className=' space-y-5 '>
                        <div className='flex justify-center w-full'>
                            <div className="flex flex-col gap-4 shadow-xl bg-c-muchlightgreen w-[95%] rounded-2xl lg:pt-4 lg:p-4 xl:pt-4 xl:px-5 text-white">
                                <div className="flex gap-3 items-center">
                                    <div className="h-14 w-6 rounded bg-c-lightgreen"></div>
                                    <p className='font-bold text-c-gray opacity-95 text-xl'>Overview</p>
                                </div>
                                    
                                <div className='flex gap-4'>
                                    <div className='w-full bg-white rounded gap-1 px-2 py-2'>
                                        <div className='flex justify-between'>
                                            <FaEye color='green' />
                                            <p className='text-black'>Users</p>
                                            <p className='text-red-500'>35.8</p>
                                        </div>
                                        <div>
                                            <p className='font-bold text-4xl text-c-gray text-center'>1024</p>
                                        </div>
                                    </div>
                                    <div className='w-full bg-white rounded gap-1 px-2 py-2'>
                                        <div className='flex justify-between'>
                                            <FaEye color='green' />
                                            <p className='text-black'>Income</p>
                                            <p className='text-red-500'>35.8</p>
                                        </div>
                                        <div>
                                            <p className='font-bold text-4xl text-c-gray text-center'>256k</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <div className='w-full p-3'>
                                <p className="font-bold">User Weighted Points</p>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <Table>
                                    <Table.Head className='border-red-500'>
                                        <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Userr</Table.HeadCell>
                                        <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>No. of Sales</Table.HeadCell>
                                        <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Accumulated WP</Table.HeadCell>
                                        <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Commission Due</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell className='font-semibold'>Ayoola Tolu</Table.Cell>
                                            <Table.Cell className='font-semibold'>Excellent 3D chair</Table.Cell>
                                            <Table.Cell className='font-semibold'>18</Table.Cell>
                                            <Table.Cell className='font-semibold'>#32,000</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/3 space-y-5">
                    <Card>
                        <div className="flex gap-3 items-center">
                            <div className="h-14 w-6 rounded bg-c-lightgreen"></div>
                            <p className='font-bold text-c-gray opacity-95 text-xl'>Popular Product</p>
                        </div>
                        <div className="overflow-x-auto">
                            <Table className='overflow-x-hidden '>
                                <Table.Head className='w-full'>
                                    <Table.HeadCell className='bg-white border-c-lightgreen border-b-2 w-1/3 text-[80%] xl:text-[100%]'>Product</Table.HeadCell>
                                    <Table.HeadCell className='bg-white border-c-lightgreen border-b-2 w-1/3 text-[80%] xl:text-[100%]'>Quantity</Table.HeadCell>
                                    <Table.HeadCell className='bg-white border-c-lightgreen border-b-2 w-1/3 text-[80%] xl:text-[100%]'>Prices</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className=''>
                                    <Table.Row className=''>
                                        <Table.Cell>
                                            <div className="flex gap-2 items-center text-[80%] xl:text-[100%]">
                                                <img src={product1} alt="product1" className="w-10 h-10" />
                                                <p className='font-semibold text-c-gray'>Boston 3D Illustration</p>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className='font-semibold text-c-gray text-[80%] xl:text-[100%]'>25 pieces</Table.Cell>
                                        <Table.Cell className='font-semibold text-c-gray text-[80%] xl:text-[100%]'>#14600</Table.Cell>
                                    </Table.Row>
                                    <Table.Row className=''>
                                        <Table.Cell>
                                            <div className="flex gap-2 items-center w-[90%] text-[80%] xl:text-[100%]">
                                                <img src={product2} alt="product2" className="w-10 h-10" />
                                                <p className='font-semibold text-c-gray'>Cyper-Nft Ui Kit</p>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className='font-semibold text-c-gray text-[80%] xl:text-[100%]'>10 pieces</Table.Cell>
                                        <Table.Cell className='font-semibold text-c-gray text-[80%] xl:text-[100%]'>#12500</Table.Cell>
                                    </Table.Row>
                                    <Table.Row className=''>
                                        <Table.Cell>
                                            <div className="flex gap-2 items-center w-[90%] text-[80%] xl:text-[100%]">
                                                <img src={product3} alt="product3" className="w-10 h-10" />
                                                <p className='font-semibold text-c-gray'>Travelling UI Kit</p>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className='font-semibold text-c-gray text-[80%] xl:text-[100%]'>15 pieces</Table.Cell>
                                        <Table.Cell className='font-semibold text-c-gray text-[80%] xl:text-[100%]'>#25300</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </div>
                        <div className='flex justify-center w-full '>
                            <button className='border-2 border-c-lightgreen rounded-lg px-2 font-semibold text-center text-c-lightgreen'>All products</button>
                        </div>
                    </Card>
                </div>
            </div>

            <div className=' shadow-xl border-2'>
                <div className='w-full p-3'>
                    <p className="font-bold">Sales Record History</p>
                </div>
                
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head className='border-red-500'>
                            <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Sender</Table.HeadCell>
                            <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Product</Table.HeadCell>
                            <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Quantity</Table.HeadCell>
                            <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Price</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell className='font-semibold'>Ayoola Tolu</Table.Cell>
                                <Table.Cell className='font-semibold'>Excellent 3D chair</Table.Cell>
                                <Table.Cell className='font-semibold'>18</Table.Cell>
                                <Table.Cell className='font-semibold'>#32,000</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>

        </div>
        
    );
}

export default AdminDashboard;
