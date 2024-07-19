import { Button, FileInput, Label, Select, TextInput } from 'flowbite-react'
import React from 'react'

const KycAddress = () => {
    return (
        <div className='flex flex-col items-center ml-4 min-h-screen space-y-6 p-6'>
            <p className='text-xl font-bold'>Verify your KYC</p>

            <div className="flex items-center relative w-full justify-center">
                <div className="relative z-10 rounded-full bg-green-200 h-8 w-8 flex justify-center items-center text-white">1</div>
                <div className="flex-grow h-px bg-green-200 "></div>
                <div className="relative z-10 rounded-full bg-green-500 h-8 w-8 flex justify-center items-center text-white">2</div>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <p className='font-bold text-lg'>Update Home Address</p>
                <p className='text-sm font-bold'>Please type in your actual home address, not P.O Box</p>
            </div>
            <div className='w-full'>
                <form>
                    <div className='mb-2'>
                        <Label htmlFor='homeAddress' value='Home Address' />
                        <TextInput id='homeAddress' className='w-full' />
                    </div>
                    <div className='mb-2'>
                        <Label htmlFor='lga' value='LGA' />
                        <Select>
                            <option>Select one</option>
                        </Select>
                    </div>
                    <div className='mb-2'>
                        <Label htmlFor='state' value='State' />
                        <Select>
                            <option>Select one</option>
                        </Select>
                    </div>
                    <div className='mb-2'>
                        <Label htmlFor='docType' value='DocumentType' />
                        <Select>
                            <option>Select document type</option>
                        </Select>
                    </div>
                    <div className='mb-2'>
                        <Label htmlFor='proof' value='Upload proof (E.g Utility Bill)' />
                        <FileInput id='proof' />
                        <span className='text-xs font-bold'>Maximum file size:5MB</span>
                    </div>
                </form>
                <div >
                    <Button className='w-full bg-green-500 text-white'>Save</Button>
                </div>
            </div>
        </div>
    )
}

export default KycAddress
