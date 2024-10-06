import { BuildingLibraryIcon, BuildingOffice2Icon, CloudArrowUpIcon, LockClosedIcon, ServerIcon, ShieldCheckIcon } from '@heroicons/react/20/solid'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { banners } from '../assets'
import { Link } from 'react-router-dom'
import { MdEvent } from 'react-icons/md'
import { CgWebsite } from 'react-icons/cg'
import { BsTreeFill } from 'react-icons/bs'
import { PiHandshakeFill } from 'react-icons/pi'
import { BiChild } from 'react-icons/bi'

const Policy = () => {
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
                <p className="text-base font-semibold leading-7 text-indigo-600">Our Purpose</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Compassion Aid Policies</h1>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Donation Policy</h2>
                <p className="mt-6">
                    At Compassion Aid, we believe in the power of informed and 
                    purposeful giving. Our Donation Policy ensures that every contribution is 
                    used effectively, transparently, and in alignment with our mission.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Donor Choice </strong>
                      Donors have the option to allocate their funds to a specific cause, 
                      charity, or urgent issue. However, if a selected charity or 
                      project becomes unavailable, Compassion Aid 
                      reserves the right to reallocate the donation to a similar cause.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Transparency </strong>
                      Donors will receive updates on how their funds are 
                      used, including reports on the impact of their contribution.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Non-Refundable Donations </strong> 
                      Once a donation is made, it is considered final and non-refundable, except in cases 
                      where errors are identified within 14 days of the donation.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Anonymous Donations </strong> 
                      Donors can choose to remain anonymous. However, anonymous donors may not 
                      receive personalized reports or acknowledgments.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ServerIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Tax Receipts: </strong> 
                      Compassion Aid provides tax receipts where applicable. Please consult your local tax 
                      regulations to understand how your donation may benefit you.
                    </span>
                  </li>
                </ul>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Privacy Policy</h2>
                <p className="mt-6">
                Compassion Aid is committed to safeguarding your personal information. Our <strong>Privacy Policy</strong> outlines how we collect, store, and protect your data.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <LockClosedIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Information We Collect </strong>
                      We may collect personal details such as your name, email, address, 
                      and payment information when you make a 
                      donation, subscribe to our newsletter, or interact with our website.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <LockClosedIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Use of Information </strong>
                      We use your information to process donations, send updates, 
                      and improve our services. We will never sell, trade, or 
                      share your data with third parties without your consent, except as required by law.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <LockClosedIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Data Security </strong> 
                      We use secure encryption and data protection practices to ensure 
                      your information is safe from unauthorized access.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <LockClosedIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Cookies </strong> 
                      Our website uses cookies to improve user experience. You can manage 
                      your cookie preferences through your browser settings.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <LockClosedIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Access and Control </strong> 
                      You have the right to access, update, or delete your personal data. To make 
                      changes, please contact us by visiting 
                      our <Link to='/contact' className='underline text-indigo-600 font-semibold' >Contact Page</Link>. <br />
                      For more detailed information, read our full <strong>Privacy Policy</strong>.
                    </span>
                  </li>
                </ul>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Ethical Fundraising Policy</h2>
                <p className="mt-6">
                At Compassion Aid, we uphold the highest ethical standards in our fundraising practices.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <MdEvent className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Honesty and Transparency </strong>
                      We are committed to being fully transparent about our fundraising activities, 
                      how donations are used, and the results of our efforts.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <MdEvent className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Respect for Donors</strong>
                      Donors are treated with respect and gratitude. We ensure that any concerns 
                      are addressed promptly, and requests for donor anonymity are honored.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <MdEvent className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Reporting Misuse </strong> 
                      We encourage our donors and partners to report any perceived misuse or unethical behavior 
                      in fundraising. Reports can be made anonymously and will be investigated thoroughly.
                    </span>
                  </li>
                </ul>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Partner Organization Policy</h2>
                <p className="mt-6">
                Compassion Aid works with a variety of partner organizations to ensure that donations have maximum impact.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <BuildingOffice2Icon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Due Diligence </strong>
                      We conduct thorough due diligence on every charity or organization 
                      we work with to ensure they meet our ethical standards and are 
                      registered with appropriate regulatory bodies.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <BuildingOffice2Icon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Accountability </strong> 
                      Partner organizations are required to provide detailed reports on 
                      how Compassion Aid donations are used and the outcomes achieved.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <BuildingOffice2Icon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Monitoring and Evaluation </strong> 
                      Compassion Aid continuously monitors partner organizations to ensure 
                      funds are used responsibly and effectively.
                    </span>
                  </li>
                </ul>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Child Protection Policy</h2>
                <p className="mt-6">
                Compassion Aid is deeply committed to the protection of children 
                and vulnerable individuals.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <BiChild className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Zero Tolerance for Abuse </strong>
                      Compassion Aid has a zero-tolerance policy toward the abuse or exploitation 
                      of children or vulnerable individuals. Any allegations of abuse will be 
                      thoroughly investigated, and appropriate legal action will be taken.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <BiChild className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Partner Requirements </strong> 
                      All partner organizations working with children must have their own 
                      child protection policies in place and adhere to international 
                      child protection standards.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <BiChild className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Reporting </strong> 
                      Any incidents of abuse can be reported confidentially 
                      through our <Link to='/contact' className='font-semibold underline text-indigo-600'>contact page</Link>.
                    </span>
                  </li>
                </ul>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Anti-Fraud and Whistleblower Policy</h2>
                <p className="mt-6">
                Compassion Aid is committed to preventing, 
                detecting, and addressing fraud, corruption, and misconduct.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <ShieldCheckIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Fraud Prevention </strong>
                      We have strict financial controls in place to ensure that all funds are used as 
                      intended. We routinely audit our internal processes and partner organizations.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ShieldCheckIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Whistleblower Protection </strong> 
                      If any employee, volunteer, or donor suspects fraud or misconduct, 
                      they are encouraged to report it immediately. All reports will be treated 
                      confidentially, and whistleblowers will be protected from retaliation.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ShieldCheckIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Investigation </strong> 
                      Any report of fraud or misconduct will be investigated thoroughly, 
                      and appropriate actions, including legal measures, will be taken
                    </span>
                  </li>
                </ul>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Conflict of Interest Policy</h2>
                <p className="mt-6">
                Compassion Aid seeks to avoid any conflicts of 
                interest that could compromise the integrity of our work.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <PiHandshakeFill className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Disclosure </strong>
                      All employees, board members, and volunteers are required to disclose 
                      any personal, financial, or organizational conflicts of interest that may 
                      affect their ability to make impartial decisions on behalf of the foundation.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <PiHandshakeFill className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Decision-Making </strong> 
                      Individuals with a conflict of interest must recuse themselves 
                      from any related decision-making processes.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <PiHandshakeFill className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Transparency </strong> 
                      Compassion Aid maintains full transparency in its governance and 
                      decision-making processes to avoid any perception of impropriety.
                    </span>
                  </li>
                </ul>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Environmental Sustainability Policy</h2>
                <p className="mt-6">
                As part of our commitment to global well-being, 
                Compassion Aid strives to minimize its environmental impact.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <BsTreeFill className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Sustainable Practices </strong>
                      We incorporate environmentally sustainable practices into our operations, including 
                      reducing waste, promoting recycling, and using energy-efficient systems.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <BsTreeFill className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Partnerships for the Planet </strong> 
                      Whenever possible, we collaborate with charities and organizations 
                      that promote environmental sustainability and eco-friendly initiatives.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <BsTreeFill className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Carbon Footprint </strong> 
                      We are working towards reducing our carbon footprint by adopting digital 
                      communications and minimizing travel when possible.
                    </span>
                  </li>
                </ul>



                
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Website Use Policy</h2>
                <p className="mt-6">
                This policy outlines how you can interact with the Compassion Aid 
                website and platform.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <CgWebsite className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Acceptable Use </strong>
                      Users of the Compassion Aid website must not engage in any activities that disrupt 
                      the platform, compromise security, or violate the rights of others.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <CgWebsite className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Intellectual Property </strong> 
                      All content, including text, images, and designs, on the 
                      Compassion Aid website is the property of Compassion Aid and is 
                      protected by copyright and intellectual property laws.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <CgWebsite className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-gray-900">Prohibited Activities </strong> 
                      Users must not engage in fraudulent, illegal, or harmful activities 
                      through our website, including unauthorized access or the dissemination of malware.
                    </span>
                  </li>
                </ul>



                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Conclusion</h2>
                <p className="mt-8">
                At Compassion Aid, we are dedicated to operating with integrity, 
                transparency, and a commitment to our mission. These policies ensure that 
                we maintain the highest standards in all that we do, 
                from managing donations to protecting 
                children, preventing fraud, and safeguarding the environment.
                </p>
                
                <p className="mt-6">
                For any questions or further details about our policies, please feel free to <Link to='/contact' className='font-semibold underline text-indigo-600'>contact us</Link>.
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

export default Policy
