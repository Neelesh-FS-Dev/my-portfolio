import React from "react";
import { motion } from "framer-motion";
import { skillCategories } from "../../data/skills";

const SkillsSection = ({ isDark }) => {
  return (
    <div className={`py-20 pt-10 ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
      <div className="max-w-6xl px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">
          Technical Skills
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl ${
                isDark ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <h3 className="mb-4 text-lg font-semibold text-blue-600">
                {category.title}
              </h3>
              <ul className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                      <motion.div
                        className="h-2 bg-blue-600 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
