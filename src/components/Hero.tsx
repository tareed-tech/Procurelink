import { ShoppingBag, Store } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-soft-white to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-poppins font-semibold text-dark-gray leading-tight">
              Buy and Sell Laptops Seamlessly.
            </h1>
            <p className="text-xl text-gray-600 font-inter leading-relaxed">
              ProcureLink connects trusted vendors and organizations through transparent laptop procurement.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="/signup">
                <button className="flex items-center gap-2 px-8 py-4 bg-coral text-white rounded-2xl font-poppins font-medium hover:bg-coral/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Get Started
                </button>
              </a>
              <a href="/rfq-listings">
                <button className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-dark-gray text-dark-gray rounded-2xl font-poppins font-medium hover:bg-dark-gray hover:text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Browse RFQs
                </button>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-coral/20 to-coral/5 rounded-2xl p-8 backdrop-blur-sm">
              <div className="bg-white rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800"
                  alt="Modern laptop workspace"
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-coral rounded-full blur-3xl opacity-40"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-coral rounded-full blur-3xl opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
