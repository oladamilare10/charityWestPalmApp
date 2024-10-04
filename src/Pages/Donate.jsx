import React from 'react'
import Header from '../Components/Header'
import { orgs } from '../constants'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'

const Donate = () => {
  return (
    <div>
      <Header />
      <div className='mx-auto font-semibold text-stone-500 flex max-w-7xl items-center justify-between p-6 lg:px-8'>
        {'>'}Donate
      </div>
      <div className='mx-auto font-bold text-3xl text-indigo-600 flex max-w-7xl items-center justify-between p-6 lg:px-8'>
        <h3>Select Organization</h3>
      </div>
      <div className='mx-auto font-bold text-indigo-600 flex flex-col max-w-7xl items-center justify-between p-6 lg:px-8'>
        <div className='font-semibold text-xl'>America</div>
        <div className='flex-wrap w-full flex justify-start items-center gap-4 mt-4'>
            {orgs.organizations.map((item, index) => {
                if(item.continent === 'America') {
                    return (
                        <Link to={"/donate/" + item.link} key={index} className='border cursor-pointer hover:scale-105 duration-300 mb-4 rounded-md font-semibold text-gray-700 flex flex-col w-[310px] md:w-[350px] items-center justify-between p-0 lg:px-2 shadow-md'>
                            <div className='flex px-4 w-full py-2 justify-start border-b'>
                                <div className='h-10 w-10 border rounded-full mr-4 overflow-hidden'>
                                    <img src={item.image_url} className='w-full object-cover h-full rounded-full' />
                                </div>
                                <div className='flex w-full flex-col'>
                                    <div className='truncate'>{item.name}</div>
                                    <div className='text-sm text-stone-400 font-bold'>{item.country}</div>
                                </div>
                            </div>
                            <div className='p-1 text-sm px-4 py-2'>
                                <div className='mt-0 text-base text-stone-700'>{item.goal}</div>
                            </div>
                        </Link>
                    )
                }
            })}
        </div>
      </div>
      <div className='mx-auto font-bold text-indigo-600 flex flex-col max-w-7xl items-center justify-between p-6 lg:px-8'>
        <div className='font-semibold text-xl'>Europe</div>
        <div className='flex-wrap w-full flex justify-start items-center gap-4 mt-4'>
            {orgs.organizations.map((item, index) => {
                if(item.continent === 'Europe') {
                    return (
                        <Link to={"/donate/" + item.link} key={index} className='border cursor-pointer hover:scale-105 duration-300 mb-4 rounded-md font-semibold text-gray-700 flex flex-col w-[310px] md:w-[350px] items-center justify-between p-0 lg:px-2 shadow-md'>
                            <div className='flex px-4 w-full py-2 justify-start border-b'>
                                <div className='h-10 w-10 border rounded-full mr-4 overflow-hidden'>
                                    <img src={item.image_url} className='w-full object-cover h-full rounded-full' />
                                </div>
                                <div className='flex w-full flex-col'>
                                    <div className='truncate'>{item.name}</div>
                                    <div className='text-sm text-stone-400 font-bold'>{item.country}</div>
                                </div>
                            </div>
                            <div className='p-1 text-sm px-4 py-2'>
                                <div className='mt-0 text-base text-stone-700'>{item.goal}</div>
                            </div>
                        </Link>
                    )
                }
            })}
        </div>
      </div>
      <div className='mx-auto font-bold text-indigo-600 flex flex-col max-w-7xl items-center justify-between p-6 lg:px-8'>
        <div className='font-semibold text-xl'>Africa</div>
        <div className='flex-wrap w-full flex justify-start items-center gap-4 mt-4'>
            {orgs.organizations.map((item, index) => {
                if(item.continent === 'Africa') {
                    return (
                        <Link to={"/donate/" + item.link} key={index} className='border cursor-pointer hover:scale-105 duration-300 mb-4 rounded-md font-semibold text-gray-700 flex flex-col w-[310px] md:w-[350px] items-center justify-between p-0 lg:px-2 shadow-md'>
                            <div className='flex px-4 w-full py-2 justify-start border-b'>
                                <div className='h-10 w-10 border rounded-full mr-4 overflow-hidden'>
                                    <img src={item.image_url} className='w-full object-cover h-full rounded-full' />
                                </div>
                                <div className='flex w-full flex-col'>
                                    <div className='truncate'>{item.name}</div>
                                    <div className='text-sm text-stone-400 font-bold'>{item.country}</div>
                                </div>
                            </div>
                            <div className='p-1 text-sm px-4 py-2'>
                                <div className='mt-0 text-base text-stone-700'>{item.goal}</div>
                            </div>
                        </Link>
                    )
                }
            })}
        </div>
      </div>
      <div className='mx-auto font-bold text-indigo-600 flex flex-col max-w-7xl items-center justify-between p-6 lg:px-8'>
        <div className='font-semibold text-xl'>Asia</div>
        <div className='flex-wrap w-full flex justify-start items-center gap-4 mt-4'>
            {orgs.organizations.map((item, index) => {
                if(item.continent === 'Asia') {
                    return (
                        <Link to={"/donate/" + item.link} key={index} className='border cursor-pointer hover:scale-105 duration-300 mb-4 rounded-md font-semibold text-gray-700 flex flex-col w-[310px] md:w-[350px] items-center justify-between p-0 lg:px-2 shadow-md'>
                            <div className='flex px-4 w-full py-2 justify-start border-b'>
                                <div className='h-10 w-10 border rounded-full mr-4 overflow-hidden'>
                                    <img src={item.image_url} className='w-full object-cover h-full rounded-full' />
                                </div>
                                <div className='flex w-full flex-col'>
                                    <div className='truncate'>{item.name}</div>
                                    <div className='text-sm text-stone-400 font-bold'>{item.country}</div>
                                </div>
                            </div>
                            <div className='p-1 text-sm px-4 py-2'>
                                <div className='mt-0 text-base text-stone-700'>{item.goal}</div>
                            </div>
                        </Link>
                    )
                }
            })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Donate
