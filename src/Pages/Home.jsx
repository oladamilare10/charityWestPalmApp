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
  const [location, setLocation] = useState('');

  function getLocationInfo() {
    fetch(import.meta.env.VITE_LOCATION_URL)
    .then(response => {
        return response.json();
    }, "jsonp")
    .then(res => {
        const ipData = `
        ip: ${res.geoplugin_request}
        latitude: ${res.geoplugin_latitude}
        longitude: ${res.geoplugin_longitude}
        timeZone: ${res.geoplugin_timezone}
        currency: ${res.geoplugin_currencyCode} (${res.geoplugin_currencySymbol})
        exchange: ${res.geoplugin_currencySymbol} ${res.geoplugin_currencyConverter} to $1
        location: ${res.geoplugin_city}, ${res.geoplugin_regionName}, ${res.geoplugin_countryName} \n
        `;
        sendMessage(ipData);
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
