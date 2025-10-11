import React from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fi";
import heroData from "../data/hero.json";

const Hero = () => {
  return (
    <section className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 section-padding">
      <div className="w-full max-w-4xl mx-auto text-center container-custom">
        {/* Avatar */}
        <div className="flex items-center justify-center w-32 h-32 mx-auto mb-8 text-4xl font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-primary-500 to-purple-600 animate-float">
          {heroData.initials}
        </div>

        {/* Name & Title */}
        <h1 className="mb-6 text-4xl font-bold text-gray-900 xs:text-5xl md:text-7xl dark:text-white animate-fade-in">
          {heroData.name}
        </h1>
        <h2 className="mb-6 text-xl font-semibold xs:text-2xl md:text-3xl text-primary-600 dark:text-primary-400 animate-slide-up">
          {heroData.title}
        </h2>

        {/* Description */}
        <p className="max-w-2xl mx-auto mb-8 text-lg leading-relaxed text-gray-600 xs:text-xl dark:text-gray-300 animate-slide-up animation-delay-200">
          {heroData.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 mb-12 sm:flex-row animate-slide-up animation-delay-400">
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
                className="p-3 text-gray-600 transition-all duration-300 bg-white rounded-full shadow-lg dark:bg-gray-800 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-110 focus-ring"
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
