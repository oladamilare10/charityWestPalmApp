import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon, UserGroupIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { getRecentProjects } from '../constants/projects';
import { countFormat } from '../constants';

const RecentProjects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const projects = getRecentProjects();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

    if (isMobile) {
      return {
        zIndex: isActive ? 2 : 1,
        scale: isActive ? 1 : 0.9,
        opacity: isActive ? 1 : 0,
        x: 0
      };
    }

    return {
      zIndex: isActive ? 2 : 1,
      filter: isActive ? 'none' : 'brightness(0.65)',
      scale: isActive ? 1 : 0.85,
      x: isActive ? 0 : (isNext ? '70%' : isPrev ? '-70%' : '200%'),
      opacity: (isActive || isNext || isPrev) ? 1 : 0,
      rotateY: isActive ? 0 : (isNext ? -15 : isPrev ? 15 : 0),
      translateZ: isActive ? 0 : -100
    };
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-indigo-600 bg-indigo-50 mb-4">
            Featured Projects
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Recent Impact Projects
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-500">
            Join us in making a difference through these active projects
          </p>
        </div>

        <div 
          className="relative h-[480px] sm:h-[520px] overflow-visible mx-auto max-w-[1200px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            onClick={handlePrevious}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/90 shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all backdrop-blur-sm"
            aria-label="Previous project"
          >
            <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/90 shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all backdrop-blur-sm"
            aria-label="Next project"
          >
            <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
          </button>

          <div className="absolute w-full h-full flex items-center justify-center" style={{ perspective: '2000px' }}>
            <AnimatePresence>
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="absolute w-[85%] sm:w-[75%] md:w-[420px] h-[440px] bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
                  animate={getCardStyle(index)}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 1
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="relative h-44 group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="px-3 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-full">
                          {project.category}
                        </span>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded-full flex items-center">
                            <UserGroupIcon className="h-3 w-3 mr-1" />
                            {countFormat.format(project.stats.donors)}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded-full flex items-center">
                            <GlobeAltIcon className="h-3 w-3 mr-1" />
                            {project.stats.countries}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <MapPinIcon className="h-4 w-4" />
                        <span className="text-sm">{project.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
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
                        <div className="mt-1 text-xs text-right text-gray-500">
                          {project.progress}% complete
                        </div>
                      </div>

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
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 hover:bg-indigo-400 ${
                index === activeIndex ? 'bg-indigo-600 w-6' : 'bg-gray-300'
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentProjects; 