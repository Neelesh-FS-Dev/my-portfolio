import React from "react";
import * as Icons from "react-icons/fi";
import footerData from "../data/footer.json";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">{footerData.brand.name}</h3>
            <p className="text-gray-400">{footerData.brand.description}</p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              {footerData.quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              {footerData.socials.map((social) => {
                const Icon = Icons[social.icon];
                return (
                  <a
                    key={social.icon}
                    href={social.link}
                    className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            Made with{" "}
            <span className={`mx-2 ${footerData.copyright.heartColor}`}>
              ❤️
            </span>{" "}
            by {footerData.brand.name} • © 2024
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
