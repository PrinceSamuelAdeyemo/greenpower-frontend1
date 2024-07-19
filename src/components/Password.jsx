import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'

const Password = () => {
  return (
    <div className='w-96'>
      <p className='text-lg font-bold mb-6'>Edit Password</p>
      <div className='mb-3'>
        <Label htmlFor='oldPassword' value='Enter Old Password'/>
        <TextInput id='oldPassword' placeholder='Enter Old Password'/>
      </div>
      <div className='mb-3'>
        <Label htmlFor='newPassword' value='Enter New Password'/>
        <TextInput id='newPassword' placeholder='Enter New Password'/>
      </div>
      <div className='mb-3'>
        <Label htmlFor='cNewPassword' value='Confirm New Password'/>
        <TextInput id='cNewPassword' placeholder='Confirm New Password'/>
      </div>
      <Button className='w-full text-white bg-green-500'>Save</Button>
    </div>
  )
}

export default Password
