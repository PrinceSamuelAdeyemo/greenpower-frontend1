import React, { useRef, useState } from 'react'
import CustomModal2 from './CustomModal2'
import { Button } from 'flowbite-react'

const SmsConfirmationModal = ({showModal, openModal, closeModal, pic}) => {
  var inputRef1 = useRef(null)
  var inputRef2 = useRef(null)
  var inputRef3 = useRef(null)
  var inputRef4 = useRef(null)
  var inputRef5 = useRef(null)

  const [inputVal1, setInputVal1] = useState()
  const [inputVal2, setInputVal2] = useState()
  const [inputVal3, setInputVal3] = useState()
  const [inputVal4, setInputVal4] = useState() 

  const changeInput = (num) => {
    switch (num) {
      case 1:
        setInputVal1(inputRef1.current.value);
        (inputRef1.current.value != "" | inputRef1.current.value != " ") ? inputRef2.current.focus() : inputRef1.current.focus()
        break;
      case 2:
        setInputVal2(inputRef2.current.value);
        (inputRef2.current.value != "" | inputRef2.current.value != " ") ? inputRef3.current.focus() : inputRef2.current.focus()
        break;
      case 3:
        setInputVal3(inputRef3.current.value);
        (inputRef3.current.value != "" | inputRef3.current.value != " ") ? inputRef4.current.focus() : inputRef3.current.focus()
        break;
      case 4:
        setInputVal4(inputRef4.current.value);
        (inputRef4.current.value != "" | inputRef4.current.value != " ") ? inputRef5.current.focus() : null
        break;
    }
  }

  

  return (
    <CustomModal2 showModal={showModal} openModal={openModal} closeModal={closeModal}>
      <div className='flex flex-col gap-4'>
        <div className='w-full flex flex-col justify-center items-center relative'>
          <img className='object-cover h-1/2 w-1/2 bg-white' src={pic} alt="" />
          <p className='font-bold text-3xl absolute bottom-0'>Email Confirmation</p>
        </div>

        <div className='flex flex-col justify-center items-center text-center gap-3'>
          <p className='w-[85%] text-xl font-medium text-center'>Hey Afolabi Seunfunmi Ayomide, you are almost ready. Simply click the big green button to verify your email address</p>
          <div className='flex gap-2'>
            <input className='text-3xl font-semibold border-x-0 border-t-0 border-b-2 border-b-c-lightgreen hover:border-0 hover:outline-none active:border-0 active:outline-none w-12 focus:border-0 focus:outline-none' type="text" ref={inputRef1} maxLength="1" onChange={(event) => changeInput(1) } />
            <input className='text-3xl font-semibold border-x-0 border-t-0 border-b-2 border-b-c-lightgreen hover:border-0 hover:outline-none active:border-0 active:outline-none w-12 focus:border-0 focus:outline-none' type="text" ref={inputRef2} maxLength="1" onChange={(event) => changeInput(2) } />
            <input className='text-3xl font-semibold border-x-0 border-t-0 border-b-2 border-b-c-lightgreen hover:border-0 hover:outline-none active:border-0 active:outline-none w-12 focus:border-0 focus:outline-none' type="text" ref={inputRef3} maxLength="1" onChange={(event) => changeInput(3) } />
            <input className='text-3xl font-semibold border-x-0 border-t-0 border-b-2 border-b-c-lightgreen hover:border-0 hover:outline-none active:border-0 active:outline-none w-12 focus:border-0 focus:outline-none' type="text" ref={inputRef4} maxLength="1" onChange={(event) => changeInput(4) } />
          </div>
          <Button className='bg-c-lightgreen w-[80%]' ref={inputRef5}>Enter</Button>
          <p className='text-c-lightgreen border-none outline-none underline'>Resend Code</p>
        </div>

      </div>
    </CustomModal2>
  )
}

export default SmsConfirmationModal