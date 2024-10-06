import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { banners } from '../assets'
import { Link } from 'react-router-dom'

const Terms = () => {
  return (
    <>
    <Header  />
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
                <p className="text-base font-semibold leading-7 text-indigo-600">Terms & conditions</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Terms and Conditions</h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                    Welcome to Compassion Aid. By accessing or using our website and services, you 
                    agree to the following terms and conditions. Please read them carefully 
                    as they govern your use of our services, 
                    including the donations you make and your interactions with our platform.
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
                
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Use of Donations </strong>
                      Donations made through Compassion Aid are directed towards charitable 
                      causes as specified by the donor. If a chosen charity or project becomes 
                      unavailable or ineligible for funding, Compassion Aid reserves the right 
                      to reallocate the donation to another similar cause. We ensure that 
                      all donations are used effectively and transparently.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Refund Policy </strong>
                        All donations made to Compassion Aid are considered final and non-refundable 
                        unless a specific exception applies. If you believe an error has occurred 
                        with your donation, please contact us within 14 days of the donation 
                        date, and we will review your request.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Donor Responsibility </strong> 
                        By donating, you confirm that the funds provided are your own and legally 
                        obtained. Compassion Aid is not responsible for the actions or promises 
                        made by any third-party charities or organizations that 
                        receive funds through our platform.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Privacy and Data Protection </strong> 
                      We respect your privacy and are committed to protecting your personal 
                      information. For details on how we collect, store, 
                      and use your data, please refer 
                      to our <Link to='/policy' className='text-base font-semibold underline text-indigo-600'>Privacy Policy</Link>.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">User Conduct </strong> 
                      You agree to use our website and services responsibly and ethically. 
                      You must not attempt to misuse our platform, including attempts to access 
                      unauthorized areas, 
                      damage the site, or disrupt services.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Limitation of Liability </strong> 
                      Compassion Aid will not be liable for any damages or losses incurred as 
                      a result of using our website, making a donation, or receiving inaccurate 
                      information from partner charities. We strive to ensure all information is accurate but 
                      cannot guarantee complete accuracy at all times.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Intellectual Property </strong> 
                      All content on the Compassion Aid website, including text, graphics, 
                      logos, and images, is the property of Compassion Aid and is protected by 
                      intellectual property laws. Unauthorized use is prohibited.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Changes to the Terms </strong> 
                      Compassion Aid reserves the right to amend or update these terms at any 
                      time. Notice of any changes will be posted on our website, and continued use of the 
                      platform constitutes acceptance of the updated terms.
                    </span>
                  </li>
                </ul>
                <p className="mt-8">
                For any questions or 
                concerns regarding these terms, please contact us by visiting our <Link to='/contact' className='underline text-indigo-600 font-semibold' >Contact Page</Link>.
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

export default Terms
