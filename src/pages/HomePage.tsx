import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import Gallery from '../components/Gallery';
import SolarCalculator from '../components/SolarCalculator';
import LeadForm from '../components/LeadForm';

interface HomePageProps {
  onContactClick?: () => void;
}

export default function HomePage({ onContactClick }: HomePageProps) {
  return (
    <div className="relative">
      {/* 1. Hero with 3D Solar Scrollytelling Animation */}
      <HeroSection onContactClick={onContactClick} />

      {/* 2. About Us (Expanded) */}
      <AboutSection />

      {/* 3. Our Recent Projects */}
      <Gallery />

      {/* 4. Solar Savings & Subsidy Calculator */}
      <SolarCalculator onQuoteClick={onContactClick} />

      {/* 5. Get A Free Solar Quote Form */}
      <LeadForm />
    </div>
  );
}
