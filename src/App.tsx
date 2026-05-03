import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, memo, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import {
  HomeSkeleton,
  ProjectsSkeleton,
  ProjectDetailSkeleton,
  ExperienceSkeleton,
  BlogsSkeleton,
  BlogDetailSkeleton,
  ContactSkeleton,
  GenericSkeleton,
} from "./components/RouteSkeletons";

const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Experience = lazy(() => import("./pages/Experience"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const MemoScrollToTop = memo(ScrollToTop);

function lazyRoute(
  Component: React.LazyExoticComponent<React.ComponentType>,
  Fallback: React.ComponentType,
) {
  return (
    <Suspense fallback={<Fallback />}>
      <Component />
    </Suspense>
  );
}

export default function App() {
  return (
    <>
      <Cursor />
      <MemoScrollToTop />
      <Navbar />
      <main>
      <Routes>
        <Route path="/" element={lazyRoute(Home, HomeSkeleton)} />
        <Route
          path="/projects"
          element={lazyRoute(Projects, ProjectsSkeleton)}
        />
        <Route
          path="/projects/:id"
          element={lazyRoute(ProjectDetail, ProjectDetailSkeleton)}
        />
        <Route
          path="/experience"
          element={lazyRoute(Experience, ExperienceSkeleton)}
        />
        <Route path="/blogs" element={lazyRoute(Blogs, BlogsSkeleton)} />
        <Route
          path="/blogs/:id"
          element={lazyRoute(BlogDetail, BlogDetailSkeleton)}
        />
        <Route
          path="/contact"
          element={lazyRoute(Contact, ContactSkeleton)}
        />
        <Route path="*" element={lazyRoute(NotFound, GenericSkeleton)} />
      </Routes>
      </main>
      <Footer />
    </>
  );
}
