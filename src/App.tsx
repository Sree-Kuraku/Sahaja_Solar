import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WhySolarSection from './components/WhySolarSection';
import ServicesSection from './components/ServicesSection';
import SubsidiesSection from './components/SubsidiesSection';
import PartnersSection from './components/PartnersSection';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
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
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (user) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] relative">
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/371900/pexels-photo-371900.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-[#0f172a]/85" />
      </div>

      <div className="relative z-10">
        <Navbar
          onAdminClick={() => setShowAdminLogin(true)}
          onContactClick={scrollToContact}
        />
        <HeroSection />
        <AboutSection />
        <WhySolarSection />
        <ServicesSection />
        <SubsidiesSection />
        <PartnersSection />
        <LeadForm />
        <Footer />
      </div>

      {showAdminLogin && (
        <AdminLogin onClose={() => setShowAdminLogin(false)} />
      )}
    </div>
  );
}

export default App;
