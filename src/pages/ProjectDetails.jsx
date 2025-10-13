import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { SiApple, SiGoogleplay } from "react-icons/si";
import projectsData from "../data/projectsData.json";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const projectData = projectsData.projects[parseInt(id)];

  if (!projectData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Project Not Found
          </h1>
          <button
            onClick={() => navigate("/projects")}
            className="px-6 py-3 text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="py-12">
        <div className="container px-4 mx-auto max-w-7xl">
          <div
            className={`grid gap-8 ${
              projectData.demoVideo ? "md:grid-cols-2" : "md:grid-cols-1"
            }`}
          >
            {/* Left Column - Info */}
            <div className="flex flex-col justify-center text-white">
              <div className="inline-block px-3 py-1 mb-4 text-sm rounded-full bg-white/20 backdrop-blur-sm w-fit">
                {projectData.category}
              </div>
              <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
                {projectData.title}
              </h1>
              <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                {projectData.description}
              </p>

              {/* Stats */}
              {projectData.stats && (
                <div className="flex gap-8 mb-8">
                  {projectData.stats.rating && (
                    <div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        ⭐ {projectData.stats.rating}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Rating
                      </div>
                    </div>
                  )}
                  {projectData.stats.users && (
                    <div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {projectData.stats.users}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Active Users
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Store Buttons */}
              <div className="flex flex-wrap gap-4">
                {projectData.appStore && (
                  <a
                    href={projectData.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-8 py-4 text-black transition-all duration-300 bg-white rounded-lg shadow hover:bg-gray-100 hover:shadow-lg hover:scale-105"
                  >
                    <SiApple size={28} />
                    <div className="text-left">
                      <div className="text-xs">Download on</div>
                      <div className="text-base font-bold">App Store</div>
                    </div>
                    <FiExternalLink size={18} className="ml-2" />
                  </a>
                )}
                {projectData.playStore && (
                  <a
                    href={projectData.playStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-8 py-4 text-black transition-all duration-300 bg-white rounded-lg shadow hover:bg-gray-100 hover:shadow-lg hover:scale-105"
                  >
                    <SiGoogleplay size={28} />
                    <div className="text-left">
                      <div className="text-xs">Get it on</div>
                      <div className="text-base font-bold">Google Play</div>
                    </div>
                    <FiExternalLink size={18} className="ml-2" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Column - Video/Image */}
            {projectData.demoVideo && (
              <div className="flex items-center justify-center">
                <div className="relative w-full overflow-hidden shadow-2xl aspect-video rounded-2xl">
                  <iframe
                    src={projectData.demoVideo}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-12">
        <div className="container px-4 mx-auto max-w-7xl">
          {/* Main Content Full Width */}
          <div className="space-y-12">
            {/* Overview Section */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                About This Project
              </h2>
              <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-300">
                {projectData.description}
              </p>

              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Key Highlights
              </h3>
              <ul className="space-y-3">
                {projectData.description
                  .split(". ")
                  .filter((point) => point.trim())
                  .map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                        ✓
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {point.trim()}
                        {point.endsWith(".") ? "" : "."}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Features Section */}
            {projectData.features && (
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Features
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {projectData.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-6 transition-all duration-300 bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:shadow-xl hover:scale-105"
                    >
                      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Stack Section */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {projectData.technologies.map((tech, idx) => (
                  <div
                    key={idx}
                    className="px-6 py-3 font-semibold transition-all duration-300 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 hover:scale-105 hover:shadow-lg"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
