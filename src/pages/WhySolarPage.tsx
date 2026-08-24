import WhySolarSection from '../components/WhySolarSection';
import SolarCalculator from '../components/SolarCalculator';
import LeadForm from '../components/LeadForm';

export default function WhySolarPage() {
  return (
    <div className="pt-20 bg-[#0b0d11] min-h-screen">
      <WhySolarSection />
      <SolarCalculator />
      <LeadForm />
    </div>
  );
}
