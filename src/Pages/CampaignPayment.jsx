import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import QRCode from 'react-qr-code';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { sendMessage } from '../constants/send';
import { 
  CurrencyDollarIcon, 
  GiftIcon, 
  CreditCardIcon,
  ArrowPathIcon,
  ClipboardIcon
} from '@heroicons/react/24/outline';
import ShareButtons from '../Components/ShareButtons';

// Add supported cryptocurrencies
const SUPPORTED_COINS = [
  { id: 'btc', name: 'Bitcoin (BTC)', icon: '₿' },
  { id: 'eth', name: 'Ethereum (ETH)', icon: 'Ξ' },
  { id: 'ltc', name: 'Litecoin (LTC)', icon: 'Ł' },
  { id: 'usdttrc20', name: 'USDT (TRC20)', icon: '₮' },
  { id: 'usdterc20', name: 'USDT (ERC20)', icon: '₮' }
];

// Add gift card types constant after SUPPORTED_COINS
const GIFT_CARD_TYPES = [
  { id: 'apple', name: 'Apple Gift Card', icon: '🍎', format: /^[A-Z0-9]{16}$/ },
  { id: 'amazon', name: 'Amazon Gift Card', icon: '📦', format: /^[A-Z0-9]{14,15}$/ },
  { id: 'vanilla', name: 'Vanilla Gift Card', icon: '💳', format: /^[0-9]{16}$/ },
  { id: 'google', name: 'Google Play Gift Card', icon: '🎮', format: /^[A-Z0-9]{16,20}$/ },
  { id: 'playstation', name: 'PlayStation Gift Card', icon: '🎮', format: /^[A-Z0-9]{12}$/ }
];

const CoinOption = ({ coin, selected, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
    className={`cursor-pointer p-4 rounded-lg border-2 ${
      selected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`text-xl ${selected ? 'text-indigo-600' : 'text-gray-600'}`}>
        {coin.icon}
      </div>
      <div className="text-sm">
        <span className={selected ? 'text-indigo-600 font-semibold' : 'text-gray-900'}>
          {coin.name}
        </span>
      </div>
    </div>
  </motion.div>
);

const PaymentOption = ({ icon: Icon, title, description, selected, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
    className={`cursor-pointer p-6 rounded-lg border-2 ${
      selected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
    }`}
  >
    <div className="flex items-center gap-4">
      <div className={`p-2 rounded-full ${selected ? 'bg-indigo-600' : 'bg-gray-100'}`}>
        <Icon className={`h-6 w-6 ${selected ? 'text-white' : 'text-gray-600'}`} />
      </div>
      <div>
        <h3 className={`font-semibold ${selected ? 'text-indigo-600' : 'text-gray-900'}`}>
          {title}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </motion.div>
);

const CampaignPayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(searchParams.get('amount') || '');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [cashAppTag, setCashAppTag] = useState('');
  const [giftCardCode, setGiftCardCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('waiting');
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [selectedGiftCard, setSelectedGiftCard] = useState(null);

  // Add scroll to top effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCashAppTag('$CompassionAid');
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Handle timer expiration
      setPaymentData(null);
      setSelectedCoin(null);
      setError('Payment session expired. Please try again.');
    }
    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const createCryptoPayment = async () => {
    if (!selectedCoin) {
      throw new Error('Please select a cryptocurrency');
    }

    try {
      const response = await fetch('https://api.nowpayments.io/v1/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_NOWPAYMENTS_API_KEY
        },
        body: JSON.stringify({
          price_amount: parseFloat(amount),
          price_currency: 'usd',
          pay_currency: selectedCoin.id,
          order_id: `CHILD-OF-HOPE-${Date.now()}`,
          order_description: 'Donation to Child of Hope Campaign',
          ipn_callback_url: 'https://compassionaid.love/api/crypto-webhook',
          success_url: `${window.location.origin}/thank-you`,
          cancel_url: `${window.location.origin}/campaign-payment`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create payment');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error creating NOWPayments payment:', err);
      throw err;
    }
  };

  const handlePayPalApproval = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      sendMessage('New PayPal donation: $' + amount + ' - Order ID: ' + details.id);
      navigate('/thank-you', { 
        state: { 
          amount,
          method: 'PayPal',
          campaign: 'child-of-hope'
        }
      });
    } catch (err) {
      setError('Payment failed. Please try again.');
    }
  };

  const handleCryptoSubmit = async () => {
    if (!selectedCoin) {
      setError('Please select a cryptocurrency');
      return;
    }

    setLoading(true);
    try {
      const paymentData = await createCryptoPayment();
      setPaymentData(paymentData);
      setTimeLeft(20 * 60); // Reset timer to 20 minutes
      setTimerActive(true); // Start the timer
      await sendMessage('New NOWPayments crypto donation intent: $' + amount + '\nCurrency: ' + selectedCoin.name + '\nPayment ID: ' + paymentData.payment_id);
    } catch (err) {
      setError('Failed to initialize crypto payment. Please try again.');
    }
    setLoading(false);
  };

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    // Show copy feedback
    const tempError = error;
    setError('Address copied to clipboard!');
    setTimeout(() => setError(tempError), 2000);
  };

  const checkPaymentStatus = async (paymentId) => {
    setCheckingStatus(true);
    try {
      const response = await fetch(`https://api.nowpayments.io/v1/payment/${paymentId}`, {
        method: 'GET',
        headers: {
          'x-api-key': import.meta.env.VITE_NOWPAYMENTS_API_KEY
        }
      });

      if (!response.ok) {
        throw new Error('Failed to check payment status');
      }

      const data = await response.json();
      setPaymentStatus(data.payment_status);
      console.log(data);

      // Handle different payment statuses
      switch (data.payment_status) {
        case 'finished':
        case 'confirmed':
          await sendMessage('Crypto payment confirmed: $' + amount + '\nCurrency: ' + selectedCoin.name + '\nPayment ID: ' + paymentId);
          navigate('/thank-you', {
            state: {
              amount,
              method: selectedCoin.name,
              campaign: 'child-of-hope'
            }
          });
          break;
        case 'waiting':
        case 'confirming':
          setError('Payment is still being confirmed. Please wait.');
          break;
        case 'failed':
        case 'expired':
          setError('Payment failed or expired. Please try again.');
          setPaymentData(null);
          setTimerActive(false);
          break;
        default:
          setError('Unknown payment status. Please contact support.');
      }
    } catch (err) {
      setError('Failed to check payment status. Please try again.');
    } finally {
      setCheckingStatus(false);
    }
  };

  const renderCryptoPayment = () => {
    if (paymentData) {
      return (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold mb-2">Complete Your Crypto Payment</h3>
            <div className="text-sm text-gray-500">
              Payment session expires in: <span className="font-mono text-indigo-600">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <QRCode
                value={paymentData.pay_address || ''}
                size={200}
                level="M"
                className="mb-4"
              />
              <div className="flex items-center gap-2 w-full max-w-md">
                <div className="text-xs bg-white p-2 rounded border flex-1 font-mono overflow-hidden overflow-ellipsis">
                  {paymentData.pay_address}
                </div>
                <button
                  onClick={() => handleCopyAddress(paymentData.pay_address)}
                  className="p-2 text-indigo-600 hover:text-indigo-800"
                  title="Copy address"
                >
                  <ClipboardIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500">Amount to Send:</div>
                <div className="font-semibold">{paymentData.pay_amount} {selectedCoin?.id.toUpperCase()}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500">USD Value:</div>
                <div className="font-semibold">${amount}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500">Payment ID:</div>
                <div className="font-mono text-xs">{paymentData.payment_id}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500">Status:</div>
                <div className={`font-semibold ${
                  paymentStatus === 'waiting' ? 'text-indigo-600' :
                  paymentStatus === 'confirming' ? 'text-yellow-600' :
                  paymentStatus === 'confirmed' ? 'text-green-600' :
                  'text-red-600'
                }`}>
                  {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800">
              <ul className="list-disc list-inside space-y-1">
                <li>Send the exact amount shown above</li>
                <li>Payment must be sent in a single transaction</li>
                <li>The exchange rate will be locked for {formatTime(timeLeft)}</li>
                <li>After sending, click "Confirm Payment" below</li>
              </ul>
            </div>

            <button
              onClick={() => checkPaymentStatus(paymentData.payment_id)}
              disabled={checkingStatus}
              className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors ${
                checkingStatus 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-500'
              }`}
            >
              {checkingStatus ? (
                <div className="flex items-center justify-center gap-2">
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                  Checking Payment Status...
                </div>
              ) : (
                'Confirm Payment'
              )}
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderCashAppPayment = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-48 h-48 p-2 bg-white rounded-lg shadow-sm">
            <QRCode
              value={`https://cash.app/${cashAppTag}/${amount}`}
              size={176}
              level="H"
              className="w-full h-full"
            />
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold text-gray-900">Send ${amount} to:</p>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-xl font-bold text-green-600">{cashAppTag}</span>
              <button
                onClick={() => handleCopyAddress(cashAppTag)}
                className="p-1.5 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                title="Copy CashApp tag"
              >
                <ClipboardIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="w-full max-w-md space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Instructions:</h4>
              <ol className="text-sm text-green-700 space-y-2 list-decimal list-inside">
                <li>Open your CashApp mobile app</li>
                <li>Scan the QR code or search for {cashAppTag}</li>
                <li>Enter the amount: ${amount}</li>
                <li>Add "Child of Hope Campaign" in the note</li>
                <li>Tap "Pay"</li>
              </ol>
            </div>

            <button
              onClick={handleCashAppSubmit}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <ArrowPathIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Processing...
                </>
              ) : (
                'Confirm Payment Sent'
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-md bg-red-50">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );

  const handleCashAppSubmit = async () => {
    setLoading(true);
    try {
      await sendMessage('New CashApp donation intent: $' + amount + '\nTag: ' + cashAppTag);
      navigate('/thank-you', {
        state: {
          amount,
          method: 'CashApp',
          campaign: 'child-of-hope'
        }
      });
    } catch (err) {
      setError('Failed to process CashApp payment. Please try again.');
    }
    setLoading(false);
  };

  const validateGiftCard = (code, type) => {
    if (!code || !type) return false;
    return type.format.test(code.toUpperCase());
  };

  const handleGiftCardSubmit = async () => {
    setLoading(true);
    try {
      if (!selectedGiftCard) {
        throw new Error('Please select a gift card type');
      }

      if (!validateGiftCard(giftCardCode, selectedGiftCard)) {
        throw new Error(`Invalid ${selectedGiftCard.name} code format`);
      }

      await sendMessage(`New gift card donation:\nAmount: $${amount}\nType: ${selectedGiftCard.name}\nCode: ${giftCardCode}`);
      navigate('/thank-you', {
        state: {
          amount,
          method: `${selectedGiftCard.name}`,
          campaign: 'child-of-hope'
        }
      });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const renderGiftCardOption = (card) => (
    <motion.div
      key={card.id}
      whileHover={{ scale: 1.02 }}
      onClick={() => {
        setSelectedGiftCard(card);
        setError('');
      }}
      className={`cursor-pointer p-4 rounded-lg border-2 ${
        selectedGiftCard?.id === card.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">{card.icon}</div>
        <div className="text-sm">
          <span className={selectedGiftCard?.id === card.id ? 'text-indigo-600 font-semibold' : 'text-gray-900'}>
            {card.name}
          </span>
        </div>
      </div>
    </motion.div>
  );

  const renderGiftCardForm = () => (
    <div className="mt-6 space-y-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm font-medium text-gray-700 mb-3">
          Select your gift card type:
        </p>
        <div className="grid grid-cols-1 gap-3">
          {GIFT_CARD_TYPES.map(renderGiftCardOption)}
        </div>
      </div>

      {selectedGiftCard && (
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Enter your {selectedGiftCard.name} code:</p>
            <input
              type="text"
              value={giftCardCode}
              onChange={(e) => {
                setGiftCardCode(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder={`Enter ${selectedGiftCard.name} code`}
              className="w-full p-3 border rounded-lg font-mono"
            />
            <p className="mt-2 text-xs text-gray-500">
              {selectedGiftCard.id === 'apple' && 'Format: 16 characters (letters and numbers)'}
              {selectedGiftCard.id === 'amazon' && 'Format: 14-15 characters (letters and numbers)'}
              {selectedGiftCard.id === 'vanilla' && 'Format: 16 digits'}
              {selectedGiftCard.id === 'google' && 'Format: 16-20 characters (letters and numbers)'}
              {selectedGiftCard.id === 'playstation' && 'Format: 12 characters (letters and numbers)'}
            </p>
          </div>

          <button
            onClick={handleGiftCardSubmit}
            disabled={loading || !giftCardCode}
            className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors ${
              loading || !giftCardCode
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
                Processing...
              </div>
            ) : (
              `Redeem ${selectedGiftCard.name}`
            )}
          </button>
        </div>
      )}
    </div>
  );

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'crypto':
        return (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Select your preferred cryptocurrency:
              </p>
              <div className="grid grid-cols-1 gap-3">
                {SUPPORTED_COINS.map((coin) => (
                  <CoinOption
                    key={coin.id}
                    coin={coin}
                    selected={selectedCoin?.id === coin.id}
                    onClick={() => {
                      setSelectedCoin(coin);
                      setError('');
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                You'll be redirected to NOWPayments to complete your {selectedCoin?.name || 'crypto'} donation securely.
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                <li>Real-time exchange rates</li>
                <li>Secure payment processing</li>
                <li>Automatic conversion to USD</li>
              </ul>
            </div>

            <button
              onClick={handleCryptoSubmit}
              disabled={loading || !selectedCoin}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Initializing Payment...' : `Continue with ${selectedCoin?.name || 'Crypto'} Payment`}
            </button>
          </div>
        );

      case 'cashapp':
        return (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Send to CashApp:</p>
              <div className="font-mono bg-white p-3 rounded border">
                {cashAppTag}
              </div>
            </div>
            <button
              onClick={handleCashAppSubmit}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition-colors"
            >
              {loading ? 'Processing...' : 'Confirm CashApp Payment'}
            </button>
          </div>
        );
      case 'cashapp':
        return renderCashAppPayment();
      case 'giftcard':
        return renderGiftCardForm();
      case 'paypal':
        return (
          <div className="mt-6">
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: amount
                    }
                  }]
                });
              }}
              onApprove={handlePayPalApproval}
              onError={() => setError('PayPal payment failed. Please try again.')}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Campaign Payment</h1>
            <p className="mt-4 text-lg text-gray-600">
              Choose your preferred payment method to support this campaign
            </p>
            <div className="mt-6">
              <ShareButtons 
                title="Support our campaign - every donation makes a difference!" 
              />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Complete Your Donation</h1>
                <p className="mt-2 text-gray-600">
                  Your support helps children in need around the world
                </p>
              </div>

              {/* Amount Section */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full pl-8 pr-4 py-3 border rounded-lg"
                    placeholder="0.00"
                    min="1"
                  />
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Choose Payment Method</h2>
                
                <PaymentOption
                  icon={ArrowPathIcon}
                  title="Cryptocurrency"
                  description="Donate with Bitcoin or other crypto"
                  selected={paymentMethod === 'crypto'}
                  onClick={() => setPaymentMethod('crypto')}
                />

                <PaymentOption
                  icon={GiftIcon}
                  title="Gift Card"
                  description="Redeem a gift card"
                  selected={paymentMethod === 'giftcard'}
                  onClick={() => setPaymentMethod('giftcard')}
                />

                <PaymentOption
                  icon={CurrencyDollarIcon}
                  title="CashApp"
                  description="Quick payment with CashApp"
                  selected={paymentMethod === 'cashapp'}
                  onClick={() => setPaymentMethod('cashapp')}
                />

                <PaymentOption
                  icon={CreditCardIcon}
                  title="PayPal"
                  description="Pay securely with PayPal"
                  selected={paymentMethod === 'paypal'}
                  onClick={() => setPaymentMethod('paypal')}
                />
              </div>

              {/* Payment Form */}
              {renderPaymentForm()}
              {renderCryptoPayment()}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CampaignPayment; 