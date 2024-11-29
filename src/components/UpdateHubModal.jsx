import React, { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Label, Select, TextInput } from 'flowbite-react';
import CustomModal3 from './CustomModal3';

import users_api from '../utils/users_api';
import hubs_api from '../utils/hubs_api';



const UpdateHubModal = ({ showModal, openModal, closeModal, userToken }) => {
    var cookieDetails = cookieDetails;

    const [hub_available, setHub_available] = useState(false)
    const [hubs_list, setHubs_list] = useState([])
    const [disabledButton, setDisabledButton] = useState(true)

    const currentHubRef = useRef(null)

    
    const getHubsList = () => {
        hubs_api.get("/getHubs.php")
        .then((response) => {
            var hubs = response.data["data"]
            setHubs_list(hubs)
            setHub_available(true)
        })
    }

    const tempUpdateUserHub = () => {
        currentHubRef.current.value === '0' ? setDisabledButton(true) : setDisabledButton(false)
    }

    const updateUserHub = () => {
        if (currentHubRef.current.value !== '0'){
            users_api.post('updateHub', {
            "userToken": userToken,
            "hubToken": currentHubRef.current.value
        })
        .then((response) => {
            console.log("Update Response",response)
            if (response.data["status_code"] === 200){
                closeModal()
            }
        })
        }
    }

    useEffect(() => {
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
                    <Select onChange={tempUpdateUserHub} id='hub' className='flex-grow' ref={currentHubRef} >
                        <option value={'0'} className='active:bg-c-lightgreen hover:bg-c-lightgreen my-1'>----</option>
                        {hub_available &&
                            hubs_list.map((hub, key) => (
                                <option value={hub["hubToken"]} key={hub["hubToken"]} className='active:bg-c-lightgreen hover:bg-c-lightgreen my-1'>{hub["hubName"]}</option>
                            ))
                        }
                    </Select>
                </div>

                <div className='w-full flex justify-center'>
                    <button onClick={updateUserHub} className='bg-c-lightgreen text-white w-fit px-4 py-2 rounded-md disabled:bg-gray-600' disabled={disabledButton}>Save</button>
                </div>
                
            </div>
        </CustomModal3>
    );
}

export default UpdateHubModal;
