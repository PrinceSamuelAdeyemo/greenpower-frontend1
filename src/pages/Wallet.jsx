import { Button, Card, Spinner, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import image from '../assets/dashImage2.png';
import { BiRefresh } from 'react-icons/bi';
import { FaEye, FaEyeSlash, FaPaperPlane, FaWallet } from 'react-icons/fa';

// APIs
import wallets_api from '../utils/wallets_api';

// Components/Modals
import SendMoneyModal from '../components/SendMoneyModal';
import SendToGreenPowerAccountModal from '../components/SendToGreenPowerAccountModal';
import SendToExternalAccountModal from '../components/SendToExternalAccountModal';
import ReloadPage from '../components/ReloadPage';

const Wallet = (props) => {
    var cookieDetails = props.myCookie;
    const [offlineStatus, setOfflineStatus] = useState(false)
    const [show_balance, setShow_balance] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const [showModal3, setShowModal3] = useState(false)
    const [showModal4, setShowModal4] = useState(false)
    const [walletBalance, setWalletBalance] = useState()
    const [walletBalanceDisplay, setWalletBalanceDisplay] = useState()
    const [bankName, setBankName] = useState()
    const [accountName, setAccountName] = useState()
    const [accountNumber, setAccountNumber] = useState()
    const [bankLoading, setBankLoading] = useState(true)
    const [dateTime, setDateTime] = useState()

    const getWalletBalance = () => {
        try{
            wallets_api.post("/checkAccountBalance.php", {
                "userToken": cookieDetails["userToken"]
            })
            .then((response) => {
                console.log(response)
                if (response.data["status_code"] === 200){
                    console.log("Balance is here", response)
                    //setWalletBalance(response.data["data"]["balance"])
                    setWalletBalance(response.data["data"]["balance"])
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
            .finally(() => {
                setBankLoading(false)
            })
        }
        catch (error) {
        }
    }

    const openSendMoneyModal = () => {

    }

    const getCurrentDateTime = () => {
        let months = {1:"January", 2:"February", 3:"March", 4:"April",5:"May", 6:"June", 7:"July", 8:"August", 9:"September", 10:"October", 11:"November", 12:"December"};
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        var today = new Date();
        var day = today.getDate();
        var month = months[today.getMonth()+1];
        var year = today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = (month + " " + day + " " + year + ", " + time)
        setDateTime(dateTime)
    }

    useEffect(() => {
        getWalletBalance()
        getBankData()
        getCurrentDateTime()
    })

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            {offlineStatus && <ReloadPage offlineStatus={offlineStatus} />}
            <div className='flex flex-col gap-4 lg:gap-0 md:flex-row mb-4'>
                <div className='flex flex-col md:flex-row bg-c-lightgreen md:w-2/3 rounded-2xl md:mb-0 md:mr-4 shadow-xl pt-4 md:px-2 lg:px-2 xl:px-5 text-white'>
                    <div className='text-white px-2 lg:p-2 xl:p-4 flex-grow'>
                        <div className='absolute'>
                            <p className='font-bold text-xl w-full'>Welcome, {cookieDetails["firstName"]} {cookieDetails["lastName"]}</p>
                        </div>
                        <div className="mt-16 mb-4">
                            <p className="text-sm">Bank Name</p>
                            {
                                bankLoading ? <Spinner /> : <p className="text-lg font-bold">{bankName ? {bankName} : '--'}</p>
                            }
                        </div>
                        <div className=" mb-4">
                            <p className="text-sm">Account Name</p>
                            {
                                bankLoading ? <Spinner /> : <p className="text-lg font-bold">{accountName ? {accountName} : '--'}</p>
                            }
                        </div>
                        <div className="mb-4">
                            <p className="text-sm">Account Number</p>
                            {
                                bankLoading ? <Spinner /> : <p className="text-lg font-bold">{accountNumber ? {accountNumber} : '--'}</p>
                            }
                            
                        </div>
                        
                    </div>
                    <img src={image} alt="Dashboard" className="rounded-b md:rounded-none md:rounded-r md:max-lg:w-[12rem] md:max-md:h-[10rem] flex" />
                </div>
                <Card className="w-full md:w-1/3">
                    <div className='flex flex-col justify-center items-center'>
                        <p className='mb-4 text-2xl font-bold text-c-gray opacity-90'>Account Balance</p>
                        <div className='flex text-3xl items-center gap-2 lg:gap-2 xl:gap-4 mb-4'>
                            <BiRefresh onClick={getWalletBalance} /> 
                            <p className='text-sm md:text-md lg:text-xl xl:text-4xl font-bold text-c-lightgreen'>{show_balance ? (walletBalance ? `₦${walletBalanceDisplay}` : '₦--') : '******'}</p> 
                            <div onClick={() => setShow_balance(!show_balance)}>
                                {show_balance ? <FaEye /> : <FaEyeSlash />}
                            </div>
                            {/*  */}
                        </div>
                        <p className='mb-3 text-md text-c-gray opacity-90 font-bold'>{dateTime}</p>
                        <div className='lg:px-60 flex justify-center'>
                            <Card className='w-full lg:w-[80%] xl:w-full flex justify-center items-center'>
                                <div className='flex flex-col lg:flex-row items-center lg:px-2 xl:px-4 lg:py-0 gap-3 lg:gap-1 xl:gap-3'>
                                    <Button className='bg-c-lightgreen w-full lg:w-1/2' onClick={() => setShowModal(true)}>
                                        <div className='flex flex-col justify-center items-center'>
                                            <FaPaperPlane className='mb-1'/>
                                            <p>Send</p>
                                        </div>
                                    </Button>
                                    <Button className='bg-c-lightgreen w-full lg:w-1/2'>
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
            {/* 
            <Card>
                <p className="font-bold mb-2">Transactions <span className='text-red-500'>DUMMY DATA</span></p>
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
                            {/* Example rows *}
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
                            {/* Add more rows as needed *}
                        </Table.Body>
                    </Table>
                </div>
            </Card>
             */}
            {showModal && <SendMoneyModal cookieDetails={cookieDetails} showModal={showModal} openModal={() => setShowModal(true)} closeModal={() => setShowModal(false)} openModal2={() => setShowModal2(true)} openModal3={() => setShowModal3(true)} />}
            {showModal2 && <SendToGreenPowerAccountModal showModal2={showModal2} openModal2={() => setShowModal2(true)} closeModal2={() => setShowModal2(false)} cookieDetails={cookieDetails} openModal={() => setShowModal(true)} walletBalance={walletBalance} />}
            {showModal3 && <SendToExternalAccountModal showModal3={showModal3} openModal3={() => setShowModal3(true)} closeModal3={() => setShowModal3(false)} cookieDetails={cookieDetails} openModal={() => setShowModal(true)} walletBalance={walletBalance} />}

        </div>
    );
}

export default Wallet;
