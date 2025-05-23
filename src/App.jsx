import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Home from './Pages/Home'
import Purpose from './Pages/Purpose'
import Company from './Pages/Company'
import Donate from './Pages/Donate'
import Donation from './Pages/Donation'
import Terms from './Pages/Terms'
import Policy from './Pages/Policy'
import Contact from './Pages/Contact'
import DonatePage from './Pages/DonatePage'
import Payment from './Pages/Payment'
import ThankYou from './Pages/ThankYou'
import NotFound from './Pages/NotFound'
import StaffReferral from './Pages/StaffReferral'
import StaffLinks from './Pages/StaffLinks'
import StaffDashboard from './Pages/StaffDashboard'
import Projects from './Pages/Projects'
import ChildOfHope from './Pages/ChildOfHope'
import CampaignPayment from './Pages/CampaignPayment'

const App = () => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
        vault: true,
        components: "buttons"
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charityWestPalmApp" element={<Home />} />
          <Route path="/Purpose" element={<Purpose />} />
          <Route path="/Company" element={<Company />} />
          <Route path="/foundations" element={<Donate />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/campaign-payment" element={<CampaignPayment />} />
          <Route path="/foundation/:org" element={<Donation />} />
          <Route path="/terms" element={<Terms />} />
          <Route path='/policy' element={<Policy />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/reltoken/:staffId" element={<StaffReferral />} />
          <Route path="/staff-links" element={<StaffLinks />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/child-of-hope" element={<ChildOfHope />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </PayPalScriptProvider>
  )
}

export default App
