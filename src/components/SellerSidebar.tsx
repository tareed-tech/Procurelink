import { LayoutDashboard, FileSearch, TrendingUp, User, LogOut, Laptop, Bell, MessageSquare, BarChart3 } from 'lucide-react';
import { logout } from '../utils/auth';

interface SellerSidebarProps {
  activePage?: string;
}

export default function SellerSidebar({ activePage = 'dashboard' }: SellerSidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/seller-dashboard' },
    { id: 'browse', label: 'Browse RFQs', icon: FileSearch, href: '/rfq-listings' },
    { id: 'bids', label: 'My Bids', icon: TrendingUp, href: '/seller-bids' },
    { id: 'reports', label: 'Reports', icon: BarChart3, href: '/seller-reports' },
    { id: 'notifications', label: 'Notifications', icon: Bell, href: '/seller-notifications' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, href: '/seller-messages' },
    { id: 'profile', label: 'Profile', icon: User, href: '/seller-profile' },
  ];

  return (
    <div className="w-64 bg-dark-gray min-h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-gray-700">
        <a href="/seller-dashboard" className="flex items-center gap-2">
          <Laptop className="w-8 h-8 text-coral" />
          <span className="text-xl font-poppins font-semibold text-white">
            ProcureLink
          </span>
        </a>
      </div>

      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-inter transition-all ${
                    isActive
                      ? 'bg-coral text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-inter text-gray-300 hover:bg-gray-800 hover:text-white transition-all w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
