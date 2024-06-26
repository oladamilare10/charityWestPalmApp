import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { useState } from 'react'
import SlideOver from '../Components/SlideOver'

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
                Charity West Palm Launches a Fund Raiser for Gaza
                Charity West Palm, a local non-profit organization that aims to promote 
                social justice and humanitarian causes, has launched a fund raiser for Gaza, the war-torn region
                in the Middle East. The fund raiser, titled "Help Gaza Heal", seeks to raise money and awareness 
                for the medical and humanitarian aid that is urgently needed by the civilians in Gaza, who are 
                suffering from 
                a humanitarian crisis caused by the ongoing conflict between Israel and Hamas.
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <img
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              src="https://th.bing.com/th?id=OIF.fLq%2f%2fhdj8mdIpGjBXzgcLA&pid=ImgDet&rs=1"
              alt=""
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <p>
                The fund raiser was initiated by [user], a volunteer at Charity West Palm, who was moved by the plight of the people in Gaza and wanted to do something to help them. [user] said, "I was shocked and saddened by the news of the war in Gaza, and how it has affected millions of innocent lives. I wanted to start a fund raiser for the victims in Gaza, to show them that we care and that we stand with them in their time of need." <br />

                </p>
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <CloudArrowUpIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Objective.</strong>
                      The fund raiser has two main objectives: to provide essential medical aid to treat the wounded and sick in Gaza, and to provide basic humanitarian aid to meet the needs of the displaced and vulnerable populations in Gaza. The fund raiser will support reputable charities that are working on the ground in Gaza, such as Doctors Without Borders and the American Jewish Joint Distribution Committee, which are providing medical care, food, water, hygiene kits, blankets, and shelter to those affected by the war.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <LockClosedIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Awareness.</strong>
                      The fund raiser also aims to raise awareness and educate others about the situation in Gaza and the need for humanitarian aid. The fund raiser will use various platforms, such as social media, blogs, podcasts, and art projects, to highlight the stories of the civilians in Gaza and the challenges they face. The fund raiser will also urge people to sign petitions, join protests, or contact their representatives to call for an immediate ceasefire and a peaceful resolution of the conflict.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Donate.</strong> 
                      The fund raiser is open to anyone who wants to contribute or participate. People can donate online through Bitcoin, Ethereum, And  USDT Crypto Currency Wallets displayed When You Click the Donate Now button, As Crypto Currency Defies any currency barrier in any counttry while we are working on integrating other payment Methods. People can also organize local events, such as bake sales, car washes, raffles, or concerts, and donate the proceeds to the fund raiser. People can also share their thoughts, opinions, or creative works related to the fund raiser on social media using the hashtag #HelpGazaHeal.
                    </span>
                  </li>
                </ul>
                {/* <p className="mt-8">
                  Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor
                  fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac
dip                  aiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
                </p> */}
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">We Are Charged.</h2>
                <p className="mt-6">
                Charity West Palm hopes that the fund raiser will make a positive difference in the lives of the people in Gaza, and will inspire others to join their cause. Charity West Palm's director said, "We believe that every human being deserves dignity, respect, and compassion. We are launching this fund raiser for Gaza because we want to show our solidarity and support to our fellow human beings who are suffering from a terrible situation. We hope that our fund raiser will not only provide much-needed aid to Gaza, but also raise awareness and foster empathy among people around the world."
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
