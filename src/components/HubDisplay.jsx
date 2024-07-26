import React from 'react'
import hubvectorpic from "../assets/hubVector.png"

import hubs_api from '../utils/hubs_api'

const HubDisplay = ({hubname, hubtoken}) => {
  const openHub = (hubtoken) => {
    hubs_api.get("/getHubById.php")
  }

  return (
    <div className='bg-c-lightgreen text-white w-[14rem] h-[8rem] rounded-xl relative'>
        <img className='w-[50%]' src={hubvectorpic} alt="" />
        <p className='absolute top-1/3 right-4 text-md font-semibold'>{hubname}</p>
    </div>
  )
}

export default HubDisplay