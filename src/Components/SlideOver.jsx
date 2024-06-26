import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CreditCardIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Bitcoin from './Bitcoin'
import { PiCurrencyBtcFill } from 'react-icons/pi';

const SlideOver = (props) => {
    const handleDonate = props.handleDonate
    const handleBitcoin = props.handleBitcoin
    const bitcoin = props.bitcoin
  const [open, setOpen] = useState(true)

  const handleClose = ()=>{
    setOpen
    handleDonate()
  }

  const closeBit = () => {
    handleBitcoin()
  }
  

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={handleClose}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                        Gaza Needs You.
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <label htmlFor='coin' onClick={closeBit} className="py-8 mx-auto px-8 w-5/5 flex mt-6 mb-6 justify-start relative bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                          <PiCurrencyBtcFill className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                        </div>
                        <div className='text-base font-semibold leading-6 text-gray-900'>Donate With BitCoin</div>
                        <input type="radio" className='accent-indigo-600/25' name="payment" id="coin" />
                      </label>

                        {bitcoin && <Bitcoin />}

                      <label htmlFor='card' className="py-8 mx-auto px-8 w-5/5 flex mt-6 mb-6 justify-start relative bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                        <label htmlFor='card' className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                          <CreditCardIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                        </label>
                        <label htmlFor='card' className='text-base font-semibold leading-6 text-gray-900'>Donate With GiveButter</label>
                        <givebutter-widget id="LWJmQj"></givebutter-widget>
                      </label>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SlideOver
