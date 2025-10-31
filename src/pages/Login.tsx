import { useState } from 'react';
import { Laptop, Mail, Lock, ArrowLeft } from 'lucide-react';
import { showToast } from '../utils/toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }

    const savedUser = localStorage.getItem('procurelink_user');

    if (!savedUser) {
      showToast('No account found. Please sign up.', 'error');
      return;
    }

    const user = JSON.parse(savedUser);

    if (user.email !== email || user.password !== password) {
      showToast('Invalid email or password', 'error');
      return;
    }

    localStorage.setItem('procurelink_auth', 'true');
    showToast(`Welcome back, ${user.name}!`, 'success');

    setTimeout(() => {
      if (user.role === 'seller') {
        window.location.href = '/seller-dashboard';
      } else if (user.role === 'buyer') {
        window.location.href = '/buyer-dashboard';
      } else {
        showToast('Please complete your signup', 'error');
        window.location.href = '/signup';
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-soft-white flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-coral via-coral/90 to-dark-gray relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative z-10 flex flex-col justify-center items-center w-full px-16 text-white">
          <Laptop className="w-24 h-24 mb-8 animate-pulse" />
          <h2 className="text-4xl font-poppins font-semibold mb-4 text-center">
            Welcome to ProcureLink
          </h2>
          <p className="text-xl text-white/90 font-inter text-center max-w-md">
            South Africa's premier marketplace for laptop procurement and supply
          </p>

          <div className="mt-16 grid grid-cols-2 gap-8 w-full max-w-md">
            <div className="text-center">
              <p className="text-4xl font-poppins font-semibold mb-2">2,500+</p>
              <p className="text-white/80 font-inter">Active RFQs</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-poppins font-semibold mb-2">1,200+</p>
              <p className="text-white/80 font-inter">Verified Vendors</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="flex items-center justify-between p-6">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Laptop className="w-6 h-6 text-coral lg:hidden" />
            <span className="text-xl font-poppins font-semibold text-dark-gray lg:hidden">
              ProcureLink
            </span>
          </a>
          <a
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-coral transition-colors font-inter"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </a>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-poppins font-semibold text-dark-gray mb-3">
                Welcome Back
              </h1>
              <p className="text-lg text-gray-600 font-inter">
                Login to manage your laptop deals and RFQs.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-inter font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-coral border-gray-300 rounded focus:ring-coral/50"
                    />
                    <span className="text-sm text-gray-600 font-inter">Remember me</span>
                  </label>
                  <a href="/forgot-password" className="text-sm text-coral hover:text-coral/80 font-inter underline">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all shadow-md hover:shadow-lg"
                >
                  Login
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-600 font-inter">
                  New to ProcureLink?{' '}
                  <a href="/signup" className="text-coral hover:text-coral/80 font-medium underline">
                    Sign up
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 font-inter">
                © 2025 ProcureLink | Secure Marketplace for Laptops
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
