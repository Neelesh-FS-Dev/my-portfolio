import React, { useMemo } from "react";
import { FiCode, FiSmartphone, FiUsers } from "react-icons/fi";
import aboutData from "../data/aboutData.json";

const About = () => {
  const { title, paragraphs, skills, stats } = aboutData;

  // Memoize icon map so it doesn't recreate on every render
  const iconMap = useMemo(
    () => ({
      FiCode: FiCode,
      FiSmartphone: FiSmartphone,
      FiUsers: FiUsers,
    }),
    []
  );

  return (
    <section id="about" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-slide-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {title}
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Skills List */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Technical Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Icons/Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in">
            {stats.map(({ icon, title, description }, i) => {
              const IconComponent = iconMap[icon];
              if (!IconComponent) return null;

              return (
                <div
                  key={i}
                  className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl"
                >
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <IconComponent
                      className="text-primary-600 dark:text-primary-400"
                      size={24}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
