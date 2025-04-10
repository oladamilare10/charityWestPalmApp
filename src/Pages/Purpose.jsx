import { CloudArrowUpIcon, LockClosedIcon, ServerIcon, HeartIcon, GlobeAltIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { banners } from '../assets'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const features = [
  {
    name: 'Raising Funds for Charitable Organizations',
    description: 'We collaborate with registered charitable organizations across sectors including education, healthcare, disaster relief, poverty alleviation, and environmental conservation. By centralizing fundraising efforts, we amplify the impact of each donation and ensure critical needs are met.',
    icon: HeartIcon
  },
  {
    name: 'Addressing Pressing Global Issues',
    description: 'Beyond supporting existing charities, we take a proactive role in identifying and responding to urgent crises that demand immediate attention. Whether it\'s a natural disaster, public health emergency, or emerging social issue, we allocate resources swiftly.',
    icon: GlobeAltIcon
  },
  {
    name: 'Empowering Donors to Choose',
    description: 'We believe giving should be personal and purposeful. Choose how your funds are used - support a specific charity, focus on a particular issue, or give unrestricted funds for emergency allocation. We provide complete transparency on how donations are used.',
    icon: UserGroupIcon
  }
];

const stats = [
  { id: 1, name: 'Countries Reached', value: '35+' },
  { id: 2, name: 'Active Projects', value: '40+' },
  { id: 3, name: 'Donors Worldwide', value: '10K+' },
  { id: 4, name: 'Success Rate', value: '95%' },
];

const Purpose = () => {
  return (
    <>
      <Header />
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
          
          <div className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48">
            <div
              className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
              }}
            />
          </div>

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
                    Our Mission
                  </span>
                </div>
        </div>
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Making a difference through compassion
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                At Compassion Aid, our mission is to empower communities and bring meaningful change by raising funds for vital charitable causes around the world. We exist to bridge the gap between those in need and those with the means to help.
              </p>
            </motion.div>
            <motion.div 
              className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                <img
                  src={banners.purposeOne}
                  alt="Mission illustration"
                  className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                />
              </div>
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

        {/* Features Section */}
        <div className="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Objectives</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We focus on three main areas to maximize our impact and ensure that every donation makes a real difference in people's lives.
            </p>
          </motion.div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.name} 
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>

        {/* Vision Section */}
        <div className="relative isolate mt-32 sm:mt-40 sm:pt-14">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Vision</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Creating lasting positive change
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  We envision a world where every act of giving creates lasting, positive change. By bringing together caring individuals and effective organizations, Compassion Aid strives to solve pressing challenges and improve lives.
                </p>
              </motion.div>
            </div>
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
                    Join us in making a difference
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-100">
                    Whether you want to donate, partner with us, or learn more about how you can help, we're here to guide you on a journey of meaningful giving. Together, we can create a world where generosity leads to lasting change.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <Link
                      to="/donate"
                      className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Donate Now
                    </Link>
                    <Link to="/contact" className="text-sm font-semibold leading-6 text-white">
                      Contact Us <span aria-hidden="true">→</span>
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

export default Purpose
