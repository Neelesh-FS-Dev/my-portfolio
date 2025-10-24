import React from "react";
import { motion } from "framer-motion";
import { Calendar, Zap } from "lucide-react";
import { experiences } from "../../data";

const ExperienceSection = ({ isDark }) => {
  return (
    <div className="max-w-6xl px-4 mx-auto">
      <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">
        Professional Experience
      </h2>
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`p-8 rounded-xl ${
              isDark ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
            <div className="flex flex-col mb-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="mb-1 text-xl font-semibold">{exp.title}</h3>
                <p className="font-medium text-blue-600">{exp.company}</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {exp.location}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400 md:mt-0">
                <Calendar className="w-4 h-4" />
                <span>{exp.duration}</span>
              </div>
            </div>
            <ul className="space-y-2">
              {exp.achievements.map((achievement, achIndex) => (
                <li key={achIndex} className="flex items-start gap-2">
                  <Zap className="flex-shrink-0 w-4 h-4 mt-1 text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {achievement}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
