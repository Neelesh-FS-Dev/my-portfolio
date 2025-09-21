import React from "react";
import { Mail, Github } from "lucide-react";

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
              className="text-gray-600 transition-colors hover:text-blue-600"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Neelesh-FS-Dev"
              className="text-gray-600 transition-colors hover:text-blue-600"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
