import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Purpose from './Pages/Purpose'
import Company from './Pages/Company'
import Donate from './Pages/Donate'
import Donation from './Pages/Donation'
import Terms from './Pages/Terms'
import Policy from './Pages/Policy'
import Contact from './Pages/Contact'
import DonatePage from './Pages/DonatePage'

function App() {

  return (
    <>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
