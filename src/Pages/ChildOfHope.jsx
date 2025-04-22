import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { banners } from '../assets';
import { CheckCircleIcon, HeartIcon, ShieldCheckIcon, GlobeAltIcon, ClipboardIcon } from '@heroicons/react/24/outline';

const cryptoAddresses = {
  BTC: import.meta.env.VITE_BTC_ADDRESS_ONE,
  ETH: import.meta.env.VITE_ETH_ADDRESS_ONE,
  LTC: import.meta.env.VITE_LTC_ADDRESS_ONE,
  USDT: import.meta.env.VITE_USDT_ADDRESS_ONE,
  BCH: import.meta.env.VITE_BTCH_ADDRESS_ONE,
};

const donationTiers = [
  {
    amount: 25,
    title: "Feed a Child",
    description: "Provide nutritious meals for a child for one month",
    impact: "Your $25 can feed a child for an entire month"
  },
  {
    amount: 50,
    title: "Emergency Medical Care",
    description: "Provide emergency medical treatment and supplies",
    impact: "Your $50 can provide critical medical care"
  },
  {
    amount: 100,
    title: "Education Support",
    description: "Provide educational materials and support for children",
    impact: "Your $100 can support a child's education"
  },
  {
    amount: 250,
    title: "Family Support",
    description: "Help an entire family with essential needs",
    impact: "Your $250 can support a whole family"
  }
];

const ChildOfHope = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState('');

  const handleCopyAddress = (crypto, address) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(crypto);
    setTimeout(() => setCopiedAddress(''), 2000);
  };

  return (
    <>
      <Header />
      <div className="relative">
        {/* Hero Section */}
        <div className="relative h-[80vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={banners.bannerTen}
              alt="Children in need"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl text-white"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Child of Hope
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Every child deserves a chance to thrive, not just survive. Your support can transform lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/campaign-payment?campaign=child-of-hope"
                  className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-500 transition-colors text-center"
                >
                  Donate Now
                </Link>
                <a
                  href="#watch-video"
                  className="inline-block bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-colors text-center"
                >
                  Watch Video
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white py-8 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <ShieldCheckIcon className="h-6 w-6 text-indigo-600" />
                <span className="text-sm text-gray-600">100% Secure Donation</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <HeartIcon className="h-6 w-6 text-indigo-600" />
                <span className="text-sm text-gray-600">Tax Deductible</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircleIcon className="h-6 w-6 text-indigo-600" />
                <span className="text-sm text-gray-600">Verified Charity</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <GlobeAltIcon className="h-6 w-6 text-indigo-600" />
                <span className="text-sm text-gray-600">Global Impact</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div id="watch-video" className="bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">See Your Impact</h2>
              <p className="text-gray-400">Watch how your donations transform children's lives</p>
            </div>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-[500px] rounded-xl"
                src="https://www.youtube.com/embed/MXXw73JK4CA"
                title="Impact Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6"
              >
                <div className="text-4xl font-bold text-indigo-600 mb-2">13.7M</div>
                <div className="text-gray-600">Children affected by conflicts worldwide</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6"
              >
                <div className="text-4xl font-bold text-indigo-600 mb-2">450K</div>
                <div className="text-gray-600">Children in need of immediate medical care</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-6"
              >
                <div className="text-4xl font-bold text-indigo-600 mb-2">89%</div>
                <div className="text-gray-600">Of your donation goes directly to helping children</div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Donation Tiers */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Make a Difference Today</h2>
              <p className="text-gray-600">Choose how you want to help children in need</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {donationTiers.map((tier) => (
                <motion.div
                  key={tier.amount}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="text-2xl font-bold text-indigo-600 mb-2">${tier.amount}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tier.title}</h3>
                    <p className="text-gray-600 mb-4">{tier.description}</p>
                    <div className="text-sm text-gray-500 mb-4">{tier.impact}</div>
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-full">
                        <div className="mb-4">
                          <select
                            value={selectedCrypto}
                            onChange={(e) => setSelectedCrypto(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="">Select Cryptocurrency</option>
                            {Object.keys(cryptoAddresses).map((crypto) => (
                              <option key={crypto} value={crypto}>{crypto}</option>
                            ))}
                          </select>
                        </div>
                        {selectedCrypto && (
                          <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <div className="text-sm font-medium text-gray-700 mb-2">
                              {selectedCrypto} Address:
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-xs bg-white p-2 rounded border flex-1 overflow-hidden overflow-ellipsis">
                                {cryptoAddresses[selectedCrypto]}
                              </div>
                              <button
                                onClick={() => handleCopyAddress(selectedCrypto, cryptoAddresses[selectedCrypto])}
                                className="p-2 text-indigo-600 hover:text-indigo-800"
                                title="Copy address"
                              >
                                <ClipboardIcon className="h-5 w-5" />
                              </button>
                            </div>
                            {copiedAddress === selectedCrypto && (
                              <div className="text-xs text-green-600 mt-1">
                                Address copied!
                              </div>
                            )}
                            <div className="mt-4">
                              <QRCode
                                value={cryptoAddresses[selectedCrypto]}
                                size={128}
                                level="M"
                                className="mx-auto"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="w-full text-center">
                        <div className="text-sm text-gray-500 mb-2">- or -</div>
                        <Link
                          to={`/campaign-payment?campaign=child-of-hope&amount=${tier.amount}`}
                          className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors"
                        >
                          Donate ${tier.amount}
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Current Crisis Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Urgent Crisis Response</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={banners.bannerThree}
                  alt="Gaza Crisis"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Gaza Crisis</h3>
                  <p className="text-gray-600 mb-4">
                    Thousands of children in Gaza need urgent medical care, food, and safe shelter. Your support can help provide essential supplies and emergency medical treatment.
                  </p>
                  <Link
                    to="/campaign-payment?campaign=gaza-children"
                    className="text-indigo-600 font-semibold hover:text-indigo-500"
                  >
                    Help Children in Gaza →
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={banners.bannerNine}
                  alt="Global Health Crisis"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Global Health Crisis</h3>
                  <p className="text-gray-600 mb-4">
                    Millions of children lack access to basic healthcare and life-saving treatments. Your donation can help provide medical care, vaccines, and nutrition support.
                  </p>
                  <Link
                    to="/campaign-payment?campaign=child-health"
                    className="text-indigo-600 font-semibold hover:text-indigo-500"
                  >
                    Support Healthcare Access →
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Impact Stories */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Real Stories, Real Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <div className="text-indigo-600 font-semibold mb-2">Medical Care</div>
                <p className="text-gray-600">
                  "Thanks to donors like you, we were able to provide life-saving surgery to 6-year-old Sara from Yemen."
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <div className="text-indigo-600 font-semibold mb-2">Education</div>
                <p className="text-gray-600">
                  "Your support helped build a new school for 200 children displaced by conflict in Syria."
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <div className="text-indigo-600 font-semibold mb-2">Emergency Relief</div>
                <p className="text-gray-600">
                  "We provided emergency food and shelter to over 1,000 children affected by natural disasters."
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="bg-indigo-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Together, We Can Make a Difference
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Every donation, no matter the size, helps us provide hope and essential support to children in crisis. Join us in making a difference today.
              </p>
              <Link
                to="/campaign-payment?campaign=child-of-hope"
                className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Make a Donation
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChildOfHope; 