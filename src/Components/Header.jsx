import { useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Logo from '../assets/logo-no-background.png'
import { Link } from 'react-router-dom'



const Header = (props) => {
    const handleDonate = props.handleDonate
    
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
            <Link to={"/"} className="-m-1.5 p-1.5">
                <span className="sr-only">Compassion Aid</span>
                <img className="h-8 w-auto text-indigo-600" src={Logo + '?color=indigo&shade=600'} alt="" />
            </Link>
            </div>
            <div className="flex lg:hidden">
            <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
            >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            </div>
            <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Link to={"/"} className="text-sm font-semibold leading-6 text-gray-900">
                Home
            </Link>
            <Link to={"/foundations"} className="text-sm font-semibold leading-6 text-gray-900">
                Foundations
            </Link>
            <Link to={"/Purpose"} className="text-sm font-semibold leading-6 text-gray-900">
                Purpose
            </Link>
            <Link to={"/Company"} className="text-sm font-semibold leading-6 text-gray-900">
                Company
            </Link>
            <Link to={"/contact"} className="text-sm font-semibold leading-6 text-gray-900">
                Contact
            </Link>
            </Popover.Group>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/donate" className="text-sm bg-transparent font-semibold leading-6 text-gray-900">
                Donate Now <span aria-hidden="true">&rarr;</span>
            </Link>
            </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-10" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
                <Link to={"/"} className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                    className="h-8 w-auto"
                    src={Logo}
                    alt=""
                />
                </Link>
                <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
                >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                    <Link
                    to={"/"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                    Home
                    </Link>
                    <Link
                    to={"/foundations"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                    Foundations
                    </Link>
                    <Link
                    to={"/Purpose"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                    Purpose
                    </Link>
                    <Link
                    to={"/Company"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                    Company
                    </Link>
                    <Link
                    to={"/contact"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                    Contact
                    </Link>
                </div>
                <div className="py-6">
                    <Link to="/donate"
                    onClick={handleDonate}
                    className="-mx-3 block bg-transparent rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                    Donate Now
                    </Link>
                </div>
                </div>
            </div>
            </Dialog.Panel>
        </Dialog>
        </header>
    </>
  )
}

export default Header
