import React from 'react'

const DonateHeader = ({ page }) => {
  return (
    <div className='mx-auto flex max-w-3xl font-semibold items-center justify-center gap-1 p-6 lg:px-8'>
      <div className={`text-xl cursor-pointer text-gray-500 w-full py-3 text-center ${!page && 'border-l border-r border-b-4 text-gray-700'} `}>
        Donate
      </div>
      <div className={`text-xl cursor-pointer text-gray-500 w-full py-3 text-center ${page && 'border-l border-r border-b-4 text-gray-700'} `}>
        Payment Details
      </div>
    </div>
  )
}

export default DonateHeader
