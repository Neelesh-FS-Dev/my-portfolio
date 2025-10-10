import React from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fi";
import heroData from "../data/hero.json";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 w-full section-padding">
      <div className="container-custom text-center w-full max-w-4xl mx-auto">
        {/* Avatar */}
        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg animate-float">
          {heroData.initials}
        </div>

        {/* Name & Title */}
        <h1 className="text-4xl xs:text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
          {heroData.name}
        </h1>
        <h2 className="text-xl xs:text-2xl md:text-3xl text-primary-600 dark:text-primary-400 mb-6 font-semibold animate-slide-up">
          {heroData.title}
        </h2>

        {/* Description */}
        <p className="text-lg xs:text-xl text-gray-600 dark:text-gray-300 mb-8 mx-auto leading-relaxed animate-slide-up animation-delay-200 max-w-2xl">
          {heroData.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up animation-delay-400">
          {heroData.cta.map((btn) => (
            <Link
              key={btn.label}
              to={btn.link}
              className={`${
                btn.type === "primary" ? "btn-primary" : "btn-secondary"
              } w-full sm:w-auto text-center`}
            >
              {btn.label}
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 animate-fade-in animation-delay-600">
          {heroData.socials.map((social) => {
            const Icon = Icons[social.icon];
            return (
              <a
                key={social.icon}
                href={social.link}
                target={social.external ? "_blank" : "_self"}
                rel={social.external ? "noopener noreferrer" : undefined}
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover:scale-110 focus-ring"
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
