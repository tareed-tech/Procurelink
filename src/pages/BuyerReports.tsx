import { useState, useEffect } from 'react';
import { BarChart3, CheckCircle, Clock, FileText, TrendingUp, DollarSign, RefreshCw, Package } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { getCurrentUser, isAuthenticated } from '../utils/auth';
import { showToast } from '../utils/toast';

interface RFQPerformance {
  id: string;
  rfqTitle: string;
  totalBids: number;
  lowestBid: string;
  highestBid: string;
  status: 'Active' | 'Awarded' | 'Closed';
}

export default function BuyerReports() {
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/login';
      return;
    }

    if (user?.role !== 'buyer') {
      window.location.href = '/seller-dashboard';
      return;
    }

    setTimeout(() => setLoading(false), 800);
  }, [user]);

  const metrics = {
    totalRFQs: 12,
    awarded: 5,
    pending: 4,
    closed: 3,
    totalBidsReceived: 87,
    avgBidsPerRFQ: 7.3,
  };

  const rfqPerformance: RFQPerformance[] = [
    {
      id: '1',
      rfqTitle: 'Dell Latitude 5540',
      totalBids: 12,
      lowestBid: 'R 820,000',
      highestBid: 'R 950,000',
      status: 'Awarded',
    },
    {
      id: '2',
      rfqTitle: 'HP EliteBook 840 G10',
      totalBids: 8,
      lowestBid: 'R 460,000',
      highestBid: 'R 520,000',
      status: 'Active',
    },
    {
      id: '3',
      rfqTitle: 'MacBook Pro 14" M3',
      totalBids: 15,
      lowestBid: 'R 630,000',
      highestBid: 'R 750,000',
      status: 'Awarded',
    },
    {
      id: '4',
      rfqTitle: 'Lenovo ThinkPad X1 Carbon',
      totalBids: 10,
      lowestBid: 'R 700,000',
      highestBid: 'R 820,000',
      status: 'Active',
    },
    {
      id: '5',
      rfqTitle: 'ASUS ZenBook 14',
      totalBids: 6,
      lowestBid: 'R 310,000',
      highestBid: 'R 360,000',
      status: 'Closed',
    },
  ];

  const monthlyRFQs = [
    { month: 'Sep', count: 1 },
    { month: 'Oct', count: 3 },
    { month: 'Nov', count: 2 },
    { month: 'Dec', count: 1 },
    { month: 'Jan', count: 3 },
    { month: 'Feb', count: 2 },
  ];

  const maxRFQs = Math.max(...monthlyRFQs.map(m => m.count));

  const bidTrends = [
    { budget: 'R 300,000 - R 400,000', avgBid: 'R 345,000', rfqCount: 3 },
    { budget: 'R 400,000 - R 600,000', avgBid: 'R 485,000', rfqCount: 4 },
    { budget: 'R 600,000 - R 800,000', avgBid: 'R 690,000', rfqCount: 3 },
    { budget: 'R 800,000+', avgBid: 'R 875,000', rfqCount: 2 },
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
      case 'Awarded':
        return 'bg-green-100 text-green-700';
      case 'Active':
        return 'bg-coral/10 text-coral';
      case 'Closed':
        return 'bg-gray-200 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Awarded':
        return <CheckCircle className="w-4 h-4" />;
      case 'Active':
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-soft-white">
        <Sidebar activePage="reports" />
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
      <Sidebar activePage="reports" />

      <div className="flex-1 ml-64">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-poppins font-bold text-dark-gray mb-2">
                Reports & Insights
              </h1>
              <p className="text-gray-600 font-inter">
                Procurement analytics and data-driven decision insights
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
                  <FileText className="w-6 h-6 text-coral" />
                </div>
              </div>
              <h3 className="text-3xl font-poppins font-bold text-dark-gray mb-1">
                {metrics.totalRFQs}
              </h3>
              <p className="text-gray-600 font-inter text-sm">Total RFQs Posted</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-3xl font-poppins font-bold text-dark-gray mb-1">
                {metrics.awarded}
              </h3>
              <p className="text-gray-600 font-inter text-sm">RFQs Awarded</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <h3 className="text-3xl font-poppins font-bold text-dark-gray mb-1">
                {metrics.pending}
              </h3>
              <p className="text-gray-600 font-inter text-sm">Pending RFQs</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-coral" />
                </div>
              </div>
              <h3 className="text-3xl font-poppins font-bold text-dark-gray mb-1">
                {metrics.totalBidsReceived}
              </h3>
              <p className="text-gray-600 font-inter text-sm">Total Bids Received</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-coral" />
                </div>
                <h2 className="text-xl font-poppins font-semibold text-dark-gray">
                  RFQs Per Month
                </h2>
              </div>
              <div className="space-y-4">
                {monthlyRFQs.map((data, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-inter text-gray-600">{data.month}</span>
                      <span className="text-sm font-poppins font-medium text-dark-gray">
                        {data.count} RFQs
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-coral rounded-full h-2 transition-all duration-500"
                        style={{ width: `${(data.count / maxRFQs) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-coral" />
                </div>
                <h2 className="text-xl font-poppins font-semibold text-dark-gray">
                  RFQ Status
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-inter text-gray-700">Awarded</span>
                  </div>
                  <span className="font-poppins font-bold text-green-600">
                    {metrics.awarded}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-coral/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-coral" />
                    <span className="font-inter text-gray-700">Active</span>
                  </div>
                  <span className="font-poppins font-bold text-coral">
                    {metrics.pending}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <span className="font-inter text-gray-700">Closed</span>
                  </div>
                  <span className="font-poppins font-bold text-gray-600">
                    {metrics.closed}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-coral" />
                </div>
                <h2 className="text-xl font-poppins font-semibold text-dark-gray">
                  Bid Trends
                </h2>
              </div>
              <div className="space-y-3">
                {bidTrends.map((trend, index) => (
                  <div key={index} className="p-4 bg-soft-white rounded-xl hover:bg-coral/5 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-inter text-gray-600">{trend.budget}</span>
                      <span className="text-xs font-poppins font-medium text-coral">
                        {trend.rfqCount} RFQs
                      </span>
                    </div>
                    <p className="text-sm font-poppins font-semibold text-dark-gray">
                      Avg: {trend.avgBid}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-coral" />
                <h3 className="text-lg font-poppins font-semibold text-dark-gray">
                  Average Bids Per RFQ
                </h3>
              </div>
              <p className="text-3xl font-poppins font-bold text-dark-gray">
                {metrics.avgBidsPerRFQ}
              </p>
              <p className="text-sm text-gray-600 font-inter mt-2">
                Higher competition leads to better pricing
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-poppins font-semibold text-dark-gray">
                  Award Rate
                </h3>
              </div>
              <p className="text-3xl font-poppins font-bold text-dark-gray">
                {((metrics.awarded / metrics.totalRFQs) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600 font-inter mt-2">
                RFQs successfully awarded to vendors
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-poppins font-semibold text-dark-gray">
                RFQ Performance Analysis
              </h2>
              <p className="text-gray-600 font-inter text-sm mt-1">
                Detailed bid metrics for all your posted RFQs
              </p>
            </div>

            {rfqPerformance.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-soft-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        RFQ Title
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Total Bids
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Lowest Bid
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Highest Bid
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {rfqPerformance.map((rfq) => (
                      <tr key={rfq.id} className="hover:bg-soft-white transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-inter text-dark-gray">{rfq.rfqTitle}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-poppins font-medium text-dark-gray">
                            {rfq.totalBids}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-poppins font-medium text-green-600">
                            {rfq.lowestBid}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-poppins font-medium text-gray-600">
                            {rfq.highestBid}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-poppins font-medium ${getStatusColor(
                              rfq.status
                            )}`}
                          >
                            {getStatusIcon(rfq.status)}
                            {rfq.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <a href={`/rfq-details/${rfq.id}`}>
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
                  No Analytics Available Yet
                </h3>
                <p className="text-gray-600 font-inter mb-6">
                  Post your first RFQ to start gathering insights
                </p>
                <a href="/create-rfq">
                  <button className="px-6 py-3 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all">
                    Create RFQ
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
