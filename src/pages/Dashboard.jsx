import { Card, Progress, Table, Spinner } from 'flowbite-react';
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
import wallets_api from '../utils/wallets_api';
import admin_api from '../utils/admin_api';

import UpdateHubModal from '../components/UpdateHubModal';
import ReloadPage from '../components/ReloadPage';

import users_api from '../utils/users_api';

const Dashboard = (props) => {
    var cookieDetails = props.myCookie
    var admin_status = cookieDetails["ADMIN"]


    const [offlineStatus, setOfflineStatus] = useState(false)
    // User data
    const [totalUsers, setTotalUsers] = useState(0)
    // Income data
    const [totalIncome, setTotalIncome] = useState(0)
    const [transactionHistory, SetTransactionHistory] = useState()
    // Weighted points
    var [weighted_available, setWeighted_available] = useState(false)
    var [no_weighted_point, setNo_weighted_point] = useState(true)
    var [weighted_point, setWeighted_point] = useState()
    var [weightedList, setWeightedlist] = useState([])
    // Sales record
    var [salesrecord_available, setSalesrecord_available] = useState(false)
    var [sales_record, setSales_record] = useState(true)
    // Products
    var [products_available, setProducts_available] = useState(false)
    const [productList, setProductList] = useState([])
    //Wallets
    var [walletBalance, setWalletBalance] = useState()
    var [walletBalanceDisplay, setWalletBalanceDisplay] = useState()
    // Hubs
    const [hubsList, setHubsList] = useState([])
    // Bank data
    var [bankName, setBankName] = useState('')
    const [accountName, setAccountName] = useState()
    const [accountNumber, setAccountNumber] = useState()

    const [showUsers, setShowUsers] = useState(true)
    const [showIncome, setShowIncome] = useState(false)
    const [showBalance, setShowBalance] = useState(false)
    const [showUserHubTokenModal, setShowUserHubTokenModal] = useState(false)

    
    const navigate = useNavigate()

    // GENERAL FUNCTIONS
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
                   setProducts_available(true)
                   console.log("Done")
               }
            })
            .catch((error) => {
                if (error.message.includes("Network Error")){
                    console.log("error is here", error)
                    setOfflineStatus(true);
                }
            })
       }
      catch (error) {
       console.log(error)

      }
    }

    // ADMIN FUNCTIONS
    var getUsersWeightedPoints = () => {
        try{
             weighted_points_api.get("/getPointsByUsers.php")
             .then((response) => {
                console.log(response)
                if (response.data["status_code"] == 400){
                    setWeighted_available(false)
                }
                else{
                    setWeightedlist(response.data["data"])
                    setWeighted_available(true)
                }
             })
             .catch((error) => {
                if (error.message.includes("Network Error")){
                    console.log("error is here", error)
                    setOfflineStatus(true);
                }
            })
        }
       catch (error) {
        console.log(error)
       }
    }

    var getUsersSalesHistory = () => {
        try{
            sales_api.get("getLatestSales.php")
            .then((response) => {
                var truncated_sales_history = response.data["data"].slice(0,5)
                console.log(truncated_sales_history)
                setSales_record(truncated_sales_history)
                setSalesrecord_available(true)
            })
            .catch((error) => {
                if (error.message.includes("Network Error")){
                    console.log("error is here", error)
                setOfflineStatus(true);
                }
            })
        }
        catch (error){
            console.log(error)
        }
    }

    const getTotalUsers = () => {
        try {
            admin_api.post("/users.php", {})
            .then((response) => {
                if (response.data["status_code"] === 200){
                    console.log(response.data["data"])
                    setTotalUsers(response.data["data"])
                }
                else{
                    setTotalUsers("Error fetching total users")
                }

            }
        )
        } catch (error) {
            
        }
    }

    const getTotalIncome = () => {
        try {
            admin_api.post("/income.php", {})
            .then((response) => {
                if (response.data["status_code"] === 200){
                    console.log(response.data["data"])
                    setTotalIncome(response.data["data"])
                }
                else{
                    setTotalIncome("Error fetching total income")
                }
        })
            } catch (error) {
            }
    }

    // USER FUNCTION
    var getUserWeightedPoints = () => {
        try{
             weighted_points_api.post("/getCurrentPoint.php", {
                "userToken": cookieDetails["userToken"]
             })
             .then((response) => {
                console.log(response)
                if (response.data["status_code"] == 200){
                    console.log()
                    setWeighted_point(response.data["data"])
                    setWeighted_available(true)
                    
                }
                else{
                    setWeighted_available(false)
                }
             })
        }
       catch (error) {
        console.log(error)
       }
    }

    const getWalletBalance = () => {
        try{
            wallets_api.post("/checkAccountBalance.php", {
                "userToken": cookieDetails["userToken"]
            })
            .then((response) => {
                console.log(response)
                if (response.data["status_code"] === 200){
                    console.log(response.data["data"])
                    setWalletBalance(response.data["data"]["balance"])
                    console.log(walletBalance)
                    setWalletBalanceDisplay(response.data["data"]["balance_th"])
                }
            })
            .catch((error) => {
                if (error.message.includes("Network Error")){
                    console.log("error is here", error)
                setOfflineStatus(true);
                }
            })
        }
        catch (error) {

        }
    }

    const getHubToken = () => {
        if ((cookieDetails["ADMIN"] === 1) && (cookieDetails["userHubToken"] === null)){
            setShowUserHubTokenModal(false)
        }
        else if ((cookieDetails["ADMIN"] === 0) && (cookieDetails["userHubToken"] === null || cookieDetails["userHubToken"] === "")){
            setShowUserHubTokenModal(true)
        }
    }

    var getUserSalesHistory = () => {
        try{
            sales_api.post("getSalesByUser.php", {
                "userToken": cookieDetails["userToken"]
            })
            .then((response) => {
                var truncated_sales_history = response.data["data"].slice(0,5)
                console.log(truncated_sales_history)
                setSales_record(truncated_sales_history)
                setSalesrecord_available(true)
            })
            .catch((error) => {
                if (error.message.includes("Network Error")){
                    console.log("error is here", error)
                setOfflineStatus(true);
                }
            })
        }
        catch (error){
            console.log(error)
        }
    }


    const getBankData = () => {
        try{
            wallets_api.post("/getBankData", {
                "userToken": cookieDetails["userToken"]
            })
            .then((response) => {
                console.log(response)
                if (response.data["status_code"] === 200){
                    setBankName(response.data["data"][0]["bank_name"])
                    setAccountName(response.data["data"][0]["acc_name"])
                    setAccountNumber(response.data["data"][0]["nuban"])
                }
            })
            .catch((error) => {
                if (error.message.includes("Network Error")){
                    console.log("error is here", error)
                    setOfflineStatus(true);
                }
            })
        }
        catch (error) {
        }
    }

    useEffect(() => {
        console.log("From dashboard",cookieDetails)
        getHubToken()
        getFewProducts()
        getWalletBalance()
        getBankData();
        
    }, [products_api])

    useEffect(() => {
        
        if (admin_status === 0){
            getUserWeightedPoints()
            getUserSalesHistory()
        }
        else if (admin_status == 1){
            getUsersWeightedPoints()
            getUsersSalesHistory()
            getTotalUsers();
            getTotalIncome();
        }
        else{
            navigate("/login")
        }
    }, [weighted_points_api, sales_api])

    return (

        <div className=''>
        {offlineStatus && <ReloadPage offlineStatus={offlineStatus} />}
            <div className='px-4 pb-2'>
                <p className='font-bold text-gray-400 text-3xl'>Dashboard</p>
            </div>
            {
                (admin_status !== 1) ?
                <div className="flex flex-col md:flex-row md:gap-1 lg:gap-4 xl:gap-5 lg:px-4">
                    {
                        showUserHubTokenModal && <UpdateHubModal showModal={showUserHubTokenModal} openModal={() => setShowUserHubTokenModal(true)} closeModal={() => setShowUserHubTokenModal(false)} userToken={cookieDetails["userToken"]} />
                    }
                    <div className="md:w-2/3 space-y-5">
                        <div className='p-0'>
                            <div className="m-0 flex flex-col shadow-xl md:flex-row bg-c-lightgreen rounded-2xl pt-4 px-3 xl:pt-4 xl:px-5 text-white">
                                <div className='flex flex-col gap-2 md:flex-1 mr-auto'>
                                    <div className='absolute'>
                                        <p className='font-bold lg:text-xl xl:text-2xl w-full'>Welcome, {cookieDetails["firstName"]} {cookieDetails["lastName"]}</p>
                                    </div>
                                    <div className="mt-12 mb-1">
                                        <p className="text-sm">Bank Name</p>
                                        {
                                            bankName? <p className="text-lg font-bold">{bankName}</p> : <Spinner />
                                        }
                                    </div>
                                    <div className=" mb-1">
                                        <p className="text-sm">Account Name</p>
                                        {
                                            accountName? <p className="text-lg font-bold">{accountName}</p> : <Spinner />
                                        }
                                    </div>
                                    <div className="mb-1">
                                        <p className="text-sm">Account Number</p>
                                        {
                                            accountNumber? <p className="text-lg font-bold">{accountNumber}</p> : <Spinner />
                                        }
                                        
                                    </div>
                                    <div className="mb-1" >
                                        <p className="text-sm">Account Balance</p>
                                        <div  className="flex items-center gap-2 text-lg font-bold">
                                            <BiRefresh onClick={getWalletBalance} /> 
                                            {
                                                showBalance ? <><p>{(walletBalance ? `₦${walletBalanceDisplay}` : '₦--')}</p> <FaEye onClick={() => setShowBalance(!showBalance)} /></> : <><p>******</p> <FaEyeSlash onClick={() => setShowBalance(!showBalance)} /></>
                                            } 
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm">Weighted points</p>
                                        {
                                            weighted_available? <p className="text-xl font-bold">{weighted_point}</p> : <Spinner />
                                        }
                                        
                                    </div>
                                </div>
                                <img src={dashImage} alt="Dashboard" className="mt-4 md:mt-0 md:w-1/2 object-containk" />
                            </div>
                        </div>
                        <Card className='max-h-[34vh] overflow-y-auto'>
                            <p className="font-bold text-2xl text-c-gray opacity-90">Sales Record <span className='text-red-500'>DUMMY DATA</span></p>
                            <div className="space-y-4">
                                <div className="flex flex-col lg:flex-row items-center gap-4 text-c-gray opacity-90 font-semibold w-full">
                                    <img src={cart} alt="cart" className="w-10 h-10" />
                                    <p>Sold outrightly</p>
                                    <div className='flex items-center gap-4'>
                                         <Progress className='w-[70vw] md:w-[30vw] lg:w-[15vw]' progress={75} color="green" labelProgress size="lg" />
                                        <p>250</p>
                                    </div>
                                   
                                </div>
                                
                            </div>
                        </Card>
                        <Card>
                            <p className="font-bold">Sales History <span className='text-red-500'>DUMMY DATA</span></p>
                            <div className="overflow-x-auto">
                                <Table className='table-fixed'>
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
                        <Card className='max-h-[50vh] lg:max-h-[65vh] overflow-y-auto'>3
                            <div className="flex gap-3 items-center">
                                <div className="h-14 w-6 rounded bg-c-lightgreen"></div>
                                <p className='font-bold text-c-gray opacity-95 text-xl'>Products</p>
                            </div>
                            <div className="px-0">
                            <Table className='overflow-x-hidden table-fixed'>
                                <Table.Head className='w-full'>
                                    <Table.HeadCell className='bg-white border-c-lightgreen border-b-2 w-1/3 text-[80%] xl:text-[100%]'>Product</Table.HeadCell>
                                    <Table.HeadCell className='bg-white border-c-lightgreen border-b-2 w-1/3 text-[80%] xl:text-[100%]'>Quantity</Table.HeadCell>
                                    <Table.HeadCell className='bg-white border-c-lightgreen border-b-2 w-1/3 text-[80%] xl:text-[100%]'>Prices</Table.HeadCell>
                                </Table.Head>
                                
                                {
                                    productList?.slice(0,6).map((product, key) => (
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
                            {
                                !products_available &&
                            <div className='h-[30vh] flex flex-col md:flex-row gap-4 justify-center items-center'>
                                <Spinner color='success' size='xl' />
                            </div>
                            }
                            
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
                    <div className="md:w-2/3 space-y-5 bg-white py-6 border-1 shadow-xl lg:h-[65vh] overflow-auto">
                        <div className='space-y-5 overflow-auto'>
                            <div className='flex justify-center w-full'>
                                <div className="flex flex-col gap-4 shadow-xl bg-c-muchlightgreen w-[90%] lg:w-[95%] rounded-2xl py-4 lg:pt-4 px-2 lg:p-4 xl:pt-4 xl:px-5 text-white">
                                    <div className="flex gap-3 items-center">
                                        <div className="h-14 w-6 rounded bg-c-lightgreen"></div>
                                        <p className='font-bold text-c-gray opacity-95 text-xl'>Overview</p>
                                    </div>
                                        
                                    <div className='flex flex-col lg:flex-row gap-2 lg:gap-4'>
                                        <div className='w-full bg-white rounded gap-1 px-2 py-2'>
                                            <div className='flex justify-between' onClick={() => {setShowUsers(!showUsers)}}>
                                                {showUsers ? <FaEye color='green' /> : <FaEyeSlash color='green' />}
                                                <p className='text-black'>Users</p>
                                                <p className='text-red-500'>35.8</p>
                                            </div>
                                            <div>
                                                <p className='font-bold text-4xl text-c-gray text-center'>{showUsers ? totalUsers: '****'}</p>
                                            </div>
                                        </div>
                                        <div className='w-full bg-white rounded gap-1 px-2 py-2'>
                                            <div className='flex justify-between' onClick={() => {setShowIncome(!showIncome)}}>
                                                {showIncome ? <FaEye color='green' /> : <FaEyeSlash color='green' />}
                                                <p className='text-black'>Income</p>
                                                <p className='text-red-500'>35.8</p>
                                            </div>
                                            <div>
                                                <p className='font-bold text-4xl text-c-gray text-center'>{showIncome ? totalIncome: '****'}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            
                            <div className=''>
                                <div className='w-full p-3'>
                                    <p className="font-bold">User Weighted Points</p>
                                </div>
                                
                                <div className="overflow-x-auto">
                                    <Table className=''>
                                        <Table.Head className='border-red-500'>
                                            <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Users</Table.HeadCell>
                                            <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>No. of Sales</Table.HeadCell>
                                            <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Accumulated WP</Table.HeadCell>
                                            <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Commission Due</Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body>
                                        
                                        {weightedList?.map((weight, index) => (
                                            <Table.Row key={index}>
                                                <Table.Cell className='font-semibold'>{weight["user"]}</Table.Cell>
                                                <Table.Cell className='font-semibold md:ps-2 lg:ps-10'>{weight["number_of_sales"]}</Table.Cell>
                                                <Table.Cell className='font-semibold md:ps-2 lg:ps-10'>{weight["total_weighted_points"]}</Table.Cell>
                                                <Table.Cell className='font-semibold'>#32,000</Table.Cell>
                                            </Table.Row>
                                            ))
                                            
                                        }
                                        </Table.Body>
                                    </Table>
                                    {
                                        !weighted_available && (
                                            <div className='h-[20vh] flex flex-col md:flex-row gap-4 justify-center items-center'>
                                                <Spinner color='success' size='xl' />
                                                {/* <p className='text-center mt-3 text-red-600 font-semibold'>Users cummulated weighted points are not available</p> */}
                                            </div>
                                            
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/3 space-y-10 lg:space-y-5">
                        <Card className='max-h-[50vh] lg:max-h-[65vh] overflow-y-auto'>
                            <div className="flex gap-3 items-center">
                                <div className="h-14 w-6 rounded bg-c-lightgreen"></div>
                                <p className='font-bold text-c-gray opacity-95 text-xl'>Products</p>
                            </div>
                            <div className="px-0">
                            <Table className='overflow-x-hidden table-fixed'>
                                <Table.Head className='w-full'>
                                    <Table.HeadCell className='bg-white border-c-lightgreen border-b-2 w-1/3 text-[80%] xl:text-[100%]'>Product</Table.HeadCell>
                                    <Table.HeadCell className='bg-white border-c-lightgreen border-b-2 w-1/3 text-[80%] xl:text-[100%]'>Quantity</Table.HeadCell>
                                    <Table.HeadCell className='bg-white border-c-lightgreen border-b-2 w-1/3 text-[80%] xl:text-[100%]'>Prices</Table.HeadCell>
                                </Table.Head>
                                
                                {
                                    productList?.slice(0,6).map((product, key) => (
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
                            {
                                !products_available &&
                            <div className='h-[30vh] flex flex-col md:flex-row gap-4 justify-center items-center'>
                                <Spinner color='success' size='xl' />
                            </div>
                            }
                            
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
                        <Table className='table-fixed'>
                            <Table.Head className='border-red-500'>
                            <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Buyer</Table.HeadCell>
                                <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Product</Table.HeadCell>
                                <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Prices</Table.HeadCell>
                                <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Commission Markup</Table.HeadCell>
                                <Table.HeadCell className='bg-white border-c-lightgreen border-y-2'>Date</Table.HeadCell>
                            </Table.Head>
                            {
                            salesrecord_available && sales_record?.map((sale, index) => (
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell className='font-semibold'>{sale["userToken"]}</Table.Cell>
                                    <Table.Cell className='font-semibold'>{sale["pdtName"]}</Table.Cell>
                                    <Table.Cell className='font-semibold'>{sale["pdtPrice"]}</Table.Cell>
                                    <Table.Cell className='font-semibold'>{sale["payment_type"] === 'outright' ? sale["commissionEarned"]: sale["commission_on_down_payment"] }</Table.Cell>
                                    <Table.Cell className='font-semibold'>{sale["created_at"].split(' ')[0]}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                            ))
                            
                            }
                            
                        </Table>
                        {
                            !salesrecord_available && 
                            <div className='h-[10vh] flex flex-col md:flex-row gap-4 justify-center items-center'>
                                <Spinner color='success' size='xl' />
                            </div>
                        }
                    </div>
                </div>
            </>
            }
            
        </div>
        
    );
}

export default Dashboard;
