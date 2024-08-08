import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import Navigation from '../components/Navigation';

const DashboardLayout = ({children}) => {
    const navigate = useNavigate()

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [test, setTest] = useState('')
    const [cookieDetails, setCookieDetails] = useState({
      "firstName": "",
      "lastName": "",
      "phoneNumber": "",
      "userToken": "",
      "email": "",
    })
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  var getUserDetails = () => {
    var logged_in = false;
    if (cookieDetails["userToken"] == ""){
      var cookie_object = document.cookie.split(";")
      console.log(cookie_object.includes("GREENPOWER_USERDETAILS"))
      for (var i = 0; i < cookie_object.length; i++){
        if (cookie_object[i].includes("GREENPOWER_USERDETAILS=")){
          console.log(cookie_object[i].includes("GREENPOWER_USERDETAILS="))
          var cookie_values = JSON.parse(cookie_object[i].split("=")[1])
          console.log(cookie_values)
          setTest(cookie_values["userToken"])
          setCookieDetails((prevValues) => ({
            ...prevValues, "firstName": cookie_values["firstName"], "lastName": cookie_values["lastName"], "phoneNumber": cookie_values["phoneNumber"], "userToken": cookie_values["userToken"], "email": cookie_values["email"], "admin_status": cookie_values["ADMIN"]
          }))
          logged_in = true
          break;
        }
        else{
          //logged_in = false
          //navigate("/login")
        }
        if (logged_in == false){
          //navigate("/login")
        }
      }
    }
    
  }

  useEffect(() => {
    getUserDetails()
  }, [cookieDetails])

  // Clone each child and pass the cookie as a prop
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
        return React.cloneElement(child, { myCookie: cookieDetails });
    }
    return child;
  });


  return (
    <div className='flex flex-col md:flex-row mb-10 overflow-x-hidden w-full bg-whitesmoke relative'>
      <div className={`fixed md:w-[20%] xl:w-[20%] inset-0 z-20 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex`}>
        <Sidebar myCookie={cookieDetails} closeSidebar={toggleSidebar}/>
      </div>

      <div className='flex-grow lg:px-1 pb-1 xl:px-3 xl:pb-3 lg:w-[80%] xl:w-[80%]'>
        <Navigation toggleSidebar={toggleSidebar}/>
        <div className='pt-3'>
          {childrenWithProps}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
