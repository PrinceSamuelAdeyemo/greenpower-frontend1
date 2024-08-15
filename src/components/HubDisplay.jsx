import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Popover } from "flowbite-react"
import hubvectorpic from "../assets/hubVector.png"
import { FaEllipsisV } from "react-icons/fa"
import hubs_api from '../utils/hubs_api'


const HubDisplay = ({hub, hubsData}) => {

  var user_token = hub["userToken"]
  var hub_id = hub["id"]
  var hub_name = hub["hubName"]
  var hub_token = hub["hubToken"]

  var navigate = useNavigate()

  const openHub = () => {
    navigate(`/salesrecord/${hub_name}`, {state: {"data": {
      "hub_token": hub_token,
      "hub_name": hub_name
    }}});
  }

  const deleteHub = (event) => {
    event.stopPropagation()
    console.log("Clicked, but will pop over still come on?")
     
    try{
      console.log("About to send ", hub["hubToken"])
      hubs_api.post("/deleteHub.php", {
      "hubToken": hub["hubToken"]
    })
    .then((response) => {
        console.log(response.data)
        console.log(response.data["status_code"])
        if (response.data["status_code"] == 200){
            hubsData()
        }
        else{
            
        }
    })
    }catch (error) {
        console.log(error)
    }
 
  }

  return (
    <div onClick={openHub} className='bg-c-lightgreen text-white w-[14rem] h-[8rem] rounded-xl relative'>
        <Popover
          aria-labelledby = "default-popover"
          content = {
            <div>
              <Button onClick={deleteHub}>Delete</Button>
            </div>
          }
          
          arrow={false}
          >
            <Button onClick={(event) => (event.stopPropagation())} color="none" className='flex justify-center items-center absolute right-2 w-8 h-8'>
              <FaEllipsisV color='white' />
            </Button>
        </Popover>
        
        <img className='w-[50%]' src={hubvectorpic} alt="" />
        <p className='absolute top-1/3 right-4 text-md font-semibold'>{hub_name} Hub</p>
    </div>
  )
}

export default HubDisplay