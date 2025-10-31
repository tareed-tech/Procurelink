import { ShieldCheck, Briefcase, Lock, DollarSign } from 'lucide-react';

export default function WhyChoose() {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Verified Vendors',
      description: 'All sellers undergo strict verification to ensure quality and reliability.',
    },
    {
      icon: Briefcase,
      title: 'SMME Support',
      description: 'Empowering small and medium enterprises with equal opportunities.',
    },
    {
      icon: Lock,
      title: 'Secure Bidding',
      description: 'End-to-end encryption and secure payment processing for peace of mind.',
    },
    {
      icon: DollarSign,
      title: 'Transparent Pricing',
      description: 'No hidden fees. Compare quotes and choose the best value for your budget.',
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-poppins font-semibold text-dark-gray mb-4">
            Why Choose ProcureLink
          </h2>
          <p className="text-lg text-gray-600 font-inter">
            Built for transparency, security, and efficiency
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-soft-white rounded-2xl p-8 text-center hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-coral/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-coral group-hover:scale-110 transition-all">
                <feature.icon className="w-8 h-8 text-coral group-hover:text-white transition-colors" />
              </div>

              <h3 className="text-xl font-poppins font-semibold text-dark-gray mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 font-inter leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
