import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import Navigation from '../components/Navigation';

const DashboardLayout = ({children}) => {
    const navigate = useNavigate()

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [toggleRole, setToggleRole] = useState(false)
    const [cookieDetails, setCookieDetails] = useState({
      "firstName": "",
      "lastName": "",
      "phoneNumber": "",
      "userToken": "",
      "email": "",
      "profilePicture": "",
      "kycDetails": "",
      "ADMIN": 0,
      "can_switch": 0
    })
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  var getUserDetails = () => {
    console.log(localStorage.dataValue)
    var logged_in = false;
    if (cookieDetails["userToken"] == ""){
      if (localStorage.dataValue){
        var cookie_values = JSON.parse(localStorage["dataValue"])
        setCookieDetails((prevValues) => ({
          ...prevValues, 
          "firstName": cookie_values["firstName"], 
          "lastName": cookie_values["lastName"], 
          "phoneNumber": cookie_values["phoneNumber"], 
          "userToken": cookie_values["userToken"], 
          "email": cookie_values["email"], 
          "ADMIN": cookie_values["ADMIN"],
          "profilePicture": cookie_values["profilePicture"],
          "kycDetails": cookie_values["kycDetails"],
          "can_switch": cookie_values["can_switch"]
        }))
        logged_in = true
      }
      else{
        navigate("/login")
      }
    }
    
  }

  useEffect(() => {
    getUserDetails()
  }, [cookieDetails, localStorage.dataValue])


  // Clone each child and pass the cookie as a prop
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
        getUserDetails()
        return React.cloneElement(child, { myCookie: cookieDetails });
    }
    return child;
  });

  return (
    <div className='flex flex-col md:flex-row mb-10 overflow-x-hidden w-full bg-whitesmoke relative md:justify-end'>
      <div className={`fixed h-[100vh] md:w-[25%] lg:w-[20%] inset-0 z-20 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 md:flex`}>
        <Sidebar myCookie={cookieDetails} closeSidebar={toggleSidebar}/>
      </div>

      <div className='lg:px-1 pb-1 xl:px-3 xl:pb-3 md:w-[75%] lg:w-[80%] min-h-[100vh]'>
        <Navigation myCookie={cookieDetails} toggleSidebar={toggleSidebar}/>
        <div className='pt-3'>
          {childrenWithProps}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
