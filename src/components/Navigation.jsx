import { Avatar, TextInput } from 'flowbite-react';
import React from 'react';
import { FaBars, FaBell, FaEllipsisV, FaSearch } from 'react-icons/fa';

import profilePic from "../assets/Rectangle 37.png"

const Navigation = ({ myCookie, toggleSidebar }) => {
    const switchRole = () => {
        if (myCookie["can_switch"] === 1){
            let admin_status = JSON.parse(localStorage.dataValue)
            if (admin_status["ADMIN"] === 1){
                admin_status["ADMIN"] = 0
                localStorage.dataValue = JSON.stringify(admin_status)
                window.location.reload()
            }
            else{
                admin_status["ADMIN"] = 1
                localStorage.dataValue = JSON.stringify(admin_status)
                window.location.reload()
            }
        }
    }

    return (
        <div className="bg-white w-full px-2 lg:px-0 gap-4 h-[10vh] flex justify-between items-center shadow-xl">
            <button onClick={toggleSidebar} className="text-gray-700 md:hidden">
                <FaBars />
            </button>
            <div className="flex-1 flex items-center lg:ps-7">
                <TextInput placeholder="search" icon={FaSearch} className="w-full md:w-2/3 border-1 border-c-lightgreen rounded-lg" />
            </div>
            <div className="flex gap-0 lg:gap-4 items-center ml-auto space-x-4">
                {
                    (myCookie["can_switch"] === 1) ?
                        <button onClick={switchRole} className='bg-c-lightgreen text-[70%]  text-white p-1 lg:text-[100%] lg:px-4 lg:py-2 rounded-md'>Switch to {(myCookie["ADMIN"] === 1) ? 'User' : 'Admin' }</button>
                     :
                     <></>
                }
                
                <img className='w-10 rounded' src={profilePic} alt="" />
                {/* <FaEllipsisV /> */}
            </div>
        </div>
    );
};

export default Navigation;
