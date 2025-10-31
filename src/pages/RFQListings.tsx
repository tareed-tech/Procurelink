import { useState } from 'react';
import { Search, Filter, Clock, Building2, Package, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { isAuthenticated, getCurrentUser } from '../utils/auth';
import { showToast } from '../utils/toast';

interface RFQ {
  id: string;
  title: string;
  brand: string;
  quantity: number;
  organization: string;
  budget: string;
  daysLeft: number;
  status: 'Active' | 'Closing Soon';
  imageUrl: string;
}

export default function RFQListings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const rfqs: RFQ[] = [
    {
      id: '1',
      title: 'HP EliteBook 840 G10',
      brand: 'HP',
      quantity: 25,
      organization: 'XYZ Tech Ltd.',
      budget: 'R 450,000 - R 500,000',
      daysLeft: 3,
      status: 'Closing Soon',
      imageUrl: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '2',
      title: 'Dell Latitude 5540',
      brand: 'Dell',
      quantity: 50,
      organization: 'TechCorp Solutions',
      budget: 'R 800,000 - R 900,000',
      daysLeft: 7,
      status: 'Active',
      imageUrl: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '3',
      title: 'MacBook Pro 14" M3',
      brand: 'Apple',
      quantity: 15,
      organization: 'Creative Studios Inc',
      budget: 'R 600,000 - R 700,000',
      daysLeft: 5,
      status: 'Active',
      imageUrl: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '4',
      title: 'Lenovo ThinkPad X1 Carbon',
      brand: 'Lenovo',
      quantity: 35,
      organization: 'Global Consulting Ltd',
      budget: 'R 700,000 - R 800,000',
      daysLeft: 10,
      status: 'Active',
      imageUrl: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '5',
      title: 'ASUS ZenBook 14',
      brand: 'ASUS',
      quantity: 20,
      organization: 'Startup Hub SA',
      budget: 'R 300,000 - R 350,000',
      daysLeft: 2,
      status: 'Closing Soon',
      imageUrl: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '6',
      title: 'Microsoft Surface Laptop 5',
      brand: 'Microsoft',
      quantity: 30,
      organization: 'Enterprise Holdings',
      budget: 'R 550,000 - R 600,000',
      daysLeft: 8,
      status: 'Active',
      imageUrl: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const filteredRFQs = rfqs.filter((rfq) => {
    const matchesSearch =
      rfq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfq.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfq.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || rfq.brand === selectedBrand;
    const matchesStatus = selectedStatus === 'all' || rfq.status === selectedStatus;
    return matchesSearch && matchesBrand && matchesStatus;
  });

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
    <div className="min-h-screen bg-soft-white">
      <Navbar activePage="rfqs" />

      <section className="pt-32 pb-12 px-6 bg-gradient-to-br from-white to-soft-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <h1 className="text-5xl font-poppins font-semibold text-dark-gray mb-2">
                Explore Laptop Requests (RFQs)
              </h1>
              <div className="h-1 bg-coral rounded-full w-32 mx-auto"></div>
            </div>
            <p className="text-xl text-gray-600 font-inter mt-4">
              Browse open laptop procurement opportunities and find your next deal.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by brand, quantity, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                />
              </div>

              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
              >
                <option value="all">All Brands</option>
                <option value="Dell">Dell</option>
                <option value="HP">HP</option>
                <option value="Apple">Apple</option>
                <option value="Lenovo">Lenovo</option>
                <option value="ASUS">ASUS</option>
                <option value="Microsoft">Microsoft</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Closing Soon">Closing Soon</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredRFQs.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRFQs.map((rfq) => (
                  <div
                    key={rfq.id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={rfq.imageUrl}
                        alt={rfq.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-poppins font-medium ${
                            rfq.status === 'Closing Soon'
                              ? 'bg-coral text-white'
                              : 'bg-green-500 text-white'
                          }`}
                        >
                          {rfq.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-poppins font-semibold text-dark-gray mb-2 group-hover:text-coral transition-colors">
                        {rfq.title}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Building2 className="w-4 h-4 text-coral" />
                          <span className="font-inter">{rfq.organization}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Package className="w-4 h-4 text-coral" />
                          <span className="font-inter">{rfq.quantity} Units</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <TrendingUp className="w-4 h-4 text-coral" />
                          <span className="font-inter">{rfq.budget}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-coral" />
                          <span className="font-inter font-medium">
                            {rfq.daysLeft} {rfq.daysLeft === 1 ? 'day' : 'days'} left
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleViewDetails(rfq.id)}
                        className="w-full px-4 py-3 bg-soft-white group-hover:bg-coral group-hover:text-white text-dark-gray rounded-xl font-poppins font-medium transition-all"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <button className="px-8 py-4 bg-coral text-white rounded-2xl font-poppins font-medium hover:bg-coral/90 transition-all shadow-md hover:shadow-lg">
                  Load More RFQs
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="inline-block mb-6">
                <Filter className="w-24 h-24 text-gray-300 mx-auto" />
              </div>
              <h3 className="text-2xl font-poppins font-semibold text-dark-gray mb-2">
                No RFQs match your search
              </h3>
              <p className="text-gray-600 font-inter">
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBrand('all');
                  setSelectedStatus('all');
                }}
                className="mt-6 px-6 py-3 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
