import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "../../data";

const ProjectsSection = ({ isDark }) => {
  return (
    <div className={`py-20 ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
      <div className="max-w-6xl px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">
          Featured Projects
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl ${
                isDark ? "bg-gray-800" : "bg-white"
              } shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <ExternalLink className="w-5 h-5 text-gray-400 transition-colors cursor-pointer hover:text-blue-600" />
              </div>
              <p className="mb-3 text-sm text-blue-600">{project.tech}</p>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.achievements.map((achievement, achIndex) => (
                  <span
                    key={achIndex}
                    className={`px-3 py-1 text-sm rounded-full ${
                      isDark
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
