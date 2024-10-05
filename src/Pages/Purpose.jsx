import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { useState } from 'react'
import SlideOver from '../Components/SlideOver'
import { banners } from '../assets'

const Purpose = () => {
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
    <Header  handleDonate={handleDonate} />
    {donate && <SlideOver handleDonate={handleDonate} handleBitcoin={handleBitcoin} bitcoin={bitcoin} />}
      
      <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
          </svg>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-indigo-600">Our Purpose</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Objective And Priority</h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  At Compassion Aid, our mission is to empower communities 
                  and bring meaningful change by raising funds for vital charitable 
                  causes around the world. We exist to bridge the gap between those in 
                  need and those with the means to help, providing support to both 
                  well-established charities and overlooked but urgent crises.
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <img
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              src={banners.bannerEight}
              alt=""
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <p>
                We don’t just support charity—we empower donors to make informed, impactful decisions. By allowing you to direct your contributions, we give you control over the causes closest to your heart. Compassion Aid operates with full accountability and openness, providing detailed reports and feedback on the outcomes of your generosity. <br />

                </p>
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <CloudArrowUpIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Raising Funds for Charitable Organizations </strong>
                      Compassion Aid collaborates with a wide range of registered charitable
                       organizations across sectors such as education, healthcare, disaster 
                       relief, poverty alleviation, environmental conservation, and more. 
                       By centralizing fundraising efforts, we amplify the impact of each donation 
                       and ensure that critical needs are met.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <LockClosedIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Addressing Pressing Global Issues </strong>
                      Beyond supporting existing charities, Compassion Aid takes a proactive 
                      role in identifying and responding to urgent crises that demand 
                      immediate attention. Whether it’s a natural disaster, a public health 
                      emergency, or an emerging social issue, we allocate resources swiftly 
                      to make a real-time difference where it's needed most.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Empowering Donors to Choose </strong> 
                      At Compassion Aid, we believe that giving should be a personal and 
                      purposeful act. That's why we offer our donors the unique ability to 
                      choose how their funds are used. Whether you want to contribute to a 
                      specific charity, focus on a particular issue, or give unrestricted 
                      funds for emergency allocation, the choice is entirely yours.
                      With complete transparency, we provide updates on how donations are 
                      used, ensuring that every dollar goes exactly where it’s intended.
                    </span>
                  </li>
                </ul>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Our Vision</h2>
                <p className="mt-8">
                We envision a world where every act of giving creates lasting, positive change.
                 By bringing together caring individuals and effective organizations, 
                 Compassion Aid strives to solve pressing challenges and improve lives. Our 
                 goal is to transform communities, support 
                global progress, and inspire a culture of giving that leads to sustainable impact.
                </p>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Get Involved</h2>
                <p className="mt-6">
                Join us in making a difference. Whether you want to donate, partner with us,
                 or just learn more about how you can help, we’re here to guide you on a 
                 journey of meaningful giving. Together, we can create a world where generosity 
                 leads to lasting change.
                </p>
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
