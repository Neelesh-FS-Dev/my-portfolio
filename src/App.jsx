import React, { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Moon,
  Sun,
  Menu,
  X,
  Mail,
  Phone,
  Github,
  ExternalLink,
  Code,
  Server,
  Smartphone,
  Award,
  Calendar,
  MapPin,
  Download,
  Send,
  Star,
  Users,
  TrendingUp,
  Zap,
} from "lucide-react";

const Portfolio = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Animated section component
  const AnimatedSection = ({ children, id }) => {
    const controls = useAnimation();
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: true, threshold: 0.1 });

    React.useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    return (
      <motion.section
        id={id}
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          hidden: { opacity: 0, y: 50 },
        }}
        className="py-20"
      >
        {children}
      </motion.section>
    );
  };

  // Theme toggle
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Navigation items
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // Smooth scroll to section
  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  // Skills data
  const skillCategories = [
    {
      title: "Mobile Development",
      skills: [
        "React Native (Expert)",
        "JavaScript ES6+ (Expert)",
        "TypeScript (Advanced)",
        "React.js (Beginner)",
      ],
    },
    {
      title: "State Management",
      skills: [
        "Redux (Expert)",
        "Redux Toolkit (Advanced)",
        "Context API (Advanced)",
      ],
    },
    {
      title: "UI/UX Development",
      skills: [
        "React Native Reanimated (Advanced)",
        "Styled Components (Advanced)",
        "Lottie Animations (Intermediate)",
      ],
    },
    {
      title: "Backend & APIs",
      skills: [
        "RESTful APIs (Expert)",
        "GraphQL (Intermediate)",
        "Node.js (Intermediate)",
        "Firebase (Advanced)",
      ],
    },
    {
      title: "Development Tools",
      skills: [
        "Git (Expert)",
        "GitHub (Expert)",
        "Xcode (Advanced)",
        "Android Studio (Advanced)",
      ],
    },
  ];

  // Experience data
  const experiences = [
    {
      title: "React Native Developer",
      company: "EC Info Solutions Pvt. Ltd.",
      location: "Pune, Maharashtra",
      duration: "Sep 2023 – Present",
      achievements: [
        "Developed 10+ cross-platform mobile applications serving 20,000+ active users with 4.5+ star ratings",
        "Built pixel-perfect, responsive UIs improving user engagement by 45% and reducing bounce rate by 30%",
        "Implemented Redux Toolkit for state management across 9+ applications, reducing component re-renders by 40%",
        "Integrated 100+ RESTful APIs and WebSocket connections with 99.8% uptime",
      ],
    },
    {
      title: "Full-Stack Developer",
      company: "The Special Character Pvt. Ltd.",
      location: "Ahmedabad, Gujarat",
      duration: "Jan 2023 – Aug 2023",
      achievements: [
        "Developed responsive web applications achieving 95+ Google PageSpeed scores",
        "Built digital card business platform with Tailwind CSS, improving mobile responsiveness",
        "Implemented JWT authentication system handling 5,000+ daily user sessions",
        "Integrated payment gateways processing $100,000+ in monthly transactions with 99.7% success rate",
      ],
    },
  ];

  // Projects data
  const projects = [
    {
      title: "Soul33 - Wellness & Meditation App",
      tech: "React Native, Redux, WebSocket, S3",
      description:
        "Comprehensive wellness and meditation app serving 7,000+ users with 4.7-star rating. Features real-time group chat, voicemail, and advanced audio playbook system.",
      achievements: [
        "7,000+ active users",
        "4.7-star rating",
        "35% engagement improvement",
      ],
    },
    {
      title: "Barva - E-commerce App",
      tech: "React Native, Shopify APIs, Firebase, GraphQL",
      description:
        "Modern shopping experience with advanced product handling, Firebase integration, and optimized performance.",
      achievements: [
        "100+ products",
        "28% conversion increase",
        "40% load time reduction",
      ],
    },
    {
      title: "Netras - Short-Form Video & E-Commerce",
      tech: "React Native, Shopify GraphQL",
      description:
        "Scalable app combining short-form video playbook and integrated e-commerce with seamless user experience.",
      achievements: [
        "45% user retention improvement",
        "50% maintainability increase",
      ],
    },
    {
      title: "Yoke App - Creator & User Platform",
      tech: "React Native, Redux, RESTful APIs",
      description:
        "Dual-platform mobile application for creators and consumers with optimized interfaces and real-time features.",
      achievements: [
        "8,000+ active users",
        "95% user retention",
        "50% bug reduction",
      ],
    },
  ];

  const containerClass = isDark
    ? "bg-gray-900 text-white transition-colors duration-300"
    : "bg-white text-gray-900 transition-colors duration-300";

  return (
    <div className={containerClass}>
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isDark
            ? "bg-gray-900/95 backdrop-blur-sm border-gray-700"
            : "bg-white/95 backdrop-blur-sm border-gray-200"
        } border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Neelesh Yadav
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`hover:text-blue-600 transition-colors duration-200 ${
                    activeSection === item.href.substring(1)
                      ? "text-blue-600"
                      : ""
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-t ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-2 hover:text-blue-600 transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <AnimatedSection id="home">
        <div className="min-h-screen flex items-center justify-center px-4 pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  React Native Developer
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">
                Building high-performance mobile applications with 2.5+ years of
                expertise
              </p>
              <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                Experienced in developing pixel-perfect UIs that increased user
                engagement by 40% and deployed 10+ applications serving 50,000+
                active users.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("#contact")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Get In Touch
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className={`border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    isDark ? "hover:text-white" : ""
                  }`}
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection id="about">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                I'm a passionate React Native Developer with 2.5+ years of
                experience building high-performance mobile applications. My
                expertise lies in creating pixel-perfect, responsive UIs and
                optimizing application performance.
              </p>
              <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
                I have successfully deployed 10+ applications to both App Store
                and Play Store, serving over 50,000 active users with
                consistently high ratings of 4.5+ stars.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-lg ${
                    isDark ? "bg-gray-800" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">10+ Apps</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Published on stores
                  </p>
                </div>
                <div
                  className={`p-4 rounded-lg ${
                    isDark ? "bg-gray-800" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">50,000+</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Active users
                  </p>
                </div>
                <div
                  className={`p-4 rounded-lg ${
                    isDark ? "bg-gray-800" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">4.5+ Stars</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Average rating
                  </p>
                </div>
                <div
                  className={`p-4 rounded-lg ${
                    isDark ? "bg-gray-800" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">99.9%</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    App uptime
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`p-8 rounded-xl ${
                isDark ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Pune, Maharashtra</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>neeleshy263@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span>+91 9166117663</span>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-blue-600" />
                  <span>github.com/Neelesh-FS-Dev</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection id="skills">
        <div className={`py-20 ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Technical Skills
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <h3 className="text-lg font-semibold mb-4 text-blue-600">
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <li
                        key={skillIndex}
                        className="text-gray-600 dark:text-gray-300"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection id="experience">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
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
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {exp.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.duration}</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
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
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection id="projects">
        <div className={`py-20 ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
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
                    <ExternalLink className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-600 transition-colors" />
                  </div>
                  <p className="text-blue-600 text-sm mb-3">{project.tech}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
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
      </AnimatedSection>

      {/* Education Section */}
      <AnimatedSection id="education">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
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
              <h3 className="text-xl font-semibold mb-2">
                Bachelor of Computer Science Engineering
              </h3>
              <p className="text-blue-600 font-medium mb-2">
                Institute of Technology, Nirma University
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Ahmedabad, Gujarat
              </p>
              <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>July 2019 – May 2023</span>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection id="contact">
        <div className={`py-20 ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Get In Touch
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  Let's work together!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  I'm always interested in hearing about new opportunities and
                  interesting projects. Feel free to reach out if you'd like to
                  collaborate!
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <a
                      href="mailto:neeleshy263@gmail.com"
                      className="hover:text-blue-600 transition-colors"
                    >
                      neeleshy263@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <a
                      href="tel:+919166117663"
                      className="hover:text-blue-600 transition-colors"
                    >
                      +91 9166117663
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-blue-600" />
                    <a
                      href="https://github.com/Neelesh-FS-Dev"
                      className="hover:text-blue-600 transition-colors"
                    >
                      github.com/Neelesh-FS-Dev
                    </a>
                  </div>
                </div>
              </div>
              <div
                className={`p-6 rounded-xl ${
                  isDark ? "bg-gray-800" : "bg-white"
                }`}
              >
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        isDark
                          ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                          : "bg-white border-gray-300 focus:border-blue-500"
                      } focus:outline-none`}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        isDark
                          ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                          : "bg-white border-gray-300 focus:border-blue-500"
                      } focus:outline-none`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        isDark
                          ? "bg-gray-700 border-gray-600 focus:border-blue-500"
                          : "bg-white border-gray-300 focus:border-blue-500"
                      } focus:outline-none resize-none`}
                      placeholder="Your message here..."
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer
        className={`py-8 border-t ${
          isDark ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              © 2025 Neelesh Yadav. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:neeleshy263@gmail.com"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Neelesh-FS-Dev"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
