import React from 'react'
import { useNavigate } from 'react-router-dom'
import hubvectorpic from "../assets/hubVector.png"


const HubDisplay = ({hub}) => {

  var user_token = hub["userToken"]
  var hub_id = hub["id"]
  var hub_name = hub["hubName"]
  var hub_token = hub["hubToken"]

  var navigate = useNavigate()

  const openHub = (hubtoken) => {
    navigate(`/salesrecord/${hub_name}`, {state: {"data": {
      "hub_token": hub_token,
      "hub_name": hub_name
    }}});
  }

  return (
    <div onClick={openHub} className='bg-c-lightgreen text-white w-[14rem] h-[8rem] rounded-xl relative'>
        <img className='w-[50%]' src={hubvectorpic} alt="" />
        <p className='absolute top-1/3 right-4 text-md font-semibold'>{hub_name} Hub</p>
    </div>
  )
}

export default HubDisplay