import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { projects } from '../constants/projects'
import { countFormat } from '../constants'
import PaymentProcessor from '../Components/PaymentProcessor'
import { 
  UserGroupIcon, 
  GlobeAltIcon, 
  MapPinIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

const PaymentSummary = ({ project, amount, donationType }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative h-48">
        <img 
          src={project.image} 
          alt={project.title} 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <div className="flex items-center gap-2 text-sm">
            <MapPinIcon className="h-4 w-4" />
            {project.location}
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <h4 className="font-medium text-gray-900">Donation Summary</h4>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount</span>
              <span className="font-semibold">${countFormat.format(amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type</span>
              <span className="font-semibold capitalize">{donationType}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <UserGroupIcon className="h-4 w-4" />
              {project.stats.donors} donors
            </div>
            <div className="flex items-center gap-1">
              <GlobeAltIcon className="h-4 w-4" />
              {project.stats.countries} countries
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Payment = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [project, setProject] = useState(null)
  const [amount, setAmount] = useState(0)
  const [donationType, setDonationType] = useState('one-time')

  useEffect(() => {
    const projectId = searchParams.get('project')
    const donationAmount = searchParams.get('amount')
    const type = searchParams.get('type')

    if (!projectId || !donationAmount) {
      navigate('/donate')
      return
    }

    const foundProject = projects.find(p => p.id === Number(projectId))
    if (!foundProject) {
      navigate('/donate')
      return
    }

    setProject(foundProject)
    setAmount(Number(donationAmount))
    setDonationType(type || 'one-time')
  }, [])

  const handlePaymentSuccess = (details) => {
    navigate(`/thank-you?amount=${amount}&project=${project.id}&type=${donationType}`)
  }

  const handlePaymentError = (error) => {
    // Handle payment error
    console.error('Payment error:', error)
  }

  if (!project) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Complete Your Donation</h1>
            <p className="mt-4 text-lg text-gray-600">
              Your generosity helps make a difference in the lives of those in need
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PaymentProcessor
                amount={amount}
                selectedProject={project}
                donationType={donationType}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <PaymentSummary
                  project={project}
                  amount={amount}
                  donationType={donationType}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Payment 