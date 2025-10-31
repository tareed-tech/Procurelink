import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import SellerSidebar from '../components/SellerSidebar';
import { User, Mail, Phone, Building2, Globe, MapPin, Shield, Bell, CheckCircle, Upload, Camera, Lock, Eye, EyeOff, X } from 'lucide-react';

interface UserProfileProps {
  userType?: 'buyer' | 'seller';
}

export default function UserProfile({ userType = 'buyer' }: UserProfileProps) {
  const [formChanged, setFormChanged] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: 'John Anderson',
    email: 'john.anderson@technova.co.za',
    phone: '+27 11 234 5678',
    companyName: 'TechNova Solutions',
    businessType: 'Corporate Buyer',
    businessSize: 'Medium',
    country: 'South Africa',
    city: 'Johannesburg',
    website: 'https://technova.co.za',
    isVerified: true,
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsAlerts: false,
    weeklyReports: true,
    twoFactorAuth: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setProfileData({ ...profileData, [field]: value });
    setFormChanged(true);
  };

  const handleTogglePreference = (key: string) => {
    setPreferences({ ...preferences, [key]: !preferences[key as keyof typeof preferences] });
    setFormChanged(true);
  };

  const handleSaveChanges = () => {
    setShowSuccessToast(true);
    setFormChanged(false);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setFormChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword === passwordForm.confirmPassword) {
      setShowPasswordModal(false);
      setShowSuccessToast(true);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-soft-white flex">
      {userType === 'buyer' ? (
        <Sidebar activePage="profile" />
      ) : (
        <SellerSidebar activePage="profile" />
      )}

      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-poppins font-semibold text-dark-gray">
                My Profile
              </h1>
              <p className="text-gray-500 font-inter mt-1">
                Manage your account and organization information.
              </p>
            </div>

            <button
              onClick={handleSaveChanges}
              disabled={!formChanged}
              className={`px-6 py-3 rounded-xl font-poppins font-medium transition-all shadow-lg ${
                formChanged
                  ? 'bg-coral text-white hover:bg-coral/90 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="p-8">
          {showSuccessToast && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-800 font-inter font-medium">
                Profile updated successfully!
              </p>
            </div>
          )}

          <div className="max-w-4xl">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
              <h2 className="text-xl font-poppins font-semibold text-dark-gray mb-6">
                Profile Overview
              </h2>

              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-coral/20 to-coral/40 flex items-center justify-center overflow-hidden">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <Building2 className="w-16 h-16 text-coral" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-coral rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-coral/90 transition-all">
                    <Camera className="w-5 h-5 text-white" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                    />
                  </label>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-poppins font-semibold text-dark-gray">
                      {profileData.fullName}
                    </h3>
                    {profileData.isVerified && (
                      <span className="px-3 py-1 bg-coral/10 text-coral rounded-full text-xs font-inter font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 font-inter mb-4">
                    {userType === 'buyer' ? 'Buyer – Organization Account' : 'Seller – Vendor Account'}
                  </p>
                  <label className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-700 font-inter font-medium cursor-pointer hover:border-coral hover:text-coral transition-all">
                    <Upload className="w-4 h-4" />
                    Upload New Logo
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-coral" />
                <h2 className="text-xl font-poppins font-semibold text-dark-gray">
                  Personal Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral"
                  />
                </div>

                <div>
                  <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={profileData.email}
                      readOnly
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl font-inter bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                    Password
                  </label>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter text-left text-gray-700 hover:border-coral transition-all flex items-center gap-2"
                  >
                    <Lock className="w-5 h-5 text-gray-400" />
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <Building2 className="w-5 h-5 text-coral" />
                <h2 className="text-xl font-poppins font-semibold text-dark-gray">
                  Organization Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                    Company / Organization Name
                  </label>
                  <input
                    type="text"
                    value={profileData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral"
                  />
                </div>

                <div>
                  <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                    Business Type
                  </label>
                  <select
                    value={profileData.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral"
                  >
                    <option value="OEM">OEM</option>
                    <option value="Reseller">Reseller</option>
                    <option value="Corporate Buyer">Corporate Buyer</option>
                    <option value="Government">Government</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                    Business Size
                  </label>
                  <select
                    value={profileData.businessSize}
                    onChange={(e) => handleInputChange('businessSize', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral"
                  >
                    <option value="Micro">Micro</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                    Country
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={profileData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={profileData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral"
                  />
                </div>

                <div>
                  <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                    Website (Optional)
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-coral" />
                <h2 className="text-xl font-poppins font-semibold text-dark-gray">
                  Preferences & Notifications
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-soft-white rounded-xl">
                  <div>
                    <p className="font-inter font-semibold text-dark-gray">
                      Email Notifications
                    </p>
                    <p className="text-sm text-gray-500 font-inter">
                      Receive updates about RFQs, bids, and responses
                    </p>
                  </div>
                  <button
                    onClick={() => handleTogglePreference('emailNotifications')}
                    className={`relative w-12 h-6 rounded-full transition-all ${
                      preferences.emailNotifications ? 'bg-coral' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all ${
                        preferences.emailNotifications ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-soft-white rounded-xl">
                  <div>
                    <p className="font-inter font-semibold text-dark-gray">
                      SMS Alerts
                    </p>
                    <p className="text-sm text-gray-500 font-inter">
                      Get text messages for urgent updates
                    </p>
                  </div>
                  <button
                    onClick={() => handleTogglePreference('smsAlerts')}
                    className={`relative w-12 h-6 rounded-full transition-all ${
                      preferences.smsAlerts ? 'bg-coral' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all ${
                        preferences.smsAlerts ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-soft-white rounded-xl">
                  <div>
                    <p className="font-inter font-semibold text-dark-gray">
                      Weekly Reports
                    </p>
                    <p className="text-sm text-gray-500 font-inter">
                      Receive a summary of your activity every week
                    </p>
                  </div>
                  <button
                    onClick={() => handleTogglePreference('weeklyReports')}
                    className={`relative w-12 h-6 rounded-full transition-all ${
                      preferences.weeklyReports ? 'bg-coral' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all ${
                        preferences.weeklyReports ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-coral" />
                <h2 className="text-xl font-poppins font-semibold text-dark-gray">
                  Security Settings
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-soft-white rounded-xl">
                  <div>
                    <p className="font-inter font-semibold text-dark-gray">
                      Password
                    </p>
                    <p className="text-sm text-gray-500 font-inter">
                      Last updated 30 days ago
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-dark-gray font-inter font-medium hover:border-coral hover:text-coral transition-all"
                  >
                    Change Password
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-soft-white rounded-xl">
                  <div>
                    <p className="font-inter font-semibold text-dark-gray">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-gray-500 font-inter">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button
                    onClick={() => handleTogglePreference('twoFactorAuth')}
                    className={`relative w-12 h-6 rounded-full transition-all ${
                      preferences.twoFactorAuth ? 'bg-coral' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all ${
                        preferences.twoFactorAuth ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-gray-50 border-t border-gray-200 py-6">
          <div className="max-w-4xl mx-auto px-8 flex items-center justify-between">
            <p className="text-gray-500 font-inter text-sm">
              © 2025 ProcureLink. All rights reserved.
            </p>
            <button className="text-red-500 hover:text-red-600 font-inter text-sm font-medium">
              Delete Account
            </button>
          </div>
        </footer>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-poppins font-semibold text-dark-gray">
                Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-inter font-semibold text-dark-gray mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 bg-gray-100 text-dark-gray py-3 rounded-xl font-poppins font-medium hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordChange}
                  className="flex-1 bg-coral text-white py-3 rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
