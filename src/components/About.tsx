import { Target, Users, TrendingUp, CheckCircle } from 'lucide-react';

export default function About() {
  const mission = [
    'Streamline procurement for businesses',
    'Enable transparent and competitive bidding',
    'Support SMME and local vendors with preference scoring',
    'Provide organizations with smart, data-driven decision making',
  ];

  const buyerFeatures = [
    'Publish RFQs for the laptops they need',
    'Compare bids in one place',
    'Award vendors confidently based on value and specs',
  ];

  const sellerFeatures = [
    'Browse available RFQs and place bids instantly',
    'Track performance and awarded contracts',
    'Expand their market reach and sales potential',
  ];

  return (
    <section id="about" className="py-20 px-6 bg-soft-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-poppins font-semibold text-dark-gray mb-6">
            About ProcureLink
          </h2>
          <p className="text-xl text-gray-700 font-inter leading-relaxed max-w-4xl mx-auto mb-4">
            ProcureLink is a modern laptop procurement marketplace designed to simplify how organizations source business laptops from trusted vendors.
          </p>
          <p className="text-lg text-gray-600 font-inter leading-relaxed max-w-4xl mx-auto">
            We connect buyers who need laptops for their workforce with verified sellers who supply high-quality devices at competitive prices — all within one platform.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-12 mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-coral rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-poppins font-semibold text-dark-gray mb-4">
                Our Mission
              </h3>
              <ul className="space-y-3">
                {mission.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-inter text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl shadow-lg p-10 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-coral/10 rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7 text-coral" />
              </div>
              <h3 className="text-2xl font-poppins font-semibold text-dark-gray">
                What Buyers Can Do
              </h3>
            </div>
            <ul className="space-y-3">
              {buyerFeatures.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-inter text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-10 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-coral/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-coral" />
              </div>
              <h3 className="text-2xl font-poppins font-semibold text-dark-gray">
                What Sellers Can Do
              </h3>
            </div>
            <ul className="space-y-3">
              {sellerFeatures.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-inter text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-dark-gray to-gray-800 rounded-3xl p-12 shadow-xl">
          <p className="text-2xl font-poppins font-medium text-white mb-3">
            With ProcureLink, businesses buy smarter and vendors grow faster.
          </p>
          <p className="text-xl font-inter text-gray-300">
            Simple. Transparent. Empowering procurement for everyone.
          </p>
        </div>
      </div>
    </section>
  );
}
