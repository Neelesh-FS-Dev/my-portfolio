import React from "react";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";

const Footer = ({ isDark }) => {
  return (
    <footer
      className={`py-8 border-t ${
        isDark ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="mb-4 text-gray-600 dark:text-gray-400 md:mb-0">
            © 2025 Neelesh Yadav. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:neeleshy263@gmail.com"
              aria-label="Email"
              className="text-gray-600 transition-transform dark:text-gray-400 hover:text-blue-600 hover:scale-110"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Neelesh-FS-Dev"
              aria-label="GitHub"
              className="text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/neeleshyadav/"
              aria-label="LinkedIn"
              className="text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/neelesh.yadav25"
              aria-label="Instagram"
              className="text-gray-600 transition-colors dark:text-gray-400 hover:text-pink-500 hover:scale-110"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
