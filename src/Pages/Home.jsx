import React, { useState } from 'react'
import Header from '../Components/Header'
import Banner from '../Components/Banner'
import Features from '../Components/Features'
import Category from '../Components/Category'
import SlideOver from '../Components/SlideOver'
import Footer from '../Components/Footer'

const Home = () => {
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
      <Banner handleDonate={handleDonate} />
      {donate && <SlideOver handleDonate={handleDonate} handleBitcoin={handleBitcoin} bitcoin={bitcoin} />}
      <Features />
      <Category />
      <Footer />
    </>
  )
}

export default Home
