import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, UserGroupIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { getRecentProjects } from '../constants/projects';

const RecentProjects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const projects = getRecentProjects();

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setActiveIndex((current) => (current + 1) % projects.length);
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [isPaused, projects.length]);

  const handlePrevious = () => {
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % projects.length);
  };

  const getCardStyle = (index) => {
    const diff = (index - activeIndex + projects.length) % projects.length;
    const isActive = diff === 0;
    const isNext = diff === 1;
    const isPrev = diff === projects.length - 1;

    return {
      zIndex: isActive ? 2 : 1,
      filter: isActive ? 'none' : 'brightness(0.65)',
      scale: isActive ? 1 : 0.8,
      x: isActive ? 0 : (isNext ? '75%' : isPrev ? '-75%' : '200%'),
      opacity: (isActive || isNext || isPrev) ? 1 : 0,
      rotateY: isActive ? 0 : (isNext ? -25 : isPrev ? 25 : 0),
      translateZ: isActive ? 0 : -100
    };
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-indigo-600 bg-indigo-50 mb-4">
            Making an Impact
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Recent Impact Projects
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            See how your donations are making a difference around the world
          </p>
        </div>

        <div 
          className="relative h-[600px] overflow-visible mx-auto max-w-[1400px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            onClick={handlePrevious}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 hover:scale-110 active:scale-95 transition-all"
          >
            <ChevronLeftIcon className="h-8 w-8 text-gray-600" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 hover:scale-110 active:scale-95 transition-all"
          >
            <ChevronRightIcon className="h-8 w-8 text-gray-600" />
          </button>

          <div className="absolute w-full h-full flex items-center justify-center" style={{ perspective: '2000px' }}>
            <AnimatePresence>
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="absolute w-[420px] h-[520px] bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
                  animate={getCardStyle(index)}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 1
                  }}
                  onClick={() => isActive ? null : setActiveIndex(index)}
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="relative h-48 group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <span className="px-3 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-full">
                        {project.category}
                      </span>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded-full flex items-center">
                          <UserGroupIcon className="h-3 w-3 mr-1" />
                          {project.stats.donors.toLocaleString()}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded-full flex items-center">
                          <GlobeAltIcon className="h-3 w-3 mr-1" />
                          {project.stats.countries}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {project.description}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-900">
                            ${(project.raised / 1000).toFixed(0)}K raised
                          </span>
                          <span className="text-gray-500">
                            of ${(project.goal / 1000).toFixed(0)}K goal
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-indigo-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                        <div className="mt-1 text-xs text-right text-gray-500">
                          {project.progress}% complete
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">Impact</div>
                          <div className="text-sm text-gray-500">{project.impact}</div>
                        </div>
                        <Link
                          to={`/donate?project=${project.id}`}
                          className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95"
                        >
                          Donate Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 hover:bg-indigo-400 ${
                index === activeIndex ? 'bg-indigo-600 w-6' : 'bg-gray-300'
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentProjects; 