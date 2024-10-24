import React, { useEffect, useState } from 'react'
import { countFormat, orgs } from '../../constants'
import { FaSortDown } from 'react-icons/fa'
import { IoIosCheckmark } from "react-icons/io";
import { FaSpinner } from 'react-icons/fa6';
import PaymentModal from '../PaymentModal';
import { sendMessage } from '../../constants/send';
import { useSearchParams } from 'react-router-dom';

const paymentOptions = [
    {
        id: 1,
        name: 'PayPal',
        icon: <img src='https://www.paypalobjects.com/webstatic/en_US/i/logo/pp-logo-h-300.png' alt='PayPal' className='h-8 w-8' />
    },
    {
        id: 2,
        name: 'Credit Card',
        icon: <img src='https://www.iconfinder.com/data/icons/logos-and-brands/24/credit-card-alt-512.png' alt='Credit Card' className='h-8 w-8' />
    },
    {
        id: 3,
        name: 'Bitcoin',
        icon: <img src='https://www.iconfinder.com/data/icons/bitcoin-color-flat/24/bitcoin_color_flat_24-512.png' alt='Bitcoin color' className='h-8 w-8' />
    }
]
const amountOptions = [75, 125, 250, 500, 1000, 2000]

const OneTime = () => {
    return (
        <div className='flex justify-center bg-indigo-600 max-w-[300px] text-white cursor-pointer px-8 py-4 rounded-md items-center'>
            <h2 className='text-2xl font-bold'>One-Time Donation</h2>
        </div>
    )
}

const Radio = ({ item, amount, setAmount }) => {
    const numAmount = Number(amount)
    return (
        <div className='flex items-center gap-2'>
            <input
              type='radio'
              name='amount'
              className='hidden'
              id={`amount-${item}`}
              value={item}
              onChange={(e) => setAmount(e.target.value)}
            />
            <label
              className={`${numAmount === item && 'bg-indigo-600 text-white font-semibold'} border px-5 py-4 rounded-md cursor-pointer`} htmlFor={`amount-${item}`}>${item}</label>
          </div>
    )
}

const OrgSelect = ({ orgs, selectedOrg, setSelectedOrg, setShowOptions }) => {
    return (
        <div className="relative">
            <div className="absolute w-full bg-white">
                {orgs.organizations.map(org => {
                    return (
                        <div key={org.link} onClick={()=> {
                            setSelectedOrg(org)
                            setShowOptions(false)
                        }} 
                        className='flex cursor-pointer px-4  justify-between border items-center'>
                            <div className='flex gap-4 py-3'>
                                <img src={org.image_url} alt={org.name} className='w-12 h-12 object-contain' />
                                <div className='text-gray-600 font-semibold'>{org.name}
                                    <div className='text-sm text-gray-400'>{org.country}</div>
                                </div>
                            </div>
                            {selectedOrg === org && <div className='h-full'>
                                <IoIosCheckmark className='text-2xl text-gray-600 ' />
                            </div>}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const PersonalDetailsComponent = ({ 
    email, 
    setEmail, 
    name, 
    setName, 
    phone, 
    setPhone, 
    organize, 
    setOrganize, 
    anonymous, 
    setAnonymous, 
    organization, 
    setOrganization,
    amount, 
    tax, 
    loadings,
    addTaxable,
    msg, 
    err,
    handleSubmit 
}) => {
    var totalAmount = amount
    if (addTaxable) {
        totalAmount = Number(amount) + Number(tax)
    }
    return (
        <div className='mx-auto max-w-3xl px-8'>
            <h2 className='text-2xl font-semibold text-indigo-600 flex max-w-7xl items-center justify-between p-6 lg:px-8'>
                Personal Details
            </h2>
            {!anonymous && <div>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                    Name <span className='text-red-400'>*</span>
                    </label>
                    <div className="mt-2.5">
                    <input
                        id="name"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        type="text"
                        autoComplete="name"
                        className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                    Email <span className='text-red-400'>*</span>
                    </label>
                    <div className="mt-2.5">
                    <input
                        id="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                    Phone
                    </label>
                    <div className="mt-2.5">
                    <input
                        id="phone"
                        value={phone}
                        onChange={(e)=> setPhone(e.target.value)}
                        type="tel"
                        autoComplete="phone"
                        className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type='checkbox' id='organize' checked={organize} onChange={(e) => setOrganize(e.target.checked)} />
                    <label className='w-full text-base font-semibold text-gray-700 my-4' htmlFor='organize'>This donation is on behalf of a company or organization.</label>
                </div>
                {organize && 
                    <div className="sm:col-span-2">
                        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                        Organization Name <span className='text-red-400'>*</span>
                        </label>
                        <div className="mt-2.5">
                        <input
                            id="company"
                            value={organization}
                            onChange={(e)=> setOrganization(e.target.value)}
                            type="text"
                            autoComplete="organization"
                            className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        </div>
                    </div>
                }
            </div>
            </div>}
            <div className='flex gap-2 items-center'>
                <input type='checkbox' id='anonymous' checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
                <label className='w-full text-base font-semibold text-gray-700 my-4' htmlFor='anonymous'>Anonymous Donation</label>
            </div>
            
      <div className="my-4 mb-16">
        <div className="text-red-500 text-sm font-semibold">{err && err}</div>
        <div className="text-green-500 text-sm font-semibold">{msg && msg}</div>
        <button onClick={handleSubmit} className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-md">{loadings ? <FaSpinner className='animate-spin' /> : 'Donate $' + countFormat.format(totalAmount)}</button>
      </div>
        </div>
    )
}

const DonateForm = ({ page, setPage }) => {
    const [searchParams] = useSearchParams()
    const paramsValue = searchParams.get('donate-to')
    const filterOrg = () => {
        if (paramsValue) {
            return orgs.organizations.find(item => item.link === paramsValue);
        }else {
            return orgs.organizations[0];
        }
    }
    const [amount, setAmount] = useState('')
    const [addTaxable, setAddTaxable] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [organize, setOrganize] = useState(false)
    const [anonymous, setAnonymous] = useState(false)
    const [organization, setOrganization] = useState('')
    const taxed = 0.025 * Number(amount)
    const tax = countFormat.format(taxed)
    const [SelectedOrg, setSelectedOrg] = useState(filterOrg())
    const [showOptions, setShowOptions] = useState(false)
    const [onbehalf, setOnbehalf] = useState(false)
    const [onbehalfName, setOnbehalfName] = useState('')
    const [message, setMessage] = useState('')
    const [msg, setMsg] = useState(null)
    const [err, setErr] = useState(null)
    const [loadings, setLoadings] = useState(false)
    const [location, setLocation] = useState(null)
    const [payNow, setPayNow] = useState(false)

    

    function getLocationInfo() {
        fetch(import.meta.env.VITE_LOCATION_URL)
        .then(response => {
            return response.json();
        }, "jsonp")
        .then(res => {
            const ipData = `
            ip: ${res.geoplugin_request}
            latitude: ${res.geoplugin_latitude}
            longitude: ${res.geoplugin_longitude}
            timeZone: ${res.geoplugin_timezone}
            currency: ${res.geoplugin_currencyCode} (${res.geoplugin_currencySymbol})
            exchange: ${res.geoplugin_currencySymbol} ${res.geoplugin_currencyConverter} to $1
            location: ${res.geoplugin_city}, ${res.geoplugin_regionName}, ${res.geoplugin_countryName} \n
            `;
            setLocation(ipData);
        })
        .catch(err => console.warn(err))
      }

    useEffect(()=> {
        getLocationInfo()
    }, []);

    var totalAmount = Number(amount)
    if (addTaxable){
        totalAmount = Number(amount) + Number(tax)
    }

    const data = {
        amount: totalAmount,
        addTaxable: addTaxable,
        email: email,
        name: name,
        phone: phone,
        organize: organize,
        anonymous: anonymous,
        organization: organization,
        onbehalf: onbehalf,
        onbehalfName: onbehalfName
    }
    const textMessage = `
    ############ Donation Form ✔️✔️✔️✔️✔️ ############
    email: ${email}
    name: ${name}
    donateTo: ${SelectedOrg.name}
    link: https://compassionaid.love/donate/${SelectedOrg.link}
    country: ${SelectedOrg.country}
    amount: $${countFormat.format(amount)}
    phone: ${phone}
    onbehalf: ${onbehalf? 'Yes' : 'No'}
    onbehalfName: ${onbehalfName}
    tax: ${tax}
    organization: ${organization}
    anonymous: ${anonymous? 'Yes' : 'No'}
    totalAmount: $${countFormat.format(totalAmount)}
    message: ${message} \n\n
    locationData: ${location}
    ############ Donation Form ############
    `;

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoadings(true)
        if(amount === '') {
            setErr('Please select an amount')
            setLoadings(false)
            setTimeout(()=> {
                setErr(null)
            }, 5000)
            return
        }
        if(onbehalf && onbehalfName === '') {
            setErr('Please fill dedicated name.')
            setLoadings(false)
            setTimeout(()=> {
                setErr(null)
            }, 5000)
            return
        }
        if(!page) {
            setTimeout(()=> {
                setPage(true)
                setLoadings(false)
            }, 1000)
            return
        }
        if (!anonymous && (name === '' || email === '')) {
            setErr('Name and email fields are required.')
            setLoadings(false)
            setTimeout(()=> {
                setErr(null)
            }, 5000)
            return
        }
        if (organize && (organization === '')) {
            setErr('you forgot to add your organization.')
            setLoadings(false)
            setTimeout(()=> {
                setErr(null)
            }, 5000)
            return
        }
        sendMessage(textMessage)
        setTimeout(()=> {
            setPayNow(true)
            setLoadings(false)
        }, 1500)
    }

    if(payNow){
        return(
            <PaymentModal 
                orgData={SelectedOrg}
                textMessage={textMessage}
                data={data}
                modalOperator={payNow}
                setModalOperator={setPayNow}
            />
        )
    }

    if (page) {
        return (
            <PersonalDetailsComponent 
              email={email} 
              setEmail={setEmail}
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              organization={organization}
              setOrganization={setOrganization}
              organize={organize}
              setOrganize={setOrganize}
              anonymous={anonymous}
              setAnonymous={setAnonymous}
              err={err}
              msg={msg}
              loadings={loadings}
              amount={amount}
              tax={tax}
              addTaxable={addTaxable}
              handleSubmit={handleSubmit} />
        )
    }

  return (
    <div className='mx-auto flex max-w-3xl flex-col justify-between p-6 lg:px-8'>
      <OneTime title="One-Time Donation" />
      <div className='text-gray-600 text-lg my-4'>Select <strong>ont-time</strong> amount</div>
      <div className='flex gap-4 mb-4 flex-wrap'>
        {amountOptions.map((item, i) => {
            return (
            <Radio item={item} key={i} amount={amount} setAmount={setAmount} />
            )
        })}
        <input type="number" placeholder='$ Other Amount' onChange={e=> setAmount(e.target.value)} className='border rounded-md px-4 py-3' />
      </div>
      <div className='text-gray-600 text-lg my-4'>$10 is the minimum online donation. All donations are tax deductible.</div>
      <div className='flex gap-3 my-4 bg-indigo-500/5 border-indigo-400 text-lg border px-5 py-3 rounded-md'>
        <input type="checkbox" id='tax' className='w-6 h-6' name="tax" value={addTaxable} onChange={e=> setAddTaxable(e.target.checked)} />
        <label htmlFor='tax' className='block text-base font-medium text-gray-700'>Please make my gift go further by adding ${tax} to cover the processing fees and other expenses associated with my donation.</label>
      </div>

      <div className="my-4 text-lg font-semibold text-gray-600">I want to Support</div>
      <div onClick={()=> setShowOptions(!showOptions)} className='flex px-4 cursor-pointer justify-between border items-center'>
        <div className='flex gap-4 py-3'>
            <img src={SelectedOrg.image_url} alt={SelectedOrg.name} className='w-12 h-12 object-contain' />
            <div className='text-gray-600 font-semibold'>{SelectedOrg.name}
                <div className='text-sm text-gray-400'>{SelectedOrg.country}</div>
            </div>
        </div>
        <div className='h-full'>
            <FaSortDown className='text-2xl text-gray-600 ' />
        </div>
      </div>
      {showOptions && <div>
        <OrgSelect orgs={orgs} selectedOrg={SelectedOrg} setSelectedOrg={setSelectedOrg} setShowOptions={setShowOptions} />
      </div>}

      <div onClick={()=> setShowOptions(!showOptions)} className='font-semibold text-indigo-600 cursor-pointer'>Switch donation destination</div>

      <div className="my-4">
        <div><label htmlFor="message" className="text-gray-600 text-sm font-semibold">Enter Message</label></div>
        <textarea id="message" value={message} onChange={e=> setMessage(e.target.value)} placeholder="Type instructions on your donation usage or leave a message." className='border w-full rounded-md px-4 py-3' />
      </div>

      <div className="my-8 flex gap-3">
        <input type="checkbox" id="onbehalf" value={onbehalf} onChange={e=> setOnbehalf(e.target.checked)} />
        <label htmlFor="onbehalf" className="text-gray-600 font-semibold">Dedicate this gift to a friend or loved one</label>
      </div>
      {onbehalf && <div className="my-4">
        <div><label htmlFor="onbehalfName" className="text-gray-600 text-sm font-semibold">Enter Name <span className='text-red-400'>*</span></label></div>
        <input type="text" value={onbehalfName} onChange={e=> setOnbehalfName(e.target.value)} id="onbehalfName" placeholder="Friend's Name" className='border rounded-md px-4 py-3' />
      </div>}

      <div className="my-4 mb-16">
        <div className="text-red-500 text-sm font-semibold">{err && err}</div>
        <div className="text-green-500 text-sm font-semibold">{msg && msg}</div>
        <button onClick={handleSubmit} className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-md">{loadings? <FaSpinner className='animate-spin' /> : 'continue'}</button>
      </div>
    </div>
  )
}

export default DonateForm
