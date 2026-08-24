import SolarScrollytelling from "./SolarScrollytelling";

type HeroSectionProps = {
  logoSrc?: string;
  onContactClick?: () => void;
};

export default function HeroSection({
  logoSrc = "/brandLogo.png",
}: HeroSectionProps) {
  return (
    <section className="relative w-full bg-[#0e131d]">
      <SolarScrollytelling logoSrc={logoSrc} />
    </section>
  );
}