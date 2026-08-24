import SubsidiesSection from '../components/SubsidiesSection';
import SolarCalculator from '../components/SolarCalculator';
import LeadForm from '../components/LeadForm';

export default function SubsidiesPage() {
  return (
    <div className="pt-20 bg-[#0b0d11] min-h-screen">
      <SubsidiesSection />
      <SolarCalculator />
      <LeadForm />
    </div>
  );
}
