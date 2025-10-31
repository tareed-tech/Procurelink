import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Calendar, MapPin, Package, TrendingUp, Users, Award, FileText, Cpu, HardDrive, Monitor, Zap, ArrowLeft, Edit, Check, X, Building, Clock, DollarSign } from 'lucide-react';

interface Bid {
  id: string;
  vendorName: string;
  businessSize: 'Micro' | 'Small' | 'Medium' | 'Large';
  originalBid: number;
  adjustedBid: number;
  dateSubmitted: string;
  notes: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  isSmme: boolean;
}

export default function RFQDetails() {
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [rfqStatus, setRfqStatus] = useState<'Active' | 'Awarded'>('Active');

  const rfqData = {
    id: '1',
    title: 'HP EliteBook 840 G10 – 25 Units',
    quantity: 25,
    organization: 'TechNova Solutions',
    category: 'Laptops',
    postedDate: '12 Oct 2025',
    closingDate: '17 Oct 2025',
    daysLeft: 5,
    budget: 450000,
    deliveryLocation: 'Johannesburg, Gauteng',
    visibility: 'Public',
    specifications: {
      processor: 'Intel Core i7 13th Gen',
      ram: '16GB DDR4',
      storage: '512GB NVMe SSD',
      display: '14" FHD (1920x1080)',
      graphics: 'Intel Iris Xe Graphics',
      os: 'Windows 11 Pro',
      warranty: '3-year on-site service',
    },
    description: "We're seeking HP EliteBook 840 G10 models for our expanding technical team. Must include at least a 3-year warranty with on-site service support. Preference will be given to vendors who can deliver within 14 days of order confirmation.",
    smmePreference: true,
    smmeBonus: 10,
  };

  const [bids, setBids] = useState<Bid[]>([
    {
      id: '1',
      vendorName: 'EliteTech Suppliers',
      businessSize: 'Medium',
      originalBid: 437500,
      adjustedBid: 437500,
      dateSubmitted: '13 Oct 2025',
      notes: 'Bulk discount applied. Free shipping included. 7-day delivery guarantee.',
      status: 'Pending',
      isSmme: false,
    },
    {
      id: '2',
      vendorName: 'Digital Solutions SA',
      businessSize: 'Small',
      originalBid: 445000,
      adjustedBid: 400500,
      dateSubmitted: '13 Oct 2025',
      notes: 'SMME certified. Extended warranty options available.',
      status: 'Pending',
      isSmme: true,
    },
    {
      id: '3',
      vendorName: 'ProTech Distributors',
      businessSize: 'Large',
      originalBid: 425000,
      adjustedBid: 425000,
      dateSubmitted: '14 Oct 2025',
      notes: 'Authorized HP partner. 24-hour deployment service available.',
      status: 'Pending',
      isSmme: false,
    },
    {
      id: '4',
      vendorName: 'TechBridge Africa',
      businessSize: 'Micro',
      originalBid: 455000,
      adjustedBid: 409500,
      dateSubmitted: '14 Oct 2025',
      notes: 'SMME certified. Local supplier with 10+ years experience.',
      status: 'Pending',
      isSmme: true,
    },
    {
      id: '5',
      vendorName: 'Corporate IT Solutions',
      businessSize: 'Medium',
      originalBid: 448000,
      adjustedBid: 448000,
      dateSubmitted: '15 Oct 2025',
      notes: 'Includes on-site setup and training. 14-day delivery.',
      status: 'Pending',
      isSmme: false,
    },
  ]);

  const handleAcceptBid = (bid: Bid) => {
    setSelectedBid(bid);
    setShowAcceptModal(true);
  };

  const confirmAcceptBid = () => {
    if (selectedBid) {
      setBids(bids.map(bid =>
        bid.id === selectedBid.id
          ? { ...bid, status: 'Accepted' as const }
          : bid
      ));
      setRfqStatus('Awarded');
      setShowAcceptModal(false);
      setShowSuccessModal(true);

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 3000);
    }
  };

  const lowestBid = Math.min(...bids.map(b => b.adjustedBid));
  const averageBid = bids.reduce((sum, b) => sum + b.adjustedBid, 0) / bids.length;

  const getBusinessSizeColor = (size: string) => {
    switch (size) {
      case 'Micro': return 'bg-purple-100 text-purple-700';
      case 'Small': return 'bg-blue-100 text-blue-700';
      case 'Medium': return 'bg-green-100 text-green-700';
      case 'Large': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="min-h-screen bg-soft-white flex">
      <Sidebar activePage="rfqs" />

      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-poppins font-semibold text-dark-gray">
                {rfqData.title}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-gray-600 font-inter">
                  Posted on {rfqData.postedDate}  |  Closes {rfqData.closingDate}
                </p>
                <span className={`px-3 py-1 rounded-full text-sm font-poppins font-medium ${
                  rfqStatus === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {rfqStatus}
                </span>
              </div>
            </div>

            <a
              href="/dashboard"
              className="text-coral hover:text-coral/80 font-inter font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </a>
          </div>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-md p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-8 bg-coral rounded-full"></div>
                    <h2 className="text-2xl font-poppins font-semibold text-dark-gray">
                      RFQ Summary
                    </h2>
                  </div>
                  <a href={`/create-rfq?id=${rfqData.id}`}>
                    <button className="px-4 py-2 text-coral border-2 border-coral rounded-xl font-poppins font-medium hover:bg-coral hover:text-white transition-all flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit RFQ
                    </button>
                  </a>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-coral mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Organization</p>
                      <p className="text-dark-gray font-inter font-medium">{rfqData.organization}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-coral mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Category</p>
                      <p className="text-dark-gray font-inter font-medium">{rfqData.category}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-coral mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Quantity</p>
                      <p className="text-dark-gray font-inter font-medium">{rfqData.quantity} Units</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-coral mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Budget</p>
                      <p className="text-dark-gray font-inter font-medium">R {rfqData.budget.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:col-span-2">
                    <MapPin className="w-5 h-5 text-coral mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Delivery Location</p>
                      <p className="text-dark-gray font-inter font-medium">{rfqData.deliveryLocation}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 font-inter mb-1">Visibility</p>
                      <span className="px-3 py-1 bg-soft-white border border-gray-200 rounded-lg text-sm font-inter font-medium text-dark-gray">
                        {rfqData.visibility}
                      </span>
                    </div>
                  </div>
                </div>

                {rfqData.smmePreference && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-start gap-3 p-4 bg-coral/10 rounded-xl">
                      <Award className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-inter text-dark-gray">
                          SMME vendors get <span className="font-semibold text-coral">{rfqData.smmeBonus}% evaluation bonus</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-8 bg-coral rounded-full"></div>
                  <h2 className="text-2xl font-poppins font-semibold text-dark-gray">
                    Technical Specifications
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-coral mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Processor</p>
                      <p className="text-dark-gray font-inter font-medium">{rfqData.specifications.processor}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-coral mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">RAM</p>
                      <p className="text-dark-gray font-inter font-medium">{rfqData.specifications.ram}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <HardDrive className="w-5 h-5 text-coral mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Storage</p>
                      <p className="text-dark-gray font-inter font-medium">{rfqData.specifications.storage}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Monitor className="w-5 h-5 text-coral mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Display</p>
                      <p className="text-dark-gray font-inter font-medium">{rfqData.specifications.display}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-coral mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Operating System</p>
                      <p className="text-dark-gray font-inter font-medium">{rfqData.specifications.os}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-coral mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Warranty</p>
                      <p className="text-dark-gray font-inter font-medium">{rfqData.specifications.warranty}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-8 bg-coral rounded-full"></div>
                  <h2 className="text-2xl font-poppins font-semibold text-dark-gray">
                    Description & Requirements
                  </h2>
                </div>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {rfqData.description}
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-8 bg-coral rounded-full"></div>
                    <h2 className="text-2xl font-poppins font-semibold text-dark-gray">
                      Vendor Bids Received
                    </h2>
                  </div>
                  <span className="px-4 py-2 bg-soft-white rounded-xl text-dark-gray font-poppins font-semibold">
                    {bids.length} Bids
                  </span>
                </div>

                <div className="space-y-4">
                  {bids.map((bid) => (
                    <div
                      key={bid.id}
                      className={`border-2 rounded-xl p-6 transition-all ${
                        bid.status === 'Accepted'
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-200 hover:border-coral hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-poppins font-semibold text-dark-gray">
                              {bid.vendorName}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-poppins font-medium ${getBusinessSizeColor(bid.businessSize)}`}>
                              {bid.businessSize}
                            </span>
                            {bid.isSmme && (
                              <span className="px-3 py-1 rounded-full text-xs font-poppins font-medium bg-coral/20 text-coral">
                                SMME
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 font-inter">
                            <Clock className="w-4 h-4" />
                            <span>Submitted {bid.dateSubmitted}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1.5 rounded-full text-sm font-poppins font-medium ${getStatusColor(bid.status)}`}>
                          {bid.status}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-soft-white rounded-lg p-4">
                          <p className="text-sm text-gray-500 font-inter mb-1">Original Bid</p>
                          <p className="text-2xl font-poppins font-semibold text-dark-gray">
                            R {bid.originalBid.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 font-inter mt-1">
                            R {(bid.originalBid / rfqData.quantity).toLocaleString()} per unit
                          </p>
                        </div>

                        {bid.isSmme && bid.originalBid !== bid.adjustedBid ? (
                          <div className="bg-coral/10 rounded-lg p-4 border-2 border-coral">
                            <p className="text-sm text-gray-700 font-inter mb-1">Adjusted Bid (SMME -{rfqData.smmeBonus}%)</p>
                            <p className="text-2xl font-poppins font-semibold text-coral">
                              R {bid.adjustedBid.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-600 font-inter mt-1">
                              R {(bid.adjustedBid / rfqData.quantity).toLocaleString()} per unit
                            </p>
                          </div>
                        ) : (
                          <div className="bg-soft-white rounded-lg p-4">
                            <p className="text-sm text-gray-500 font-inter mb-1">Evaluation Bid</p>
                            <p className="text-2xl font-poppins font-semibold text-dark-gray">
                              R {bid.adjustedBid.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 font-inter mt-1">
                              R {(bid.adjustedBid / rfqData.quantity).toLocaleString()} per unit
                            </p>
                          </div>
                        )}
                      </div>

                      {bid.notes && (
                        <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-600 font-inter">
                            <span className="font-medium text-dark-gray">Notes:</span> {bid.notes}
                          </p>
                        </div>
                      )}

                      {rfqStatus === 'Active' && bid.status === 'Pending' && (
                        <button
                          onClick={() => handleAcceptBid(bid)}
                          className="w-full px-6 py-3 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          <Check className="w-5 h-5" />
                          Accept Bid
                        </button>
                      )}

                      {bid.status === 'Accepted' && (
                        <div className="flex items-center gap-2 p-3 bg-green-100 rounded-xl">
                          <Check className="w-5 h-5 text-green-700" />
                          <p className="text-green-700 font-inter font-medium">
                            This bid has been awarded
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                <h3 className="text-lg font-poppins font-semibold text-dark-gray mb-6">
                  Bid Analytics
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-soft-white rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-5 h-5 text-coral" />
                      <p className="text-sm text-gray-500 font-inter">Total Bids</p>
                    </div>
                    <p className="text-3xl font-poppins font-semibold text-dark-gray">{bids.length}</p>
                  </div>

                  <div className="p-4 bg-soft-white rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-coral" />
                      <p className="text-sm text-gray-500 font-inter">Lowest Bid</p>
                    </div>
                    <p className="text-3xl font-poppins font-semibold text-coral">
                      R {lowestBid.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 font-inter mt-1">
                      R {(lowestBid / rfqData.quantity).toLocaleString()} per unit
                    </p>
                  </div>

                  <div className="p-4 bg-soft-white rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="w-5 h-5 text-coral" />
                      <p className="text-sm text-gray-500 font-inter">Average Bid</p>
                    </div>
                    <p className="text-3xl font-poppins font-semibold text-dark-gray">
                      R {Math.round(averageBid).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 font-inter mt-1">
                      R {Math.round(averageBid / rfqData.quantity).toLocaleString()} per unit
                    </p>
                  </div>

                  <div className="p-4 bg-soft-white rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-coral" />
                      <p className="text-sm text-gray-500 font-inter">Time Remaining</p>
                    </div>
                    <p className="text-3xl font-poppins font-semibold text-dark-gray">
                      {rfqData.daysLeft}
                    </p>
                    <p className="text-sm text-gray-600 font-inter">days left</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-8 py-6 mt-8">
          <div className="flex items-center justify-between">
            <a
              href="/dashboard"
              className="px-6 py-3 border-2 border-coral text-coral rounded-xl font-poppins font-medium hover:bg-coral hover:text-white transition-all"
            >
              Back to Dashboard
            </a>
            <a
              href={`/create-rfq?id=${rfqData.id}`}
              className="px-6 py-3 bg-soft-white text-dark-gray rounded-xl font-poppins font-medium hover:bg-gray-200 transition-all"
            >
              Edit RFQ
            </a>
          </div>
        </div>
      </div>

      {showAcceptModal && selectedBid && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-poppins font-semibold text-dark-gray mb-4">
              Confirm Bid Award
            </h3>
            <p className="text-gray-600 font-inter mb-6">
              Are you sure you want to award this bid to <span className="font-semibold text-dark-gray">{selectedBid.vendorName}</span> for{' '}
              <span className="font-semibold text-coral">R {selectedBid.adjustedBid.toLocaleString()}</span>?
            </p>
            <p className="text-sm text-gray-500 font-inter mb-6">
              This will mark the RFQ as awarded and notify the vendor.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAcceptModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-poppins font-medium hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmAcceptBid}
                className="flex-1 px-6 py-3 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all shadow-md"
              >
                Confirm Award
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-poppins font-semibold text-dark-gray text-center mb-2">
              Bid Awarded Successfully!
            </h3>
            <p className="text-gray-600 font-inter text-center mb-6">
              Vendor has been notified. Redirecting to dashboard...
            </p>
            <a href="/dashboard" className="block">
              <button className="w-full px-6 py-3 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all">
                Return to Dashboard
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
