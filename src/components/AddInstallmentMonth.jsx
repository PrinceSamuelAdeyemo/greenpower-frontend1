import React from 'react'

const AddInstallmentMonth = ({month}) => {
  return (
    <div>
        <p className="font-bold text-c-lightgreen">{month} months payment plan</p>
        <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2 mb-3'>
                <Label value='Down Payment' htmlFor='downpayment' className='w-3/4' />
                <TextInput type='text' id='downpayment' ref={downPaymentRef} className='flex-grow w-[60rem]' required />
            </div>
            <div className='flex items-center gap-2 mb-3'>
                <Label value='Installment Amount' htmlFor='installmentAmount' className='w-3/4' />
                <TextInput type='text' id='installmentAmount' ref={installmentAmountRef} className='flex-grow w-[60rem]' required />
            </div>
            <div className='flex items-center gap-2 mb-3'>
                <Label value='Installment Commission' htmlFor='installmentCommission' className='w-3/4' />
                <TextInput type='text' id='installmentCommission' ref={installmentCommissionRef} className='flex-grow w-[60rem]' required />
            </div>
        </div>
    </div>

  )
}

export default AddInstallmentMonth



