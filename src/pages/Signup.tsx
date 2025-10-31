import { useState } from 'react';
import { Laptop, Mail, Lock, User, Building, Briefcase, Store, ArrowLeft } from 'lucide-react';
import { showToast } from '../utils/toast';

type UserRole = 'buyer' | 'seller' | null;

export default function Signup() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    sellerType: '',
    businessSize: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    const existingUser = localStorage.getItem('procurelink_user');
    if (existingUser) {
      const user = JSON.parse(existingUser);
      if (user.email === formData.email) {
        showToast('Email already registered', 'error');
        return;
      }
    }

    const user = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: selectedRole || 'buyer',
      companyName: formData.companyName,
      sellerType: formData.sellerType,
      businessSize: formData.businessSize,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('procurelink_user', JSON.stringify(user));
    localStorage.setItem('procurelink_auth', 'true');
    showToast('Account created successfully!', 'success');

    setTimeout(() => {
      if (selectedRole === 'buyer') {
        window.location.href = '/buyer-dashboard';
      } else if (selectedRole === 'seller') {
        window.location.href = '/seller-dashboard';
      }
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-soft-white flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-coral via-coral/90 to-dark-gray relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative z-10 flex flex-col justify-center items-center w-full px-16 text-white">
          <Laptop className="w-24 h-24 mb-8 animate-pulse" />
          <h2 className="text-4xl font-poppins font-semibold mb-4 text-center">
            Empowering Smart Laptop Procurement
          </h2>
          <p className="text-xl text-white/90 font-inter text-center max-w-md">
            Join thousands of buyers and sellers connecting through ProcureLink
          </p>

          <div className="mt-16 grid grid-cols-2 gap-8 w-full max-w-md">
            <div className="text-center">
              <Briefcase className="w-12 h-12 mx-auto mb-3 text-white/90" />
              <p className="text-lg font-poppins font-semibold mb-1">For Buyers</p>
              <p className="text-white/80 font-inter text-sm">Access verified vendors and competitive quotes</p>
            </div>
            <div className="text-center">
              <Store className="w-12 h-12 mx-auto mb-3 text-white/90" />
              <p className="text-lg font-poppins font-semibold mb-1">For Sellers</p>
              <p className="text-white/80 font-inter text-sm">Win contracts and grow your business</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="flex items-center justify-between p-6">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-inter font-medium text-gray-600">
              Back to Home
            </span>
          </a>
          <a
            href="/login"
            className="flex items-center gap-2 px-5 py-2 border-2 border-coral text-coral rounded-xl font-poppins font-medium hover:bg-coral hover:text-white transition-all"
          >
            Login
          </a>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-poppins font-semibold text-dark-gray mb-3">
                Create Your ProcureLink Account
              </h1>
              <p className="text-lg text-gray-600 font-inter">
                Join as a Buyer or Seller to start trading laptops
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-6">
                <label className="block text-sm font-inter font-medium text-gray-700 mb-3">
                  I want to register as:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('buyer')}
                    className={`flex flex-col items-center justify-center px-4 py-6 rounded-xl border-2 transition-all ${
                      selectedRole === 'buyer'
                        ? 'border-coral bg-coral/5 shadow-md'
                        : 'border-gray-200 hover:border-coral/50'
                    }`}
                  >
                    <Briefcase className={`w-8 h-8 mb-2 ${selectedRole === 'buyer' ? 'text-coral' : 'text-gray-400'}`} />
                    <span className={`font-poppins font-medium ${selectedRole === 'buyer' ? 'text-coral' : 'text-gray-700'}`}>
                      Buyer
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('seller')}
                    className={`flex flex-col items-center justify-center px-4 py-6 rounded-xl border-2 transition-all ${
                      selectedRole === 'seller'
                        ? 'border-coral bg-coral/5 shadow-md'
                        : 'border-gray-200 hover:border-coral/50'
                    }`}
                  >
                    <Store className={`w-8 h-8 mb-2 ${selectedRole === 'seller' ? 'text-coral' : 'text-gray-400'}`} />
                    <span className={`font-poppins font-medium ${selectedRole === 'seller' ? 'text-coral' : 'text-gray-700'}`}>
                      Seller
                    </span>
                  </button>
                </div>
              </div>

              {selectedRole && (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <label htmlFor="companyName" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Company / Organization Name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Your Company Name"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                        required
                      />
                    </div>
                  </div>

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
                        onChange={handleInputChange}
                        placeholder="you@company.com"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a strong password"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Re-enter your password"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                        required
                      />
                    </div>
                  </div>

                  {selectedRole === 'seller' && (
                    <>
                      <div>
                        <label htmlFor="sellerType" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                          Seller Type
                        </label>
                        <select
                          id="sellerType"
                          name="sellerType"
                          value={formData.sellerType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                          required
                        >
                          <option value="">Select seller type</option>
                          <option value="oem">OEM (Original Equipment Manufacturer)</option>
                          <option value="reseller">Reseller / Distributor</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="businessSize" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                          Business Size
                        </label>
                        <select
                          id="businessSize"
                          name="businessSize"
                          value={formData.businessSize}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                          required
                        >
                          <option value="">Select business size</option>
                          <option value="micro">Micro (1-10 employees)</option>
                          <option value="small">Small (11-50 employees)</option>
                          <option value="medium">Medium (51-250 employees)</option>
                          <option value="large">Large (250+ employees)</option>
                        </select>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all shadow-md hover:shadow-lg mt-6"
                  >
                    Create Account
                  </button>

                  <p className="text-xs text-gray-500 font-inter text-center mt-4">
                    By signing up, you agree to our <a href="/terms" className="text-coral hover:underline">Terms of Use</a> and <a href="/privacy" className="text-coral hover:underline">Privacy Policy</a>
                  </p>
                </form>
              )}

              {!selectedRole && (
                <div className="text-center py-8">
                  <p className="text-gray-500 font-inter">
                    Please select your account type to continue
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-600 font-inter">
                  Already have an account?{' '}
                  <a href="/login" className="text-coral hover:text-coral/80 font-medium underline">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dark-gray px-8 py-6">
          <div className="flex justify-center gap-6 text-sm text-gray-400 font-inter">
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <span className="text-gray-600">|</span>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            <span className="text-gray-600">|</span>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
