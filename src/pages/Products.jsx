import React, { useEffect, useMemo, useState } from 'react'
import { FaPlus } from "react-icons/fa"

import AddHubModal from '../components/AddHubModal';
import HubDisplay from '../components/HubDisplay';

import hubs_api from '../utils/hubs_api';
import products_api from '../utils/products_api';
import sales_api from '../utils/sales_api';

const Products = (props) => {
    var cookieDetails = props.myCookie
    var userToken = cookieDetails["userToken"]

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [hubname, setHubname] = useState("")
    const [hubs_available, setHubs_available] = useState(false)
    
    const [hubs_list, setHubs_list] = useState([])

    const getSalesHistory = () => {
        try{
            sales_api.post(("getSalesByUser.php"), {
            "userToken": userToken
            })
            .then((response) => {
                if (response.data['status_code'] == 200){
                    console.log(response)
                }
            })
        }catch {
             console.log(error)
        }
        
    }
    
    var addToHub = () => {
        setShowModal(true)
    }
    var createHub = () => {
        setShowModal2(true)
        setShowModal(false)
        hubs_api.post("/createHub.php", {
            "userToken": userToken,
            "hubName": hubname.trim()
        })
        .then((response) => {
            if (response.data['status_code'] == 200){
                hubs_data()
            }
        })
    }

    var hubs_data = () => {
        hubs_api.get("/getHubs.php")
        .then((response) => {
            var hubs = response.data["data"]
            console.log(hubs)
            setHubs_available(true)
            setHubs_list(hubs)
        })
    }

    

    useEffect(() => {
        getSalesHistory()
        hubs_data()
    }, [])

  return (
    <div className=''>
        <div>
            <p className='font-bold text-2xl text-gray-500 ps-8'>Select Hub</p>
        </div>
        <div className='flex-grow h-full absolute left-0 right-0 bottom-10 bg-inherit flex justify-center items-center' >
        {!hubs_available && 
            <div className='w-40 h-40 border-3 border-c-lightgreen rounded-full flex justify-center items-center' onClick={addToHub} >
                <FaPlus size="40" title='A plus sign' color='#388F36' />
            </div>}
            {showModal && <AddHubModal hubName={hubname} setHubname={setHubname} createHub={createHub} userToken={userToken} showModal={showModal} openModal={() => setShowModal(true)} closeModal={() => setShowModal(false)} />}
        </div>

        {hubs_available && <div className='flex gap-4 flex-wrap mt-10 px-2'>
            {hubs_list.map((hub, key) => (
                <HubDisplay key={hub["id"]} hub={hub} hubtoken="" hubsData={hubs_data} />
            ))
            }
            
            <div className='flex justify-center items-center text-white w-[14rem] h-[8rem] rounded-xl relative'>
                <div className='w-[7rem] h-[7rem] border-3 border-c-lightgreen rounded-full flex justify-center items-center' onClick={addToHub} >
                    <FaPlus size="40" title='A plus sign' color='#388F36' />
                </div>
            </div>
            
            
        </div>}

        
        
    </div>
  )
}

export default Products