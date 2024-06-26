const features = [
    { name: 'Medical aid', description: 'Donations will be used to provide essential medical supplies, equipment, and personnel to treat the wounded and sick in Gaza. This includes medicines, bandages, surgical tools, ambulances, doctors, nurses, and paramedics.' },
    { name: 'Humanitarian aid', description: 'Donations will be used to provide basic humanitarian needs, such as food, water, hygiene kits, blankets, and shelter, to the displaced and vulnerable populations in Gaza. This also includes supporting local organizations that are delivering aid on the ground.' },
    { name: 'Education aid', description: 'Donations will be used to support the education and development of children and youth in Gaza, who have been severely affected by the war. This includes repairing damaged schools, providing learning materials, training teachers, and offering psychosocial support and recreational activities.' },
    { name: 'Protection aid', description: 'Donations will be used to protect the rights and dignity of civilians in Gaza, especially women, children, and minorities, who are at risk of violence, abuse, and exploitation. This includes providing legal assistance, advocacy, and monitoring of human rights violations.' },
    { name: 'Recovery aid', description: 'Donations will be used to help Gaza recover from the physical and economic damage caused by the war. This includes clearing rubble, restoring infrastructure, creating jobs, and supporting livelihoods.' },
    { name: 'Resilience aid', description: 'Donations will be used to help Gaza build resilience and cope with future shocks and stresses. This includes strengthening local capacities, promoting social cohesion, and supporting peacebuilding initiatives.' },
  ]

const Features = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">What Your Donations Will Be Used For</h2>
          <p className="mt-4 text-gray-500">
            {/* The Here are some possible categories and descriptions for what donations will be used for. */}
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            src="https://s.w-x.co/util/image/w/in-manila2.jpg?crop=16:9&width=800&format=pjpg&auto=webp&quality=60"
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://th.bing.com/th/id/OIF.E3Db6VGY7Pwpyypu5gdieA?pid=ImgDet&rs=1"
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://cdn.abcotvs.com/dip/images/13885907_Israelis-evacuate-from-Gaza-Strip-AP-TN-img.jpg?w=1600"
            alt="Side of walnut card tray with card groove and recessed card area."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="https://live.staticflickr.com/7166/6599753773_dd1c2aacec_z.jpg"
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  )
}

export default Features
