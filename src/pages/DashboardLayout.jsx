import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navigation from '../components/Navigation';

const DashboardLayout = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className='flex flex-col md:flex-row mb-10'>
      <div className={`fixed inset-0 z-20 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex`}>
        <Sidebar closeSidebar={toggleSidebar}/>
      </div>

      <div className='flex-grow p-3'>
        <Navigation toggleSidebar={toggleSidebar}/>
        <div className='pt-3'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
