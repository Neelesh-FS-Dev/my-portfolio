import { useState } from "react";

export const useNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return {
    isMenuOpen,
    setIsMenuOpen,
    activeSection,
    setActiveSection,
    scrollToSection,
  };
};
