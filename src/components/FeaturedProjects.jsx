import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import featuredProjects from "../data/featuredProjects.json";
const FeaturedProjects = () => {
  console.log(featuredProjects);
  return (
    <section
      id="projects"
      className="bg-white section-padding dark:bg-gray-900"
    >
      <div className="container-custom">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            A selection of my recent React Native projects showcasing mobile
            development expertise
          </p>
        </div>

        <div className="grid gap-8 mb-12 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="overflow-hidden transition-all duration-500 shadow-lg bg-gray-50 dark:bg-gray-800 rounded-2xl hover:shadow-2xl animate-slide-up group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden h-90 rounded-xl group">
                {/* Project banner image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay with hover effect */}
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-30">
                  {/* <div className="flex space-x-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-gray-800 transition-colors duration-300 bg-white rounded-full hover:bg-gray-100"
                    >
                      <FiGithub size={20} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 text-gray-800 transition-colors duration-300 bg-white rounded-full hover:bg-gray-100"
                    >
                      <FiExternalLink size={20} />
                    </a>
                  </div> */}
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>

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
                <div className="flex space-x-4">
                  {/* GitHub Link
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <FiGithub className="mr-2" />
                    Code
                  </a> */}

                  {/* App Store Link */}
                  {project.appStore && (
                    <a
                      href={project.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <FiExternalLink className="mr-2" />
                      App Store
                    </a>
                  )}

                  {/* Play Store Link */}
                  {project.playStore && (
                    <a
                      href={project.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <FiExternalLink className="mr-2" />
                      Play Store
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/projects" className="btn-primary">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
