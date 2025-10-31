import { FileText, Users, Trophy } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: 'Post a Laptop Request',
      description: 'Create an RFQ with your specifications and requirements in minutes.',
    },
    {
      icon: Users,
      title: 'Get Bids from Verified Sellers',
      description: 'Receive competitive quotes from our network of trusted vendors.',
    },
    {
      icon: Trophy,
      title: 'Compare & Award the Best Deal',
      description: 'Review proposals side-by-side and choose the perfect match.',
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-poppins font-semibold text-dark-gray mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 font-inter">
            Three simple steps to streamline your laptop procurement
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-soft-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-4 right-4 text-6xl font-poppins font-semibold text-coral/10 group-hover:text-coral/20 transition-colors">
                {index + 1}
              </div>

              <div className="relative">
                <div className="w-16 h-16 bg-coral rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-poppins font-semibold text-dark-gray mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-600 font-inter leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
