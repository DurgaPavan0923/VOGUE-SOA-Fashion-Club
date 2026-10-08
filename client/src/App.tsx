import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { ProgressBar } from './components/common/ProgressBar';
import { NoticeBoard } from './components/common/NoticeBoard';
import { Preloader } from './animations/Preloader';
import { ParticlesBackground } from './animations/ParticlesBackground';
import { SpotlightOverlay } from './animations/SpotlightOverlay';
import { useLenis } from './hooks/useLenis';
import { Home } from './pages/Home';

// Lazy-loaded pages for optimal performance and chunking
const ApplyPage = lazy(() => import('./pages/ApplyPage').then((m) => ({ default: m.ApplyPage })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then((m) => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const AdminAchievements = lazy(() => import('./pages/admin/AdminAchievements').then((m) => ({ default: m.AdminAchievements })));
const AdminEvents = lazy(() => import('./pages/admin/AdminEvents').then((m) => ({ default: m.AdminEvents })));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery').then((m) => ({ default: m.AdminGallery })));
const AdminApplications = lazy(() => import('./pages/admin/AdminApplications').then((m) => ({ default: m.AdminApplications })));
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages').then((m) => ({ default: m.AdminMessages })));

// Loading Spinner for Route Fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-vogue-black text-vogue-gold">
    <div className="w-8 h-8 border-2 border-vogue-gold border-t-transparent rounded-full animate-spin" />
  </div>
);

// Protected Route Guard Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-vogue-black text-vogue-gold">
        <div className="w-8 h-8 border-2 border-vogue-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

// Main App Router Component with Full Motion Design Suite
export const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [isNoticeBoardOpen, setIsNoticeBoardOpen] = useState(false);
  
  // Initialize Lenis smooth scrolling
  useLenis();

  // Listen to global open-notice-board event
  useEffect(() => {
    const handleOpen = () => setIsNoticeBoardOpen(true);
    window.addEventListener('open-notice-board', handleOpen);
    return () => window.removeEventListener('open-notice-board', handleOpen);
  }, []);

  return (
    <AuthProvider>
      {/* Session Preloader */}
      <Preloader />

      {/* Top Gold Progress Bar */}
      <ProgressBar />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Ambient Floating Gold Particles */}
      <ParticlesBackground />

      {/* Secret Easter Egg Runway Spotlight Overlay (type 'vogue') */}
      <SpotlightOverlay />

      {/* Global Interactive Notice Board Modal */}
      <NoticeBoard isOpen={isNoticeBoardOpen} onClose={() => setIsNoticeBoardOpen(false)} />

      {/* Public Navbar shown on non-admin routes */}
      {!isAdminRoute && <Navbar onOpenNoticeBoard={() => setIsNoticeBoardOpen(true)} />}

      <main className="min-h-screen">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Routes location={location}>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/apply" element={<ApplyPage />} />

                {/* Admin Auth */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Admin Protected Console */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="applications" element={<AdminApplications />} />
                  <Route path="achievements" element={<AdminAchievements />} />
                  <Route path="gallery" element={<AdminGallery />} />
                  <Route path="events" element={<AdminEvents />} />
                  <Route path="messages" element={<AdminMessages />} />
                </Route>

                {/* Fallback 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Persistent Footer on non-admin views */}
      {!isAdminRoute && <Footer />}
    </AuthProvider>
  );
};

export default App;
