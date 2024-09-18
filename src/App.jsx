import { useState } from 'react'

import './App.css'
import Sidebar from './components/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Wallet from './pages/Wallet'
import SalesRecord from './pages/SalesRecord'
import UserWeightedPoints from './pages/UserWeightedPoints'
import Settings from './pages/Settings'
import SettingsLayout from './layouts/SettingsLayout'
import EditProfile from './components/EditProfile'
import Kyc from './components/Kyc'
import KycAddress from './components/KycAddress'
import Password from './components/Password'
import Signup1 from './pages/Signup1'
import Signup2 from './pages/Signup2'
import Signin from './pages/Signin'
import ForgotPassword from './pages/ForgotPassword'


import AdminDashboard from './pages/AdminDashboard'
import Products from "./pages/Products"
import AddProduct from './pages/AddProduct'
import ProductHubListing from './pages/ProductHubListing'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup1 />} />
        <Route path='/proceed-signup' element={<Signup2 />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/resetpassword' element={<ForgotPassword />} />
        <Route path="/" element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }/>

        <Route path="/products" element={
          <DashboardLayout>
            <Products/>
          </DashboardLayout>
        }/>
        <Route path="/wallet" element={
          <DashboardLayout>
            <Wallet/>
          </DashboardLayout>
        }/>
        
        <Route path="/sales" element={
          <DashboardLayout>
            <SalesRecord/>
          </DashboardLayout>
        }/>
        
        <Route path="/sales/user/wp" element={
          <DashboardLayout>
            <UserWeightedPoints/>
          </DashboardLayout>
        }/>
        <Route path="/settings" element={
          <DashboardLayout>
            <Settings/>
          </DashboardLayout>
        }/>
        <Route path="/settings/kyc" element={
          <DashboardLayout>
            <SettingsLayout>
              <Kyc/>
            </SettingsLayout>
          </DashboardLayout>
        }/>
        <Route path="/settings/kyc/address" element={
          <DashboardLayout>
            <SettingsLayout>
              <KycAddress/>
            </SettingsLayout>
          </DashboardLayout>
        }/>
        <Route path="/settings/password" element={
          <DashboardLayout>
            <SettingsLayout>
              <Password/>
            </SettingsLayout>
          </DashboardLayout>
        }/>
        
        <Route path="/admin_addproducts" element={
          <DashboardLayout>
            <AddProduct/>
          </DashboardLayout>
        }/>
        <Route path="/salesrecord/:hubName" element={
          <DashboardLayout>
            <ProductHubListing/>
          </DashboardLayout>
        }/>
        
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
