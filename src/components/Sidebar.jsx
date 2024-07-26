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
import { useState } from "react"
import SalesRecordModal from "./SalesRecordModal"
const Sidebar = ({closeSidebar}) => {
    const [openModal, setOpenModal] = useState(false)
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
                <Link to="/wallet"><li className="flex ps-2 lg:px-0 py-3 gap-2 hover:bg-c-muchlightgreen rounded-xl font-semibold hover:text-white">
                    {/* <FaCreditCard className="inline-block mr-2" /> */}
                    <img src={walletIcon}/>
                    Wallet
                </li>
                </Link>
                <Link to="/sales"><li className="flex ps-2 lg:px-0 py-3 gap-2 hover:bg-c-muchlightgreen rounded-xl font-semibold hover:text-white">
                    {/* <FaKey className="inline-block mr-2" /> */}
                    <img src={salesIcon}/>
                    Sales
                </li>
                </Link>
                <Link to="/settings"><li className="flex ps-2 lg:px-0 py-3 gap-2 hover:bg-c-muchlightgreen rounded-xl font-semibold hover:text-white">
                    <img src={settingsIcon} />
                    Settings
                </li></Link>
                <Link to="/logout"><li className="flex ps-2 lg:px-0 py-3 gap-2 hover:bg-c-muchlightgreen rounded-xl font-semibold hover:text-white">
                    <img src={logoutIcon} />
                    Log Out
                </li></Link>
                <Link to="/login">login</Link>

            </ul>
            <SalesRecordModal showModal={openModal} setShowModal={setOpenModal}/>
        </div>
    )
}

export default Sidebar