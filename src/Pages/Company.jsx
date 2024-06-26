import React, { useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import AboutCompany from '../Components/AboutCompany'
import SlideOver from '../Components/SlideOver'

const Company = () => {
  const [donate, setDonate] = useState(false)
  const [bitcoin, setBitcoin] = useState(false)

  const handleDonate = () => {
    if (!donate){
      setDonate(true)
    }else {
      setDonate(false)
      setBitcoin(false)
    }
  }

  const handleBitcoin = ()=> {
    if (!bitcoin){
      setBitcoin(true)
    }
  }
  return (
    <>
      <Header  handleDonate={handleDonate} />
      {donate && <SlideOver handleDonate={handleDonate} handleBitcoin={handleBitcoin} bitcoin={bitcoin} />}
      <AboutCompany />
      <Footer />
    </>
  )
}

export default Company
