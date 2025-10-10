import React from "react";
import { FiCalendar, FiMapPin, FiAward } from "react-icons/fi";
import experienceData from "../data/experienceData.json";

const Experience = () => {
  const { header, experiences } = experienceData;

  return (
    <div className="pt-20 section-padding bg-white dark:bg-gray-900 min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {header.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {header.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative mb-12 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute left-6 top-0 w-0.5 h-full bg-primary-200 dark:bg-primary-800"></div>
              {/* Content Card */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ml-0 lg:ml-12">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {exp.position}
                    </h3>
                    <h4 className="text-xl text-primary-600 dark:text-primary-400 font-semibold">
                      {exp.company}
                    </h4>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 mt-4 lg:mt-0">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FiCalendar className="mr-2" />
                      {exp.duration}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FiMapPin className="mr-2" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements */}
                <div className="mb-6">
                  <h5 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    <FiAward className="mr-2 text-yellow-500" />
                    Key Achievements
                  </h5>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-gray-600 dark:text-gray-300"
                      >
                        <span className="text-primary-500 mr-2">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Technologies Used
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
