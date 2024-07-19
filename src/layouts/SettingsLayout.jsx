import { ToggleSwitch } from 'flowbite-react'
import React, { useState } from 'react'
import { FaBell, FaEdit, FaLock, FaSignOutAlt, FaUserCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const SettingsLayout = ({ children }) => {
    const [switch1, setSwitch1] = useState(false);

    return (
        <div>
            <p className='text-2xl font-bold'>Settings</p>
            <div className='flex lg:flex-row mt-4 gap-5'>
                <div className='w-1/4'>
                    <p className='mb-4'>Account</p>
                    <div>
                        <ul>
                            <Link to="/settings"><li className='pb-3 flex items-center'>
                                <div className='flex justify-center items-center rounded hover:bg-green-600 pl-2 pr-20 py-2 gap-3'>
                                    <div className='rounded-full flex justify-center items-center bg-green-100 h-12 w-12'>
                                        <FaEdit />
                                    </div>
                                    Edit Profile
                                </div>
                            </li></Link>
                            <Link to="/settings/kyc"><li className='pb-3 flex items-center'>
                                <div className='flex justify-center items-center rounded hover:bg-green-600 pl-2 pr-20 py-2 gap-3'>
                                    <div className='rounded-full flex justify-center items-center bg-green-100 h-12 w-12'>
                                        <FaUserCheck />
                                    </div>
                                    KYC
                                </div>
                            </li></Link>
                            <li className='pb-3 flex items-center'>
                                <div className='flex justify-center items-center rounded hover:bg-green-600 pl-2 pr-20 py-2 gap-3'>
                                    <div className='rounded-full flex justify-center items-center bg-green-100 h-12 w-12'>
                                        <FaBell />
                                    </div>
                                    Notifications
                                    <ToggleSwitch checked={switch1} onChange={setSwitch1} />
                                </div>
                            </li>
                            <Link to="/settings/password"><li className='pb-3 flex items-center'>
                                <div className='flex justify-center items-center rounded hover:bg-green-600 pl-2 pr-20 py-2 gap-3'>
                                    <div className='rounded-full flex justify-center items-center bg-green-100 h-12 w-12'>
                                        <FaLock />
                                    </div>
                                    Password
                                </div>
                            </li></Link>
                            <li className='pb-3 flex items-center'>
                                <div className='flex justify-center items-center rounded hover:bg-green-600 pl-2 pr-20 py-2 gap-3'>
                                    <div className='rounded-full flex justify-center items-center bg-green-100 h-12 w-12'>
                                        <FaSignOutAlt />
                                    </div>
                                    Logout
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='w-3/4 flex flex-col justify-center items-center'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default SettingsLayout