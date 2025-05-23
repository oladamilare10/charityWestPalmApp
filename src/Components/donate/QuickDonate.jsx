import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { countFormat } from '../../constants'
import { useNavigate } from 'react-router-dom'

const quickAmounts = [10, 25, 50, 100, 250, 500]
const MIN_AMOUNT = 10

const QuickDonate = ({ onClose }) => {
  const [amount, setAmount] = useState('')
  const [err, setErr] = useState(null)
  const navigate = useNavigate()

  const handleQuickAmount = (amt) => {
    setAmount(amt.toString())
    setErr(null)
  }

  const handleProceed = () => {
    if (!amount) {
      setErr('Please select or enter an amount')
      return
    }

    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount < MIN_AMOUNT) {
      setErr(`Minimum donation amount is $${MIN_AMOUNT}`)
      return
    }

    // Close the modal
    onClose()

    // Redirect to the donation page with the amount
    navigate(`/donate?amount=${numAmount.toFixed(2)}`)
  }

  const handleCustomAmount = (e) => {
    const value = e.target.value
    
    // Allow empty input for clearing
    if (value === '') {
      setAmount('')
      setErr(null)
      return
    }

    // Only allow numbers and one decimal point
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value)
      setErr(null)

      // Show error if below minimum, but still allow input
      const numValue = parseFloat(value)
      if (!isNaN(numValue) && numValue < MIN_AMOUNT) {
        setErr(`Minimum donation amount is $${MIN_AMOUNT}`)
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleProceed()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Quick Donate</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close donation modal"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleQuickAmount(amt)}
                  className={`py-3 px-4 text-sm font-semibold rounded-lg transition-colors
                    ${amount === amt.toString()
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  aria-label={`Donate $${countFormat.format(amt)}`}
                >
                  ${countFormat.format(amt)}
                </button>
              ))}
            </div>

            <div>
              <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700">
                Other Amount
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  name="custom-amount"
                  id="custom-amount"
                  value={amount}
                  onChange={handleCustomAmount}
                  onKeyPress={handleKeyPress}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  aria-label="Enter custom donation amount"
                  inputMode="decimal"
                />
              </div>
            </div>

            {err && (
              <p className="text-sm text-red-600" role="alert">{err}</p>
            )}

            <button
              onClick={handleProceed}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default QuickDonate