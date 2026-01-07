import { Users, Award, Zap, Target } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Certified solar professionals with years of experience'
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Premium Tier-1 solar panels with 25-year warranty'
  },
  {
    icon: Zap,
    title: 'Fast Installation',
    description: 'Quick and efficient installation process'
  },
  {
    icon: Target,
    title: 'Custom Solutions',
    description: 'Tailored systems designed for your energy needs'
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About <span className="text-[#22c55e]">Sahaja Solar</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Sahaja Solar is a leading renewable energy company dedicated to making solar energy
              accessible and affordable for everyone. With years of expertise and a commitment to
              excellence, we've helped thousands of homes and businesses transition to clean,
              sustainable energy.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Our mission is to accelerate India's transition to renewable energy by providing
              high-quality solar solutions backed by exceptional service and support.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 bg-[#22c55e] rounded-lg flex-shrink-0">
                    <feature.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-base">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
              <img
                src="https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Solar panels"
                className="rounded-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
