import { Button, Card, Dropdown, Table, Select } from 'flowbite-react';
import React, {  useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AddSalesModal from '../components/AddSalesModal';
import { FaDownload } from "react-icons/fa"

import hubs_api from '../utils/hubs_api';
import products_api from '../utils/products_api';
import UpdateProduct from '../components/UpdateProduct';
import EachHubProduct from '../components/EachHubProduct';

"use client"


const ProductHubListing = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const myCookie = props.myCookie

    const [showModal, setShowModal] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [hub_details, setHub_details] = useState()
    const [hubProductAvailable, setHubProductAvailable] = useState(false)
    const [hubProduct, setHubProduct] = useState()
    const [data_for_update, setData_for_update] = useState({})

    var { "data": hub_data} = location.state || {}
    console.log(hub_data)
    var { "hub_token": hub_token, "hub_name": hub_name} = hub_data
    //var { hubName } = useParams()

    var getHubByToken = (hub_token) => {
        try{
            hubs_api.post("/getHubById.php", {
            "hubToken": hub_token
            })
            .then((response) => {
                if (response.data["data"]){
                    setHub_details(response.data["data"])
                    productsByHub(response.data["data"]["hubToken"])
                }
            })
        }
        catch(error){
            console.log(error)
        }
    }

    var productsByHub = (hub_token) => {
        products_api.post("/getProductsByHub.php", {
            "hubToken": hub_token
        })
        .then((response) => {
            console.log(response)
            if (response.data["status_code"] == 400){
                setHubProductAvailable(false)
            }
            else{
                setHub_details(response.data["data"])
                setHubProductAvailable(true)
            }
        })
    }

    const navigateToAddProduct = () => {
        navigate('/admin_addproducts', {"state": {
            "hubToken": hub_token
        }})
    }

    
    const getProductToUpdate = (pdtSerialNumber, pdtName, pdtImage, outrightPrice, outrightCommission, logisticsFees, weightedPoints, pdtToken) => {
        let data = {
                "hubToken": hub_token,
                "userToken": myCookie["userToken"],
                "pdtSerialNumber": pdtSerialNumber,
                "pdtName": pdtName,
                "pdtImage": pdtImage,
                "outrightPrice": outrightPrice,
                "outrightCommission": outrightCommission,
                "logisticsFees": logisticsFees,
                "weightedPoints": weightedPoints,
                "pdtToken": pdtToken
        }
        setData_for_update(data)
        setShowUpdate(true)
    }

    /* 
    const byPage = () => {
        products_api.post("/getProductsByPage.php", {
            "page": "1"
        })
        .then((response) => {
            console.log(response)
            if (response.data["status_code"] == 400){
                console.log(response)
            }
            else{
                console.log(response.data["data"])
            }
        })
    }
     */
    useEffect(() => {
        getHubByToken(hub_token);
        //byPage();
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
                    <Button className='bg-c-lightgreen text-white' onClick={navigateToAddProduct}><FaDownload className='mr-2' />Add Product</Button>
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
                        {
                        !hubProductAvailable? 
                        <></>
                        :
                        hub_details?.map((hub_detail, index) => (
                            <EachHubProduct index={index} hubProductAvailable={hubProductAvailable} pdtImage={hub_detail["pdtImage"]} pdtName={hub_detail["pdtName"]} pdtSerialNumber={hub_detail["pdtSerialNumber"]} outrightPrice={hub_detail["outrightPrice"]} outrightCommission={hub_detail["outrightCommission"]} logisticsFees={hub_detail["logisticsFees"]} weightedPoints={hub_detail["weightedPoints"]} pdtToken={hub_detail["pdtToken"]} getProductToUpdate={getProductToUpdate}  />
                        ))
                        }
                    </Table>
                    
                    {
                        showUpdate && <UpdateProduct showModal={showUpdate} closeModal={() => setShowUpdate(close)} data_update={data_for_update} />
                    }

                </div>
                {!hubProductAvailable? (
                    <p className='text-red-700 font-bold text-center'>Product is not available for this hub, kindly add a product for this hub.</p>
                )
                :
                <></>
                }
            </Card>
            </div>
        </div>
    );
}

export default ProductHubListing;
