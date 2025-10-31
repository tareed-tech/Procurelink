import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Users, Mail, FileText, Star, Eye, Trash2, X, Send, Calendar, CheckCircle, AlertCircle, Building2, Tag } from 'lucide-react';
import { enforceBuyerRole } from '../utils/auth';

export default function PanelManagement() {
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);

  useEffect(() => {
    enforceBuyerRole();
  }, []);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [inviteForm, setInviteForm] = useState({
    email: '',
    note: '',
  });

  const stats = [
    { id: 1, label: 'Total Vendors in Panel', value: '15', icon: Users },
    { id: 2, label: 'Pending Invitations', value: '3', icon: Mail },
    { id: 3, label: 'Private RFQs using Panel', value: '2', icon: FileText },
  ];

  const vendors = [
    {
      id: '1',
      name: 'TechSupply Solutions',
      businessSize: 'Small',
      category: 'OEM',
      rating: 4.5,
      status: 'Active',
      joinedDate: 'Jan 15, 2025',
      totalBids: 12,
    },
    {
      id: '2',
      name: 'Global IT Distributors',
      businessSize: 'Large',
      category: 'Reseller',
      rating: 4.8,
      status: 'Active',
      joinedDate: 'Dec 10, 2024',
      totalBids: 28,
    },
    {
      id: '3',
      name: 'Premier Computer Supplies',
      businessSize: 'Medium',
      category: 'Reseller',
      rating: 4.2,
      status: 'Active',
      joinedDate: 'Feb 5, 2025',
      totalBids: 8,
    },
    {
      id: '4',
      name: 'Elite Laptop Vendors',
      businessSize: 'Small',
      category: 'OEM',
      rating: 4.6,
      status: 'Active',
      joinedDate: 'Jan 28, 2025',
      totalBids: 15,
    },
    {
      id: '5',
      name: 'NextGen Hardware Ltd',
      businessSize: 'Micro',
      category: 'Reseller',
      rating: 4.0,
      status: 'Active',
      joinedDate: 'Mar 1, 2025',
      totalBids: 5,
    },
  ];

  const pendingInvitations = [
    {
      id: '1',
      email: 'contact@rapidtech.co.za',
      dateSent: 'March 18, 2025',
      status: 'Pending',
    },
    {
      id: '2',
      email: 'sales@itstoreplus.co.za',
      dateSent: 'March 17, 2025',
      status: 'Pending',
    },
    {
      id: '3',
      email: 'info@laptopworld.co.za',
      dateSent: 'March 15, 2025',
      status: 'Pending',
    },
  ];

  const privateRFQs = [
    {
      id: '1',
      title: 'HP EliteBook 840 G10 - 50 Units',
      status: 'Active',
      closingDate: 'March 25, 2025',
      bidsReceived: 8,
    },
    {
      id: '2',
      title: 'Dell Latitude 5540 - 30 Units',
      status: 'Active',
      closingDate: 'March 28, 2025',
      bidsReceived: 6,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Invited':
        return 'bg-yellow-100 text-yellow-700';
      case 'Removed':
        return 'bg-red-100 text-red-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getBusinessSizeColor = (size: string) => {
    switch (size) {
      case 'Large':
        return 'bg-blue-100 text-blue-700';
      case 'Medium':
        return 'bg-green-100 text-green-700';
      case 'Small':
        return 'bg-yellow-100 text-yellow-700';
      case 'Micro':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleSendInvitation = () => {
    if (inviteForm.email) {
      setShowAddVendorModal(false);
      setShowSuccessMessage(true);
      setInviteForm({ email: '', note: '' });
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const handleRemoveVendor = (vendor: any) => {
    setSelectedVendor(vendor);
    setShowRemoveModal(true);
  };

  const confirmRemoveVendor = () => {
    setShowRemoveModal(false);
    setSelectedVendor(null);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />}
        <span className="text-sm text-gray-600 font-inter ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-soft-white flex">
      <Sidebar activePage="panels" />

      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-poppins font-semibold text-dark-gray">
                Vendor Panel Management
              </h1>
              <p className="text-gray-500 font-inter mt-1">
                Organize and manage vendors allowed to bid on private RFQs.
              </p>
            </div>

            <button
              onClick={() => setShowAddVendorModal(true)}
              className="flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all shadow-lg"
            >
              <Users className="w-5 h-5" />
              Add Vendor
            </button>
          </div>
        </div>

        <div className="p-8">
          {showSuccessMessage && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800 font-inter font-medium">
                Vendor invitation sent successfully!
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

          <div className="mb-8">
            <h2 className="text-2xl font-poppins font-semibold text-dark-gray mb-6">
              Your Panel Vendors
            </h2>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-soft-white border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Vendor Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Business Size
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Rating
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {vendors.map((vendor) => (
                      <tr key={vendor.id} className="hover:bg-soft-white transition-all">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-inter font-semibold text-dark-gray">
                              {vendor.name}
                            </p>
                            <p className="text-sm text-gray-500 font-inter">
                              Joined {vendor.joinedDate}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-inter font-medium ${getBusinessSizeColor(vendor.businessSize)}`}>
                            {vendor.businessSize}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-inter text-dark-gray">
                          {vendor.category}
                        </td>
                        <td className="px-6 py-4">
                          {renderStars(vendor.rating)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-inter font-medium ${getStatusColor(vendor.status)}`}>
                            {vendor.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <a
                              href={`/vendor-profile/${vendor.id}`}
                              className="flex items-center gap-1 text-coral hover:text-coral/80 font-inter text-sm font-medium transition-all"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </a>
                            <button
                              onClick={() => handleRemoveVendor(vendor)}
                              className="flex items-center gap-1 text-red-500 hover:text-red-600 font-inter text-sm font-medium transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-poppins font-semibold text-dark-gray mb-6">
              Pending Invitations
            </h2>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-soft-white border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Vendor Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Date Sent
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pendingInvitations.map((invite) => (
                      <tr key={invite.id} className="hover:bg-soft-white transition-all">
                        <td className="px-6 py-4 font-inter text-dark-gray">
                          {invite.email}
                        </td>
                        <td className="px-6 py-4 font-inter text-gray-600">
                          {invite.dateSent}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-inter font-medium ${getStatusColor(invite.status)}`}>
                            {invite.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <button className="text-coral hover:text-coral/80 font-inter text-sm font-medium">
                              Resend Invite
                            </button>
                            <button className="text-red-500 hover:text-red-600 font-inter text-sm font-medium">
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-poppins font-semibold text-dark-gray mb-6">
              Private RFQs Using This Panel
            </h2>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-soft-white border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        RFQ Title
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Closing Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Bids Received
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-poppins font-semibold text-dark-gray">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {privateRFQs.map((rfq) => (
                      <tr key={rfq.id} className="hover:bg-soft-white transition-all">
                        <td className="px-6 py-4 font-inter font-semibold text-dark-gray">
                          {rfq.title}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-inter font-medium ${getStatusColor(rfq.status)}`}>
                            {rfq.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-inter text-gray-600">
                          {rfq.closingDate}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-inter font-semibold text-dark-gray">
                            {rfq.bidsReceived}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={`/rfq-details/${rfq.id}`}
                            className="text-coral hover:text-coral/80 font-inter font-medium"
                          >
                            View RFQ
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

      {showAddVendorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-poppins font-semibold text-dark-gray">
                Add Vendor to Panel
              </h3>
              <button
                onClick={() => setShowAddVendorModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                  Vendor Email or Code *
                </label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral"
                  placeholder="vendor@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                  Optional Note
                </label>
                <textarea
                  value={inviteForm.note}
                  onChange={(e) => setInviteForm({ ...inviteForm, note: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral resize-none"
                  placeholder="Add a personal message to the vendor..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddVendorModal(false)}
                  className="flex-1 bg-gray-100 text-dark-gray py-3 rounded-xl font-poppins font-medium hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendInvitation}
                  className="flex-1 flex items-center justify-center gap-2 bg-coral text-white py-3 rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Send Invitation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRemoveModal && selectedVendor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-poppins font-semibold text-dark-gray text-center mb-2">
              Remove Vendor?
            </h3>
            <p className="text-gray-600 font-inter text-center mb-6">
              Are you sure you want to remove <span className="font-semibold">{selectedVendor.name}</span> from your panel? They will no longer be able to bid on your private RFQs.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRemoveModal(false)}
                className="flex-1 bg-gray-100 text-dark-gray py-3 rounded-xl font-poppins font-medium hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemoveVendor}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-poppins font-medium hover:bg-red-600 transition-all"
              >
                Remove Vendor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
