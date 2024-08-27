import React, { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Label, Select, TextInput } from 'flowbite-react';
import { FaTimes } from "react-icons/fa"
import CustomModal from './CustomModal';
import addSalesImage from '../assets/addsalesImage.png';
import UploadComplete from './UploadComplete';


import products_api from '../utils/products_api'
import hubs_api from '../utils/hubs_api';
import sales_api from '../utils/sales_api';

const AddSalesModal = ({ showModal, openModal, closeModal, cookieDetails }) => {
    var cookieDetails = cookieDetails;

    const [showModal2, setShowModal2] = useState(false)
    const [hub_available, setHub_available] = useState(false)
    const [products_available, setProducts_available] = useState(false)
    const [hubs_list, setHubs_list] = useState([])
    const [products_list, setProducts_list] = useState([])
    const [outright_payment, setOutright_payment] = useState(true)
    // current hub token and current product
    const [currentHub, setCurrentHub] = useState()
    const [currentProduct, setCurrentProduct] = useState({})
    const [hubChanged, setHubChanged] = useState(0)

    const paymentOptionRef = useRef(null)
    const currentHubRef = useRef(null)
    const currentProductRef = useRef(null)

    const submitToAddSales = () =>{
        try{
            console.log("CURRENT HUB", currentHub)
            console.log("CURRENT PRODUCT", currentProduct)
            sales_api.post("/addSale.php", {
                "hubToken": currentHub,
                "userToken": cookieDetails["userToken"],
                "pdtToken": currentProduct["pdtToken"],
                "pdtSerialNumber": currentProduct["pdtSerialNumber"],
                "logisticsFees": parseFloat(currentProduct["logisticsFees"]),
                "payment_option": "outright",
                "amountPaid": parseFloat(currentProduct["outrightPrice"]),
                "commissionEarned": parseFloat(currentProduct["outrightCommission"]),
            })
            .then((response) => {
                console.log(response.data)
            })
        }
        catch{

        }
        closeModal()
        setShowModal2(true)
    }
    const closeMenu = () =>{
        closeModal()
    }

    const getHubsList = () => {
        console.log(hubChanged, "from hublist")
        hubs_api.get("/getHubs.php")
        .then((response) => {
            console.log(111111111111111111)
            var hubs = response.data["data"]
            console.log(hubs)
            setHubs_list(hubs)
            setHub_available(true)
            setCurrentHub(hubs[0]["hubToken"])
            getProductsByHub(hubs[0]["hubToken"])
            console.log("AA")
        })
    }

    var getProductsByHub = async () => {
        console.log(hubChanged, "from productbyhub")
        var current_hub_token;
        currentHubRef.current.value ? current_hub_token = currentHubRef.current.value :  current_hub_token = hubs_list[0]["hubToken"]
        setCurrentHub(current_hub_token)
        try{
            await products_api.post("/getProductsByHub.php", {
            "hubToken": current_hub_token
        })
        .then((response) => {
            if (!response.ok){
                setProducts_available(false)
            }
            var products = response.data["data"]
            console.log(products)
            setProducts_list(products)
            setCurrentProduct(products[0])
            setProducts_available(true)
            console.log("BB")
        })
        }
        catch{
            console.log("Stopped, may reload or not.")
            setProducts_available(false)
            getProductsByHub()
        }
    }

    var changeCurrentProduct = () => {
        console.log("Clicked")
        console.log(currentProductRef.current.value)
        let each = products_list.find(product => product.pdtToken === currentProductRef.current.value);
        console.log(each)
        setCurrentProduct(each)
    }

    var updatePaymentPlan = () => {
        if (paymentOptionRef.current.value !== "Outright Payment"){
            setOutright_payment(false)
        }
        else{
            setOutright_payment(true)
        }
    }

    useEffect(() => {
        getProductsByHub()
    }, [hubChanged])
    
    useEffect(() => {
        console.log(hubChanged, "lola")
        getHubsList()
    }, [])

    
    return (
        <CustomModal 
            showModal={showModal} 
            openModal={openModal} 
            closeModal={closeModal}
            title="Add Sales"
         >
            <img src={addSalesImage} alt="Add Sales" />

            <div className='w-full my-3 px-4'>
                <div className='my-3'>
                    <Label value='Select Hub' htmlFor='hub' />
                    <Select id='hub' className='flex-grow' ref={currentHubRef} onChange={(event) => setHubChanged(hubChanged+1) }>
                        {hub_available &&
                            hubs_list.map((hub, key) => (
                                <option value={hub["hubToken"]} key={hub["hubToken"]} className='active:bg-c-lightgreen hover:bg-c-lightgreen my-1'>{hub["hubName"]}</option>
                            ))
                        }
                    </Select>
                </div>
                
                <div className=' my-3'>
                    <Label value='Select Product' htmlFor='product' />
                    <Select id='product' className='flex-grow' ref={currentProductRef} onChange={changeCurrentProduct}>
                    {!products_available &&
                            <option  className='active:bg-c-lightgreen hover:bg-c-lightgreen my-1'></option>
                    }
                    {
                            products_list?.map((product, key) => (
                                <option value={product["pdtToken"]} key={product["pdtToken"]} className='active:bg-c-lightgreen hover:bg-c-lightgreen my-1'>{product["pdtName"]}</option>
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
                        <option>Outright Payment</option>
                        <option>3 months</option>
                        <option>6 months</option>
                        <option>9 months</option>
                        <option>12 months</option>
                    </Select>
                </div>
                {!outright_payment &&
                    (<>
                    <div className='my-3'>
                        <Label value='Down Payment' htmlFor='downpayment' />
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='downpayment' type='text' />
                    </div>
                    <div className='my-3'>
                        <Label value='Monthly Payment' htmlFor='monthlypayment' />
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='monthlypayment' type='text' />
                    </div>
                    </>)
                }
                
                <div className="flex gap-2">
                    <Checkbox id="mark_recurring_payment" className="w-6 h-6"/>
                    <Label value="Mark as recurring payment" htmlFor="mark_recurring_payment" />

                </div>
                <div className='my-3'>
                    <Button className='w-full bg-c-lightgreen' onClick={submitToAddSales}>Submit</Button>
                    {showModal2 && <UploadComplete showModal={showModal2} openModal={()=>setShowModal2(true)} closeModal={()=>setShowModal2(false)}/>}
                </div>
            </div>
        </CustomModal>
    );
}

export default AddSalesModal;
