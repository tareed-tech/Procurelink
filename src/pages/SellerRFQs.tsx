import { useState, useEffect } from 'react';
import SellerSidebar from '../components/SellerSidebar';
import Navbar from '../components/Navbar';
import { Search, Filter, Laptop, Calendar, Package, MapPin, DollarSign, RefreshCw } from 'lucide-react';
import { getCurrentUser } from '../utils/auth';
import { showToast } from '../utils/toast';

export default function SellerRFQs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const availableRFQs = [
    {
      id: '1',
      title: 'HP EliteBook 840 G10',
      buyer: 'Tech Solutions Corp',
      quantity: 50,
      budgetRange: 'R 800,000 - R 900,000',
      location: 'Johannesburg, SA',
      closingDate: 'March 25, 2025',
      status: 'Active',
      hasBid: false,
      daysLeft: 5,
    },
    {
      id: '2',
      title: 'Dell Latitude 5540',
      buyer: 'Enterprise Systems Ltd',
      quantity: 30,
      budgetRange: 'R 500,000 - R 600,000',
      location: 'Cape Town, SA',
      closingDate: 'March 20, 2025',
      status: 'Closing Soon',
      hasBid: true,
      daysLeft: 1,
    },
    {
      id: '3',
      title: 'Lenovo ThinkPad X1 Carbon',
      buyer: 'Global Consulting Inc',
      quantity: 40,
      budgetRange: 'R 700,000 - R 800,000',
      location: 'Durban, SA',
      closingDate: 'March 28, 2025',
      status: 'Active',
      hasBid: false,
      daysLeft: 8,
    },
    {
      id: '4',
      title: 'MacBook Pro 14-inch M3',
      buyer: 'Creative Media Agency',
      quantity: 25,
      budgetRange: 'R 600,000 - R 700,000',
      location: 'Pretoria, SA',
      closingDate: 'March 30, 2025',
      status: 'Active',
      hasBid: false,
      daysLeft: 10,
    },
    {
      id: '5',
      title: 'ASUS ROG Zephyrus G14',
      buyer: 'Gaming Studio Labs',
      quantity: 20,
      budgetRange: 'R 400,000 - R 500,000',
      location: 'Johannesburg, SA',
      closingDate: 'March 22, 2025',
      status: 'Closing Soon',
      hasBid: false,
      daysLeft: 2,
    },
    {
      id: '6',
      title: 'Microsoft Surface Laptop 5',
      buyer: 'Design Partners Co',
      quantity: 35,
      budgetRange: 'R 550,000 - R 650,000',
      location: 'Cape Town, SA',
      closingDate: 'March 26, 2025',
      status: 'Active',
      hasBid: true,
      daysLeft: 6,
    },
  ];

  const getRFQStatusColor = (status: string) => {
    return status === 'Closing Soon'
      ? 'bg-red-100 text-red-700'
      : 'bg-green-100 text-green-700';
  };

  const handleNavigate = (path: string, message: string) => {
    showToast(message, 'info');
    setTimeout(() => {
      window.location.href = path;
    }, 300);
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {user && user.role === 'seller' && <SellerSidebar activePage="browse" />}
      {!user && <Navbar activePage="rfqs" />}

      <div className={user && user.role === 'seller' ? 'ml-64' : 'pt-20'}>
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-poppins font-semibold text-dark-gray">
                Browse RFQs
              </h1>
              <p className="text-gray-500 font-inter mt-1">
                Explore available laptop procurement requests and submit your bids
              </p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 bg-coral text-white px-5 py-2 rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 shadow-sm">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Dell, HP, Lenovo…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral"
                  />
                </div>
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral"
              >
                <option value="all">All Categories</option>
                <option value="business">Business Laptops</option>
                <option value="gaming">Gaming Laptops</option>
                <option value="workstation">Workstations</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="closing">Closing Soon</option>
              </select>

              <button className="flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all">
                <Filter className="w-4 h-4" />
                Apply
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableRFQs.map((rfq) => (
              <div
                key={rfq.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-soft-white rounded-xl flex items-center justify-center text-4xl">
                      💻
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-inter font-medium ${getRFQStatusColor(rfq.status)}`}>
                        {rfq.status}
                      </span>
                      {rfq.hasBid && (
                        <span className="px-3 py-1 rounded-full text-xs font-inter font-medium bg-blue-100 text-blue-700">
                          Already Bid
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-poppins font-semibold text-dark-gray mb-2">
                    {rfq.title}
                  </h3>

                  <p className="text-sm text-gray-500 font-inter mb-4">
                    {rfq.buyer}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-inter">
                      <Package className="w-4 h-4" />
                      <span>{rfq.quantity} units</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-inter">
                      <DollarSign className="w-4 h-4" />
                      <span>{rfq.budgetRange}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-inter">
                      <MapPin className="w-4 h-4" />
                      <span>{rfq.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-inter">
                      <Calendar className="w-4 h-4" />
                      <span>{rfq.daysLeft} days left</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavigate(`/rfq-details-seller/${rfq.id}`, 'Opening RFQ details...')}
                    className="block w-full bg-coral text-white text-center py-3 rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-12">
          <p className="text-center text-gray-500 font-inter text-sm">
            © 2025 ProcureLink. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
