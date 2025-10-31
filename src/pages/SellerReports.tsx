import { useState, useEffect } from 'react';
import { TrendingUp, CheckCircle, XCircle, Clock, DollarSign, Award, BarChart3, PieChart, RefreshCw } from 'lucide-react';
import SellerSidebar from '../components/SellerSidebar';
import { getCurrentUser, isAuthenticated } from '../utils/auth';
import { showToast } from '../utils/toast';

interface BidPerformance {
  id: string;
  rfqTitle: string;
  bidAmount: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  submittedDate: string;
  rfqId: string;
}

export default function SellerReports() {
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/login';
      return;
    }

    if (user?.role !== 'seller') {
      window.location.href = '/buyer-dashboard';
      return;
    }

    setTimeout(() => setLoading(false), 800);
  }, [user]);

  const metrics = {
    totalBids: 24,
    acceptedBids: 8,
    rejectedBids: 5,
    pendingBids: 11,
    successRate: 33.3,
    avgBidAmount: 'R 385,000',
    avgAwardedAmount: 'R 410,000',
  };

  const bidPerformance: BidPerformance[] = [
    {
      id: '1',
      rfqTitle: 'Dell Latitude 5540',
      bidAmount: 'R 850,000',
      status: 'Accepted',
      submittedDate: 'Feb 15, 2025',
      rfqId: '2',
    },
    {
      id: '2',
      rfqTitle: 'HP EliteBook 840 G10',
      bidAmount: 'R 475,000',
      status: 'Pending',
      submittedDate: 'Feb 20, 2025',
      rfqId: '1',
    },
    {
      id: '3',
      rfqTitle: 'MacBook Pro 14" M3',
      bidAmount: 'R 650,000',
      status: 'Accepted',
      submittedDate: 'Feb 10, 2025',
      rfqId: '3',
    },
    {
      id: '4',
      rfqTitle: 'Lenovo ThinkPad X1 Carbon',
      bidAmount: 'R 720,000',
      status: 'Rejected',
      submittedDate: 'Feb 5, 2025',
      rfqId: '4',
    },
    {
      id: '5',
      rfqTitle: 'ASUS ZenBook 14',
      bidAmount: 'R 320,000',
      status: 'Pending',
      submittedDate: 'Feb 22, 2025',
      rfqId: '5',
    },
  ];

  const monthlyActivity = [
    { month: 'Sep', bids: 3 },
    { month: 'Oct', bids: 5 },
    { month: 'Nov', bids: 4 },
    { month: 'Dec', bids: 2 },
    { month: 'Jan', bids: 6 },
    { month: 'Feb', bids: 4 },
  ];

  const maxBids = Math.max(...monthlyActivity.map(m => m.bids));

  const topRFQs = [
    { title: 'Dell Latitude 5540', outcome: 'Won', amount: 'R 850,000' },
    { title: 'MacBook Pro 14" M3', outcome: 'Won', amount: 'R 650,000' },
    { title: 'Microsoft Surface Laptop 5', outcome: 'Won', amount: 'R 590,000' },
  ];

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Reports updated!', 'success');
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4" />;
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-soft-white">
        <SellerSidebar activePage="reports" />
        <div className="flex-1 ml-64">
          <div className="p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
                ))}
              </div>
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-soft-white">
      <SellerSidebar activePage="reports" />

      <div className="flex-1 ml-64">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-poppins font-bold text-dark-gray mb-2">
                Performance Reports
              </h1>
              <p className="text-gray-600 font-inter">
                Track your bidding performance and competitive insights
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-6 py-3 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all shadow-md"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-coral" />
                </div>
              </div>
              <h3 className="text-3xl font-poppins font-bold text-dark-gray mb-1">
                {metrics.totalBids}
              </h3>
              <p className="text-gray-600 font-inter text-sm">Total Bids Submitted</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-3xl font-poppins font-bold text-dark-gray mb-1">
                {metrics.acceptedBids}
              </h3>
              <p className="text-gray-600 font-inter text-sm">Accepted Bids</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <h3 className="text-3xl font-poppins font-bold text-dark-gray mb-1">
                {metrics.rejectedBids}
              </h3>
              <p className="text-gray-600 font-inter text-sm">Rejected Bids</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-coral" />
                </div>
              </div>
              <h3 className="text-3xl font-poppins font-bold text-dark-gray mb-1">
                {metrics.successRate}%
              </h3>
              <p className="text-gray-600 font-inter text-sm">Success Rate</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-coral" />
                </div>
                <h2 className="text-xl font-poppins font-semibold text-dark-gray">
                  Monthly Activity
                </h2>
              </div>
              <div className="space-y-4">
                {monthlyActivity.map((data, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-inter text-gray-600">{data.month}</span>
                      <span className="text-sm font-poppins font-medium text-dark-gray">
                        {data.bids} bids
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-coral rounded-full h-2 transition-all duration-500"
                        style={{ width: `${(data.bids / maxBids) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-coral" />
                </div>
                <h2 className="text-xl font-poppins font-semibold text-dark-gray">
                  Bid Outcomes
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-inter text-gray-700">Accepted</span>
                  </div>
                  <span className="font-poppins font-bold text-green-600">
                    {metrics.acceptedBids}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <span className="font-inter text-gray-700">Pending</span>
                  </div>
                  <span className="font-poppins font-bold text-yellow-600">
                    {metrics.pendingBids}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="font-inter text-gray-700">Rejected</span>
                  </div>
                  <span className="font-poppins font-bold text-red-600">
                    {metrics.rejectedBids}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-coral" />
                </div>
                <h2 className="text-xl font-poppins font-semibold text-dark-gray">
                  Top Wins
                </h2>
              </div>
              <div className="space-y-3">
                {topRFQs.map((rfq, index) => (
                  <div key={index} className="p-4 bg-soft-white rounded-xl hover:bg-coral/5 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-coral rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-poppins font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-poppins font-medium text-dark-gray text-sm mb-1">
                          {rfq.title}
                        </h4>
                        <p className="text-coral font-inter font-medium text-xs">
                          {rfq.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-coral" />
                <h3 className="text-lg font-poppins font-semibold text-dark-gray">
                  Average Bid Amount
                </h3>
              </div>
              <p className="text-3xl font-poppins font-bold text-dark-gray">
                {metrics.avgBidAmount}
              </p>
              <p className="text-sm text-gray-600 font-inter mt-2">Across all submitted bids</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-poppins font-semibold text-dark-gray">
                  Average Awarded Amount
                </h3>
              </div>
              <p className="text-3xl font-poppins font-bold text-dark-gray">
                {metrics.avgAwardedAmount}
              </p>
              <p className="text-sm text-gray-600 font-inter mt-2">For accepted bids only</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-poppins font-semibold text-dark-gray">
                Bid Performance History
              </h2>
              <p className="text-gray-600 font-inter text-sm mt-1">
                Track all your submitted bids and their outcomes
              </p>
            </div>

            {bidPerformance.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-soft-white">
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
                        Submitted Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bidPerformance.map((bid) => (
                      <tr key={bid.id} className="hover:bg-soft-white transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-inter text-dark-gray">{bid.rfqTitle}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-poppins font-medium text-dark-gray">
                            {bid.bidAmount}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-poppins font-medium ${getStatusColor(
                              bid.status
                            )}`}
                          >
                            {getStatusIcon(bid.status)}
                            {bid.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-inter text-gray-600 text-sm">
                            {bid.submittedDate}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <a href={`/rfq-details-seller/${bid.rfqId}`}>
                            <button className="px-4 py-2 bg-soft-white hover:bg-coral hover:text-white text-dark-gray rounded-lg font-poppins font-medium text-sm transition-all">
                              View RFQ
                            </button>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-10 h-10 text-coral" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-dark-gray mb-2">
                  No Performance Data Yet
                </h3>
                <p className="text-gray-600 font-inter mb-6">
                  Place more bids to unlock performance insights!
                </p>
                <a href="/rfq-listings">
                  <button className="px-6 py-3 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all">
                    Browse RFQs
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
