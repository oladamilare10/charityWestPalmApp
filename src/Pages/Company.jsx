import React, { useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { banners } from '../assets'
import { 
  HeartIcon, 
  GlobeAltIcon, 
  UserGroupIcon, 
  ShieldCheckIcon,
  LightBulbIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline'

const values = [
  {
    name: 'Empathy',
    description: 'Compassion Aid strives to understand and share the feelings and perspectives of the people we are helping, and to treat them with respect and kindness.',
    icon: HeartIcon,
  },
  {
    name: 'Solidarity',
    description: 'Compassion Aid stands with the people we are helping, and supports their struggles and aspirations.',
    icon: HandRaisedIcon,
  },
  {
    name: 'Diversity',
    description: 'Compassion Aid celebrates the diversity of the people we are helping, and respects their cultures, religions, and identities.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Transparency',
    description: 'Compassion Aid is honest and accountable for our actions and results, and communicates clearly and openly with their donors, partners, and beneficiaries.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Innovation',
    description: 'Compassion Aid is creative and adaptable in finding solutions to the complex and changing humanitarian challenges we face.',
    icon: LightBulbIcon,
  },
];

const activities = [
  {
    name: 'Fundraising',
    description: 'We organize various fundraising campaigns and events to raise money for humanitarian projects. From emergency relief in Gaza to food security programs in Africa, we focus on critical needs worldwide.',
    icon: UserGroupIcon,
  },
  {
    name: 'Awareness',
    description: 'We raise awareness about humanitarian issues through social media, blogs, podcasts, and newsletters. Our goal is to inform and inspire action for positive change.',
    icon: GlobeAltIcon,
  }
];

const stats = [
  { id: 1, name: 'Founded', value: '2016' },
  { id: 2, name: 'Team Members', value: '50+' },
  { id: 3, name: 'Partner Organizations', value: '25+' },
  { id: 4, name: 'Lives Impacted', value: '100K+' },
];

const Company = () => {
  const [donate, setDonate] = useState(false)
  const [bitcoin, setBitcoin] = useState(false)

  const handleDonate = () => {
    if (!donate){
      setDonate(true)
    }else {
      setDonate(false)
      setBitcoin(false)
    }
  }

  const handleBitcoin = ()=> {
    if (!bitcoin){
      setBitcoin(true)
    }
  }

  return (
    <>
      <Header handleDonate={handleDonate} />
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
          <svg
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
          </svg>

          <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pb-32 lg:flex lg:px-8 lg:py-40">
            <motion.div 
              className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mt-24 sm:mt-32 lg:mt-16">
                <div className="inline-flex space-x-6">
                  <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
                    About Us
                  </span>
                </div>
              </div>
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Compassion in Action
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Founded in 2016, Compassion Aid has grown into a global force for positive change. Our dedicated team works tirelessly to address humanitarian challenges and create lasting impact worldwide.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative -mt-12 sm:-mt-16 lg:-mt-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div 
              className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  className="mx-auto flex max-w-xl flex-col gap-y-4 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg ring-1 ring-gray-900/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <p className="text-3xl font-bold tracking-tight text-indigo-600">{stat.value}</p>
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">{stat.name}</h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Values</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our values guide every decision we make and every action we take. They are the foundation of our commitment to making a positive difference in the world.
            </p>
          </motion.div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {values.map((value, index) => (
              <motion.div 
                key={value.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative pl-9"
              >
                <dt className="inline font-semibold text-gray-900">
                  <value.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                  {value.name}
                </dt>
                <dd className="inline ml-3">{value.description}</dd>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* Activities Section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Activities</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Through our various initiatives and programs, we work to create meaningful impact and lasting change in communities worldwide.
              </p>
            </motion.div>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {activities.map((activity, index) => (
                <motion.div 
                  key={activity.name} 
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <activity.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {activity.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{activity.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-32 sm:mt-40 mb-24 sm:mb-40">
          <div className="relative isolate overflow-hidden">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-gradient-to-r from-indigo-500 to-indigo-700 px-6 py-16 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
                <motion.div 
                  className="w-full flex-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Be Part of Our Mission
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-100">
                    Join us in our mission to create positive change. Whether through donations, partnerships, or spreading awareness, your support helps us make a difference in the lives of those who need it most.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <Link
                      to="/donate"
                      className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Support Our Cause
                    </Link>
                    <Link to="/contact" className="text-sm font-semibold leading-6 text-white">
                      Partner With Us <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Company
