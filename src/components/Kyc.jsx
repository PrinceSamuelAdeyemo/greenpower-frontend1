import { Button, Checkbox, FileInput, Label, Select } from 'flowbite-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Kyc = () => {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col items-center  min-h-screen space-y-6 p-6'>
            <p className='text-xl font-bold'>Verify your KYC</p>

            <div className="flex items-center relative w-full justify-center">
                <div className="relative z-10 rounded-full bg-green-500 h-8 w-8 flex justify-center items-center text-white">1</div>
                <div className="absolute left-1/2 transform -translate-x-1/2 h-px bg-green-200 w-96"></div>
                <div className="relative z-10 rounded-full bg-green-200 h-8 w-8 flex justify-center items-center text-white ml-32">2</div>
            </div>

            <div className='text-center'>
                <p className='font-bold'>Upload a proof of your identity</p>
                <p className='text-sm'>Green power requires a valid government issued ID (Drivers license, passport, national ID)</p>
            </div>

            <form className='flex gap-10'>
                <div>
                    <Label htmlFor='' value='Your state' />
                    <Select className='w-64 border border-green-500 mt-2'>
                        <option>Select your state</option>
                    </Select>
                </div>
                <div>
                    <Label value='Document Type' />
                    <Select className='w-64 border border-green-500 mt-2'>
                        <option>Select a document type</option>
                    </Select>
                </div>
            </form>

            <div className='flex justify-center items-center gap-10'>
                <div className="flex flex-col justify-center items-center border-2 border-dashed border-green-500 p-6 w-64">
                    <p className='text-sm font-bold'>Front side of your document</p>
                    <p className='text-xs'>Upload the front side of your document</p>
                    <p className='text-xs'>Supports: JPGs, PNG, PDF</p>
                    <FileInput className='mt-2'/>
                </div>
                <div className="flex flex-col justify-center items-center border-2 border-dashed border-green-500 p-6 w-64">
                    <p className='text-sm font-bold'>Back side of your document</p>
                    <p className='text-xs'>Upload the back side of your document</p>
                    <p className='text-xs'>Supports: JPGs, PNG, PDF</p>
                    <FileInput className='mt-2'/>
                </div>
            </div>

            <div className='flex items-center space-x-2 mt-4'>
                <Checkbox />
                <span className='text-xs font-bold'>I can confirm that I uploaded a valid government issued ID. This ID includes my picture, signature, name, date of birth, and address.</span>
            </div>
            <div className='w-full flex justify-center'>
                <Button className='bg-green-500 text-white w-2/3' onClick={()=>navigate("/settings/kyc/address")}>Continue</Button>
            </div>
        </div>
    );
}

export default Kyc;
