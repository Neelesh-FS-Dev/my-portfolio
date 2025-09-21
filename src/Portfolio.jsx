// src/Portfolio.jsx
import React from "react";
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  Footer,
  HeroSection,
  Navigation,
  ProjectsSection,
  SkillsSection,
} from "./components";
import { navItems } from "./data";
import { useNavigation, useTheme } from "./hooks";

const sections = [
  { id: "home", Component: HeroSection },
  { id: "about", Component: AboutSection },
  { id: "skills", Component: SkillsSection },
  { id: "experience", Component: ExperienceSection },
  { id: "projects", Component: ProjectsSection },
  { id: "contact", Component: ContactSection },
];

const Portfolio = () => {
  const { isDark, toggleTheme } = useTheme();
  const { isMenuOpen, setIsMenuOpen, activeSection, scrollToSection } =
    useNavigation();

  return (
    <div
      className={isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
    >
      <main className="pt-16">
        <Navigation
          isDark={isDark}
          navItems={navItems}
          activeSection={activeSection}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          toggleTheme={toggleTheme}
          scrollToSection={scrollToSection}
        />

        {sections.map(({ id, Component }) => (
          <section
            key={id}
            id={id}
            className={id === "experience" ? "pt-10 pb-10" : ""}
          >
            <Component isDark={isDark} />
          </section>
        ))}

        <Footer isDark={isDark} />
      </main>
    </div>
  );
};

export default Portfolio;
