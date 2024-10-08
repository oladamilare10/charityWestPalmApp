import { Link } from "react-router-dom"
import { banners } from "../assets"

const callouts = [
    {
      name: 'Humanitarian aid',
      description: 'Provide basic humanitarian needs',
      imageSrc: banners.bannerFive,
      imageAlt: 'Humanitarian aid.',
      href: '#',
    },
    {
      name: 'Protection aid',
      description: 'Protect the rights and dignity of children and civilians where ever you decide',
      imageSrc: banners.category.categoryOne,
      imageAlt: 'Protection aid.',
      href: '#',
    },
    {
      name: 'Resilience aid',
      description: 'Help build resilience.',
      imageSrc: banners.category.categoryTwo,
      imageAlt: 'Resilience aid.',
      href: '#',
    },
  ]
const Category = () => {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Features</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <Link to={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </Link>
                </h3>
                <p className="text-base font-semibold text-gray-900">{callout.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
