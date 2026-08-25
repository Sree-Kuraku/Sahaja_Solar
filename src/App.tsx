import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Route-Based Code Splitting (Lazy-loaded for ~70% smaller initial JS payload)
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const WhySolarPage = lazy(() => import('./pages/WhySolarPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const SubsidiesPage = lazy(() => import('./pages/SubsidiesPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminLogin = lazy(() => import('./components/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));

// Subtle, sleek loading fallback for page transitions
function PageLoader() {
  return (
    <div className="min-h-[60vh] bg-[#0b0d11] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#22c55e] border-t-transparent animate-spin" />
        <span className="text-xs uppercase tracking-widest text-gray-400 font-mono">Loading Sahaja Solar...</span>
      </div>
    </div>
  );
}

// Scroll to top on route change helper
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function MainLayout() {
  const { user, loading } = useAuth();
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0d11] flex items-center justify-center">
        <div className="text-white text-xl font-mono">Loading Sahaja Solar...</div>
      </div>
    );
  }

  if (user) {
    return (
      <Suspense fallback={<PageLoader />}>
        <AdminDashboard />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0d11] relative text-white selection:bg-[#22c55e] selection:text-black">
      <ScrollToTop />

      {/* Global Navbar */}
      <Navbar
        onAdminClick={() => setShowAdminLogin(true)}
        onContactClick={scrollToContact}
      />

      {/* Multi-Page Routes with On-Demand Code Splitting */}
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage onContactClick={scrollToContact} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/why-solar" element={<WhySolarPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/subsidies" element={<SubsidiesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage onContactClick={scrollToContact} />} />
          </Routes>
        </Suspense>
      </main>

      {/* Global Footer & WhatsApp Button */}
      <Footer />
      <WhatsAppButton />

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <Suspense fallback={null}>
          <AdminLogin onClose={() => setShowAdminLogin(false)} />
        </Suspense>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

