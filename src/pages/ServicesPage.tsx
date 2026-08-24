import ServicesSection from '../components/ServicesSection';
import SolarWaterPumps from '../components/SolarWaterPumps';
import SolarOffGrid from '../components/SolarOffGrid';
import LeadForm from '../components/LeadForm';

export default function ServicesPage() {
  return (
    <div className="pt-20 bg-[#0b0d11] min-h-screen">
      <ServicesSection />
      <SolarWaterPumps />
      <SolarOffGrid />
      <LeadForm />
    </div>
  );
}
