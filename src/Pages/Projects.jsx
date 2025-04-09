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
  XMarkIcon
} from '@heroicons/react/24/outline';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { projects, categories, filterProjects } from '../constants/projects';
import { countFormat } from '../constants';

const ProjectCard = ({ project }) => {
  const startDate = new Date(project.startDate).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });
  const endDate = new Date(project.endDate).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-xl font-bold text-white line-clamp-2">{project.title}</h3>
          <div className="flex items-center mt-2 text-white/80 text-sm">
            <MapPinIcon className="h-4 w-4 mr-1" />
            {project.location}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            project.status === 'completed' 
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {project.status === 'completed' ? 'Completed' : 'Active'}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-1" />
            {startDate} - {endDate}
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {project.description}
        </p>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-full rounded-full bg-indigo-600 transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Raised</span>
            <span className="font-medium">${countFormat.format(project.raised)}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex space-x-4">
              <div className="flex items-center">
                <UserGroupIcon className="h-4 w-4 mr-1" />
                {countFormat.format(project.stats.donors)}
              </div>
              <div className="flex items-center">
                <GlobeAltIcon className="h-4 w-4 mr-1" />
                {project.stats.countries}
              </div>
              <div className="flex items-center">
                <ShareIcon className="h-4 w-4 mr-1" />
                {project.stats.shares || 0}
              </div>
            </div>
            <Link
              to={`/donate?project=${project.id}`}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('progress');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Get unique locations from projects
  const locations = [...new Set(projects.map(project => project.location))].sort();

  useEffect(() => {
    const filtered = filterProjects({
      category: selectedCategory,
      status: selectedStatus,
      search: searchQuery,
      sortBy,
      location: selectedLocation
    });
    setFilteredProjects(filtered);
  }, [selectedCategory, selectedStatus, searchQuery, sortBy, selectedLocation]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedStatus(null);
    setSelectedLocation(null);
    setSearchQuery('');
    setSortBy('progress');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Projects</h1>
            <p className="text-lg text-gray-600">
              Discover and support our ongoing and completed humanitarian projects around the world
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedLocation || ''}
                onChange={(e) => setSelectedLocation(e.target.value || null)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="progress">Sort by Progress</option>
                <option value="raised">Sort by Amount Raised</option>
                <option value="recent">Sort by Most Recent</option>
                <option value="donors">Sort by Number of Donors</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedStatus('active')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === 'active'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Active Projects
                </button>
                <button
                  onClick={() => setSelectedStatus('completed')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStatus === 'completed'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Completed Projects
                </button>
              </div>

              {(selectedCategory || selectedStatus || selectedLocation || searchQuery || sortBy !== 'progress') && (
                <button
                  onClick={clearFilters}
                  className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  <XMarkIcon className="h-4 w-4 mr-1" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          <div className="mb-6 text-gray-600">
            Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </div>

          <AnimatePresence>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No projects found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-sm text-indigo-600 hover:text-indigo-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Projects; 