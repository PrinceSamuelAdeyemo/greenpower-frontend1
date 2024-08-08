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
    // has the current hub token
    const [currentHub, setCurrentHub] = useState()

    const paymentOptionRef = useRef(null)
    const currentHubRef = useRef(null)
    const currentProductRef = useRef(null)

    const submitToAddSales =() =>{
        sales_api.post("/addSale.php", {
            "hubToken": currentHub,
            "userToken": cookieDetails["userToken"],
            //"pdtToken": 
        })
        closeModal()
        setShowModal2(true)
    }
    const closeMenu = () =>{
        closeModal()
    }

    const getHubsList = () => {
        hubs_api.get("/getHubs.php")
        .then((response) => {
            var hubs = response.data["data"]
            setHubs_list(hubs)
            setHub_available(true)
            setCurrentHub(hubs[0]["hubToken"])
            getProductsByHub(hubs[0]["hubToken"])
        })
    }

    var getProductsByHub = async () => {
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
            setProducts_list(products)
            setProducts_available(true)
        })
        }
        catch{
            setProducts_available(false)
        }
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
        getHubsList()
    })

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
                    <Select id='hub' className='flex-grow' ref={currentHubRef} onSelect={getProductsByHub}>
                        {hub_available &&
                            hubs_list.map((hub, key) => (
                                <option value={hub["hubToken"]} key={hub["hubToken"]} className='active:bg-c-lightgreen hover:bg-c-lightgreen my-1'>{hub["hubName"]}</option>
                            ))
                        }
                    </Select>
                </div>
                
                <div className=' my-3'>
                    <Label value='Select Product' htmlFor='product' />
                    <Select id='product' className='flex-grow' ref={currentProductRef}>
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
                        <TextInput className='flex-grow border-c-lightgreen text-c-lightgreen' id='serialNumber' type='text' />
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
