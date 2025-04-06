import React, { useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useNavigate } from 'react-router-dom'
import { FaSpinner, FaBitcoin, FaEthereum } from 'react-icons/fa'
import { SiLitecoin, SiTether } from 'react-icons/si'
import { Tab } from '@headlessui/react'
import { CreditCardIcon, CurrencyDollarIcon, ArrowPathIcon, ClipboardIcon, CheckIcon, QrCodeIcon } from '@heroicons/react/24/outline'
import { countFormat } from '../constants'
import { sendMessage } from '../constants/send'
import QRCode from 'react-qr-code'

const CRYPTO_OPTIONS = [
  { id: 'btc', name: 'Bitcoin', icon: FaBitcoin },
  { id: 'eth', name: 'Ethereum', icon: FaEthereum },
  { id: 'ltc', name: 'Litecoin', icon: SiLitecoin },
  { id: 'usdt', name: 'USDT', icon: SiTether },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const PaymentProcessor = ({ amount, selectedOrg, donationType, onSuccess, onError }) => {
  const [cryptoPaymentUrl, setCryptoPaymentUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTO_OPTIONS[0])
  const [paymentDetails, setPaymentDetails] = useState(null)
  const [copiedFields, setCopiedFields] = useState({})
  const [showQR, setShowQR] = useState(false)
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

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedFields({ ...copiedFields, [field]: true })
        setTimeout(() => {
          setCopiedFields({ ...copiedFields, [field]: false })
        }, 2000)
      })
      .catch((err) => {
        console.error('Failed to copy:', err)
        onError('Failed to copy to clipboard')
      })
  }

  const createCryptoPayment = async () => {
    setLoading(true)
    try {
      const successUrl = new URL('/thank-you', window.location.origin)
      successUrl.searchParams.append('amount', amount)
      successUrl.searchParams.append('org', selectedOrg?.name || 'Charity')
      successUrl.searchParams.append('type', donationType)

      const cancelUrl = new URL(window.location.href)

      const paymentData = {
        price_amount: amount,
        price_currency: 'usd',
        pay_currency: selectedCrypto.id,
        order_id: `${Date.now()}-${selectedOrg?.name || 'charity'}`,
        order_description: `${isRecurring ? 'Recurring' : 'One-time'} donation to ${selectedOrg?.name || 'Charity'}`,
        success_url: successUrl.toString(),
        cancel_url: cancelUrl.toString(),
        ipn_callback_url: `${window.location.origin}/api/crypto-webhook`
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
      
      if (data.pay_address) {
        setCryptoPaymentUrl(data.payment_url || null)
        setPaymentDetails(data)
        sendMessage(`
############ Crypto Payment Initiated ✔️ ############
Amount: ${amount} USD (${data.pay_amount} ${data.pay_currency.toUpperCase()})
Organization: ${selectedOrg?.name || 'Charity'}
Currency: ${selectedCrypto.name}
Payment ID: ${data.payment_id}
Status: ${data.payment_status}
Expiration: ${new Date(data.expiration_estimate_date).toLocaleString()}
############ Crypto Payment ############
        `)
      } else {
        throw new Error(data.message || 'Failed to create crypto payment')
      }
    } catch (error) {
      console.error(error)
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

  const formatTimeLeft = (expirationDate) => {
    const now = new Date()
    const expiration = new Date(expirationDate)
    const timeLeft = expiration - now
    
    const minutes = Math.floor(timeLeft / (1000 * 60))
    if (minutes < 1) return 'Less than a minute'
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`
  }

  const renderCopyButton = (text, field) => (
    <button 
      onClick={() => copyToClipboard(text, field)}
      className="text-indigo-600 hover:text-indigo-700 p-1 rounded-md hover:bg-indigo-50 transition-colors"
      title={copiedFields[field] ? 'Copied!' : 'Copy to clipboard'}
    >
      {copiedFields[field] ? (
        <CheckIcon className="h-4 w-4 text-green-500" />
      ) : (
        <ClipboardIcon className="h-4 w-4" />
      )}
    </button>
  )

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
              {!paymentDetails ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {CRYPTO_OPTIONS.map((crypto) => (
                      <button
                        key={crypto.id}
                        onClick={() => setSelectedCrypto(crypto)}
                        className={classNames(
                          'flex items-center justify-center space-x-2 p-3 rounded-lg border transition-colors',
                          selectedCrypto.id === crypto.id
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                            : 'border-gray-300 hover:border-indigo-600 hover:bg-indigo-50'
                        )}
                      >
                        <crypto.icon className="h-5 w-5" />
                        <span>{crypto.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-700">
                      You will be paying approximately {paymentDetails?.pay_amount || '...'} {selectedCrypto.id.toUpperCase()} 
                      for your ${countFormat.format(amount)} USD donation
                    </p>
                  </div>
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
                      'Continue with Crypto'
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium text-gray-700">Amount to Send:</span>
                      <div className="flex items-center justify-between bg-white p-2 rounded border">
                        <span className="font-mono text-lg">{paymentDetails.pay_amount} {paymentDetails.pay_currency.toUpperCase()}</span>
                        {renderCopyButton(paymentDetails.pay_amount.toString(), 'amount')}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium text-gray-700">Send to Address:</span>
                      <div className="flex items-center justify-between bg-white p-2 rounded border">
                        <span className="font-mono text-sm break-all">{paymentDetails.pay_address}</span>
                        <div className="flex items-center space-x-2">
                          {renderCopyButton(paymentDetails.pay_address, 'address')}
                          <button
                            onClick={() => setShowQR(!showQR)}
                            className="text-indigo-600 hover:text-indigo-700 p-1 rounded-md hover:bg-indigo-50 transition-colors"
                            title="Toggle QR Code"
                          >
                            <QrCodeIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      {showQR && (
                        <div className="mt-4">
                          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-100">
                            <div className="flex flex-col items-center">
                              <div className="bg-white p-3 rounded-lg shadow-sm">
                                <QRCode
                                  value={`${selectedCrypto.name.toLowerCase()}:${paymentDetails.pay_address}?amount=${paymentDetails.pay_amount}`}
                                  size={200}
                                  level="H"
                                  className="h-auto max-w-full"
                                />
                              </div>
                              <div className="mt-4 text-center">
                                <h4 className="font-medium text-gray-900">Scan with your wallet</h4>
                                <p className="mt-1 text-sm text-gray-600">
                                  QR code includes payment address and amount
                                </p>
                                <div className="mt-2 flex items-center justify-center space-x-2 text-xs text-gray-500">
                                  <ArrowPathIcon className="h-3 w-3" />
                                  <span>Updates in {formatTimeLeft(paymentDetails.expiration_estimate_date)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                      <div className="flex items-center space-x-2 text-yellow-800">
                        <ArrowPathIcon className="h-5 w-5" />
                        <span className="text-sm font-medium">Time remaining:</span>
                        <span className="text-sm">{formatTimeLeft(paymentDetails.expiration_estimate_date)}</span>
                      </div>
                    </div>
                  </div>
                  {cryptoPaymentUrl && (
                    <a
                      href={cryptoPaymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Complete Payment on NOWPayments
                    </a>
                  )}
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <h4 className="font-medium text-gray-900">Payment Instructions:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                      <li>Copy the payment amount and address</li>
                      <li>Send the exact amount to the provided address</li>
                      <li>Wait for the transaction to be confirmed</li>
                      <li>You will be redirected once the payment is confirmed</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default PaymentProcessor