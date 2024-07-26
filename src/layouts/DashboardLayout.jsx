import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navigation from '../components/Navigation';

const DashboardLayout = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className='flex flex-col md:flex-row mb-10 overflow-x-hidden w-full bg-whitesmoke relative'>
      <div className={`fixed md:w-[20%] xl:w-[15%] inset-0 z-20 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex`}>
        <Sidebar closeSidebar={toggleSidebar}/>
      </div>

      <div className='flex-grow lg:px-1 pb-1 xl:px-3 xl:pb-3 lg:w-[80%] xl:w-[85%]'>
        <Navigation toggleSidebar={toggleSidebar}/>
        <div className='pt-3'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
