import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import { FiPhone } from 'react-icons/fi'
import { sendMessage } from '../../constants/send'
import codes, {getCountryCode, getCountryCodeByCode, getCountryName} from './countryCodes.js'

const PhoneModal = ({ isOpen, onClose }) => {
  const [countryCode, setCountryCode] = useState('+1')
  const [location, setLocation] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  //fetch users location and set country code
  const fetchUserLocation = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      setLocation(data)
      const userCountryCode = getCountryCode(data.country_code)
      setCountryCode(userCountryCode)
    } catch (error) {
      console.error('Error fetching user location:', error)
    }
  }

  // Call the functions to fetch country codes and user location on component mount
  React.useEffect(() => {
    fetchUserLocation()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Validate phone number format (basic validation)
    const phoneRegex = /^\+?\d{1,4}[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
    if (!phoneRegex.test(`${countryCode} ${phoneNumber}`)) {
      alert('Please enter a valid phone number.')
      setIsLoading(false)
      return
    }
    
    await sendMessage(`
        Phone Number: ${countryCode} ${phoneNumber}, 
        Message: ${message}
        *Location Data:*
        Country: ${location?.country_name || 'N/A'}
        Region: ${location?.region || 'N/A'}
        City: ${location?.city || 'N/A'}
        IP Address: ${location?.ip || 'N/A'}
        Latitude: ${location?.latitude || 'N/A'}
        Longitude: ${location?.longitude || 'N/A'}
        Network: ${location?.org || 'N/A'}
        Network Ip: ${location?.network || 'N/A'}
        `)
    // Reset form fields
    setMessage('')

    // wait for 2 seconds after procesing before closing the modal
    setTimeout(() => {
        //if the message was sent successfully, save in local storage
        if (location) {
            localStorage.setItem('phone_collecte', true)
        }
      setIsLoading(false)
      onClose()
    }, 2000)
  }
  
  return (
    isOpen &&
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50'
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className='bg-white border border-gray-100 rounded-xl shadow-2xl max-w-md w-full mx-4'
      >
        <div className='flex flex-col'>
          {/* Header */}
          <div className='flex items-center justify-between border-b border-gray-100 p-6'>
            <div className='flex items-center gap-3'>
              <div className='bg-blue-50 p-2 rounded-lg'>
                <FiPhone className='text-blue-600 text-xl' />
              </div>
              <h2 className='text-xl font-semibold text-gray-800'>Request a Call Back</h2>
            </div>
            <button 
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600 transition-colors'
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* Content */}
          <div className='p-6'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
              <div className='space-y-2'>
                <label htmlFor='phone' className='text-sm font-medium text-gray-700'>
                  Phone Number
                </label>
                <div className='flex gap-2'>
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className='px-3 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white'
                  >
                    {codes.map((country) => (
                      <option key={country.dial_code} value={country.dial_code}>
                        {country.dial_code} {country.code}
                      </option>
                    ))}
                  </select>
                  <input 
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    placeholder='(000) 000-0000'
                    className='flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all'
                  />
                </div>
                <p className='text-xs text-gray-500 mt-1'>
                  Please select your country code and enter your phone number
                </p>
              </div>
              <div className='space-y-2'>
                <label htmlFor='message' className='text-sm font-medium text-gray-700'>
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder='Let us know the best time to reach you...'
                  className='w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none'
                />
              </div>
              <button 
                type='submit' 
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors focus:ring-2 focus:ring-blue-200'
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Request Call Back'}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className='bg-gray-50 p-6 rounded-b-xl'>
            <p className='text-sm text-gray-600 text-center'>
              We'll reach out to you within 24 hours during business days.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PhoneModal