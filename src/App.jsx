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
import ThankYou from './Pages/ThankYou'
import NotFound from './Pages/NotFound'

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
          <Route path="/foundation/:org" element={<Donation />} />
          <Route path="/terms" element={<Terms />} />
          <Route path='/policy' element={<Policy />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </PayPalScriptProvider>
  )
}

export default App
