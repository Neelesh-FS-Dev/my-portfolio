import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const EducationSection = ({ isDark }) => {
  return (
    <div className="max-w-6xl px-4 mx-auto">
      <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">
        Education
      </h2>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className={`max-w-2xl mx-auto p-8 rounded-xl ${
          isDark ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        <div className="text-center">
          <h3 className="mb-2 text-xl font-semibold">
            Bachelor of Computer Science Engineering
          </h3>
          <p className="mb-2 font-medium text-blue-600">
            Institute of Technology, Nirma University
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Ahmedabad, Gujarat
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>July 2019 – May 2023</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EducationSection;
