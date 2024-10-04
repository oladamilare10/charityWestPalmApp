import React from 'react'
import { Link } from 'react-router-dom'

const Banner = (props) => {
  const handleDonate = props.handleDonate
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Gaza Needs You:
            </h1>
            <p className="mt-4 text-xl text-gray-500">
            A Fund Raiser for Emergency Relief and Recovery. The victims in Gaza are suffering from a humanitarian crisis and need 
            all the help they can get.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="https://ichef.bbci.co.uk/news/624/mcs/media/images/76411000/jpg/_76411415_76411414.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://media2.s-nbcnews.com/j/MSNBC/Components/Slideshows/_production/ss-120719-syria-uprising/ss-121025-syria-uprising-06.fit-360w.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/itr9PLtBaw7Q/v1/1200x819.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://media.licdn.com/dms/image/C4D12AQEnQIOpQeDHwQ/article-cover_image-shrink_720_1280/0/1619521100922?e=2147483647&v=beta&t=HrIyO8_o8j_biGarWf1zpCJPNz4b8wQKUxUa6x8ru_8"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://content.api.news/v3/images/bin/c35342a03369f3505a54f89f67d96a5a"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://connect-assets.prosple.com/cdn/ff/wJsI5yR3eBGFwBb4VxCx6L6h8Q4_Cor4CrsdgWmc1Co/1567568623/public/styles/scale_890_no_upsize/public/2019-09/feature-article-Is-charity-work-right-for-me-838x484_2017.jpg?itok=M7QiD1Id"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://nextshark.b-cdn.net/wp-content/uploads/2023/10/Israel-Gaza-war.jpg?width=1536&auto_optimize=medium"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/donate"
                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
