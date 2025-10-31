import { useState, useEffect } from 'react';
import SellerSidebar from '../components/SellerSidebar';
import { Bell, CheckCheck, Circle } from 'lucide-react';
import { enforceSellerRole } from '../utils/auth';
import { showToast } from '../utils/toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'bid_pending' | 'bid_accepted' | 'bid_rejected' | 'new_rfq' | 'general';
  isRead: boolean;
  rfqId?: string;
  timestamp: string;
}

export default function SellerNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    enforceSellerRole();
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    const stored = localStorage.getItem('seller_notifications');
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'Bid Status Update',
          message: 'Your bid on HP EliteBook RFQ is Pending',
          type: 'bid_pending',
          isRead: false,
          rfqId: '101',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '2',
          title: 'Bid Accepted!',
          message: 'Congrats! Your bid was accepted 🎉',
          type: 'bid_accepted',
          isRead: false,
          rfqId: '102',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '3',
          title: 'New RFQ Posted',
          message: 'A new RFQ matching your profile has been posted: Dell Latitude 5540',
          type: 'new_rfq',
          isRead: true,
          rfqId: '103',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '4',
          title: 'Bid Rejected',
          message: 'Your bid on Lenovo ThinkPad RFQ was not selected',
          type: 'bid_rejected',
          isRead: true,
          rfqId: '104',
          timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '5',
          title: 'Profile Verification',
          message: 'Your vendor profile has been verified successfully',
          type: 'general',
          isRead: true,
          timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
        },
      ];
      setNotifications(mockNotifications);
      localStorage.setItem('seller_notifications', JSON.stringify(mockNotifications));
    }
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map(n =>
      n.id === id ? { ...n, isRead: true } : n
    );
    setNotifications(updated);
    localStorage.setItem('seller_notifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    setNotifications(updated);
    localStorage.setItem('seller_notifications', JSON.stringify(updated));
    showToast('All notifications marked as read', 'success');
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.rfqId) {
      window.location.href = `/rfq-details-seller/${notification.rfqId}`;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'bid_accepted':
        return 'border-l-4 border-l-green-500';
      case 'bid_rejected':
        return 'border-l-4 border-l-red-500';
      case 'bid_pending':
        return 'border-l-4 border-l-yellow-500';
      case 'new_rfq':
        return 'border-l-4 border-l-blue-500';
      default:
        return 'border-l-4 border-l-gray-300';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-soft-white flex">
      <SellerSidebar activePage="notifications" />

      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-poppins font-semibold text-dark-gray flex items-center gap-3">
                <Bell className="w-8 h-8 text-coral" />
                Notifications
              </h1>
              <p className="text-gray-500 font-inter mt-1">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-6 py-3 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all shadow-md hover:shadow-lg"
              >
                <CheckCheck className="w-5 h-5" />
                Mark All as Read
              </button>
            )}
          </div>
        </div>

        <div className="p-8">
          <div className="max-w-4xl">
            {notifications.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-100">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-inter text-lg">No notifications yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`bg-white rounded-xl shadow-md p-6 border border-gray-100 cursor-pointer hover:shadow-lg transition-all ${getNotificationColor(notification.type)} ${!notification.isRead ? 'bg-coral/5' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      {!notification.isRead && (
                        <Circle className="w-3 h-3 text-coral fill-coral mt-1 flex-shrink-0" />
                      )}
                      {notification.isRead && (
                        <div className="w-3 h-3 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-poppins font-semibold text-dark-gray mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 font-inter mb-2">
                          {notification.message}
                        </p>
                        <p className="text-sm text-gray-400 font-inter">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
