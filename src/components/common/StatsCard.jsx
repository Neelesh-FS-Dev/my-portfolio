import React from "react";
import { motion } from "framer-motion";

const StatsCard = ({ icon: Icon, value, label, isDark }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`p-6 rounded-xl ${
      isDark ? "bg-gray-800" : "bg-gray-50"
    } border-l-4 border-blue-600`}
  >
    <div className="flex items-center gap-3 mb-2">
      <Icon className="w-6 h-6 text-blue-600" />
      <span className="text-2xl font-bold">{value}</span>
    </div>
    <p className="text-gray-600 dark:text-gray-400">{label}</p>
  </motion.div>
);

export default StatsCard;
