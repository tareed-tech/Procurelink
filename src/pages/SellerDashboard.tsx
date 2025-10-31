import { useState, useEffect } from 'react';
import SellerSidebar from '../components/SellerSidebar';
import { FileSearch, TrendingUp, Award, TrendingDown, Search, Filter, Laptop, Calendar, Package, ChevronDown, RefreshCw, UserCircle, Settings, Loader2, Bell } from 'lucide-react';
import { showToast } from '../utils/toast';
import { enforceSellerRole } from '../utils/auth';
import { getMockBids, initializeMockData, getUnreadNotificationCount, MockBid } from '../utils/mockData';

export default function SellerDashboard() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [myBids, setMyBids] = useState<MockBid[]>([]);
  const [loadingBids, setLoadingBids] = useState(true);
  const [userName, setUserName] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);

  const stats = [
    { id: 1, label: 'Open RFQs Available', value: '24', icon: FileSearch, color: 'coral' },
    { id: 2, label: 'Active Bids', value: '8', icon: TrendingUp, color: 'coral' },
    { id: 3, label: 'Awarded Bids', value: '5', icon: Award, color: 'coral' },
    { id: 4, label: 'Success Rate', value: '62%', icon: TrendingDown, color: 'coral' },
  ];

  const availableRFQs = [
    {
      id: '1',
      title: 'HP EliteBook 840 G10',
      buyer: 'Tech Solutions Corp',
      quantity: 50,
      closingDate: 'March 25, 2025',
      status: 'Active',
      hasBid: false,
      image: '💻',
    },
    {
      id: '2',
      title: 'Dell Latitude 5540',
      buyer: 'Enterprise Systems Ltd',
      quantity: 30,
      closingDate: 'March 20, 2025',
      status: 'Closing Soon',
      hasBid: true,
      image: '💻',
    },
    {
      id: '3',
      title: 'Lenovo ThinkPad X1 Carbon',
      buyer: 'Global Consulting Inc',
      quantity: 40,
      closingDate: 'March 28, 2025',
      status: 'Active',
      hasBid: false,
      image: '💻',
    },
    {
      id: '4',
      title: 'MacBook Pro 14-inch M3',
      buyer: 'Creative Media Agency',
      quantity: 25,
      closingDate: 'March 30, 2025',
      status: 'Active',
      hasBid: false,
      image: '💻',
    },
    {
      id: '5',
      title: 'ASUS ROG Zephyrus G14',
      buyer: 'Gaming Studio Labs',
      quantity: 20,
      closingDate: 'March 22, 2025',
      status: 'Closing Soon',
      hasBid: false,
      image: '💻',
    },
    {
      id: '6',
      title: 'Microsoft Surface Laptop 5',
      buyer: 'Design Partners Co',
      quantity: 35,
      closingDate: 'March 26, 2025',
      status: 'Active',
      hasBid: true,
      image: '💻',
    },
  ];

  useEffect(() => {
    checkSession();
    initializeMockData();
    fetchBids();
    loadUnreadCount();
  }, []);

  const checkSession = () => {
    const user = enforceSellerRole();
    if (user) {
      setUserName(user.name);
    }
  };

  const fetchBids = () => {
    try {
      setLoadingBids(true);
      setTimeout(() => {
        const bids = getMockBids();
        setMyBids(bids.slice(0, 5));
        setLoadingBids(false);
      }, 500);
    } catch (error: any) {
      console.error('Error fetching bids:', error);
      setLoadingBids(false);
    }
  };

  const loadUnreadCount = () => {
    const count = getUnreadNotificationCount();
    setUnreadCount(count);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-coral/20 text-coral';
      case 'rejected':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return `R ${amount.toLocaleString('en-ZA', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const handleNavigate = (path: string, message: string) => {
    showToast(message, 'info');
    setTimeout(() => {
      window.location.href = path;
    }, 300);
  };

  const getRFQStatusColor = (status: string) => {
    return status === 'Closing Soon'
      ? 'bg-red-100 text-red-700'
      : 'bg-green-100 text-green-700';
  };

  return (
    <div className="min-h-screen bg-soft-white flex">
      <SellerSidebar activePage="dashboard" />

      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-poppins font-semibold text-dark-gray">
                Seller Dashboard
              </h1>
              <p className="text-gray-500 font-inter mt-1">
                {userName ? `Welcome, ${userName}!` : 'Track your bids, explore RFQs, and win deals.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavigate('/notifications?role=seller', 'Opening notifications...')}
                className="relative p-3 bg-white border border-gray-200 rounded-xl hover:border-coral transition-all"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-coral text-white text-xs font-poppins font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2 hover:border-coral transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center">
                    <span className="text-coral font-poppins font-semibold">
                      {userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'VS'}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-poppins font-semibold text-dark-gray">
                      {userName || 'Vendor'}
                    </p>
                    <p className="text-xs text-gray-500 font-inter">Seller</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <button
                      onClick={() => handleNavigate('/profile', 'Viewing profile...')}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-inter text-gray-700 hover:bg-soft-white w-full"
                    >
                      <UserCircle className="w-4 h-4" />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        localStorage.removeItem('procurelink_auth');
                        showToast('Logged out successfully', 'success');
                        setTimeout(() => {
                          window.location.href = '/login';
                        }, 500);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-inter text-gray-700 hover:bg-soft-white w-full"
                    >
                      <Settings className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-500 font-inter text-sm mb-2">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-poppins font-semibold text-dark-gray">
                        {stat.value}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-coral" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div id="browse" className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-poppins font-semibold text-dark-gray">
                Available Laptop RFQs
              </h2>
              <button className="flex items-center gap-2 bg-coral text-white px-4 py-2 rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all">
                <RefreshCw className="w-4 h-4" />
                Refresh RFQs
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100">
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
                        {rfq.image}
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

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 font-inter">
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        <span>{rfq.quantity} units</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{rfq.closingDate}</span>
                      </div>
                    </div>

                    <a
                      href={`/rfq-details-seller/${rfq.id}`}
                      className="block w-full bg-coral text-white text-center py-3 rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all"
                    >
                      View RFQ
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="bids" className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-poppins font-semibold text-dark-gray">
                My Bids
              </h2>
              {myBids.length > 0 && (
                <a
                  href="/seller-bids"
                  className="text-coral hover:text-coral/80 font-inter font-medium"
                >
                  View All Bids
                </a>
              )}
            </div>

            {loadingBids ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                <Loader2 className="w-12 h-12 text-coral animate-spin mx-auto mb-4" />
                <p className="text-gray-500 font-inter">Loading your bids...</p>
              </div>
            ) : myBids.length > 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-soft-white border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                          RFQ Title
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                          Bid Amount
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                          Date Submitted
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {myBids.map((bid) => (
                        <tr key={bid.id} className="hover:bg-soft-white transition-all">
                          <td className="px-6 py-4 font-inter text-dark-gray">
                            {bid.rfq_title}
                          </td>
                          <td className="px-6 py-4 font-inter font-semibold text-dark-gray">
                            {formatCurrency(bid.amount)}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-inter font-medium ${getStatusColor(bid.status)}`}>
                              {getStatusLabel(bid.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-inter text-gray-600">
                            {formatDate(bid.submitted_at)}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleNavigate(`/rfq-details-seller/${bid.id}`, 'Opening bid details...')}
                              className="text-coral hover:text-coral/80 font-inter font-medium"
                            >
                              View RFQ
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                <div className="w-20 h-20 bg-soft-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Laptop className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-dark-gray mb-2">
                  You haven't placed any bids yet.
                </h3>
                <p className="text-gray-500 font-inter mb-6">
                  Browse available RFQs and submit your first bid to get started.
                </p>
                <a
                  href="/seller-dashboard#browse"
                  className="inline-block bg-coral text-white px-6 py-3 rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all"
                >
                  Browse RFQs
                </a>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-poppins font-semibold text-dark-gray mb-4">
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 bg-coral text-white px-4 py-2 rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all">
                <RefreshCw className="w-4 h-4" />
                Refresh RFQs
              </button>
              <a
                href="/seller-profile"
                className="flex items-center gap-2 bg-white border border-gray-200 text-dark-gray px-4 py-2 rounded-xl font-poppins font-medium hover:border-coral transition-all"
              >
                <UserCircle className="w-4 h-4" />
                Update Profile
              </a>
            </div>
            <p className="text-sm text-gray-500 font-inter mt-4">
              Stay active to receive panel-only RFQs.
            </p>
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
