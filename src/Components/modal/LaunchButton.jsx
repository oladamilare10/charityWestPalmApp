import React, { useState } from 'react'
import { FiPhone } from 'react-icons/fi'
import PhoneModal from './PhoneModal'

const LaunchButton = ({ className, button, buttonText = "Request a Call" }) => {
    // check if the user has already submitted their phone number
    const hasSubmitted = localStorage.getItem('phone_collecte')
    
  const [isModalOpen, setIsModalOpen] = useState(hasSubmitted ? false : true)

  return (
    <>
      {button && <button
        onClick={() => setIsModalOpen(true)}
        className={`flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors ${className}`}
      >
        <FiPhone className="text-lg" />
        <span>{buttonText}</span>
      </button>}

      <PhoneModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default LaunchButton