import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Download } from "lucide-react";

// Mouse pointer trail
const MouseTrail = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="fixed w-4 h-4 transition-transform duration-100 bg-blue-500 rounded-full shadow-lg pointer-events-none"
      style={{
        left: pos.x - 8,
        top: pos.y - 8,
        transform: "translate3d(0,0,0)",
      }}
    />
  );
};

const HeroSection = () => (
  <div className="relative flex items-center justify-center min-h-screen px-4 pt-16 overflow-hidden">
    {/* Animated gradient background */}
    <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:400%_400%]" />

    {/* Mouse pointer */}
    <MouseTrail />

    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="mb-6 text-4xl font-bold md:text-6xl">
          <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            React Native Developer
          </span>
        </h1>
        <p className="mb-8 text-xl text-gray-600 md:text-2xl dark:text-gray-300">
          Building high-performance mobile applications with 2.5+ years of
          expertise
        </p>
        <p className="max-w-2xl mx-auto mb-12 text-lg text-gray-600 dark:text-gray-400">
          Experienced in developing pixel-perfect UIs that increased user
          engagement by 40% and deployed 10+ applications serving 50,000+ active
          users.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          {/* Get in Touch -> Opens email */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:neeleshy263@gmail.com"
            className="flex items-center justify-center gap-2 px-8 py-3 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Mail className="w-5 h-5" />
            Get In Touch
          </motion.a>

          {/* Download Resume -> Downloads PDF */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="../../../public/Neelesh-Yadav-React-Native-Developer-2-5Y.pdf"
            download="Neelesh-Yadav-React-Native-Developer-2-5Y.pdf"
            className="flex items-center justify-center gap-2 px-8 py-3 font-medium text-blue-600 transition-all duration-200 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </motion.a>
        </div>
      </motion.div>
    </div>
  </div>
);

export default HeroSection;
