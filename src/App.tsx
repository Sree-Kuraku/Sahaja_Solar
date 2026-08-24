import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WhySolarPage from './pages/WhySolarPage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import SubsidiesPage from './pages/SubsidiesPage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';

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
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-[#0b0d11] relative text-white selection:bg-[#22c55e] selection:text-black">
      <ScrollToTop />

      {/* Global Navbar */}
      <Navbar
        onAdminClick={() => setShowAdminLogin(true)}
        onContactClick={scrollToContact}
      />

      {/* Multi-Page Routes */}
      <main>
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
      </main>

      {/* Global Footer & WhatsApp Button */}
      <Footer />
      <WhatsAppButton />

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <AdminLogin onClose={() => setShowAdminLogin(false)} />
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
