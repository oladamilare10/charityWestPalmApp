import React, { useState } from 'react'
import Header from '../Components/Header'
import { orgs } from '../constants'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import clsx from 'clsx'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

const Donate = () => {
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState('')
    const filterOrgData =
        query === ''
        ? orgs.organizations
        : orgs.organizations.filter(item => {
            return item.name.toLowerCase().includes(query.toLowerCase())
  
        })
  return (
    <div>
      <Header />
      <div className='mx-auto font-semibold text-stone-500 flex max-w-7xl items-center justify-between p-6 lg:px-8'>
        {'>'}Donate
      </div>
      <div className='mx-auto font-bold text-3xl text-indigo-600 flex max-w-7xl items-center justify-between p-6 lg:px-8'>
        <h3>Select Organization</h3>
      </div>
      <div className='mx-auto font-bold text-3xl text-indigo-600 flex max-w-7xl items-center justify-between p-6 lg:px-8'>
        <Combobox value={selected} onChange={(value) => setSelected(value)} onClose={() => setQuery('')}>
            <div className="ml-4 w-full md:w-[500px] relative">
                <ComboboxInput
                    className={clsx(
                    'w-full rounded-lg shadow-sm border bg-white/55 py-1.5 pr-8 pl-3 text-sm/6 text-black',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                    displayValue={(items) => items?.name}
                    placeholder='Search your favorite foundation'
                    onChange={(event) => setQuery(event.target.value)}
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5 -mb-3">
                    <ChevronDownIcon className="size-4 fill-black/60 group-data-[hover]:fill-white" />
                </ComboboxButton>
            </div>
            <ComboboxOptions
                anchor="bottom"
                transition
                className={clsx(
                    'w-[var(--input-width)] rounded-xl border border-black/50 bg-black/50 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                    'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                )}
                >
                {filterOrgData.map((items, index) => (
                    <Link to={'/donate/' + items.link} >
                        <ComboboxOption
                        key={index}
                        value={items}
                        className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                        >
                                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                                <div className="text-sm/6 text-white">{items.name}</div>
                        </ComboboxOption>
                    </Link>
                ))}
            </ComboboxOptions>
        </Combobox>
      </div>
      <div className='mx-auto font-bold text-indigo-600 flex flex-col max-w-7xl items-center justify-between p-6 lg:px-8'>
        <div className='font-semibold text-xl'>Global</div>
        <div className='flex-wrap w-full flex justify-start items-center gap-4 mt-4'>
            {orgs.organizations.map((item, index) => {
                if(item.continent === 'Global') {
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
