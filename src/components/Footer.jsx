import React from "react";
import * as Icons from "react-icons/fi";
import footerData from "../data/footer.json";

const Footer = () => {
  return (
    <footer className="py-12 text-white bg-gray-900">
      <div className="container-custom">
        <div className="grid items-center gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-2xl font-bold">{footerData.brand.name}</h3>
            <p className="text-gray-400">{footerData.brand.description}</p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            {/* <div className="flex flex-wrap justify-center gap-6 mb-4">
              {footerData.quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div> */}
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <div className="flex justify-center mb-4 space-x-4 md:justify-end">
              {footerData.socials.map((social) => {
                const Icon = Icons[social.icon];
                return (
                  <a
                    key={social.icon}
                    href={social.link}
                    className="p-2 text-gray-400 transition-all duration-300 bg-gray-800 rounded-lg hover:text-white hover:bg-gray-700"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 text-center border-t border-gray-800">
          <p className="flex items-center justify-center text-gray-400">
            Made with{" "}
            <span className={`mx-2 ${footerData.copyright.heartColor}`}>
              ❤️
            </span>{" "}
            by {footerData.brand.name} • © 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
