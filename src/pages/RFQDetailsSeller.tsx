import { useState, useEffect } from 'react';
import SellerSidebar from '../components/SellerSidebar';
import { ArrowLeft, Building2, Package, DollarSign, MapPin, Tag, Award, Cpu, HardDrive, Monitor, Clock, Shield, Briefcase, Upload, X, CheckCircle, RefreshCw, Users, TrendingUp, TrendingDown, CheckCircle2, Laptop, Loader2 } from 'lucide-react';
import { showToast } from '../utils/toast';
import { enforceSellerRole, getCurrentUser } from '../utils/auth';

export default function RFQDetailsSeller() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 3,
    hours: 14,
    minutes: 32,
  });

  useEffect(() => {
    enforceSellerRole();
  }, []);

  const [bidForm, setBidForm] = useState({
    unitPrice: '',
    deliveryTime: '',
    deliveryUnit: 'days',
    warranty: '1',
    notes: '',
    attachment: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const rfqData = {
    id: '1',
    title: 'HP EliteBook 840 G10',
    units: 25,
    buyer: 'TechNova Solutions',
    closingDate: 'March 25, 2025',
    daysRemaining: 3,
    status: 'Active',
    estimatedBudget: 'R 450,000',
    deliveryLocation: 'Johannesburg, SA',
    category: 'Business Laptops',
    visibility: 'Public',
    smmePreference: '10% bonus for small vendors',
    postedDate: 'March 15, 2025',
    totalBids: 12,
    averageBid: 'R 17,300',
    lowestBid: 'R 16,950',
    imageUrl: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200',
    verifiedBuyer: true,
    specs: {
      processor: 'Intel Core i7-1355U (12th Gen)',
      ram: '16GB DDR4',
      storage: '512GB NVMe SSD',
      display: '14" FHD (1920x1080) IPS',
      graphics: 'Intel Iris Xe Graphics',
      warranty: 'Minimum 2 years',
      brand: 'HP EliteBook Series',
      os: 'Windows 11 Pro',
      ports: 'USB-C, USB-A, HDMI, Ethernet',
      weight: 'Maximum 1.5kg',
    }
  };

  const isExpired = false;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        let { days, hours, minutes } = prev;

        if (minutes > 0) {
          minutes--;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
        }

        return { days, hours, minutes };
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!bidForm.unitPrice || parseFloat(bidForm.unitPrice) <= 0) {
      newErrors.unitPrice = 'Bid amount is required';
    }

    if (!bidForm.deliveryTime || parseInt(bidForm.deliveryTime) <= 0) {
      newErrors.deliveryTime = 'Delivery time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitBid = () => {
    if (validateForm()) {
      setShowConfirmModal(true);
    }
  };

  const confirmSubmission = async () => {
    try {
      setShowConfirmModal(false);
      setIsSubmitting(true);

      const user = getCurrentUser();

      if (!user) {
        showToast('Please log in to submit a bid', 'error');
        window.location.href = '/login';
        return;
      }

      const rfqId = window.location.pathname.split('/').pop() || '1';

      const unitPrice = parseFloat(bidForm.unitPrice);
      const totalAmount = unitPrice * rfqData.units;
      const deliveryTimeString = `${bidForm.deliveryTime} ${bidForm.deliveryUnit}`;

      const existingBidsStr = localStorage.getItem('seller_bids');
      const existingBids = existingBidsStr ? JSON.parse(existingBidsStr) : [];

      const alreadyBid = existingBids.find(
        (bid: any) => bid.rfqId === rfqId && bid.sellerId === user.id
      );

      if (alreadyBid) {
        showToast('You have already submitted a bid for this RFQ', 'error');
        setIsSubmitting(false);
        return;
      }

      const newBid = {
        id: crypto.randomUUID(),
        rfqId: rfqId,
        rfqTitle: rfqData.title,
        sellerId: user.id,
        sellerName: user.name,
        amount: totalAmount.toFixed(2),
        unitPrice: unitPrice.toFixed(2),
        deliveryTime: deliveryTimeString,
        notes: bidForm.notes || '',
        status: 'Pending',
        dateSubmitted: Date.now(),
        buyer: rfqData.buyer,
        units: rfqData.units,
      };

      existingBids.push(newBid);
      localStorage.setItem('seller_bids', JSON.stringify(existingBids));

      setTimeout(() => {
        setIsSubmitting(false);
        showToast('Bid submitted successfully ✅', 'success');

        setTimeout(() => {
          window.location.href = '/seller-bids';
        }, 500);
      }, 1000);
    } catch (error: any) {
      setIsSubmitting(false);
      showToast(error.message || 'Failed to submit bid', 'error');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBidForm({ ...bidForm, attachment: e.target.files[0] });
    }
  };

  const removeAttachment = () => {
    setBidForm({ ...bidForm, attachment: null });
  };

  return (
    <div className="min-h-screen bg-soft-white flex">
      <SellerSidebar activePage="browse" />

      <div className="flex-1 ml-64">
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <a
            href="/seller-dashboard"
            className="inline-flex items-center gap-2 text-coral hover:text-coral/80 font-inter font-medium mb-4 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </a>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-poppins font-semibold text-dark-gray mb-2">
                {rfqData.title} – {rfqData.units} Units
              </h1>
              <p className="text-gray-500 font-inter">
                Posted by {rfqData.buyer} | Closes in {rfqData.daysRemaining} days
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-inter font-medium ${
              isExpired ? 'bg-gray-100 text-gray-700' : 'bg-green-100 text-green-700'
            }`}>
              {isExpired ? 'Closed' : 'Active RFQ'}
            </span>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="relative">
                  <div className="w-full h-80 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={rfqData.imageUrl}
                      alt={rfqData.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {rfqData.verifiedBuyer && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-coral text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-inter font-medium">Verified Buyer</span>
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <h2 className="text-2xl font-poppins font-semibold text-dark-gray mb-1">
                        {rfqData.title}
                      </h2>
                      <p className="text-gray-600 font-inter">
                        {rfqData.units} Units Required • {rfqData.category}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-poppins font-semibold text-dark-gray mb-4 pb-2 border-b-2 border-coral/20">
                    RFQ Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-inter">Buyer Organization</p>
                        <p className="text-base font-inter font-semibold text-dark-gray mt-1">
                          {rfqData.buyer}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-inter">Quantity</p>
                        <p className="text-base font-inter font-semibold text-dark-gray mt-1">
                          {rfqData.units} Units
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-inter">Estimated Budget</p>
                        <p className="text-base font-inter font-semibold text-dark-gray mt-1">
                          {rfqData.estimatedBudget}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-inter">Delivery Location</p>
                        <p className="text-base font-inter font-semibold text-dark-gray mt-1">
                          {rfqData.deliveryLocation}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Tag className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-inter">Category</p>
                        <p className="text-base font-inter font-semibold text-dark-gray mt-1">
                          {rfqData.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-inter">Visibility</p>
                        <p className="text-base font-inter font-semibold text-dark-gray mt-1">
                          {rfqData.visibility}
                        </p>
                      </div>
                    </div>
                  </div>

                  {rfqData.smmePreference && (
                    <div className="mt-6 p-4 bg-coral/5 border border-coral/20 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-coral" />
                        <p className="text-sm font-inter font-semibold text-coral">
                          SMME Preference
                        </p>
                      </div>
                      <p className="text-sm font-inter text-dark-gray mt-2">
                        {rfqData.smmePreference}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-poppins font-semibold text-dark-gray mb-4 pb-2 border-b-2 border-coral/20">
                  <span className="text-coral">Technical Specifications</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Processor</p>
                      <p className="text-base font-inter text-dark-gray mt-1">
                        {rfqData.specs.processor}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <HardDrive className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">RAM</p>
                      <p className="text-base font-inter text-dark-gray mt-1">
                        {rfqData.specs.ram}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <HardDrive className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Storage</p>
                      <p className="text-base font-inter text-dark-gray mt-1">
                        {rfqData.specs.storage}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Monitor className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Display</p>
                      <p className="text-base font-inter text-dark-gray mt-1">
                        {rfqData.specs.display}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Monitor className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Graphics</p>
                      <p className="text-base font-inter text-dark-gray mt-1">
                        {rfqData.specs.graphics}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Warranty</p>
                      <p className="text-base font-inter text-dark-gray mt-1">
                        {rfqData.specs.warranty}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Tag className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Required Brand</p>
                      <p className="text-base font-inter text-dark-gray mt-1">
                        {rfqData.specs.brand}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Monitor className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Operating System</p>
                      <p className="text-base font-inter text-dark-gray mt-1">
                        {rfqData.specs.os}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:col-span-2">
                    <Package className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Ports</p>
                      <p className="text-base font-inter text-dark-gray mt-1">
                        {rfqData.specs.ports}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Weight</p>
                      <p className="text-base font-inter text-dark-gray mt-1">
                        {rfqData.specs.weight}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xl font-poppins font-semibold text-dark-gray mb-4 pb-2 border-b-2 border-coral/20">
                  <span className="text-coral">Submit Your Bid</span>
                </h2>

                {isExpired ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <X className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-lg font-inter font-semibold text-dark-gray mb-2">
                      This RFQ is now closed
                    </p>
                    <p className="text-gray-500 font-inter">
                      The submission deadline has passed.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                        Offered Unit Price (ZAR) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                          R
                        </span>
                        <input
                          type="number"
                          value={bidForm.unitPrice}
                          onChange={(e) => setBidForm({ ...bidForm, unitPrice: e.target.value })}
                          className={`w-full pl-8 pr-4 py-3 border rounded-xl font-inter focus:outline-none focus:border-coral ${
                            errors.unitPrice ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="18000"
                        />
                      </div>
                      {errors.unitPrice && (
                        <p className="text-sm text-red-500 font-inter mt-1">{errors.unitPrice}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                          Delivery Time *
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={bidForm.deliveryTime}
                            onChange={(e) => setBidForm({ ...bidForm, deliveryTime: e.target.value })}
                            className={`flex-1 px-4 py-3 border rounded-xl font-inter focus:outline-none focus:border-coral ${
                              errors.deliveryTime ? 'border-red-500' : 'border-gray-200'
                            }`}
                            placeholder="30"
                          />
                          <select
                            value={bidForm.deliveryUnit}
                            onChange={(e) => setBidForm({ ...bidForm, deliveryUnit: e.target.value })}
                            className="px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral"
                          >
                            <option value="days">Days</option>
                            <option value="weeks">Weeks</option>
                            <option value="months">Months</option>
                          </select>
                        </div>
                        {errors.deliveryTime && (
                          <p className="text-sm text-red-500 font-inter mt-1">{errors.deliveryTime}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                          Warranty Period *
                        </label>
                        <select
                          value={bidForm.warranty}
                          onChange={(e) => setBidForm({ ...bidForm, warranty: e.target.value })}
                          className={`w-full px-4 py-3 border rounded-xl font-inter focus:outline-none focus:border-coral ${
                            errors.warranty ? 'border-red-500' : 'border-gray-200'
                          }`}
                        >
                          <option value="1">1 Year</option>
                          <option value="2">2 Years</option>
                          <option value="3">3 Years</option>
                        </select>
                        {errors.warranty && (
                          <p className="text-sm text-red-500 font-inter mt-1">{errors.warranty}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                        Optional Notes
                      </label>
                      <textarea
                        value={bidForm.notes}
                        onChange={(e) => setBidForm({ ...bidForm, notes: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral resize-none"
                        placeholder="Add any additional information about your bid..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                        Attachment (Optional)
                      </label>
                      {bidForm.attachment ? (
                        <div className="flex items-center justify-between p-4 bg-soft-white border border-gray-200 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center">
                              <Upload className="w-5 h-5 text-coral" />
                            </div>
                            <div>
                              <p className="text-sm font-inter font-semibold text-dark-gray">
                                {bidForm.attachment.name}
                              </p>
                              <p className="text-xs text-gray-500 font-inter">
                                {(bidForm.attachment.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={removeAttachment}
                            className="text-gray-400 hover:text-red-500 transition-all"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-coral transition-all">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm font-inter text-gray-600">
                            Click to upload quote PDF
                          </p>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileUpload}
                          />
                        </label>
                      )}
                    </div>

                    <button
                      onClick={handleSubmitBid}
                      disabled={isSubmitting}
                      className="w-full bg-coral text-white py-4 rounded-xl font-poppins font-semibold text-lg hover:bg-coral/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Bid'
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-poppins font-semibold text-dark-gray">
                    Bidding Info
                  </h3>
                  <button className="text-coral hover:text-coral/80 transition-all">
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-coral" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Total Bids</p>
                      <p className="text-2xl font-poppins font-semibold text-dark-gray mt-1">
                        {rfqData.totalBids}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-coral" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Average Bid</p>
                      <p className="text-xl font-poppins font-semibold text-dark-gray mt-1">
                        {rfqData.averageBid}
                      </p>
                      <p className="text-xs text-gray-400 font-inter">per unit</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingDown className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-inter">Lowest Bid</p>
                      <p className="text-xl font-poppins font-semibold text-green-600 mt-1">
                        {rfqData.lowestBid}
                      </p>
                      <p className="text-xs text-gray-400 font-inter">per unit</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-coral" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 font-inter mb-2">Time Remaining</p>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-soft-white rounded-lg p-2 text-center">
                            <p className="text-2xl font-poppins font-bold text-dark-gray">
                              {timeRemaining.days}
                            </p>
                            <p className="text-xs text-gray-500 font-inter">Days</p>
                          </div>
                          <div className="bg-soft-white rounded-lg p-2 text-center">
                            <p className="text-2xl font-poppins font-bold text-dark-gray">
                              {timeRemaining.hours}
                            </p>
                            <p className="text-xs text-gray-500 font-inter">Hours</p>
                          </div>
                          <div className="bg-soft-white rounded-lg p-2 text-center">
                            <p className="text-2xl font-poppins font-bold text-dark-gray">
                              {timeRemaining.minutes}
                            </p>
                            <p className="text-xs text-gray-500 font-inter">Min</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-coral/5 border border-coral/20 rounded-xl">
                  <p className="text-sm font-inter text-dark-gray text-center">
                    Submit before closing date to be considered.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-12">
          <p className="text-center text-gray-500 font-inter text-sm">
            © 2025 ProcureLink. All rights reserved.
          </p>
        </footer>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-coral" />
            </div>
            <h3 className="text-2xl font-poppins font-semibold text-dark-gray text-center mb-2">
              Confirm Submission
            </h3>
            <p className="text-gray-600 font-inter text-center mb-6">
              Are you sure you want to submit your bid of <span className="font-semibold">R {bidForm.unitPrice}</span> per unit?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-gray-100 text-dark-gray py-3 rounded-xl font-poppins font-medium hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmission}
                className="flex-1 bg-coral text-white py-3 rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-coral/10 rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-coral/20 to-green-100 animate-pulse"></div>
              <Laptop className="w-10 h-10 text-coral relative z-10" />
            </div>
            <h3 className="text-2xl font-poppins font-semibold text-dark-gray text-center mb-2">
              Bid Submitted Successfully!
            </h3>
            <p className="text-gray-600 font-inter text-center mb-6">
              Your bid has been submitted to {rfqData.buyer}. You will be notified once they review your submission.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="/seller-bids"
                className="w-full bg-coral text-white py-3 rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all text-center"
              >
                View My Bids
              </a>
              <a
                href="/seller-dashboard"
                className="w-full bg-gray-100 text-dark-gray py-3 rounded-xl font-poppins font-medium hover:bg-gray-200 transition-all text-center"
              >
                Return to Dashboard
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
