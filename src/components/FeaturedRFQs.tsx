import { Calendar, Building2, ChevronRight } from 'lucide-react';
import { isAuthenticated, getCurrentUser } from '../utils/auth';
import { showToast } from '../utils/toast';

export default function FeaturedRFQs() {
  const rfqs = [
    {
      id: '101',
      title: 'Dell Latitude 5540',
      quantity: '50 Units',
      organization: 'TechCorp Solutions',
      deadline: 'Mar 25, 2025',
    },
    {
      id: '102',
      title: 'MacBook Pro 14" M3',
      quantity: '25 Units',
      organization: 'Creative Studios Inc',
      deadline: 'Mar 28, 2025',
    },
    {
      id: '103',
      title: 'HP EliteBook 840 G10',
      quantity: '100 Units',
      organization: 'Enterprise Holdings',
      deadline: 'Apr 2, 2025',
    },
    {
      id: '104',
      title: 'Lenovo ThinkPad X1 Carbon',
      quantity: '35 Units',
      organization: 'Global Consulting Ltd',
      deadline: 'Apr 5, 2025',
    },
  ];

  const handleViewDetails = (rfqId: string) => {
    if (!isAuthenticated()) {
      showToast('Please login to view RFQ details', 'error');
      window.location.href = '/login';
      return;
    }

    const user = getCurrentUser();
    if (user?.role === 'buyer') {
      window.location.href = `/rfq-details/${rfqId}`;
    } else if (user?.role === 'seller') {
      window.location.href = `/rfq-details-seller/${rfqId}`;
    }
  };

  return (
    <section className="py-20 px-6 bg-soft-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-poppins font-semibold text-dark-gray mb-4">
            Featured Laptop Requests
          </h2>
          <p className="text-lg text-gray-600 font-inter">
            Latest opportunities from organizations seeking laptops
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rfqs.map((rfq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-poppins font-semibold text-dark-gray mb-1">
                    {rfq.title}
                  </h3>
                  <p className="text-coral font-inter font-medium">
                    {rfq.quantity}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4 text-coral" />
                  <span className="font-inter">{rfq.organization}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-coral" />
                  <span className="font-inter">Deadline: {rfq.deadline}</span>
                </div>
              </div>

              <button
                onClick={() => handleViewDetails(rfq.id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-soft-white group-hover:bg-coral group-hover:text-white text-dark-gray rounded-xl font-poppins font-medium transition-all"
              >
                View Details
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="/rfq-listings">
            <button className="px-8 py-4 bg-white text-dark-gray border-2 border-dark-gray rounded-2xl font-poppins font-medium hover:bg-dark-gray hover:text-white transition-all shadow-md">
              View All RFQs
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
