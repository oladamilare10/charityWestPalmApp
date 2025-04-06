import React, { useEffect, useState } from 'react'
import { countFormat, orgs } from '../../constants'
import { FaSortDown } from 'react-icons/fa'
import { IoIosCheckmark } from "react-icons/io";
import { FaSpinner } from 'react-icons/fa6';
import PaymentModal from '../PaymentModal';
import { sendMessage } from '../../constants/send';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import PaymentProcessor from '../PaymentProcessor'

const amountOptions = [75, 125, 250, 500, 1000, 2000]
const frequencies = [
    { id: 'one-time', name: 'One-Time Donation' },
    { id: 'monthly', name: 'Monthly Donation' },
    { id: 'quarterly', name: 'Quarterly Donation' },
    { id: 'annually', name: 'Annual Donation' }
]

const OneTime = ({ title }) => {
    return (
        <div className='flex justify-center bg-indigo-600 max-w-[300px] text-white cursor-pointer px-8 py-4 rounded-md items-center'>
            <h2 className='text-2xl font-bold'>{title}</h2>
        </div>
    )
}

const Radio = ({ item, amount, setAmount, recurring, recurringText }) => {
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
              className={`${numAmount === item ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'} 
                border px-5 py-4 rounded-md cursor-pointer transition-colors font-semibold`}
              htmlFor={`amount-${item}`}
            >
              ${countFormat.format(item)} {recurring ? recurringText : ''}
            </label>
        </div>
    )
}

const OrgSelect = ({ orgs, selectedOrg, setSelectedOrg, setShowOptions }) => {
    return (
        <div className="absolute w-full bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto z-10">
            {orgs.organizations.map(org => (
                <div 
                    key={org.link} 
                    onClick={() => {
                        setSelectedOrg(org)
                        setShowOptions(false)
                    }}
                    className='flex cursor-pointer px-4 hover:bg-gray-50 justify-between items-center border-b last:border-b-0'
                >
                    <div className='flex gap-4 py-3'>
                        <img src={org.image_url} alt={org.name} className='w-12 h-12 rounded-full object-cover' />
                        <div className='text-gray-600 font-semibold'>
                            {org.name}
                            <div className='text-sm text-gray-400'>{org.country}</div>
                        </div>
                    </div>
                    {selectedOrg === org && (
                        <div className='h-full'>
                            <IoIosCheckmark className='text-2xl text-indigo-600' />
                        </div>
                    )}
                </div>
            ))}
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
        <button onClick={handleSubmit} className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-md">{loadings ? <FaSpinner className='animate-spin' /> : 'Donate $' + countFormat.format(amount)}</button>
      </div>
        </div>
    )
}

const DonationTypeSelector = ({ selectedType, onSelect }) => {
    return (
        <div className="flex flex-wrap gap-3 mb-6">
            {frequencies.map((frequency) => (
                <button
                    key={frequency.id}
                    onClick={() => onSelect(frequency.id)}
                    className={`${
                        selectedType === frequency.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-600'
                    } px-6 py-3 rounded-md font-semibold transition-colors`}
                >
                    {frequency.name}
                </button>
            ))}
        </div>
    )
}

const DonateForm = ({ page, setPage }) => {
    const [searchParams] = useSearchParams()
    const paramsValue = searchParams.get('donate-to')
    const prefilledAmount = searchParams.get('amount')
    const navigate = useNavigate()

    const filterOrg = () => {
        if (paramsValue) {
            return orgs.organizations.find(item => item.link === paramsValue);
        }else {
            return orgs.organizations[0];
        }
    }

    const [amount, setAmount] = useState(prefilledAmount || '')
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
    const [showPayment, setShowPayment] = useState(false)
    const [donationType, setDonationType] = useState('one-time')

    

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

    // Calculate recurring text
    const getRecurringText = () => {
        switch(donationType) {
            case 'monthly':
                return 'per month'
            case 'quarterly':
                return 'per quarter'
            case 'annually':
                return 'per year'
            default:
                return ''
        }
    }

    // Update PayPal order creation
    const createPayPalSubscription = async (actions) => {
        if (donationType === 'one-time') {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: totalAmount,
                        currency_code: 'USD'
                    },
                    description: `One-time donation to ${SelectedOrg?.name || 'Charity'}`
                }]
            })
        } else {
            // For recurring donations
            const frequency = {
                monthly: { interval_unit: 'MONTH', interval_count: 1 },
                quarterly: { interval_unit: 'MONTH', interval_count: 3 },
                annually: { interval_unit: 'YEAR', interval_count: 1 }
            }[donationType]

            return actions.subscription.create({
                plan_id: import.meta.env.VITE_PAYPAL_PLAN_ID, // You'll need to create this in PayPal
                quantity: 1,
                application_context: {
                    brand_name: 'Compassion Aid',
                    user_action: 'SUBSCRIBE_NOW',
                    payment_method: {
                        payer_selected: 'PAYPAL',
                        payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED'
                    }
                }
            })
        }
    }

    // Update text message to include donation frequency
    const textMessage = `
    ############ Donation Form ✔️✔️✔️✔️✔️ ############
    email: ${email}
    name: ${name}
    donateTo: ${SelectedOrg.name}
    link: https://compassionaid.love/donate/${SelectedOrg.link}
    country: ${SelectedOrg.country}
    amount: $${countFormat.format(amount)} ${getRecurringText()}
    donation_type: ${donationType}
    phone: ${phone}
    onbehalf: ${onbehalf? 'Yes' : 'No'}
    onbehalfName: ${onbehalfName}
    tax: ${tax}
    organization: ${organization}
    anonymous: ${anonymous? 'Yes' : 'No'}
    totalAmount: $${countFormat.format(totalAmount)} ${getRecurringText()}
    message: ${message} \n\n
    locationData: ${location}
    ############ Donation Form ############
    `;

    const handlePaymentSuccess = (details) => {
        // Send confirmation message
        sendMessage(textMessage)
        // Navigate to thank you page
        navigate(`/thank-you?amount=${totalAmount}&org=${SelectedOrg?.name}`)
    }

    const handlePaymentError = (error) => {
        setErr(error)
        setLoadings(false)
        setShowPayment(false) // Allow user to try again
    }

    const handleSubmit = () => {
        setErr(null)
        setMsg(null)
        
        if (!page) {
            // First step validation
            if (!amount || amount < 10) {
                setErr('Please enter a valid donation amount (minimum $10)')
                return
            }
            setPage(true) // Move to second step
            return
        }

        // Second step validation
        if (!anonymous) {
            if (!email) {
                setErr('Please enter your email')
                return
            }
            if (!name) {
                setErr('Please enter your name')
                return
            }
            if (organize && !organization) {
                setErr('Please enter your organization name')
                return
            }
        }

        if (onbehalf && !onbehalfName) {
            setErr('Please enter the name for dedication')
            return
        }

        setLoadings(true)
        setShowPayment(true)
    }

    if (showPayment) {
        return (
            <div className="mx-auto max-w-3xl px-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Details</h2>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <p className="text-gray-600">Donation Amount: <span className="font-semibold">${countFormat.format(totalAmount)}</span></p>
                        <p className="text-gray-600">Organization: <span className="font-semibold">{SelectedOrg?.name}</span></p>
                        {!anonymous && <p className="text-gray-600">Donor: <span className="font-semibold">{name}</span></p>}
                    </div>
                    <button 
                        onClick={() => setShowPayment(false)}
                        className="text-indigo-600 hover:text-indigo-500 font-semibold"
                    >
                        ← Back to form
                    </button>
                </div>
                
                <PayPalScriptProvider options={{ 
                    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
                    currency: "USD"
                }}>
                    <PaymentProcessor
                        amount={totalAmount}
                        selectedOrg={SelectedOrg}
                        donationType={donationType}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                    />
                </PayPalScriptProvider>
            </div>
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
                amount={totalAmount}
                tax={tax}
                addTaxable={addTaxable}
                handleSubmit={handleSubmit}
            />
        )
    }

    return (
        <div className='mx-auto flex max-w-3xl flex-col justify-between p-6 lg:px-8'>
            <DonationTypeSelector 
                selectedType={donationType} 
                onSelect={setDonationType} 
            />
            <div className='text-gray-600 text-lg my-4'>
                Select amount {getRecurringText()}
            </div>
            <div className='flex gap-4 mb-4 flex-wrap'>
                {amountOptions.map((item, i) => (
                    <Radio 
                        key={i} 
                        item={item} 
                        amount={amount} 
                        setAmount={setAmount}
                        recurring={donationType !== 'one-time'}
                        recurringText={getRecurringText()}
                    />
                ))}
                <input 
                    type="number" 
                    placeholder='$ Other Amount' 
                    onChange={e => setAmount(e.target.value)} 
                    className='border rounded-md px-4 py-3' 
                />
            </div>
            <div className='text-gray-600 text-lg my-4'>
                $10 is the minimum online donation{donationType !== 'one-time' ? ' per period' : ''}. 
                All donations are tax deductible.
            </div>
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
                <button 
                    onClick={handleSubmit} 
                    className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-md hover:bg-indigo-700 transition-colors"
                >
                    {loadings ? <FaSpinner className='animate-spin' /> : 'Continue'}
                </button>
            </div>
        </div>
    )
}

export default DonateForm
