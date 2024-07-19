import { Avatar, Button, FileInput, Label, TextInput } from 'flowbite-react'
import React from 'react'

const EditProfile = () => {
    return (
        <div className=' grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className=''>
                <p>Edit your profile</p>
                <form className='mt-4'>
                    <div className='mb-2 block'>
                        <Label htmlFor='surname' value='Surname' className='text-black-500' />
                        <TextInput id='surname' required />
                    </div>
                    <div className='mb-2 block'>
                        <Label htmlFor='otherNames' value='Other names' className='text-black-500' />
                        <TextInput id='otherNames' required />
                    </div>
                    <div className='mb-2 block'>
                        <Label htmlFor='homeAddress' value='Home Address' className='text-black-500' />
                        <TextInput id='homeAddress' required />
                    </div>
                    <div className='mb-2 block'>
                        <Label htmlFor='email' value='Email' className='text-black-500' />
                        <TextInput id='email' required />
                    </div>
                    <div className='mb-2 block'>
                        <Label htmlFor='phone' value='Phone Number' className='text-black-500' />
                        <TextInput id='phone' required />
                    </div>
                    <div className='mb-2'>
                        <Button className='w-full bg-green-500 hover:bg-green-500'>Save Changes</Button>
                    </div>
                </form>
            </div>
            <div className='px-4 '>
                <Avatar size="xl" className='mb-2' />
                <FileInput />
                <p className='font-semibold text-center mt-2'>Delete Image</p>
            </div>
        </div>
    )
}

export default EditProfile
