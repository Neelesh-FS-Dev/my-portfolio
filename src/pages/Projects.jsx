import React from "react";
import { useNavigate } from "react-router-dom";
import { FiGithub, FiSmartphone, FiArrowRight } from "react-icons/fi";
import { SiApple, SiGoogleplay } from "react-icons/si";
import projectsData from "../data/projectsData.json";
const createSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single
};

const Projects = () => {
  const { header, projects } = projectsData;
  const navigate = useNavigate();

  const handleViewDetails = (project) => {
    const slug = createSlug(project.title);
    navigate(`/projects/${slug}`);
  };

  // Helper to truncate description points
  const truncatePoint = (point, maxLength = 60) => {
    if (point.length <= maxLength) return point;
    return point.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen pt-20 section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white">
            {header.title}
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            {header.subtitle}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={createSlug(project.title)}
              className="overflow-hidden transition-all duration-500 bg-white shadow-lg cursor-pointer dark:bg-gray-800 rounded-2xl hover:shadow-2xl group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleViewDetails(project)}
            >
              {/* Project Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <FiSmartphone className="text-primary-600 dark:text-primary-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {project.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 transition-colors duration-300 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  {project.title}
                </h3>
              </div>

              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-500 to-purple-600 group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 opacity-90 group-hover:scale-105"
                />
                <div className="absolute inset-0 transition-all duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-20" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <ul className="mb-6 space-y-2 text-gray-600 dark:text-gray-300">
                  {project.description
                    .split(". ")
                    .filter((item) => item.trim())
                    .slice(0, 3)
                    .map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-primary-600 dark:text-primary-400">
                          •
                        </span>
                        <span className="leading-relaxed">
                          {truncatePoint(point.trim())}
                        </span>
                      </li>
                    ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  {project.appStore && (
                    <a
                      href={project.appStore}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center px-2 py-3 text-white transition-colors duration-300 bg-gray-900 rounded-lg dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-500 group"
                      title="App Store"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiApple
                        className="transition-transform duration-300 group-hover:scale-110"
                        size={20}
                      />
                    </a>
                  )}
                  {project.playStore && (
                    <a
                      href={project.playStore}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center px-2 py-3 text-white transition-colors duration-300 bg-green-600 rounded-lg hover:bg-green-700 group"
                      title="Play Store"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiGoogleplay
                        className="transition-transform duration-300 group-hover:scale-110"
                        size={20}
                      />
                    </a>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(project);
                    }}
                    className="flex items-center justify-center gap-2 px-2 py-3 text-white transition-colors duration-300 rounded-lg bg-primary-600 hover:bg-primary-700 group"
                    title="View Details"
                  >
                    <span className="text-sm font-medium">Details</span>
                    <FiArrowRight
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      size={16}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
