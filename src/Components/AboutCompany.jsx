import { ArrowPathIcon, CakeIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Empathy',
    description:
      'Compassion Aid strives to understand and share the feelings and perspectives of the people we are helping, and to treat them with respect and kindness.',
    icon: CakeIcon,
  },
  {
    name: 'Solidarity',
    description:
      'Compassion Aid stands with the people we are helping, and supports their struggles and aspirations.',
    icon: LockClosedIcon,
  },
  {
    name: 'Diversity',
    description:
      'Compassion Aid celebrates the diversity of the people we are helping, and respects their cultures, religions, and identities.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Transparency',
    description:
      'Compassion Aid is honest and accountable for our actions and results, and communicates clearly and openly with their donors, partners, and beneficiaries.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Innovation',
    description:
      'Compassion Aid is creative and adaptable in finding solutions to the complex and changing humanitarian challenges we face.',
    icon: FingerPrintIcon,
  },
]

const AboutCompany = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">About Compassion Aid</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to know about Compassion Aid
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            <p className='mt-4'>
            <span className="text-base mr-2 font-semibold leading-7 text-gray-900">
              Compassion Aid: 
            </span>
              A Charity Foundation that Helps with Raising Resources for All Types of Crises, 
              Natural Disasters, and humanitarian causes around the world.
            </p>
            <p className='mt-4'>
              Compassion Aid is a non-profit organization that aims to promote social 
              justice and humanitarian causes around the world. The organization 
              was founded in 2016 by a group of passionate and dedicated volunteers 
              who wanted to make a positive difference in the lives of people who are 
              suffering from various crises and natural disasters.
            </p>
            <p className='mt-4'>
              Compassion Aid's mission is to raise resources and awareness for the most urgent 
              and neglected humanitarian issues, such as poverty, hunger, disease, 
              displacement, violence, and human rights violations. The organization 
              works with reputable and effective partners, such as the United Nations, 
              the Red Cross, Doctors Without Borders, and Save the Children, 
              to deliver aid and assistance to those who need it the most.
            </p>
            <p className='mt-4'>
              Compassion Aid's vision is to create a more peaceful, just, and compassionate 
              world, where every human being has access to basic needs, dignity, 
              and opportunities. We believes that everyone can make a 
              difference by donating, volunteering, or advocating for the causes 
              they care about.
            </p>
          
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <h3 className='text-2xl mb-6 font-bold tracking-tight text-gray-900'>
          Compassion Aid's values are:
          </h3>
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Compassion Aid's activities include</h2>
        
        <p className="mt-8">
        <span className="text-base mr-2 font-semibold leading-7 text-gray-900">
          Fundraising: 
        </span>
          Compassion Aid organizes various fundraising campaigns and events 
          to raise money for our humanitarian projects. Some examples of their past and 
          current fundraisers are: Help Gaza Heal, a fund raiser for medical and humanitarian 
          aid for the war victims in Gaza; Feed the Hungry, a fund raiser for food security 
          and nutrition programs for the famine-affected populations in Africa; Shelter the
          Homeless, a fund raiser for housing and sanitation projects for the refugees and 
          internally displaced people in Syria; Heal the Sick, a fund raiser for 
          health care and vaccination programs for the pandemic-hit communities in 
          India; Educate the Children, a fund raiser for education and protection 
          programs for the children affected by conflicts and disasters in Yemen.
        </p>
        <p className="mt-6">
        <span className="text-base mr-2 font-semibold leading-7 text-gray-900">
          Awareness: 
        </span>
           Compassion Aid also raises awareness and educates others about the
           humanitarian issues they are working on. They use various platforms, such as 
           social media, blogs, podcasts, newsletters, and art projects, to inform people 
           about the facts, stories, and solutions related to our causes. We also 
           encourage people to take action by signing petitions, joining protests, or 
           contacting their representatives to advocate for change.
        </p>
      </div>
    </div>
  )
}

export default AboutCompany
