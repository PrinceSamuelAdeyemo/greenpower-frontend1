import React, { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Label, Select, TextInput } from 'flowbite-react';
import { FaTimes } from "react-icons/fa"
import CustomModal3 from './CustomModal3';
import addSalesImage from '../assets/addsalesImage.png';
import UploadComplete from './UploadComplete';
import AddSalesComplete from './AddSalesComplete';


import products_api from '../utils/products_api'
import hubs_api from '../utils/hubs_api';
import sales_api from '../utils/sales_api';

const UpdateHubModal = ({ showModal, openModal, closeModal, cookieDetails }) => {
    var cookieDetails = cookieDetails;

    const [showModal2, setShowModal2] = useState(false)
    const [hub_available, setHub_available] = useState(false)
    const [hubs_list, setHubs_list] = useState([])
    const [hubChanged, setHubChanged] = useState(0)

    const currentHubRef = useRef(null)

    
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

    const updateUserHub = () => {
        hubs_api.post('updateHub', {
            "userToken": "",
            "hubToken": ""
        })
        .then((response) => {
            console.log(response)
        })
    }

    useEffect(() => {
        console.log(hubChanged, "lola")
        getHubsList()
    }, [])

    
    return (
        <CustomModal3 
            showModal={showModal} 
            openModal={openModal} 
            closeModal={closeModal}
            title="Choose Hub"
            description="Kindly choose your preferred hub to proceed."
            dismissibleStatus={false}
         >

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

                <div className='w-full flex justify-center'>
                    <button className='bg-c-lightgreen text-white w-fit px-4 py-2 rounded-md'>Save</button>
                </div>
                
            </div>
        </CustomModal3>
    );
}

export default UpdateHubModal;
