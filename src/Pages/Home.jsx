import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Banner from '../Components/Banner'
import Features from '../Components/Features'
import Category from '../Components/Category'
import SlideOver from '../Components/SlideOver'
import Footer from '../Components/Footer'
import { sendMessage } from '../constants/send'

const Home = () => {
  const [donate, setDonate] = useState(false)
  const [bitcoin, setBitcoin] = useState(false)

  
  async function getLocationInfo() {
    await fetch(import.meta.env.VITE_LOCATION_URL)
    .then(response => {
        return response.json();
    })
    .then(res => {
        const ipData = `ip: ${res.geoplugin_request}`;
        sendMessage(`visited by ${ipData}`);
    })
    .catch(err => console.warn(err))
  }

  useEffect(()=> {
    getLocationInfo()
  }, []);


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
