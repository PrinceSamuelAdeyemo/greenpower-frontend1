import { Card, Progress, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiRefresh } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import cart from '../assets/cart.png';
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import dashImage from '../assets/dash-image.png';

import weighted_points_api from '../utils/weighted_points_api';
import sales_api from '../utils/sales_api';
import products_api from '../utils/products_api';

const Dashboard = (props) => {
    var cookieDetails = props.myCookie
    var admin_status = cookieDetails["ADMIN"]

    var [weighted_available, setWeighted_available] = useState(false)
    const [showUsers, setShowUsers] = useState(true)
    const [showIncome, setShowIncome] = useState(false)

    const [productList, setProductList] = useState([])
    const navigate = useNavigate()

    // ADMIN FUNCTIONS
    var getUsersWeightedPoints = () => {
        try{
             weighted_points_api.get("/getPointsByUsers.php")
             .then((response) => {
                if (response.data["status_code"] == 400){
                    setWeighted_available(false)
                }
                else{
                    setWeighted_available(true)
                }
             })
        }
       catch (error) {
        console.log(error)
       }
    }

    var getUsersSalesHistory = () => {
        try{
            //sales_api.
        }
        catch (error){
            console.log(error)
        }
    }

    // USER FUNCTION

    var getFewProducts = () => {
        try{
            products_api.post("/getProductsByPage.php", {
                "page": "1"
            })
            .then((response) => {
               if (response.data["status_code"] == 400){
                   //setWeighted_available(false)
               }
               else{
                   console.log(response.data)
                   setProductList(response.data["data"])
                   console.log("Done")
               }
            })
       }
      catch (error) {
       console.log(error)
      }
    }

    useEffect(() => {
        getFewProducts()
    }, [products_api])

    useEffect(() => {
        
        if (admin_status === 0){

        }
        else if (admin_status == 1){
            getUsersWeightedPoints()
            getUsersSalesHistory()
        }
        else{
            navigate("/login")
        }
    })

    return (

        <div>
            <div className='px-4 pb-2'>
                <p className='font-bold text-gray-400 text-3xl'>Dashboard</p>
            </div>
            {
                (admin_status == 0) ?
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
                    <Card className='h-[98vh]'>
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
                                {
                                    productList?.map((product, key) => (
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
                                            
                                        </Table.Body>
                                    )
                                )
                                }
                                
                            </Table>
                            {
                                !weighted_available && (
                                    <p className='text-center text-red-600 font-semibold'>You don't have weighted points yet, kindly place an order to get started.</p>
                                )
                            }
                        </div>
                        <div className='flex justify-center w-full '>
                            <button className='border-2 border-c-lightgreen rounded-lg px-2 font-semibold text-center text-c-lightgreen'>All products</button>
                        </div>
                    </Card>
                </div>
            </div>
                :
            <>
            {/* Admin Panel */}
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
                                            <div className='flex justify-between' onClick={() => {setShowUsers(!showUsers)}}>
                                                {showUsers ? <FaEye color='green' /> : <FaEyeSlash color='green' />}
                                                <p className='text-black'>Users</p>
                                                <p className='text-red-500'>35.8</p>
                                            </div>
                                            <div>
                                                <p className='font-bold text-4xl text-c-gray text-center'>{showUsers ? 1024: '****'}</p>
                                            </div>
                                        </div>
                                        <div className='w-full bg-white rounded gap-1 px-2 py-2'>
                                            <div className='flex justify-between' onClick={() => {setShowIncome(!showIncome)}}>
                                                {showIncome ? <FaEye color='green' /> : <FaEyeSlash color='green' />}
                                                <p className='text-black'>Income</p>
                                                <p className='text-red-500'>35.8</p>
                                            </div>
                                            <div>
                                                <p className='font-bold text-4xl text-c-gray text-center'>{showIncome ? 3500750: '****'}</p>
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
                                            <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Users</Table.HeadCell>
                                            <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>No. of Sales</Table.HeadCell>
                                            <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Accumulated WP</Table.HeadCell>
                                            <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Commission Due</Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body>
                                            {weighted_available &&
                                                <Table.Row>
                                                <Table.Cell className='font-semibold'>Ayoola Tolu</Table.Cell>
                                                <Table.Cell className='font-semibold'>Excellent 3D chair</Table.Cell>
                                                <Table.Cell className='font-semibold'>18</Table.Cell>
                                                <Table.Cell className='font-semibold'>#32,000</Table.Cell>
                                            </Table.Row>}
                                        </Table.Body>
                                    </Table>
                                    {
                                        !weighted_available && (
                                            <p className='text-center mt-3 text-red-600 font-semibold'>Users cummulated weighted points are not available</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/3 space-y-5">


                    
                        <Card className='h-[98vh] overflow-y-auto'>
                            <div className="flex gap-3 items-center">
                                <div className="h-14 w-6 rounded bg-c-lightgreen"></div>
                                <p className='font-bold text-c-gray opacity-95 text-xl'>Popular Product</p>
                            </div>
                            <div className="px-0">
                            <Table className='overflow-x-hidden '>
                                <Table.Head className='w-full'>
                                    <Table.HeadCell className='bg-white border-c-lightgreen border-b-2 w-1/3 text-[80%] xl:text-[100%]'>Product</Table.HeadCell>
                                    <Table.HeadCell className='bg-white border-c-lightgreen border-b-2 w-1/3 text-[80%] xl:text-[100%]'>Quantity</Table.HeadCell>
                                    <Table.HeadCell className='bg-white border-c-lightgreen border-b-2 w-1/3 text-[80%] xl:text-[100%]'>Prices</Table.HeadCell>
                                </Table.Head>
                                {
                                    productList?.slice(0, 6).map((product, key) => (
                                        <Table.Body className=''>
                                            <Table.Row className=''>
                                                <Table.Cell>
                                                    <div className="flex gap-2 items-center text-[80%] xl:text-[100%]">
                                                        <img src={product1} alt="product1" className="w-10 h-10" />
                                                        <p className='font-semibold text-c-gray'>{product["pdtName"]}</p>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell className='font-semibold text-c-gray text-[80%] xl:text-[100%]'>25 pieces</Table.Cell>
                                                <Table.Cell className='font-semibold text-c-gray text-[80%] xl:text-[100%]'>{product["outrightPrice"]}</Table.Cell>
                                            </Table.Row>
                                            
                                        </Table.Body>
                                    )
                                )
                                }
                                
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
            </>
            }
            
        </div>
        
    );
}

export default Dashboard;
