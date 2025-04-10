import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  UserGroupIcon, 
  GlobeAltIcon, 
  MagnifyingGlassIcon, 
  CalendarIcon,
  MapPinIcon,
  ShareIcon,
  ChartBarIcon,
  XMarkIcon,
  FunnelIcon,
  ArrowsUpDownIcon
} from '@heroicons/react/24/outline';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { projects, categories, filterProjects } from '../constants/projects';
import { countFormat } from '../constants';
import Timer from '../Components/Timer';

const ProjectCard = ({ project }) => {
  const startDate = new Date(project.startDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const endDate = new Date(project.endDate);
  const isEnding = endDate - new Date() < 1000 * 60 * 60 * 24 * 7; // Less than 7 days left

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 group">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full
            ${project.status === 'active' ? 'bg-green-600 text-white' :
              project.status === 'completed' ? 'bg-gray-600 text-white' :
              'bg-amber-500 text-white'}`}
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-full">
            {project.category}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-2">
              <span className="px-2 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded-full flex items-center">
                <UserGroupIcon className="h-3 w-3 mr-1" />
                {countFormat.format(project.stats.donors)}
              </span>
              <span className="px-2 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded-full flex items-center">
                <GlobeAltIcon className="h-3 w-3 mr-1" />
                {project.stats.countries}
              </span>
              <span className="px-2 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded-full flex items-center">
                <ShareIcon className="h-3 w-3 mr-1" />
                {project.stats.shares}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white">
            <MapPinIcon className="h-4 w-4" />
            <span className="text-sm">{project.location}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-900">
                ${countFormat.format(project.raised)} raised
              </span>
              <span className="text-gray-500">
                of ${countFormat.format(project.goal)} goal
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  project.progress >= 90 ? 'bg-green-600' :
                  project.progress >= 75 ? 'bg-indigo-600' :
                  project.progress >= 50 ? 'bg-amber-500' :
                  'bg-rose-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
            <div className="mt-1 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                {project.progress}% complete
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <CalendarIcon className="h-3 w-3" />
                {startDate}
              </div>
            </div>
          </div>

          {isEnding && (
            <div className="bg-amber-50 rounded-lg p-3">
              <p className="text-amber-800 text-sm font-medium mb-1">Time remaining:</p>
              <Timer targetDate={endDate} />
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Impact</div>
              <div className="text-sm text-gray-500 line-clamp-1">{project.impact}</div>
            </div>
            <Link
              to={`/donate?project=${project.id}`}
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FilterBar = ({ filters, setFilters, clearFilters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const sortOptions = [
    { label: 'Progress', value: 'progress' },
    { label: 'Amount Raised', value: 'raised' },
    { label: 'End Date', value: 'endDate' },
    { label: 'Most Donors', value: 'donors' }
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <FunnelIcon className="h-5 w-5" />
            Filters
          </button>
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="appearance-none pl-4 pr-10 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>
            <ArrowsUpDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={filters.category || ''}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value || null })}
                    className="text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filters.status || ''}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value || null })}
                    className="text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  <XMarkIcon className="h-4 w-4" />
                  Clear Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Projects = () => {
  const [filters, setFilters] = useState({
    category: null,
    status: null,
    search: "",
    sortBy: "progress"
  });

  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    const results = filterProjects(filters);
    setFilteredProjects(results);
  }, [filters]);

  const clearFilters = () => {
    setFilters({
      category: null,
      status: null,
      search: "",
      sortBy: "progress"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Impact Projects
          </h1>
          <p className="text-xl text-gray-600">
            Browse our current projects and make a difference today
          </p>
        </div>

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          clearFilters={clearFilters}
        />

        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No projects found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filters or search terms
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Projects; 