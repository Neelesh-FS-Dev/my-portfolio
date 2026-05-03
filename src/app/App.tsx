import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, memo, lazy, Suspense } from "react";
import Navbar from "../shared/components/layout/Navbar";
import Footer from "../shared/components/layout/Footer";
import Cursor from "../shared/components/effects/Cursor";
import {
  HomeSkeleton,
  ProjectsSkeleton,
  ProjectDetailSkeleton,
  ExperienceSkeleton,
  BlogsSkeleton,
  BlogDetailSkeleton,
  ContactSkeleton,
  GenericSkeleton,
} from "../shared/components/ui/RouteSkeletons";

const Home = lazy(() => import("../features/home/Home"));
const Projects = lazy(() => import("../features/projects/Projects"));
const ProjectDetail = lazy(() => import("../features/projects/ProjectDetail"));
const Experience = lazy(() => import("../features/experience/Experience"));
const Blogs = lazy(() => import("../features/blogs/Blogs"));
const BlogDetail = lazy(() => import("../features/blogs/BlogDetail"));
const Contact = lazy(() => import("../features/contact/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));

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
