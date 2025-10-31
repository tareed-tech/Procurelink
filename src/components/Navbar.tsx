import { Laptop, LogOut, User } from 'lucide-react';
import { getCurrentUser, logout, isAuthenticated } from '../utils/auth';

interface NavbarProps {
  activePage?: 'home' | 'rfqs' | 'about' | 'contact';
}

export default function Navbar({ activePage = 'home' }: NavbarProps) {
  const user = getCurrentUser();
  const isLoggedIn = isAuthenticated();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Laptop className="w-7 h-7 text-coral" />
            <span className="text-2xl font-poppins font-semibold text-dark-gray">
              ProcureLink
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="/"
              className={`font-poppins font-medium transition-colors ${
                activePage === 'home' ? 'text-coral' : 'text-gray-700 hover:text-coral'
              }`}
            >
              Home
            </a>
            <a
              href="/rfq-listings"
              className={`font-poppins font-medium transition-colors ${
                activePage === 'rfqs' ? 'text-coral' : 'text-gray-700 hover:text-coral'
              }`}
            >
              Browse RFQs
            </a>
            <a
              href="/about"
              className={`font-poppins font-medium transition-colors ${
                activePage === 'about' ? 'text-coral' : 'text-gray-700 hover:text-coral'
              }`}
            >
              About
            </a>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn && user ? (
              <>
                <a
                  href={user.role === 'seller' ? '/seller-dashboard' : '/buyer-dashboard'}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-coral transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="font-poppins font-medium">{user.name}</span>
                </a>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-5 py-2 border-2 border-coral text-coral rounded-xl font-poppins font-medium hover:bg-coral hover:text-white transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login">
                  <button className="px-5 py-2 border-2 border-coral text-coral rounded-xl font-poppins font-medium hover:bg-coral hover:text-white transition-all">
                    Login
                  </button>
                </a>
                <a href="/signup">
                  <button className="px-5 py-2 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all shadow-md">
                    Sign Up
                  </button>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
