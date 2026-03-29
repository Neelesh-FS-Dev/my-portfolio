import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, memo } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Experience from "./pages/Experience";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const MemoScrollToTop = memo(ScrollToTop);

function PreventCopy() {
  useEffect(() => {
    // Prevent right-click context menu
    const handleContextMenu = (e) => e.preventDefault();

    // Prevent copy
    const handleCopy = (e) => e.preventDefault();

    // Prevent cut
    const handleCut = (e) => e.preventDefault();

    // Prevent paste
    const handlePaste = (e) => e.preventDefault();

    // Prevent keyboard shortcuts
    const handleKeyDown = (e) => {
      // Prevent Ctrl+C (Cmd+C on Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === "c") e.preventDefault();
      // Prevent Ctrl+X (Cmd+X on Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === "x") e.preventDefault();
      // Prevent Ctrl+V (Cmd+V on Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === "v") e.preventDefault();
      // Prevent Ctrl+A (Cmd+A on Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === "a") e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("paste", handlePaste);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}

const MemoPreventCopy = memo(PreventCopy);

export default function App() {
  return (
    <>
      <Cursor />
      <MemoScrollToTop />
      <MemoPreventCopy />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
