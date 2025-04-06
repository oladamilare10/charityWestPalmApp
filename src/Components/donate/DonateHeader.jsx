import React from 'react'
import { CheckIcon } from '@heroicons/react/20/solid'

const DonateHeader = ({ page }) => {
  const steps = [
    { id: 1, name: 'Donation Details', description: 'Choose amount and organization' },
    { id: 2, name: 'Personal Information', description: 'Complete your details' },
  ]

  return (
    <nav aria-label="Progress" className="mx-auto max-w-3xl px-8 py-6">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => (
          <li key={step.name} className="md:flex-1">
            <div
              className={`group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 
                ${index <= (page ? 1 : 0) 
                  ? 'border-indigo-600' 
                  : 'border-gray-200'}`}
            >
              <span className="text-sm font-medium text-indigo-600">
                Step {step.id}
              </span>
              <span className="text-sm font-medium">
                {step.name}
              </span>
              <span className="text-sm text-gray-500">
                {step.description}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default DonateHeader
