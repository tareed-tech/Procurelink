import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { FileText, TrendingUp, Users, Award, Calendar, Package, Clock, ChevronDown, UserPlus, Eye, Settings } from 'lucide-react';
import { enforceBuyerRole } from '../utils/auth';

export default function BuyerDashboard() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    enforceBuyerRole();
  }, []);

  const stats = [
    { id: 1, label: 'Active RFQs', value: '12', icon: FileText, color: 'coral' },
    { id: 2, label: 'Pending Bids', value: '34', icon: TrendingUp, color: 'coral' },
    { id: 3, label: 'Vendors in Panel', value: '48', icon: Users, color: 'coral' },
    { id: 4, label: 'Awarded RFQs', value: '8', icon: Award, color: 'coral' },
  ];

  const activeRFQs = [
    {
      id: '1',
      title: 'Dell Latitude 5540',
      quantity: 20,
      postedDate: 'March 10, 2025',
      bidsReceived: 8,
      status: 'Active',
      closingDate: 'March 25, 2025',
    },
    {
      id: '2',
      title: 'HP EliteBook 840 G10',
      quantity: 25,
      postedDate: 'March 12, 2025',
      bidsReceived: 5,
      status: 'Closing Soon',
      closingDate: 'March 20, 2025',
    },
    {
      id: '3',
      title: 'Lenovo ThinkPad X1 Carbon Gen 11',
      quantity: 15,
      postedDate: 'March 8, 2025',
      bidsReceived: 12,
      status: 'Active',
      closingDate: 'March 30, 2025',
    },
    {
      id: '4',
      title: 'MacBook Pro 14-inch M3',
      quantity: 10,
      postedDate: 'March 14, 2025',
      bidsReceived: 6,
      status: 'Active',
      closingDate: 'March 28, 2025',
    },
  ];

  const quickActions = [
    { label: 'Invite Vendor to Panel', icon: UserPlus, href: '/panel-management' },
    { label: 'View All Bids', icon: Eye, href: '/buyer-bids' },
    { label: 'Manage Panels', icon: Settings, href: '/panel-management' },
  ];

  return (
    <div className="min-h-screen bg-soft-white flex">
      <Sidebar activePage="dashboard" />

      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-poppins font-semibold text-dark-gray">
                Buyer Dashboard
              </h1>
              <p className="text-gray-600 font-inter mt-1">
                Manage your procurement requests and vendor relationships
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a href="/create-rfq">
                <button className="px-6 py-3 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Create RFQ
                </button>
              </a>

              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all"
                >
                  <div className="w-10 h-10 bg-coral rounded-full flex items-center justify-center text-white font-poppins font-semibold">
                    TN
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2">
                    <a
                      href="/buyer-profile"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 font-inter"
                    >
                      Account Settings
                    </a>
                    <a
                      href="/login"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 font-inter"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-${stat.color}/10 rounded-xl`}>
                      <Icon className={`w-6 h-6 text-${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-4xl font-poppins font-semibold text-dark-gray mb-2">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 font-inter">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-8 bg-coral rounded-full"></div>
                    <h2 className="text-2xl font-poppins font-semibold text-dark-gray">
                      My Active RFQs
                    </h2>
                  </div>
                  <a
                    href="/my-rfq"
                    className="text-coral hover:text-coral/80 font-inter font-medium"
                  >
                    View All
                  </a>
                </div>

                <div className="space-y-4">
                  {activeRFQs.map((rfq) => (
                    <div
                      key={rfq.id}
                      className="border border-gray-200 rounded-xl p-6 hover:border-coral hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-poppins font-semibold text-dark-gray mb-2">
                            {rfq.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-coral" />
                              <span className="font-inter">{rfq.quantity} Units</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-coral" />
                              <span className="font-inter">Posted {rfq.postedDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-coral" />
                              <span className="font-inter">Closes {rfq.closingDate}</span>
                            </div>
                          </div>
                        </div>
                        <span
                          className={`px-4 py-1.5 rounded-full text-sm font-poppins font-medium whitespace-nowrap ${
                            rfq.status === 'Active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}
                        >
                          {rfq.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-coral" />
                          <span className="font-inter text-gray-700">
                            <span className="font-semibold text-dark-gray">{rfq.bidsReceived}</span> bids received
                          </span>
                        </div>
                        <a href={`/rfq-details/${rfq.id}`}>
                          <button className="px-5 py-2 bg-soft-white border border-coral text-coral rounded-xl font-poppins font-medium hover:bg-coral hover:text-white transition-all">
                            View Details
                          </button>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-8 bg-coral rounded-full"></div>
                  <h2 className="text-2xl font-poppins font-semibold text-dark-gray">
                    Quick Actions
                  </h2>
                </div>

                <div className="space-y-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <a key={index} href={action.href}>
                        <button className="w-full flex items-center gap-3 px-4 py-4 bg-soft-white hover:bg-coral hover:text-white text-dark-gray rounded-xl font-inter font-medium transition-all group">
                          <Icon className="w-5 h-5 text-coral group-hover:text-white" />
                          <span>{action.label}</span>
                        </button>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-br from-coral to-coral/90 rounded-2xl shadow-lg p-8 mt-6 text-white">
                <h3 className="text-xl font-poppins font-semibold mb-3">
                  Need Help?
                </h3>
                <p className="text-white/90 font-inter mb-6">
                  Our support team is here to assist you with your procurement needs.
                </p>
                <button className="w-full px-4 py-3 bg-white text-coral rounded-xl font-poppins font-medium hover:bg-white/90 transition-all">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-8 py-6 mt-8">
          <p className="text-center text-sm text-gray-500 font-inter">
            © 2025 ProcureLink | All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}
