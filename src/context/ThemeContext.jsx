// import React, { createContext, useContext, useState, useEffect } from "react";

// // Create context
// const ThemeContext = createContext();

// // Custom hook
// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }
//   return context;
// };

// // Provider
// export const ThemeProvider = ({ children }) => {
//   const [isDark, setIsDark] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     // Check user preference or saved theme
//     const savedTheme = localStorage.getItem("theme");
//     const prefersDark = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     ).matches;

//     if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
//       document.documentElement.classList.add("dark");
//       setIsDark(true);
//     } else {
//       document.documentElement.classList.remove("dark");
//       setIsDark(false);
//     }

//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!mounted) return;

//     // Apply and save theme
//     localStorage.setItem("theme", isDark ? "dark" : "light");
//     document.documentElement.classList.toggle("dark", isDark);
//   }, [isDark, mounted]);

//   const toggleTheme = () => setIsDark((prev) => !prev);
//   const setTheme = (theme) => setIsDark(theme === "dark");

//   const value = { isDark, toggleTheme, setTheme };

//   // Prevent flash before mounting
//   if (!mounted) {
//     return <div style={{ visibility: "hidden" }}>{children}</div>;
//   }

//   return (
//     <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
//   );
// };

// export default ThemeContext;
