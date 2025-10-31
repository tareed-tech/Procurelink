import { useState, useEffect } from 'react';
import SellerSidebar from '../components/SellerSidebar';
import { Loader2, Laptop, TrendingUp } from 'lucide-react';
import { showToast } from '../utils/toast';
import { enforceSellerRole, getCurrentUser } from '../utils/auth';

interface Bid {
  id: string;
  rfqId: string;
  rfqTitle: string;
  sellerId: string;
  sellerName: string;
  amount: string;
  unitPrice: string;
  deliveryTime: string;
  notes: string;
  status: string;
  dateSubmitted: number;
  buyer: string;
  units: number;
}

export default function SellerBids() {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
    fetchBids();
  }, []);

  const checkSession = () => {
    enforceSellerRole();
  };

  const fetchBids = () => {
    try {
      setLoading(true);
      setTimeout(() => {
        const user = getCurrentUser();
        if (!user) {
          setLoading(false);
          return;
        }

        const storedBids = localStorage.getItem('seller_bids');
        if (storedBids) {
          const allBids: Bid[] = JSON.parse(storedBids);
          const userBids = allBids.filter(bid => bid.sellerId === user.id);
          setBids(userBids);
        } else {
          setBids([]);
        }
        setLoading(false);
      }, 500);
    } catch (error: any) {
      showToast(error.message || 'Failed to load bids', 'error');
      setLoading(false);
    }
  };

  const handleNavigate = (path: string, message: string) => {
    showToast(message, 'info');
    setTimeout(() => {
      window.location.href = path;
    }, 300);
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

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: string | number) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `R ${numAmount.toLocaleString('en-ZA', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  return (
    <div className="min-h-screen bg-soft-white flex">
      <SellerSidebar activePage="bids" />

      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-poppins font-semibold text-dark-gray">
                My Bids
              </h1>
              <p className="text-gray-500 font-inter mt-1">
                Track all your submitted bids and their status
              </p>
            </div>

            <button
              onClick={fetchBids}
              disabled={loading}
              className="flex items-center gap-2 bg-coral text-white px-5 py-2 rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <TrendingUp className="w-4 h-4" />
              )}
              Refresh
            </button>
          </div>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-coral animate-spin mx-auto mb-4" />
                <p className="text-gray-500 font-inter">Loading your bids...</p>
              </div>
            </div>
          ) : bids.length > 0 ? (
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
                    {bids.map((bid) => (
                      <tr key={bid.id} className="hover:bg-soft-white transition-all">
                        <td className="px-6 py-4 font-inter text-dark-gray">
                          <div>
                            <p className="font-semibold">{bid.rfqTitle}</p>
                            <p className="text-sm text-gray-500">{bid.buyer} • {bid.units} units</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-inter font-semibold text-dark-gray">
                          {formatCurrency(bid.amount)}
                          <p className="text-sm text-gray-500 font-normal">R {parseFloat(bid.unitPrice).toLocaleString('en-ZA')} per unit</p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-inter font-medium ${getStatusColor(
                              bid.status
                            )}`}
                          >
                            {getStatusLabel(bid.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-inter text-gray-600">
                          {formatDate(bid.dateSubmitted)}
                          <p className="text-sm text-gray-500">{bid.deliveryTime}</p>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleNavigate(`/rfq-details-seller/${bid.rfqId}`, 'Opening RFQ details...')}
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
                href="/seller-dashboard"
                className="inline-block bg-coral text-white px-6 py-3 rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all"
              >
                Browse RFQs
              </a>
            </div>
          )}
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
