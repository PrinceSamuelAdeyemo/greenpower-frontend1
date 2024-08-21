import { Avatar, TextInput } from 'flowbite-react';
import React from 'react';
import { FaBars, FaBell, FaEllipsisV, FaSearch } from 'react-icons/fa';

import profilePic from "../assets/Rectangle 37.png"

const Navigation = ({ toggleSidebar }) => {
    return (
        <div className="bg-white w-full px-2 lg:px-0 gap-4 h-[10vh] flex justify-between items-center shadow-xl">
            <button onClick={toggleSidebar} className="text-gray-700 md:hidden">
                <FaBars />
            </button>
            <div className="flex-1 flex items-center lg:ps-7">
                <TextInput placeholder="search" icon={FaSearch} className="w-full md:w-2/3 border-1 border-c-lightgreen rounded-lg" />
            </div>
            <div className="flex items-center ml-auto space-x-4">
                <img className='w-10 rounded' src={profilePic} alt="" />
                {/* <FaEllipsisV /> */}
            </div>
        </div>
    );
};

export default Navigation;
