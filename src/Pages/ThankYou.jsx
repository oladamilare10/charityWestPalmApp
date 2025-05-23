import React, { useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { countFormat } from '../constants'
import ShareButtons from '../Components/ShareButtons'
import html2canvas from 'html2canvas'

const ThankYou = () => {
  const [searchParams] = useSearchParams()
  const amount = searchParams.get('amount')
  const org = searchParams.get('org')
  const type = searchParams.get('type')
  const receiptRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const getRecurringText = () => {
    switch(type) {
      case 'monthly':
        return 'Monthly'
      case 'quarterly':
        return 'Quarterly'
      case 'annually':
        return 'Annual'
      default:
        return 'One-time'
    }
  }

  const handleShareReceipt = async () => {
    if (receiptRef.current) {
      try {
        const canvas = await html2canvas(receiptRef.current)
        const imageData = canvas.toDataURL('image/png')
        
        if (navigator.share) {
          const blob = await (await fetch(imageData)).blob()
          const file = new File([blob], 'donation-receipt.png', { type: 'image/png' })
          await navigator.share({
            title: 'My Donation Receipt',
            text: `I just donated $${countFormat.format(amount)} to ${org} through Compassion Aid!`,
            files: [file]
          })
        } else {
          // Fallback for browsers that don't support native sharing
          const link = document.createElement('a')
          link.download = 'donation-receipt.png'
          link.href = imageData
          link.click()
        }
      } catch (error) {
        console.error('Error sharing receipt:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div ref={receiptRef} className="bg-white p-8 rounded-lg shadow-lg">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto h-24 w-24 text-green-600"
            >
              <CheckCircleIcon className="h-full w-full" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Thank You for Your Donation!
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 space-y-4"
            >
              <p className="text-xl text-gray-600">
                Your {getRecurringText().toLowerCase()} donation of{' '}
                <span className="font-semibold text-gray-900">
                  ${countFormat.format(amount)}
                </span>{' '}
                to {org} has been processed successfully.
              </p>

              {type !== 'one-time' && (
                <div className="mt-4 rounded-lg bg-indigo-50 p-4">
                  <p className="text-indigo-700">
                    Your {getRecurringText().toLowerCase()} donation will automatically process{' '}
                    {type === 'monthly' ? 'every month' : 
                     type === 'quarterly' ? 'every three months' : 
                     'every year'}.
                  </p>
                </div>
              )}

              <p className="text-gray-600">
                A confirmation email has been sent to your email address.
              </p>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-500">
                  Receipt ID: {Date.now().toString(36).toUpperCase()}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {new Date().toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8"
          >
            <ShareButtons 
              title={`I just donated $${countFormat.format(amount)} to ${org} through Compassion Aid!`}
              onShareImage={handleShareReceipt}
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-12 space-y-4"
          >
            <p className="text-gray-600">
              Your generosity helps make a difference in the lives of those in need.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/"
                className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Return Home
              </Link>
              <Link
                to="/donate"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-gray-50"
              >
                Make Another Donation
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default ThankYou
