import React, { useEffect, useState } from 'react'
import { GiCancel } from 'react-icons/gi'
import { motion } from 'framer-motion'
import { sendMessage } from '../constants/send'
import PaymentModal from './PaymentModal'



const RaiseModal = ({ setModalOperator, modalOperator, orgData }) => {
    const [err, setErr] = useState(null)
    const [pager, setPager] = useState(false)
    const [amount, setAmount] = useState(0)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [location, setLocation] = useState('');
    const [showModal, setShowModal] = useState(false)
    
    
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
            setLocation(ipData);
        })
        .catch(err => console.warn(err))
      }

    useEffect(()=> {
        getLocationInfo()
    }, []);
            const textMessage = `
    ############ Donation Form ✔️✔️✔️✔️✔️ ############
    email: ${email} \n name: ${name} \n amount: ${amount} \n message: ${message} \n\n
    userAgent: ${'os: ' + navigator.platform + ' \n '+ 'browser:' + navigator.userAgent} \n
    browser language: ${navigator.language}
    ConnectionType: ${navigator.connection.effectiveType}
    locationData: ${location}
    ############ Donation Form ############
    `;

    const data = {
        email: email,
        name: name,
        amount: amount,
        message: message,
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (email === '') {
            setErr('Email fields is required.')
            setTimeout(()=> {
                setErr(null)
            }, 5000)
            return
        }else{
            if(!pager) {
                setPager(true)
                return
            }
            if(amount === 0 || amount === '') {
                setErr('Amount field is required.')
                setTimeout(()=> {
                    setErr(null)
                }, 5000)
                return
            }else{
                sendMessage(textMessage)
                setShowModal(true)
            }
        }

    }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-40 bg-black/30 flex justify-center items-center'>
      {pager ? <motion.div
       initial={{x: '-100%'}}
       transition={{duration: .3, ease: 'linear'}}
       animate={{x: 0}}
       className='bg-white rounded-lg w-[310px] md:w-[500px] shadow-lg'>
        <div className='flex justify-between border-b w-full'>
            <div title={orgData.name} className='px-4 py-2 text-2xl truncate font-bold text-gray-600'>Donate to {orgData.name}</div>
            <button className='text-gray-600 px-4 py-2 border-l hover:text-gray-900' onClick={() => setModalOperator(!modalOperator)}>
              <GiCancel />
            </button>
        </div>
        <div className='p-4'>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Amount* {err && <span className='text-sm text-red-600'>.{err}</span>}</label>
              <input required onChange={(e)=> setAmount(e.target.value)} className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500' type='number' placeholder='0.00' />
              <div className='text-sm text-gray-600'>
                Please enter the amount you'd like to donate.
              </div>
            </div>
                <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700'>Payment Method</label>
                <select defaultValue={"crypto"} className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500'>
                    <option value='crypto'>Cryptocurrency</option>
                </select>
                </div>
                <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700'>Write a message</label>
                <textarea onChange={(e)=> setMessage(e.target.value)} className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500' type='text' placeholder='Recipient Name' />
                </div>
                <button onClick={handleSubmit} className='w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                    Donate
                </button>
            </form>
        </div>
        <div className='flex justify-center p-4 text-sm text-gray-600'>
          <span>By clicking Donate, you agree to our </span>
          <a href='/terms' target='_blank' className='text-indigo-600 underline'>Terms & Conditions</a>
        </div>
    </motion.div>: 
    
    <motion.div
       initial={{x: '-100%'}}
       transition={{duration: .3, ease: 'linear'}}
       animate={{x: 0}}
       className='bg-white rounded-lg w-[310px] md:w-[500px] shadow-lg'>
        <div className='flex justify-between border-b w-full'>
            <div title={orgData.name} className='px-4 py-2 text-2xl font-bold truncate text-gray-600'>Donate to {orgData.name}</div>
            <button className='text-gray-600 px-4 py-2 border-l hover:text-gray-900' onClick={() => setModalOperator(!modalOperator)}>
              <GiCancel />
            </button>
        </div>
        <div className='p-4'>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Name</label>
              <input onChange={(e)=> setName(e.target.value)} className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500' type='text' placeholder='Your Name' />
            </div>
            <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700'>Email Address* {err && <span className='text-sm text-red-600'>.{err}</span>}</label>
                <input onChange={(e) => setEmail(e.target.value)} className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500' type='email' placeholder='Email Address' />
                <div className='text-sm text-gray-600'>
                    Please enter a valid email.
                </div>
            </div>
                <button className='w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                    Next
                </button>
            </form>
        </div>
        <div className='flex justify-center p-4 text-sm text-gray-600'>
          <span>By clicking Donate, you agree to our </span>
          <a href='/terms' target='_blank' className='text-indigo-600 underline'>Terms & Conditions</a>
        </div>
    </motion.div>
    }
    {showModal &&<PaymentModal 
        orgData={orgData}
        textMessage={textMessage}
        data={data}
        modalOperator={showModal}
        setModalOperator={setShowModal}
    />}
    </div>
  )
}

export default RaiseModal
