import React, { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Label, Select, TextInput } from 'flowbite-react';
import { FaTimes } from "react-icons/fa"
import CustomModal from './CustomModal';
import addSalesImage from '../assets/addsalesImage.png';
import UploadComplete from './UploadComplete';
import AddSalesComplete from './AddSalesComplete';

import products_api from '../utils/products_api'
import hubs_api from '../utils/hubs_api';
import sales_api from '../utils/sales_api';

const AddSalesModal = ({ showModal, openModal, closeModal, cookieDetails }) => {
    var cookieDetails = cookieDetails;

    const [showModal2, setShowModal2] = useState(false)
    const [hub_available, setHub_available] = useState(false)
    const [products_available, setProducts_available] = useState(false)
    //const [hubs_list, setHubs_list] = useState([])
    const [products_list, setProducts_list] = useState([])
    const [outright_payment, setOutright_payment] = useState(true)
    // current hub token and current product
    const [currentHub, setCurrentHub] = useState({})
    const [currentProduct, setCurrentProduct] = useState({})
    const [paymentPlans, setPaymentPlans] = useState([])
    const [currentPaymentPlan, setCurrentPaymentPlan] = useState({})
    const [hubChanged, setHubChanged] = useState(0)

    const [error_details, setError_details] = useState('')

    const paymentOptionRef = useRef(null)
    const downPaymentRef = useRef(null)
    const installmentAmountRef = useRef(null)
    const durationRef = useRef(null)
    const currentHubRef = useRef(null)
    const currentProductRef = useRef(null)

    const submitToAddSales = () =>{
        try{

            if (outright_payment === true){
                sales_api.post("/addSale.php", {
                    //"pdtName": currentProduct["pdtName"],
                    "hubToken": cookieDetails["userHubToken"],
                    "userToken": cookieDetails["userToken"],
                    "pdtToken": currentProduct["pdtToken"],
                    "pdtSerialNumber": currentProduct["pdtSerialNumber"],
                    "logisticsFees": parseFloat(currentProduct["logisticsFees"]),
                    "payment_option": "outright",
                    "amountPaid": parseFloat((currentProduct["outrightPrice"])).toFixed(2),
                    //"commissionEarned": Number(currentProduct["outrightCommission"]).toFixed(2),
                    "payment_type": "outright"
                })
                .then((response) => {
                    if (response.data["status_code"] === 200){
                        setError_details('')
                        setShowModal2(true)
                    }
                    else{
                        setError_details("Something went wrong.")
                    }
                })
            }
            else{
                sales_api.post("/addSale.php", {
                    //"pdtName": currentProduct["pdtName"],
                    "hubToken": cookieDetails["userHubToken"],
                    "userToken": cookieDetails["userToken"],
                    "pdtToken": currentProduct["pdtToken"],
                    "pdtSerialNumber": currentProduct["pdtSerialNumber"],
                    "logisticsFees": parseFloat(currentProduct["logisticsFees"]),
                    "payment_option": {
                        "downPayment": currentPaymentPlan["downPayment"],
                        "commissionEarned": currentPaymentPlan["installmentCommission"],
                        "duration": currentPaymentPlan["month"],
                        "installment_amount": currentPaymentPlan["installment_amount"]
                    },
                    "payment_type": "downPayment",
                })
                .then((response) => {
                    if (response.data["status_code"] === 200){
                        setError_details('')
                        setShowModal2(true)
                    }
                    else{
                        setError_details("Something went wrong.")
                    }
                })
            }
            
        }
        catch (error){
        }
        
    }
    const closeMenu = () =>{
        closeModal()
    }

    const getHubsList = () => {
        
        hubs_api.get("/getHubs.php")
        .then((response) => {
            var hubs = response.data["data"]
            for (let i = 0; i<hubs.length; i++){
                if (hubs[i]["hubToken"] === cookieDetails["userHubToken"]){
                    setCurrentHub(hubs[i])
                }
            }
            //setHubs_list(hubs)
            setHub_available(true)

            getProductsByHub(cookieDetails["userHubToken"])
        })
    }

    const getProductsByHub = async () => {
        /* console.log(hubChanged, "from productbyhub")
        var current_hub_token;
        currentHubRef.current.value ? current_hub_token = currentHubRef.current.value :  current_hub_token = hubs_list[0]["hubToken"]
        setCurrentHub(current_hub_token) */
        try{
            await products_api.post("/getProductsByHub.php", {
                "hubToken": cookieDetails["userHubToken"]
            //"hubToken": current_hub_token
        })
        .then((response) => {
            if (!response.ok){
                setProducts_available(false)
            }
            var products = response.data["data"]
            setProducts_list(products)
            setCurrentProduct(products[0])
            setProducts_available(true)
        })
        }
        catch{
            setProducts_available(false)
            getProductsByHub()
        }
    }

    var changeCurrentProduct = () => {
        let each = products_list.find(product => product.pdtToken === currentProductRef.current.value);
        
        setCurrentProduct(each)
        setPaymentPlans(JSON.parse(each["paymentPlan"]))
    }

    var updatePaymentPlan = () => {
        if (paymentOptionRef.current.value !== "outright_payment"){
            setOutright_payment(false)
            
            //setCurrentPaymentPlan()
            for (let i = 0; i < paymentPlans.length; i++){
                if (paymentPlans[i]["month"] == paymentOptionRef.current.value){
                    setCurrentPaymentPlan(paymentPlans[i])
                }
            }
        }
        else{
            setOutright_payment(true)
        }
    }

    useEffect(() => {
        getProductsByHub()
    }, [hubChanged])
    
    useEffect(() => {
        
        getHubsList()
    }, [])

    useEffect(() => {
    }, [paymentPlans])

    
    return (
        <CustomModal 
            showModal={showModal} 
            openModal={openModal} 
            closeModal={closeModal}
            title="Add Sales"
         >
            <p className='text-center text-red-500 font-semibold'>{error_details}</p>
            <img src={addSalesImage} alt="Add Sales" />

            <div className='w-full my-3 px-4 relative'>
                <div className='my-3'>
                    <Label value='Select Hub' htmlFor='hub' />
                    <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen font-bold' id='hub' type='text' value={currentHub["hubName"]} disabled readOnly />
                    {/* <Select id='hub' className='flex-grow' ref={currentHubRef} onChange={(event) => setHubChanged(hubChanged+1) }>
                        
                        {hub_available &&
                            hubs_list.map((hub, key) => (
                                <option value={hub["hubToken"]} key={hub["hubToken"]} className='active:bg-c-lightgreen hover:bg-c-lightgreen my-1'>{hub["hubName"]}</option>
                            ))
                        }
                    </Select> */}
                </div>
                
                <div className='my-3'>
                    <Label value='Select Product' htmlFor='product' />
                    <Select id='product' className='flex-grow max-h-16 overflow-y-auto' ref={currentProductRef} onChange={changeCurrentProduct}>
                    {!products_available &&
                            <option  className='active:bg-c-lightgreen hover:bg-c-lightgreen my-1'></option>
                    }
                    {
                            products_list?.map((product, key) => (
                                <option value={product["pdtToken"]} key={product["pdtToken"]} className='active:bg-c-lightgreen hover:bg-c-lightgreen my-1 absolute top-0'>{product["pdtName"]}</option>
                            ))
                        }
                    </Select>
                </div>
                <div className='my-3'>
                    <Label value='Serial Number' htmlFor='serialNumber' />
                    {currentProduct? <TextInput className='flex-grow border-c-lightgreen font-bold text-black' color="text-red-500" id='serialNumber' type='text' value={currentProduct.pdtSerialNumber} disabled readOnly />
                    :
                    <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen font-bold' id='serialNumber' type='text' value="" disabled readOnly />
                    }
                    
                </div>
                <div className='my-3'>
                    <Label value='Select Payment Option' htmlFor='paymentOption' />
                    <Select id='paymentOption' className='flex-grow' ref={paymentOptionRef} onClick={updatePaymentPlan}>
                        <option value="outright_payment" className="w-[90%]">Outright Payment</option>
                        {
                            paymentPlans?.map((paymentPlan) =>( 
                                <option value={paymentPlan["month"]}>{paymentPlan["month"]} months</option>
                            ))
                        }
                        
                        {/* <option>3 months</option>
                        <option>6 months</option>
                        <option>9 months</option>
                        <option>12 months</option> */}
                    </Select>
                </div>
                {!outright_payment &&
                    (<>
                    <div className='my-3'>
                        <Label value='Down Payment' htmlFor='downpayment' />
                        <TextInput value={currentPaymentPlan["downPayment"]} readOnly className='flex-grow border-c-lightgreen text-c-lightgreen' id='downpayment' type='text' />
                    </div>
                    <div className='my-3'>
                        <Label value='Monthly Payment' htmlFor='monthlypayment' />
                        <TextInput value={currentPaymentPlan["installment_amount"]} readOnly className='flex-grow border-c-lightgreen text-c-lightgreen' id='monthlypayment' type='text' />
                    </div>
                    </>)
                }
                
                {/* <div className="flex gap-2">
                    <Checkbox id="mark_recurring_payment" className="w-6 h-6"/>
                    <Label value="Mark as recurring payment" htmlFor="mark_recurring_payment" />

                </div> */}
                <div className='my-3'>
                    <Button className='w-full bg-c-lightgreen' onClick={submitToAddSales}>Submit</Button>
                    {showModal2 && <AddSalesComplete showModal={showModal2} openModal={()=>setShowModal2(true)} closeModal={()=>setShowModal2(false)}/>}
                </div>
            </div>
        </CustomModal>
    );
}

export default AddSalesModal;
