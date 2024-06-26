import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Purpose from './Pages/Purpose'
import Company from './Pages/Company'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Purpose" element={<Purpose />} />
          <Route path="/Company" element={<Company />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
