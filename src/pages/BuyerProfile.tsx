import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { User, Building2, Mail, Phone, Globe, MapPin, Briefcase, Save } from 'lucide-react';
import { enforceBuyerRole, getCurrentUser } from '../utils/auth';
import { showToast } from '../utils/toast';

export default function BuyerProfile() {
  const [formData, setFormData] = useState({
    fullName: '',
    organizationName: '',
    email: '',
    phoneNumber: '',
    businessSize: '',
    procurementContact: '',
    country: '',
    city: '',
    website: '',
  });

  useEffect(() => {
    enforceBuyerRole();
    loadProfileData();
  }, []);

  const loadProfileData = () => {
    const user = getCurrentUser();
    if (user) {
      setFormData({
        fullName: user.name || '',
        organizationName: user.companyName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        businessSize: user.businessSize || '',
        procurementContact: user.procurementContact || '',
        country: user.country || '',
        city: user.city || '',
        website: user.website || '',
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
      companyName: formData.organizationName,
      phoneNumber: formData.phoneNumber,
      businessSize: formData.businessSize,
      procurementContact: formData.procurementContact,
      country: formData.country,
      city: formData.city,
      website: formData.website,
    };

    localStorage.setItem('procurelink_user', JSON.stringify(updatedUser));
    showToast('Profile updated!', 'success');
  };

  return (
    <div className="min-h-screen bg-soft-white flex">
      <Sidebar activePage="profile" />

      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-6">
          <div>
            <h1 className="text-3xl font-poppins font-semibold text-dark-gray">
              Buyer Profile
            </h1>
            <p className="text-gray-500 font-inter mt-1">
              Manage your account information and preferences
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
                    <label htmlFor="organizationName" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Organization Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="organizationName"
                        name="organizationName"
                        value={formData.organizationName}
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
                    <label htmlFor="businessSize" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Business Size
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="businessSize"
                        name="businessSize"
                        value={formData.businessSize}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all appearance-none"
                      >
                        <option value="">Select business size</option>
                        <option value="micro">Micro (1-10 employees)</option>
                        <option value="small">Small (11-50 employees)</option>
                        <option value="medium">Medium (51-250 employees)</option>
                        <option value="large">Large (250+ employees)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="procurementContact" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Procurement Department Contact
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="procurementContact"
                        name="procurementContact"
                        value={formData.procurementContact}
                        onChange={handleInputChange}
                        placeholder="Contact person name"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="country" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="South Africa"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Johannesburg"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Website Link
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourcompany.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                    />
                  </div>
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
