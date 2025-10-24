import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Users,
  Star,
  TrendingUp,
  Target,
  Heart,
  Rocket,
  Lightbulb,
} from "lucide-react";
import StatsCard from "../common/StatsCard";

const AboutSection = ({ isDark }) => {
  const stats = [
    { icon: Smartphone, value: "10+", label: "Mobile Apps Published" },
    { icon: Users, value: "50K+", label: "Active Users Served" },
    { icon: Star, value: "4.5+", label: "Average App Rating" },
    { icon: TrendingUp, value: "99.9%", label: "Application Uptime" },
  ];

  const highlights = [
    {
      icon: Target,
      title: "Performance Focus",
      description:
        "Specialized in optimizing app performance, reducing load times by up to 40% and improving user engagement significantly.",
    },
    {
      icon: Heart,
      title: "User-Centric Design",
      description:
        "Passionate about creating intuitive, accessible interfaces that enhance user experience and drive business results.",
    },
    {
      icon: Rocket,
      title: "Full-Stack Mobile",
      description:
        "End-to-end mobile development expertise from UI/UX design to backend integration and app store deployment.",
    },
    {
      icon: Lightbulb,
      title: "Innovation Driven",
      description:
        "Always exploring cutting-edge technologies and best practices to deliver modern, scalable mobile solutions.",
    },
  ];
  return (
    <div className="max-w-6xl px-4 mx-auto mb-14">
      <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">
        About Me
      </h2>

      {/* Main About Content */}
      <div className="grid items-center gap-12 mb-16 lg:grid-cols-2">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-4 text-2xl font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Crafting Excellence in Mobile Development
            </h3>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              I'm a passionate React Native Developer with 2.5+ years of
              experience building high-performance, cross-platform mobile
              applications. My journey in mobile development has been driven by
              a commitment to excellence and a deep understanding of user needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              Throughout my career, I've successfully delivered 10+
              production-ready applications that serve over 50,000 active users.
              My expertise spans from creating pixel-perfect, responsive UIs to
              implementing robust backend integrations and optimizing
              application performance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              What sets me apart is my holistic approach to mobile development -
              combining technical proficiency with a keen eye for design and a
              deep understanding of business objectives. I believe in writing
              clean, maintainable code that not only works but scales
              effectively as businesses grow.
            </p>
          </motion.div>
        </div>

        {/* Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} isDark={isDark} />
          ))}
        </motion.div>
      </div>

      {/* Core Strengths */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="mb-8 text-2xl font-semibold text-center">
          Core Strengths & Values
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-xl ${
                isDark ? "bg-gray-800/50" : "bg-white"
              } shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <highlight.icon className="w-8 h-8 mb-4 text-blue-600" />
              <h4 className="mb-2 font-semibold">{highlight.title}</h4>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutSection;
