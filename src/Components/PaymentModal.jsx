import React, { useEffect, useState } from 'react'
import { GiCancel } from 'react-icons/gi'
import { motion } from 'framer-motion'
import { countFormat, faqSection, logo } from '../constants'
import { FaCopy } from 'react-icons/fa'
import QRCode from 'react-qr-code'
import { BiLeftArrowAlt } from 'react-icons/bi'
import CountdownTimer from './Timer'

const coins = [
    {id: 1, name: 'Bitcoin', address: import.meta.env.VITE_BTC_ADDRESS_ONE, network: 'bitcoin', rate: 61906, currency: 'BTC'},
    {id: 2, name: 'Ethereum', address: import.meta.env.VITE_ETH_ADDRESS_ONE, network: 'ERC20', rate: 2403, currency: 'ETH'},
    {id: 3, name: 'Bitcoin Cash', address: import.meta.env.VITE_BTCH_ADDRESS_ONE, network: 'Bitcoin Cash', rate: 322, currency: 'BTCH'},
    {id: 4, name: 'Litecoin', address: import.meta.env.VITE_LTC_ADDRESS_ONE, network: 'Litecoin', rate: 67, currency: 'LTC'},
    {id: 5, name: 'USDT', address: import.meta.env.VITE_USDT_ADDRESS_ONE, network: 'TRC20', rate: 1, currency: 'USDT'},
]

const PaymentModal = ({ setModalOperator, modalOperator, orgData, data, textMessage }) => {
    const [err, setErr] = useState(null)
    const [pager, setPager] = useState(false)
    const [message, setMessage] = useState('')
    const [selected, setSelected] = useState(coins[0].name)
    const [fundMsg, setFundMsg] = useState(null)
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date())
    const [selectedObject, setSelectedObject] = useState(coins[0])
    const value = selectedObject.address
    const [paymentId, setPaymentId] = useState(null)

    function generateUniquePaymentId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let result = ''
        for (let i = 0; i < 16; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setPaymentId("Cl_" + result)
    }

    //add time to current date
    const addMinutes = (minutes) => {
        const newDate = new Date(currentDate);
        newDate.setMinutes(newDate.getMinutes() + minutes);
        setCurrentTime(newDate);
      };

//generate payment Id
    useEffect(()=> {
        generateUniquePaymentId()
    }, [])

    useEffect(()=> {
        const filterSelected = () => {
            const process = coins.filter((coin) => coin.name === selected )
            setSelectedObject(process[0])
        }
        return filterSelected()
    }, [selected])
    
    function handleCopyValue (value) {
        navigator.clipboard.writeText(value)
        setFundMsg('copied to clipboard')
        setTimeout(() => {
            setFundMsg(null)
        }, 3500)
    }


    const handlePay = (e) => {
        e.preventDefault()
        if (!pager){
            setCurrentDate(new Date())
            setPager(true)
            addMinutes(30)
            
            return
        }else{
            
            setMessage('')
            setSelected(coins[0].name)
            setSelectedObject(coins[0])
            setErr(null)
        }
    }
    return (
    <div className='absolute top-0 bottom-0 left-0 right-0 z-50 bg-black/30 flex justify-center items-center'>
        {pager ? <motion.div
        initial={{x: '-100%'}}
        transition={{duration: .3, ease: 'linear'}}
        animate={{x: 0}}
        className='bg-white w-full h-screen overflow-scroll'>
        <div className='flex justify-between border-b w-full'>
        <img src={logo} width={130} className="ml-8 object-contain" alt="" />
            <div title={orgData.name} className='px-4 py-2 text-2xl truncate font-bold text-gray-600'>Donate to {orgData.name}</div>
            <button className='text-gray-600 px-4 py-2 border-l hover:text-gray-900' onClick={() => setPager(false)}>
                <BiLeftArrowAlt />
            </button>
        </div>
        <div className='p-4'>
        <div className='mt-4 w-full'>
            <div className='w-full'>
                <div className='border w-52 mx-auto'>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={value}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <div className='mt-8 mx-auto max-w-[30rem]'>
                <CountdownTimer targetDate={currentTime} />
                        <p className='text-sm text-gray-700'>Please scan the QR code to complete the payment</p>
                        <p className='text-sm text-gray-700'>Once you have completed the payment, you will receive your rewards</p>
                    
                    <div className='w-full flex text-stone-900 bg-gray-300 py-1 rounded-sm gap-4 justify-center items-center my-4'>
                        <div className='w-[85%] truncate'>{value}</div>
                        <FaCopy className='cursor-pointer' onClick={() => handleCopyValue(value)} />
                    </div>
                    <div className='flex justify-center'>
                        {fundMsg && <div className='-mt-3 mb-4 text-green-600 font-semibold'>{fundMsg}</div>}
                        {/* <button className='py-2 px-4 bg-gray-900 text-white rounded-sm hover:bg-gray-800' onClick={handlePay}>Donate</button> */}
                    </div>
                    <div>Network: {selectedObject.network}</div>
                    <div className='text-sm font-[500] text-stone-800'>
                        <div>
                            <div>Payment Status: Pending</div>
                        </div>
                        <div>
                            <div>Payment Date: {new Date().toLocaleString()}</div>
                        </div>
                        <div>
                            <div>Payment ID: {paymentId}</div>
                        </div>
                        <div>
                            {/* <a href={`https://${selectedObject.network}.vite.net/#/scan?address=${value}`} target='_blank' rel='noopener noreferrer'>View on {selectedObject.network} Explorer</a> */}
                        </div>
                        <div>
                            <div onClick={()=> handleCopyValue(countFormat.format(data.amount / selectedObject.rate))} className='flex gap-2 items-center'>amount: {countFormat.format(data.amount / selectedObject.rate)} {selectedObject.currency} <FaCopy /></div>
                        </div>
                        <div>
                            <div>wallet Type: {selectedObject.name}</div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='mt-4 text-2xl text-indigo-600 font-semibold'>{countFormat.format(data.amount)} USD</div>
                        {/* <button className='py-2 px-4 bg-gray-900 text-white rounded-sm hover:bg-gray-800' onClick={handlePay}>Donate</button> */}
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div className='my-4 mx-auto font-semibold w-[80%] text-wrap text-sm text-gray-600'>
            <div>
                <h3 className='text-base -mt-3'>{faqSection.question}</h3>
                <p>{faqSection.answer}</p>
                <h3 className='text-base mt-2'>{faqSection.bulletin[0].title}</h3>
                <p>{faqSection.bulletin[0].description}</p>
                <ul>
                    {faqSection.bulletin[0].links.map((link, index) => {
                        return <li><a href={link.link} className='text-indigo-600 underline' target='_blank' rel='noopener noreferrer' key={index}>{link.tag}</a></li>
                    })}
                </ul>
                {/* <span>By clicking Donate, you agree to our </span>
                <a href='#' className='text-indigo-600 underline'>Terms & Conditions</a> */}
            </div>
        </div>
    </motion.div>: 
    
    <motion.div
        initial={{x: '-100%'}}
        transition={{duration: .3, ease: 'linear'}}
        animate={{x: 0}}
        className='bg-white rounded-lg w-full h-screen shadow-lg'>
        <div className='flex justify-between border-b w-full'>
            <img src={logo} width={130} className="ml-8 object-contain" alt="" />
            <div title={orgData.name} className='px-4 py-2 text-2xl font-bold truncate text-gray-600'>Donate to {orgData.name}</div>
            <button className='text-gray-600 px-4 py-2 border-l hover:text-gray-900' onClick={() => setModalOperator(!modalOperator)}>
                <GiCancel />
            </button>
        </div>
        <div className='p-4 flex justify-center mt-8 h-screen'>
        <div>  
            <label className='block text-sm font-medium text-gray-700'>Payment Method</label>
            <select defaultValue={selected} onChange={(e)=> setSelected(e.target.value)} className='block w-72 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500'>
                {coins.map((item)=> {
                    return <option key={item.id} value={item.name}>{item.name}</option>
                })}
            </select>
            <button onClick={handlePay} className='w-full mt-7 flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                Proceed
            </button>
        </div>
        </div>
        <div className='flex justify-center p-4 text-sm text-gray-600'>
            <span>By clicking Donate, you agree to our </span>
            <a href='#' className='text-indigo-600 underline'>Terms & Conditions</a>
        </div>
    </motion.div>
    }
    </div>
    )
}

export default PaymentModal