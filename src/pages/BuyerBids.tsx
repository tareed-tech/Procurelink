import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { TrendingUp, Search, Filter, ChevronDown, Eye, Calendar, Building2, Package, FileText, Inbox, Award, DollarSign, Users, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { enforceBuyerRole } from '../utils/auth';

interface BidWithDetails {
  id: string;
  rfq_id: string;
  seller_id: string;
  unit_price: number;
  total_amount: number;
  delivery_time: string;
  warranty_offered: string;
  product_condition: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  created_at: string;
  rfqs: {
    id: string;
    title: string;
    quantity: number;
    status: string;
  };
  profiles: {
    company_name: string;
    full_name: string;
  };
}

export default function BuyerBids() {
  const [bids, setBids] = useState<BidWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const [rfqStatusFilter, setRfqStatusFilter] = useState<'all' | 'active' | 'closed' | 'awarded'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    enforceBuyerRole();
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.log('No user logged in');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('bids')
        .select(`
          *,
          rfqs (
            id,
            title,
            quantity,
            status,
            buyer_id
          ),
          profiles:seller_id (
            company_name,
            full_name
          )
        `)
        .eq('rfqs.buyer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bids:', error);
      } else {
        setBids(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'withdrawn':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredBids = bids
    .filter(bid => {
      if (filterStatus === 'all') return true;
      return bid.status === filterStatus;
    })
    .filter(bid => {
      if (rfqStatusFilter === 'all') return true;
      return bid.rfqs?.status === rfqStatusFilter;
    })
    .filter(bid => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        bid.rfqs?.title?.toLowerCase().includes(query) ||
        bid.profiles?.company_name?.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'amount') {
        return a.total_amount - b.total_amount;
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  const stats = {
    totalBids: bids.length,
    pendingReview: bids.filter(b => b.status === 'pending').length,
    accepted: bids.filter(b => b.status === 'accepted').length,
    rejected: bids.filter(b => b.status === 'rejected').length,
  };

  const analytics = {
    averageBidValue: bids.length > 0
      ? bids.reduce((sum, bid) => sum + bid.total_amount, 0) / bids.length
      : 0,
    awardedRFQs: new Set(bids.filter(b => b.status === 'accepted').map(b => b.rfq_id)).size,
    totalBidValue: bids.reduce((sum, bid) => sum + bid.total_amount, 0),
    mostActiveVendor: (() => {
      if (bids.length === 0) return null;
      const vendorCounts = bids.reduce((acc, bid) => {
        const vendor = bid.profiles?.company_name || 'Unknown';
        acc[vendor] = (acc[vendor] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      const topVendor = Object.entries(vendorCounts).sort((a, b) => b[1] - a[1])[0];
      return { name: topVendor[0], count: topVendor[1] };
    })(),
  };

  const handleResetFilters = () => {
    setFilterStatus('all');
    setRfqStatusFilter('all');
    setSearchQuery('');
    setSortBy('date');
  };

  return (
    <div className="min-h-screen bg-soft-white flex">
      <Sidebar activePage="bids" />

      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-poppins font-semibold text-dark-gray">
                All Received Bids
              </h1>
              <p className="text-gray-500 font-inter mt-1">
                View and manage all vendor bids submitted to your RFQs
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchBids}
                className="flex items-center gap-2 px-5 py-3 border border-gray-200 text-dark-gray rounded-xl font-poppins font-medium hover:border-coral hover:text-coral transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <a href="/dashboard">
                <button className="px-6 py-3 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all shadow-md">
                  Back to Dashboard
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-500 font-inter text-sm">Total Bids</p>
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-3xl font-poppins font-semibold text-dark-gray">
                {stats.totalBids}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-500 font-inter text-sm">Pending Review</p>
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-3xl font-poppins font-semibold text-dark-gray">
                {stats.pendingReview}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-500 font-inter text-sm">Accepted</p>
                <Award className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-poppins font-semibold text-dark-gray">
                {stats.accepted}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-500 font-inter text-sm">Rejected</p>
                <X className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-3xl font-poppins font-semibold text-dark-gray">
                {stats.rejected}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-poppins font-semibold text-dark-gray flex items-center gap-2">
                    <Filter className="w-5 h-5 text-coral" />
                    Filters & Search
                  </h3>
                  <button
                    onClick={handleResetFilters}
                    className="text-sm text-gray-500 hover:text-coral font-inter transition-all"
                  >
                    Reset Filters
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by RFQ title or vendor name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                        Bid Status
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(['all', 'pending', 'accepted', 'rejected'] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg font-inter text-sm font-medium transition-all ${
                              filterStatus === status
                                ? 'bg-coral text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                        RFQ Status
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(['all', 'active', 'closed', 'awarded'] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() => setRfqStatusFilter(status)}
                            className={`px-4 py-2 rounded-lg font-inter text-sm font-medium transition-all ${
                              rfqStatusFilter === status
                                ? 'bg-coral text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-sm text-gray-600 font-inter">
                      Showing {filteredBids.length} of {bids.length} bids
                    </p>
                    <button
                      onClick={() => setSortBy(sortBy === 'date' ? 'amount' : 'date')}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-dark-gray font-inter text-sm font-medium hover:border-coral transition-all"
                    >
                      <ChevronDown className="w-4 h-4" />
                      Sort by: {sortBy === 'date' ? 'Date' : 'Amount'}
                    </button>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                  <RefreshCw className="w-12 h-12 text-coral animate-spin mx-auto mb-4" />
                  <p className="text-gray-600 font-inter">Loading bids...</p>
                </div>
              ) : filteredBids.length > 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-soft-white border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                            RFQ Title
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                            Vendor Name
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
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredBids.map((bid) => (
                          <tr key={bid.id} className="hover:bg-soft-white transition-all">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-coral" />
                                <div>
                                  <p className="font-inter font-semibold text-dark-gray">
                                    {bid.rfqs?.title || 'N/A'}
                                  </p>
                                  <p className="text-xs text-gray-500 font-inter">
                                    {bid.rfqs?.quantity} units
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-gray-400" />
                                <span className="font-inter text-dark-gray">
                                  {bid.profiles?.company_name || 'Unknown'}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-inter font-semibold text-dark-gray">
                                  {formatCurrency(bid.total_amount)}
                                </p>
                                <p className="text-xs text-gray-500 font-inter">
                                  {formatCurrency(bid.unit_price)}/unit
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-inter font-medium ${getStatusStyle(bid.status)}`}>
                                {getStatusLabel(bid.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1 text-gray-600 font-inter text-sm">
                                <Calendar className="w-4 h-4" />
                                {formatDate(bid.created_at)}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <a
                                href={`/rfq-details/${bid.rfq_id}`}
                                className="flex items-center gap-1 text-coral hover:text-coral/80 font-inter text-sm font-medium transition-all"
                              >
                                <Eye className="w-4 h-4" />
                                View RFQ
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-soft-white flex items-center justify-center">
                    <Inbox className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-dark-gray mb-2">
                    No bids found
                  </h3>
                  <p className="text-gray-500 font-inter mb-6">
                    {searchQuery || filterStatus !== 'all' || rfqStatusFilter !== 'all'
                      ? 'Try adjusting your filters or search query.'
                      : "You haven't received any bids yet."}
                  </p>
                  <a href="/dashboard">
                    <button className="px-6 py-3 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all">
                      View RFQs
                    </button>
                  </a>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-coral to-coral/90 rounded-2xl shadow-lg p-6 text-white mb-6">
                <h3 className="text-xl font-poppins font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="w-6 h-6" />
                  Bid Insights
                </h3>

                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-white/80 text-sm font-inter mb-1">
                      Average Bid Value
                    </p>
                    <p className="text-2xl font-poppins font-bold">
                      {formatCurrency(analytics.averageBidValue)}
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-white/80 text-sm font-inter mb-1">
                      Total Bid Value
                    </p>
                    <p className="text-2xl font-poppins font-bold">
                      {formatCurrency(analytics.totalBidValue)}
                    </p>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-white/80 text-sm font-inter mb-1">
                      Awarded RFQs
                    </p>
                    <p className="text-2xl font-poppins font-bold">
                      {analytics.awardedRFQs}
                    </p>
                  </div>

                  {analytics.mostActiveVendor && (
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <p className="text-white/80 text-sm font-inter mb-1 flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Most Active Vendor
                      </p>
                      <p className="text-lg font-poppins font-bold">
                        {analytics.mostActiveVendor.name}
                      </p>
                      <p className="text-sm text-white/70 font-inter">
                        {analytics.mostActiveVendor.count} bids submitted
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-lg font-poppins font-semibold text-dark-gray mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <a href="/create-rfq" className="block">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-coral text-white rounded-xl font-inter font-medium hover:bg-coral/90 transition-all">
                      <FileText className="w-5 h-5" />
                      Create New RFQ
                    </button>
                  </a>
                  <a href="/panel-management" className="block">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-soft-white border border-gray-200 text-dark-gray rounded-xl font-inter font-medium hover:bg-gray-100 transition-all">
                      <Users className="w-5 h-5" />
                      Manage Panels
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-gray-50 border-t border-gray-200 py-6">
          <p className="text-center text-gray-500 font-inter text-sm">
            © 2025 ProcureLink. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

function Clock({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
