import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { sendMessage } from '../constants/send';
import { 
  CurrencyDollarIcon, 
  GiftIcon, 
  CreditCardIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

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
  const [paymentData, setPaymentData] = useState(null);
  const [cashAppTag, setCashAppTag] = useState('');
  const [giftCardCode, setGiftCardCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setCashAppTag('$CompassionAid');
  }, []);

  const createCryptoPayment = async () => {
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
          order_id: `CHILD-OF-HOPE-${Date.now()}`,
          order_description: 'Donation to Child of Hope Campaign',
          ipn_callback_url: 'https://compassionaid.love/api/crypto-webhook', // You'll need to implement this endpoint
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
    setLoading(true);
    try {
      const paymentData = await createCryptoPayment();
      setPaymentData(paymentData);
      
      // Log the payment intent
      await sendMessage('New NOWPayments crypto donation intent: $' + amount + '\nPayment ID: ' + paymentData.payment_id);
      
      // Redirect to NOWPayments hosted payment page
      window.location.href = paymentData.invoice_url;
    } catch (err) {
      setError('Failed to initialize crypto payment. Please try again.');
      setLoading(false);
    }
  };

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

  const handleGiftCardSubmit = async () => {
    setLoading(true);
    try {
      if (giftCardCode.length < 8) {
        throw new Error('Invalid gift card code');
      }
      await sendMessage('New gift card donation: $' + amount + '\nCode: ' + giftCardCode);
      navigate('/thank-you', {
        state: {
          amount,
          method: 'Gift Card',
          campaign: 'child-of-hope'
        }
      });
    } catch (err) {
      setError('Invalid gift card code. Please try again.');
    }
    setLoading(false);
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'paypal':
        return (
          <div className="mt-6">
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: amount,
                      },
                    },
                  ],
                });
              }}
              onApprove={handlePayPalApproval}
            />
          </div>
        );
      
      case 'crypto':
        return (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                You'll be redirected to NOWPayments to complete your crypto donation securely.
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                <li>Support for multiple cryptocurrencies</li>
                <li>Secure payment processing</li>
                <li>Automatic conversion to USD</li>
              </ul>
            </div>
            <button
              onClick={handleCryptoSubmit}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Initializing Payment...' : 'Continue with Crypto Payment'}
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

      case 'giftcard':
        return (
          <div className="mt-6 space-y-4">
            <input
              type="text"
              value={giftCardCode}
              onChange={(e) => setGiftCardCode(e.target.value)}
              placeholder="Enter gift card code"
              className="w-full p-3 border rounded-lg"
            />
            <button
              onClick={handleGiftCardSubmit}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition-colors"
            >
              {loading ? 'Processing...' : 'Redeem Gift Card'}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  icon={CreditCardIcon}
                  title="PayPal"
                  description="Pay securely with PayPal"
                  selected={paymentMethod === 'paypal'}
                  onClick={() => setPaymentMethod('paypal')}
                />

                <PaymentOption
                  icon={CurrencyDollarIcon}
                  title="CashApp"
                  description="Quick payment with CashApp"
                  selected={paymentMethod === 'cashapp'}
                  onClick={() => setPaymentMethod('cashapp')}
                />

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
              </div>

              {/* Payment Form */}
              {renderPaymentForm()}

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CampaignPayment; 