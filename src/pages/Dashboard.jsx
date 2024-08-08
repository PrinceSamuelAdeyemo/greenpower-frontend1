import { Card, Progress, Table } from 'flowbite-react';
import React from 'react';
import { BiRefresh } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import cart from '../assets/cart.png';
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import dashImage from '../assets/dash-image.png';

const Dashboard = (props) => {
    var user_type = props.user_type
    var cookieDetails = props.myCookie

    return (
        
        <div>
            <div className='px-4 pb-2'>
                <p className='font-bold text-gray-400 text-3xl'>Dashboard</p>
            </div>
            <div className="flex flex-col md:flex-row md:gap-1 lg:gap-4 xl:gap-5 lg:px-4">
                <div className="md:w-2/3 space-y-5">
                    <div className='p-0'>
                        <div className="m-0 flex flex-col shadow-xl md:flex-row bg-c-lightgreen rounded-2xl lg:pt-4 lg:px-3 xl:pt-4 xl:px-5 text-white">
                            <div className='md:flex-1 mr-auto'>
                                <div className='absolute'>
                                    <p className='font-bold lg:text-xl xl:text-2xl w-full'>Welcome, {cookieDetails["firstName"]} {cookieDetails["lastName"]}</p>
                                </div>
                                <div className="mt-12 mb-1">
                                    <p className="text-sm">Bank Name</p>
                                    <p className="text-lg font-bold">Reni Trust</p>
                                </div>
                                <div className=" mb-1">
                                    <p className="text-sm">Account Name</p>
                                    <p className="text-lg font-bold">John Doe</p>
                                </div>
                                <div className="mb-1">
                                    <p className="text-sm">Account Number</p>
                                    <p className="text-lg font-bold">0234567899</p>
                                </div>
                                <div className="mb-1">
                                    <p className="text-sm">Account Balance</p>
                                    <div className="flex items-center gap-2 text-lg font-bold">
                                        <BiRefresh /> #150000 <FaEyeSlash />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm">Weighted points</p>
                                    <p className="text-xl font-bold">50</p>
                                </div>
                            </div>
                            <img src={dashImage} alt="Dashboard" className="mt-4 md:mt-0 md:w-1/2 object-containk" />
                        </div>
                    </div>
                    <Card>
                        <p className="font-bold text-2xl text-c-gray opacity-90">Sales Record</p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-c-gray opacity-90 font-semibold">
                                <img src={cart} alt="cart" className="w-10 h-10" />
                                <p>Sold outrightly</p>
                                <Progress className="flex-1" progress={50} color="green" labelProgress size="lg" />
                                
                                <p>250</p>
                            </div>
                            <div className="flex items-center gap-4 text-c-gray opacity-90 font-semibold">
                                <img src={cart} alt="cart" className="w-10 h-10" />
                                <p>Sold on installment</p>
                                <Progress className="flex-1" progress={50} color="green" labelProgress size="lg" />
                                <p>112</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <p className="font-bold">Sales History</p>
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
                    </Card>
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
        </div>
        
    );
}

export default Dashboard;
