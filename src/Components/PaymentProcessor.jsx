import React, { useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useNavigate } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'
import { Tab } from '@headlessui/react'
import { CreditCardIcon, CurrencyDollarIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const PaymentProcessor = ({ amount, selectedOrg, donationType, onSuccess, onError }) => {
  const [cryptoPaymentUrl, setCryptoPaymentUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const navigate = useNavigate()

  const isRecurring = donationType !== 'one-time'

  const getPayPalPlanId = () => {
    switch(donationType) {
      case 'monthly':
        return import.meta.env.VITE_PAYPAL_MONTHLY_PLAN_ID
      case 'quarterly':
        return import.meta.env.VITE_PAYPAL_QUARTERLY_PLAN_ID
      case 'annually':
        return import.meta.env.VITE_PAYPAL_ANNUAL_PLAN_ID
      default:
        return null
    }
  }

  const createCryptoPayment = async () => {
    setLoading(true)
    try {
      // Create payment request body
      const successUrl = new URL('/thank-you', window.location.origin);
      successUrl.searchParams.append('amount', amount);
      successUrl.searchParams.append('org', selectedOrg?.name || 'Charity');
      successUrl.searchParams.append('type', donationType);

      const cancelUrl = new URL(window.location.href);

      const paymentData = {
        price_amount: amount,
        price_currency: 'usd',
        pay_currency: 'btc',
        order_id: `${Date.now()}-${selectedOrg?.name || 'charity'}`,
        order_description: `${isRecurring ? 'Recurring' : 'One-time'} donation to ${selectedOrg?.name || 'Charity'}`,
        success_url: successUrl.toString(),
        cancel_url: cancelUrl.toString(),
        ipn_callback_url: `${window.location.origin}/api/crypto-webhook` // Optional: implement if you want payment notifications
      }

      const response = await fetch('https://api.nowpayments.io/v1/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_NOWPAYMENTS_API_KEY
        },
        body: JSON.stringify(paymentData)
      })
      
      const data = await response.json()
      
      if (data.payment_url) {
        setCryptoPaymentUrl(data.payment_url)
      } else {
        throw new Error(data.message || 'Failed to create crypto payment')
      }
    } catch (error) {
      onError(error.message || 'Failed to initialize crypto payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePayPalApproval = async (data, actions) => {
    try {
      if (isRecurring) {
        const subscription = await actions.subscription.get()
        navigate(`/thank-you?amount=${amount}&org=${selectedOrg?.name}&type=${donationType}`)
        onSuccess(subscription)
      } else {
        const details = await actions.order.capture()
        navigate(`/thank-you?amount=${amount}&org=${selectedOrg?.name}&type=${donationType}`)
        onSuccess(details)
      }
    } catch (error) {
      onError('Payment failed. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      {isRecurring && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-indigo-700">
            <ArrowPathIcon className="h-5 w-5" />
            <span className="font-medium">Recurring Donation</span>
          </div>
          <p className="mt-2 text-sm text-indigo-600">
            Your donation will automatically repeat {donationType === 'monthly' ? 'every month' : 
              donationType === 'quarterly' ? 'every three months' : 'every year'}.
          </p>
        </div>
      )}

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-indigo-100 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-indigo-700 shadow'
                  : 'text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-700'
              )
            }
          >
            <div className="flex items-center justify-center space-x-2">
              <CreditCardIcon className="h-5 w-5" />
              <span>Credit Card / PayPal</span>
            </div>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-indigo-700 shadow'
                  : 'text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-700'
              )
            }
          >
            <div className="flex items-center justify-center space-x-2">
              <CurrencyDollarIcon className="h-5 w-5" />
              <span>Cryptocurrency</span>
            </div>
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="rounded-xl bg-white p-3">
            <div className="p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">
                Pay with Credit Card or PayPal
              </h3>
              <PayPalButtons
                createOrder={isRecurring ? undefined : (data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: amount,
                        currency_code: 'USD'
                      },
                      description: `One-time donation to ${selectedOrg?.name || 'Charity'}`
                    }]
                  })
                }}
                createSubscription={isRecurring ? (data, actions) => {
                  const planId = getPayPalPlanId()
                  if (!planId) {
                    onError('Invalid subscription plan. Please try again.')
                    return
                  }
                  return actions.subscription.create({
                    plan_id: planId,
                    quantity: 1,
                    application_context: {
                      brand_name: 'Compassion Aid',
                      user_action: 'SUBSCRIBE_NOW',
                      payment_method: {
                        payer_selected: 'PAYPAL',
                        payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED'
                      }
                    }
                  })
                } : undefined}
                onApprove={handlePayPalApproval}
                onError={(err) => onError('Payment failed. Please try again.')}
                style={{ layout: 'horizontal' }}
              />
            </div>
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3">
            <div className="p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Pay with Cryptocurrency</h3>
              {cryptoPaymentUrl ? (
                <div className="space-y-4">
                  <a
                    href={cryptoPaymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Complete Crypto Payment
                  </a>
                  <p className="text-sm text-gray-500 text-center">
                    A new window will open to complete your cryptocurrency payment.
                    {isRecurring && (
                      <span className="block mt-2 text-indigo-600">
                        Your donation will be automatically processed {donationType === 'monthly' ? 'monthly' : 
                          donationType === 'quarterly' ? 'every three months' : 'annually'}.
                      </span>
                    )}
                  </p>
                </div>
              ) : (
                <button
                  onClick={createCryptoPayment}
                  disabled={loading}
                  className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Initializing...
                    </>
                  ) : (
                    'Pay with Crypto'
                  )}
                </button>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default PaymentProcessor 