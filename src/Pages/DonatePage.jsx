import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { projects, categories } from '../constants/projects'
import { sendMessage } from '../constants/send'
import { getReferringStaff } from '../constants/staff'
import { countFormat } from '../constants'
import { 
  UserGroupIcon, 
  GlobeAltIcon, 
  CalendarIcon,
  MapPinIcon,
  ChartBarIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ArrowsUpDownIcon,
} from '@heroicons/react/24/outline'

const ProjectCard = ({ project, onSelect, isSelected }) => {
  const endDate = new Date(project.endDate)
  const now = new Date()
  const daysLeft = Math.max(0, Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)))
  
  const getDaysLeftText = () => {
    if (daysLeft === 0) {
      return 'Ending today'
    } else if (daysLeft < 0) {
      return 'Ended'
    } else if (daysLeft === 1) {
      return '1 day left'
    } else {
      return `${daysLeft} days left`
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer
        ${isSelected ? 'ring-2 ring-indigo-600 scale-[1.02]' : 'hover:scale-[1.01]'}`}
      onClick={() => onSelect(project)}
    >
      <div className="relative h-48">
        <img 
          src={project.image} 
          alt={project.title} 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            project.status === 'active' 
              ? 'bg-green-100 text-green-800'
              : 'bg-amber-100 text-amber-800'
          }`}>
            {project.status === 'active' ? 'Active' : 'Urgent'}
          </span>
        </div>
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <div className="flex items-center gap-2 text-sm">
            <MapPinIcon className="h-4 w-4" />
            {project.location}
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{project.description}</p>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-semibold">{project.progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${
                project.progress >= 90 ? 'bg-green-600' :
                project.progress >= 75 ? 'bg-indigo-600' :
                project.progress >= 50 ? 'bg-amber-500' :
                'bg-rose-500'
              }`}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Raised</span>
            <span className="font-semibold">${countFormat.format(project.raised)} of ${countFormat.format(project.goal)}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <UserGroupIcon className="h-4 w-4" />
            {project.stats.donors} donors
          </div>
          <div className="flex items-center gap-1">
            <GlobeAltIcon className="h-4 w-4" />
            {project.stats.countries} countries
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
          <div className={`flex items-center gap-1 ${daysLeft === 0 ? 'text-amber-600' : daysLeft < 0 ? 'text-red-600' : 'text-gray-500'}`}>
            <CalendarIcon className="h-4 w-4" />
            {getDaysLeftText()}
          </div>
          <span className="text-indigo-600 font-medium">{project.category}</span>
        </div>
      </div>
    </motion.div>
  )
}

const FilterBar = ({ filters, setFilters, clearFilters }) => {
    return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {(filters.search || filters.category || filters.status) && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <XMarkIcon className="h-4 w-4" />
            Clear filters
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilters(prev => ({
                  ...prev,
                  category: prev.category === category ? null : category
                }))}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                  ${filters.category === category
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
          <div className="flex gap-2">
            <button
              onClick={() => setFilters(prev => ({
                ...prev,
                status: prev.status === 'active' ? null : 'active'
              }))}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${filters.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilters(prev => ({
                ...prev,
                status: prev.status === 'urgent' ? null : 'urgent'
              }))}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${filters.status === 'urgent'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Urgent
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Sort by</label>
          <select
            value={filters.sort}
            onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 py-2 pl-3 pr-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="raised-asc">Lowest Raised First</option>
            <option value="raised">Highest Raised First</option>
            <option value="progress">Progress</option>
            <option value="donors">Number of Donors</option>
            <option value="endDate">End Date</option>
          </select>
        </div>
      </div>
      </div>
    )
}

const DonationForm = ({ selectedProject, onDonate }) => {
  const [amount, setAmount] = useState('')
  const [donationType, setDonationType] = useState('one-time')
  const [error, setError] = useState(null)
  
  const presetAmounts = [100, 500, 1000, 2500, 5000]
  const donationTypes = [
    { id: 'one-time', label: 'One-time' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'quarterly', label: 'Quarterly' },
    { id: 'annually', label: 'Annually' }
  ]

  useEffect(() => {
    // Scroll to donation form when it mounts
    const element = document.getElementById('donation-form')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  const handleSubmit = () => {
    if (!amount || amount < 10) {
      setError('Please enter a valid amount (minimum $10)')
      return
    }
    onDonate({ amount, donationType })
  }

  return (
    <motion.div
      id="donation-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Make Your Donation</h3>
        <p className="mt-2 text-sm text-gray-600">
          Support {selectedProject.title} and help make a difference
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Select Amount</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset)}
                className={`py-2 px-4 rounded-lg text-sm font-semibold transition-colors
                  ${amount === preset 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
              >
                ${countFormat.format(preset)}
              </button>
            ))}
          </div>
          <div className="mt-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter custom amount"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Donation Frequency</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {donationTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setDonationType(type.id)}
                className={`py-2 px-4 rounded-lg text-sm font-semibold transition-colors
                  ${donationType === type.id 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Continue to Payment
        </button>
      </div>
    </motion.div>
  )
}

const DonatePage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [selectedProject, setSelectedProject] = useState(null)
  const [sentMessage, setSentMessage] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    category: null,
    status: null,
    sort: 'raised-asc'
  })
  const referringStaff = getReferringStaff()

  useEffect(() => {
    // Set Child of Hope as default selected project if no project ID in URL
    const projectId = searchParams.get('project')
    if (projectId) {
      const project = projects.find(p => p.id === Number(projectId))
      if (project) setSelectedProject(project)
    } else {
      const childOfHope = projects.find(p => p.title === "Child Of Hope")
      if (childOfHope) {
        setSelectedProject(childOfHope)
        // Scroll to donation form after a brief delay
        setTimeout(() => {
          const element = document.getElementById('donation-form')
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 100)
      }
    }

    if (localStorage.getItem("donatePage")) {
      setSentMessage(true)
      return
    }
    if (!localStorage.getItem("visited")) {
      sendMessage("from Google ads visited")
      navigate("/")
      return
    }
    if (!sentMessage) {
      const message = referringStaff 
        ? `new donate Impression (referred by ${referringStaff.name})`
        : "new donate Impression"
      sendMessage(message)
      setSentMessage(true)
      localStorage.setItem("donatePage", true)
    }
  }, [])

  const clearFilters = () => {
    setFilters({
      search: '',
      category: null,
      status: null,
      sort: 'raised-asc'
    })
  }

  const filteredProjects = projects
    .filter(project => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        return (
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.location.toLowerCase().includes(searchLower)
        )
      }
      return true
    })
    .filter(project => !filters.category || project.category === filters.category)
    .filter(project => !filters.status || project.status === filters.status)
    .sort((a, b) => {
      switch (filters.sort) {
        case 'raised-asc':
          return a.raised - b.raised
        case 'raised':
          return b.raised - a.raised
        case 'progress':
          return b.progress - a.progress
        case 'donors':
          return b.stats.donors - a.stats.donors
        case 'endDate':
          return new Date(a.endDate) - new Date(b.endDate)
        default:
          return 0
      }
    })

  const handleDonate = (donationDetails) => {
    if (!selectedProject) {
      return
    }
    navigate(`/payment?project=${selectedProject.id}&amount=${donationDetails.amount}&type=${donationDetails.donationType}`)
  }

  const handleProjectSelect = (project) => {
    setSelectedProject(project)
    // Add a small delay to ensure the donation form is mounted
    setTimeout(() => {
      const element = document.getElementById('donation-form')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {(location.state?.referralMessage || referringStaff) && (
        <div className="bg-indigo-50 p-4">
          <div className="max-w-3xl mx-auto text-center text-indigo-700">
            {location.state?.referralMessage || `Welcome! You were referred by ${referringStaff.name}`}
          </div>
        </div>
      )}

      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Make a Difference Today</h1>
            <p className="mt-4 text-lg text-gray-600">
              Choose a project to support and help us create positive change around the world
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FilterBar
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
              />
              
              <div className="grid md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onSelect={handleProjectSelect}
                      isSelected={selectedProject?.id === project.id}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <FunnelIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-900">No projects found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your filters or search terms
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-6">
                {selectedProject ? (
                  <DonationForm
                    selectedProject={selectedProject}
                    onDonate={handleDonate}
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg p-6 text-center"
                  >
                    <div className="text-gray-500">
                      <ChartBarIcon className="h-12 w-12 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Select a Project</h3>
                      <p className="text-sm">
                        Choose a project from the list to make your donation
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default DonatePage
