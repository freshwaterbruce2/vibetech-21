import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './PageTransition';
import ProtectedRoute from '../auth/ProtectedRoute';

// Eager load critical paths
import Index from '../../pages/Index';
import NotFound from '../../pages/NotFound';

// Lazy load other routes
const Portfolio = lazy(() => import('../../pages/Portfolio'));
const ProjectDetail = lazy(() => import('../../pages/ProjectDetail'));
const Contact = lazy(() => import('../../pages/Contact'));
const Blog = lazy(() => import('../../pages/Blog'));
const Pricing = lazy(() => import('../../pages/Pricing'));
const Dashboard = lazy(() => import('../../pages/Dashboard'));
const Auth = lazy(() => import('../../pages/Auth'));
const PalettePreview = lazy(() => import('../../pages/PalettePreview'));
const FuturisticDemo = lazy(() => import('../../pages/FuturisticDemo'));
const BlogPostPage = lazy(() => import('../../pages/public/BlogPostPage'));
const Services = lazy(() => import('../../pages/Services'));
const Tools = lazy(() => import('../../pages/Tools'));
const About = lazy(() => import('../../pages/About'));
const ContentGenerator = lazy(() => import('../../pages/ContentGenerator'));
const Terms = lazy(() => import('../../pages/Terms'));
const Privacy = lazy(() => import('../../pages/Privacy'));

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="h-16 w-16 rounded-full border-4 border-t-[color:var(--c-purple)] border-r-transparent border-b-[color:var(--c-cyan)] border-l-transparent animate-spin"></div>
      <p className="text-aura-accent">Loading...</p>
    </div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
          <Route path="/portfolio/:projectId" element={<PageTransition><ProjectDetail /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/blog/category/:categoryName" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/blog/tag/:tagName" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/blog/:postId" element={<PageTransition><BlogPostPage /></PageTransition>} />
          <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
          <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
          <Route path="/dashboard" element={<ProtectedRoute><PageTransition><Dashboard /></PageTransition></ProtectedRoute>} />
          <Route path="/palette-preview" element={<PageTransition><PalettePreview /></PageTransition>} />
          <Route path="/futuristic-demo" element={<PageTransition><FuturisticDemo /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/tools" element={<PageTransition><Tools /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/content-generator" element={<PageTransition><ContentGenerator /></PageTransition>} />
          <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
          <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
