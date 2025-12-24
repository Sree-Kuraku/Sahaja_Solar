import { Home, Building2, PenTool } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Residential Solar Systems',
    description: 'Customized solar solutions for homes. Reduce your electricity bills and increase your property value with our premium residential solar installations.',
    image: 'https://images.pexels.com/photos/4254167/pexels-photo-4254167.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    icon: Building2,
    title: 'Commercial Solar Systems',
    description: 'Scalable solar energy solutions for businesses. Cut operational costs and demonstrate your commitment to sustainability with commercial-grade installations.',
    image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    icon: PenTool,
    title: 'Expert Solar Design',
    description: 'Professional consultation and design services. Our experts analyze your energy needs and design the most efficient solar system tailored to your requirements.',
    image: 'https://images.pexels.com/photos/8853502/pexels-photo-8853502.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-[#22c55e]">Services</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Comprehensive solar solutions designed to meet your specific energy needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-[#22c55e] rounded-lg">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
