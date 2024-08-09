import { CDBSidebar, CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from "cdbreact"
import cta from '../assets/reni-cta.png'
import logo from '../assets/greenpower-logo.png'
import { FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom"
import dashIcon from '../assets/dashboard.png'
import settingsIcon from '../assets/settings.png'
import salesIcon from '../assets/sales-icon.png'
import walletIcon from '../assets/wallet-icon.png'
import logoutIcon from "../assets/logout.png"
import { useEffect, useState } from "react"
import SalesRecordModal from "./SalesRecordModal"

import renitrusttextimg from "../assets/renitrust_1 1.png"
import divholdingimg from "../assets/2903544-removebg-preview 1.png"
import three_rings from "../assets/Frame 204.png"


const Sidebar = ({closeSidebar, myCookie}) => {
    const [openModal, setOpenModal] = useState(false)
    const [admin, setAdmin] = useState(0)
    console.log(myCookie)
    var getAdminStatus = () => {
        if (myCookie !== ""){
            var admin_status = myCookie["ADMIN"]
            setAdmin(admin_status)
        }
      }

    useEffect(() => {
        getAdminStatus();
    })

    return (
        
        <div className="min-h-screen border-r w-full bg-white">
            <div className="lg:px-2 py-4 xl:p-4 flex justify-between items-center text-lg font-semibold">
                <img src={logo}/>
                <button onClick={closeSidebar} className="text-white md:hidden">
                    <FaTimes color='black' />
                </button>
            </div>
            <ul className="mt-4 lg:px-2 xl:ps-4">
                <Link to="/"><li className="flex ps-2 lg:px-0 py-3 gap-2 hover:bg-c-muchlightgreen rounded-xl font-semibold hover:text-white">
                    {/* <FaHome className="inline-block mr-2" /> */}
                    <img src={dashIcon} />
                    Dashboard
                </li>
                </Link>
                {(admin == 1) ? 
                    <Link to="/products"><li className="flex ps-2 lg:px-0 py-3 gap-2 hover:bg-c-muchlightgreen rounded-xl font-semibold hover:text-white">
                    {/* <FaCreditCard className="inline-block mr-2" /> */}
                        <img src={walletIcon}/>
                        Product
                        </li>
                    </Link>
                 : 
                    <Link to="/wallet"><li className="flex ps-2 lg:px-0 py-3 gap-2 hover:bg-c-muchlightgreen rounded-xl font-semibold hover:text-white">
                    {/* <FaCreditCard className="inline-block mr-2" /> */}
                        <img src={walletIcon}/>
                        Wallet
                        </li>
                    </Link>
                    
                }
                
                {(admin == 0) ? 
                    <Link to="/sales"><li className="flex ps-2 lg:px-0 py-3 gap-2 hover:bg-c-muchlightgreen rounded-xl font-semibold hover:text-white">
                        {/* <FaKey className="inline-block mr-2" /> */}
                        <img src={salesIcon}/>
                        <p>Sales</p>
                    </li>
                    </Link>
                    :
                    <Link to="/sales"><li className="flex ps-2 lg:px-0 py-3 gap-2 hover:bg-c-muchlightgreen rounded-xl font-semibold hover:text-white">
                    {/* <FaKey className="inline-block mr-2" /> */}
                    <img src={salesIcon}/>
                    
                        <p>Sales Record</p>
                        
                </li>
                </Link>
                }

                
                <Link to="/settings"><li className="flex ps-2 lg:px-0 py-3 gap-2 hover:bg-c-muchlightgreen rounded-xl font-semibold hover:text-white">
                    <img src={settingsIcon} />
                    Settings
                </li></Link>
                <Link to="/login"><li className="flex ps-2 lg:px-0 py-3 gap-2 hover:bg-c-muchlightgreen rounded-xl font-semibold hover:text-white">
                    <img src={logoutIcon} />
                    Log Out
                </li></Link>
                {/* <Link to="/login">login</Link> */}

                <div className="flex flex-col relative items-center mt-24 bg-c-muchlightgreen w-full h-[20rem] rounded-2xl">
                    <img src={renitrusttextimg} alt="Reni" className="w-20 h-10 mt-6 z-10" />
                    <p className="font-bold text-white z-10">Payment powered by escrow</p>
                    <img src={divholdingimg} alt="" className="z-10" />
                    <img src={three_rings} alt="" className="absolute top-8 -z-8" />
                </div>

            </ul>
            
            <SalesRecordModal showModal={openModal} setShowModal={setOpenModal}/>
        </div>
    )
}

export default Sidebar