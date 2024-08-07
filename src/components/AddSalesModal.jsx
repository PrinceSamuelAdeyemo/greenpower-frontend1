import React, { useEffect, useRef, useState } from 'react';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { FaTimes } from "react-icons/fa"
import CustomModal from './CustomModal';
import addSalesImage from '../assets/addsalesImage.png';
import UploadComplete from './UploadComplete';


import products_api from '../utils/products_api'
import hubs_api from '../utils/hubs_api';

const AddSalesModal = ({ showModal, openModal, closeModal }) => {
    const [showModal2, setShowModal2] = useState(false)
    const [data_available, setData_available] = useState(false)
    const [hubs_list, setHubs_list] = useState([])
    const [products_list, setProducts_list] = useState([])

    const productNameRef = useRef(null)

    const handleClick =() =>{
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
            setData_available(true)
            setHubs_list(hubs)
        })
    }

    var getProducts = () => {
        products_api.get("/getProducts.php")
        .then((response) => {
            var products = response.data["data"]
            setProducts_list(products)
            console.log(products)
        })
    }
    
    

    useEffect(() => {
        getHubsList()
        getProducts()
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
                    <Select id='hub' className='flex-grow'>
                    
                        {data_available &&
                            hubs_list.map((hub, key) => (
                                <option value="" className='active:bg-c-lightgreen hover:bg-c-lightgreen my-1'>{hub["hubName"]}</option>
                            ))
                        }
                    </Select>
                </div>
                
                <div className=' my-3'>
                    <Label value='Select Product' htmlFor='product' />
                    <Select id='product' className='flex-grow' ref={productNameRef}>
                    {data_available &&
                            products_list.map((product, key) => (
                                <option value="" className='active:bg-c-lightgreen hover:bg-c-lightgreen my-1'>{product["pdtName"]}</option>
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
                    <Select id='paymentOption' className='flex-grow'>
                        <option></option>
                    </Select>
                </div>
                <div className='my-3'>
                    <Button className='w-full bg-c-lightgreen' onClick={handleClick}>Submit</Button>
                    {showModal2 && <UploadComplete showModal={showModal2} openModal={()=>setShowModal2(true)} closeModal={()=>setShowModal2(false)}/>}
                </div>
            </div>
        </CustomModal>
    );
}

export default AddSalesModal;
