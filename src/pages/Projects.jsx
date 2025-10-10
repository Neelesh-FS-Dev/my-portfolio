import React from "react";
import { FiGithub, FiSmartphone } from "react-icons/fi";
import { SiApple, SiGoogleplay } from "react-icons/si";
import projectsData from "../data/projectsData.json";

const Projects = () => {
  const { header, projects } = projectsData;

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
              key={index}
              className="overflow-hidden transition-all duration-500 bg-white shadow-lg dark:bg-gray-800 rounded-2xl hover:shadow-2xl group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
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
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-500 to-purple-600">
                <div className="absolute inset-0 transition-all duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-20" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href={project.github}
                    className="flex items-center justify-center px-2 py-3 text-gray-700 transition-colors duration-300 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 group"
                    title="View Code"
                  >
                    <FiGithub
                      className="transition-transform duration-300 group-hover:scale-110"
                      size={20}
                    />
                  </a>
                  {project.appStore && (
                    <a
                      href={project.appStore}
                      className="flex items-center justify-center px-2 py-3 text-white transition-colors duration-300 bg-gray-900 rounded-lg dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-500 group"
                      title="App Store"
                      target="_blank"
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
                      className="flex items-center justify-center px-2 py-3 text-white transition-colors duration-300 bg-green-600 rounded-lg hover:bg-green-700 group"
                      title="Play Store"
                      target="_blank"
                    >
                      <SiGoogleplay
                        className="transition-transform duration-300 group-hover:scale-110"
                        size={20}
                      />
                    </a>
                  )}
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
