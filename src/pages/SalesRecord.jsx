import { Button, Card, Table, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddSalesModal from '../components/AddSalesModal';

import sales_api from '../utils/sales_api';
import hubs_api from '../utils/hubs_api';

import AdminHubSalesRecord from '../components/AdminHubSalesRecord';

const SalesRecord = (props) => {
    var cookieDetails = props.myCookie
    var userToken = cookieDetails["userToken"]
    var admin_status = cookieDetails["ADMIN"]

    const navigate = useNavigate()
    const [salesRecordExist, setSalesRecordExist] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [hubs_available, setHubs_available] = useState(false)
    const [hubs_list, setHubs_list] = useState([])
    const [sales_list, setSales_list] = useState([])

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

    // For Users
    var getUserSalesHistory = () => {
        try{
            sales_api.post("/getSalesByUser.php", {
            "userToken": userToken
        })
        .then((response) => {
            console.log(response)
            if (response.data["status_code"] == 200){
                console.log("ASSBB", response)
                var sales = response.data["data"]
                console.log(sales)
                setSales_list(sales)
                setSalesRecordExist(true)
            }
            else{
                setSalesRecordExist(false)
            }
        })
        }catch (error){
            console.log(error)
        }
    }

    // For the admin
    const getHubs = () => {
        var received_Data;
        try{
            hubs_api.get("/getHubs.php")
            .then((response) => {
                if (response.data["status_code"] == 200){
                    
                    var receivedData = response.data["data"]
                    setHubs_list(JSON.stringify(receivedData))
                    setHubs_available(true)
                    //setHubs_list((hubs_list) => [...hubs_list, ...receivedData])
                }
            })
        }
        catch{
            console.log(error)
        }
    }

    useEffect(() => {
        console.log("HEEEEEEEE")
        if (admin_status == 0){
            console.log("SHOULD NOT RUN THIS")
            getUserSalesHistory()
        }
    }, [sales_api])


    useEffect(() => {
        console.log("ALALALAL", cookieDetails)
        if (admin_status == 1){
            getHubs()
        }
        
    })

    return (
        <div className='p-4'>
            
            {
                (admin_status !== 1) ?
                <>
                <div className='flex items-center'>
                    <p className='text-xl font-bold'>Sales</p>
                    <div className='flex ml-auto gap-3'>
                        
                        <Button className='text-c-lightgreen' outline color="green" onClick={(event)=>setShowModal(true)}>Add Sales</Button>
                        {showModal && <AddSalesModal showModal={showModal} openModal={()=>setShowModal(true)} closeModal={()=>setShowModal(false)} cookieDetails={cookieDetails} />}
                        <Button className='bg-c-lightgreen text-white' onClick={()=>navigate('/sales/user/wp')}>View overall WP</Button>
                    </div>
                </div>
                <Card className='mt-4'>
                    <p className=''>Sales History</p>
                    <div className='overflow-x-auto'>
                        <Table className='w-full lg:table-fixed'>
                            <Table.Head className='normal-case border-y-2 border-c-lightgreen font-bold text-lg text-c-gray opacity-70'>
                                <Table.HeadCell className='bg-white text-sm'>Product</Table.HeadCell>
                                <Table.HeadCell className='bg-white text-sm'>Payment Types</Table.HeadCell>
                                <Table.HeadCell className='bg-white text-sm text-center'>Status</Table.HeadCell>
                                <Table.HeadCell className='bg-white text-sm text-center'>Serial Number</Table.HeadCell>
                                <Table.HeadCell className='bg-white text-sm text-center'>Prices</Table.HeadCell>
                                <Table.HeadCell className='bg-white text-sm text-center'>Date</Table.HeadCell>
                                <Table.HeadCell className='bg-white text-sm text-center'>Action</Table.HeadCell>
                            </Table.Head>
                            {salesRecordExist ?
                            <Table.Body className='font-semibold'>
                                {
                                    sales_list?.map((sale, key) => (
                                        <Table.Row className='border-b-2 border-c-lightgreen'>
                                            <Table.Cell>{sale["pdtName"]}</Table.Cell>
                                            <Table.Cell>{sale["payment_option"]}</Table.Cell>
                                            <Table.Cell className=''>
                                                <div className='border flex items-center justify-center bg-blue-100 rounded'>{sale["approval_status"]}
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className='text-center w-1 overflow-x-hidden'>{sale["pdtSerialNumber"]}</Table.Cell>
                                            <Table.Cell className='text-center'>N{sale["amountPaid"]}</Table.Cell>
                                            <Table.Cell className='text-center'>{`${month_map[sale["created_at"].split(" ")[0].split("-")[1]]} ${sale["created_at"].split(" ")[0].split("-")[2]}, ${sale["created_at"].split(" ")[0].split("-")[0]}`}</Table.Cell>
                                            <Table.Cell className='flex justify-center'>
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
                </>
                :
                <>
                <div className='flex items-center'>
                    <p className='text-xl font-bold'>Sales</p>
                    <div className='flex ml-auto gap-3'>
                        
                        <Button className='text-c-lightgreen' outline color="green" onClick={()=>setShowModal(true)}>All Sales</Button>
                        {showModal && <AddSalesModal showModal={showModal} openModal={()=>setShowModal(true)} closeModal={()=>setShowModal(false)} cookieDetails={cookieDetails} />}
                        <Button className='bg-c-lightgreen text-white' onClick={()=>navigate('/sales/user/wp')}>View overall WP</Button>
                    </div>
                </div>
                
                <div>
                    {hubs_available ? JSON.parse(hubs_list).map((hub, key) => (
                        <div className=''>
                            <AdminHubSalesRecord hub={hub} />
                        </div>
                    ))
                    :
                    <div className='h-[70vh] flex flex-col md:flex-row gap-4 justify-center items-center'>
                        <Spinner color='success' size='xl' />
                        <p>Kindly wait, if this persist. Reload</p>
                    </div>
                    }
                </div>
                </>
            }
            
        </div>
    );
}

export default SalesRecord;
