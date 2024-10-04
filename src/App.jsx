import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Purpose from './Pages/Purpose'
import Company from './Pages/Company'
import Donate from './Pages/Donate'
import Donation from './Pages/Donation'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charityWestPalmApp" element={<Home />} />
          <Route path="/Purpose" element={<Purpose />} />
          <Route path="/Company" element={<Company />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donate/:org" element={<Donation />} />
          <Route path="/terms" element={<Donation />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
