import React from 'react'
import hubvectorpic from "../assets/hubVector.png"

const HubDisplay = ({hubname}) => {
  return (
    <div className='bg-c-lightgreen text-white w-[14rem] h-[8rem] rounded-xl relative'>
        <img className='w-[50%]' src={hubvectorpic} alt="" />
        <p className='absolute top-1/3 right-4 text-md font-semibold'>{hubname}</p>
    </div>
  )
}

export default HubDisplay