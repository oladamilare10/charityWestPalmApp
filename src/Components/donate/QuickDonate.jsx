import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { countFormat } from '../../constants'

const quickAmounts = [10, 25, 50, 100, 250, 500]

const QuickDonate = ({ onClose, onProceed }) => {
  const [amount, setAmount] = useState('')
  const [err, setErr] = useState(null)

  const handleQuickAmount = (amt) => {
    setAmount(amt)
    setErr(null)
  }

  const handleProceed = () => {
    if (!amount) {
      setErr('Please select or enter an amount')
      return
    }
    onProceed(amount)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Quick Donate</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
                    ${amount === amt 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
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
                  type="number"
                  name="custom-amount"
                  id="custom-amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(Number(e.target.value))
                    setErr(null)
                  }}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                />
              </div>
            </div>

            {err && (
              <p className="text-sm text-red-600">{err}</p>
            )}

            <button
              onClick={handleProceed}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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