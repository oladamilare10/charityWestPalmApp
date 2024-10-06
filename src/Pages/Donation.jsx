import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Link, useParams } from 'react-router-dom'
import { orgs } from '../constants'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import clsx from 'clsx'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import Footer from '../Components/Footer'
import RaiseModal from '../Components/RaiseModal'


const Donation = () => {
    const urlParam = useParams()
    const linkData = urlParam.org
    const [orgData, setOrgData] = useState(null)
    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [modalOperator, setModalOperator] = useState(false)
    const [selected, setSelected] = useState(orgs.organizations[0])
    useEffect(()=> {
        const org = orgs.organizations.find(item => item.link === linkData)
        setOrgData(org)
        setIsOpen(false)
      }, [linkData])

      const filterOrgData =
        query === ''
        ? orgs.organizations
        : orgs.organizations.filter(item => {
            return item.name.toLowerCase().includes(query.toLowerCase())
  
        })

  return (
    orgData &&
    <div>
      <Header />
      <div className='mx-auto font-semibold flex max-w-7xl items-center p-6 lg:px-8'>
        <Link to="/donate" className='text-stone-500'>Donate</Link>{'> '}<span className="text-stone-800"> {orgData.name}</span>
      </div>
        <div className="flex justify-center mt-8">
          <button onClick={()=> setModalOperator(!modalOperator)} className="flex items-center px-6 py-3 text-sm font-medium leading-5 text-white transition duration-150 bg-blue-600 hover:bg-blue-700 rounded-md">
            Donate Now
          </button>
        </div>
      <div className='mx-auto font-semibold max-w-7xl items-center p-6 lg:px-8'>
        <div className="text-xl font-bold tracking-tight flex items-center text-gray-900 sm:text-4xl">
            <div>Donate to {orgData.name}</div> 
            {!isOpen ? <div onClick={() => setIsOpen(!isOpen)} className='ml-4 text-sm font-semibold cursor-pointer bg-slate-300 px-2 rounded-md py-0.5'>choose a different foundation</div> :
            <Combobox value={selected} onChange={(value) => setSelected(value)} onClose={() => setQuery('')}>
            <div className="ml-4 relative">
                <ComboboxInput
                    className={clsx(
                    'w-full rounded-lg border-none bg-black/55 py-1.5 pr-8 pl-3 text-sm/6 text-white',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                    displayValue={(items) => items?.name}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5 -mb-3">
                    <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
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
            </Combobox>}
        </div>
        <p className="mt-0 text-base leading-8 text-gray-600">
          {orgData.goal}
        </p>
        <div className='mt-3 text-lg leading-8 text-gray-600'>
            {orgData.purpose}
        </div>

        <div className='text-indigo-600'>{orgData.country}</div>
      </div>
      {modalOperator && <RaiseModal modalOperator={modalOperator} orgData={orgData} setModalOperator={setModalOperator} />}
      <Footer />
    </div>
  )
}

export default Donation
