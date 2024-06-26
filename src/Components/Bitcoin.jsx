import React from 'react'
import QrCode from '../assets/qrCode.png'

const Bitcoin = () => {
    
    const walletId = "19uoAXGyMxKEnHHerzbGHUetA19EKRQ22o"

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Donate With Crypto</h1>
        </div>
        </header>
        <main>
        <div className="mx-auto text-right max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className='block px-2 py-2 text-left font-semibold hover:text-indigo-600'>
                {walletId}
            </div>
            <img src={QrCode} alt="" className="img mx-auto block px-4 py-4 mt-5 w-48" />
        </div>
        </main>
    </>
  )
}

export default Bitcoin
