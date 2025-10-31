import { useState, useEffect } from 'react';
import SellerSidebar from '../components/SellerSidebar';
import { User, Building2, Mail, Phone, FileText, MapPin, Briefcase, Calendar, Upload, Save } from 'lucide-react';
import { enforceSellerRole, getCurrentUser } from '../utils/auth';
import { showToast } from '../utils/toast';

export default function SellerProfile() {
  const [formData, setFormData] = useState({
    fullName: '',
    vendorCompanyName: '',
    email: '',
    phoneNumber: '',
    vendorType: '',
    registrationNumber: '',
    yearsInBusiness: '',
    location: '',
    certifications: '',
  });

  useEffect(() => {
    enforceSellerRole();
    loadProfileData();
  }, []);

  const loadProfileData = () => {
    const user = getCurrentUser();
    if (user) {
      setFormData({
        fullName: user.name || '',
        vendorCompanyName: user.companyName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        vendorType: user.sellerType || user.vendorType || '',
        registrationNumber: user.registrationNumber || '',
        yearsInBusiness: user.yearsInBusiness || '',
        location: user.location || '',
        certifications: user.certifications || '',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = getCurrentUser();
    if (!user) {
      showToast('User not found', 'error');
      return;
    }

    const updatedUser = {
      ...user,
      name: formData.fullName,
      companyName: formData.vendorCompanyName,
      phoneNumber: formData.phoneNumber,
      vendorType: formData.vendorType,
      sellerType: formData.vendorType,
      registrationNumber: formData.registrationNumber,
      yearsInBusiness: formData.yearsInBusiness,
      location: formData.location,
      certifications: formData.certifications,
    };

    localStorage.setItem('procurelink_user', JSON.stringify(updatedUser));
    showToast('Profile updated!', 'success');
  };

  return (
    <div className="min-h-screen bg-soft-white flex">
      <SellerSidebar activePage="profile" />

      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-6">
          <div>
            <h1 className="text-3xl font-poppins font-semibold text-dark-gray">
              Seller Profile
            </h1>
            <p className="text-gray-500 font-inter mt-1">
              Manage your vendor information and credentials
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="max-w-4xl">
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Smith"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="vendorCompanyName" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Vendor / Company Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="vendorCompanyName"
                        name="vendorCompanyName"
                        value={formData.vendorCompanyName}
                        onChange={handleInputChange}
                        placeholder="Your Company Name"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="+27 123 456 7890"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="vendorType" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Vendor Type
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="vendorType"
                        name="vendorType"
                        value={formData.vendorType}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all appearance-none"
                      >
                        <option value="">Select vendor type</option>
                        <option value="oem">OEM (Original Equipment Manufacturer)</option>
                        <option value="distributor">Distributor</option>
                        <option value="repair">Repair Service</option>
                        <option value="reseller">Reseller</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="registrationNumber" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Company Registration Number
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="registrationNumber"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleInputChange}
                        placeholder="2021/123456/07"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="yearsInBusiness" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Years in Business
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        id="yearsInBusiness"
                        name="yearsInBusiness"
                        value={formData.yearsInBusiness}
                        onChange={handleInputChange}
                        placeholder="5"
                        min="0"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Johannesburg, South Africa"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="certifications" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Upload Certifications
                  </label>
                  <div className="relative">
                    <Upload className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="certifications"
                      name="certifications"
                      value={formData.certifications}
                      onChange={handleInputChange}
                      placeholder="Certificate names or document references"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                    />
                  </div>
                  <p className="text-xs text-gray-500 font-inter mt-2">
                    Enter certification details or document names. File upload functionality coming soon.
                  </p>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all shadow-md hover:shadow-lg"
                  >
                    <Save className="w-5 h-5" />
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
