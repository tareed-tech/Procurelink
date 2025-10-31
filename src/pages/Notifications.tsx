import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import SellerSidebar from '../components/SellerSidebar';
import { FileText, MessageSquare, Award, Bell, CheckCheck, Filter, Send, Laptop, MessageCircle, Clock, User, Building2 } from 'lucide-react';
import { getMockNotifications, markNotificationAsRead, initializeMockData } from '../utils/mockData';
import { getCurrentUser } from '../utils/auth';
import { showToast } from '../utils/toast';

interface NotificationsProps {
  userType?: 'buyer' | 'seller';
}

export default function Notifications({ userType = 'buyer' }: NotificationsProps) {
  const [activeTab, setActiveTab] = useState<'notifications' | 'messages'>('notifications');
  const [filterType, setFilterType] = useState<'all' | 'bids' | 'awards' | 'system'>('all');
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [notifications, setNotifications] = useState(getMockNotifications());

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      showToast('Please log in to view notifications', 'error');
      window.location.href = '/login';
      return;
    }

    initializeMockData();
    setNotifications(getMockNotifications());

    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab === 'messages') {
      setActiveTab('messages');
    }
  }, []);

  const handleMarkAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId);
    setNotifications(getMockNotifications());
  };


  const messageThreads = [
    {
      id: '1',
      partnerName: 'TechNova Solutions',
      partnerRole: 'Buyer',
      lastMessage: 'Can you provide more details on the warranty terms?',
      timestamp: '10 min ago',
      unreadCount: 2,
      avatar: null,
    },
    {
      id: '2',
      partnerName: 'Global IT Distributors',
      partnerRole: 'Seller',
      lastMessage: 'Thank you for accepting our bid!',
      timestamp: '1 hour ago',
      unreadCount: 0,
      avatar: null,
    },
    {
      id: '3',
      partnerName: 'Premier Computer Supplies',
      partnerRole: 'Seller',
      lastMessage: 'We can offer a 10% discount for bulk orders.',
      timestamp: '2 days ago',
      unreadCount: 1,
      avatar: null,
    },
  ];

  const conversationMessages = [
    {
      id: '1',
      sender: 'them',
      message: 'Hello! I saw your RFQ for HP EliteBook laptops.',
      timestamp: '2:30 PM',
    },
    {
      id: '2',
      sender: 'me',
      message: 'Hi! Yes, we need 25 units. Do you have them in stock?',
      timestamp: '2:32 PM',
    },
    {
      id: '3',
      sender: 'them',
      message: 'Yes, we have 30 units available. Can you provide more details on the warranty terms?',
      timestamp: '2:35 PM',
    },
    {
      id: '4',
      sender: 'me',
      message: 'We require a minimum 2-year manufacturer warranty.',
      timestamp: '2:40 PM',
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'rfq':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'bid':
        return <MessageSquare className="w-5 h-5 text-coral" />;
      case 'award':
        return <Award className="w-5 h-5 text-green-600" />;
      case 'system':
        return <Bell className="w-5 h-5 text-gray-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filterType === 'all') return true;
    return notif.category === filterType;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput('');
    }
  };

  return (
    <div className="min-h-screen bg-soft-white flex">
      {userType === 'buyer' ? (
        <Sidebar activePage="notifications" />
      ) : (
        <SellerSidebar activePage="notifications" />
      )}

      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-poppins font-semibold text-dark-gray">
                Notifications & Messages
              </h1>
              <p className="text-gray-500 font-inter mt-1">
                Stay updated on your bids, awards, and marketplace activities.
              </p>
            </div>

            <button className="flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all shadow-lg">
              <CheckCheck className="w-5 h-5" />
              Mark All as Read
            </button>
          </div>

          <div className="flex items-center gap-6 mt-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('notifications')}
              className={`pb-4 font-poppins font-medium text-base transition-all relative ${
                activeTab === 'notifications'
                  ? 'text-coral'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-coral text-white text-xs rounded-full">
                  {unreadCount}
                </span>
              )}
              {activeTab === 'notifications' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`pb-4 font-poppins font-medium text-base transition-all relative ${
                activeTab === 'messages'
                  ? 'text-coral'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Messages
              {activeTab === 'messages' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral"></div>
              )}
            </button>
          </div>
        </div>

        <div className="p-8">
          {activeTab === 'notifications' && (
            <div className="max-w-4xl">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-inter font-semibold text-dark-gray">
                    Filter by:
                  </span>
                  <div className="flex gap-2">
                    {[
                      { value: 'all', label: 'All' },
                      { value: 'bids', label: 'Bids' },
                      { value: 'awards', label: 'Awards' },
                      { value: 'system', label: 'System' },
                    ].map((filter) => (
                      <button
                        key={filter.value}
                        onClick={() => setFilterType(filter.value as any)}
                        className={`px-4 py-2 rounded-lg font-inter text-sm font-medium transition-all ${
                          filterType === filter.value
                            ? 'bg-coral text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {filteredNotifications.length > 0 ? (
                <div className="space-y-3">
                  {filteredNotifications.map((notification) => (
                    <a
                      key={notification.id}
                      href={notification.link}
                      className="block bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-coral/30 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-soft-white flex items-center justify-center flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-1">
                            <h3 className="font-inter font-semibold text-dark-gray">
                              {notification.title}
                            </h3>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {!notification.isRead && (
                                <span className="w-2 h-2 bg-coral rounded-full"></span>
                              )}
                              <span className="text-xs text-gray-500 font-inter">
                                {notification.timestamp}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 font-inter text-sm">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-soft-white flex items-center justify-center">
                    <Laptop className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-dark-gray mb-2">
                    You're all caught up!
                  </h3>
                  <p className="text-gray-500 font-inter">
                    No new updates in this category.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 280px)' }}>
              <div className="flex h-full">
                <div className="w-80 border-r border-gray-200 flex flex-col">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-poppins font-semibold text-dark-gray">
                      Conversations
                    </h3>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    {messageThreads.length > 0 ? (
                      messageThreads.map((thread) => (
                        <button
                          key={thread.id}
                          onClick={() => setSelectedThread(thread.id)}
                          className={`w-full p-4 flex items-start gap-3 border-b border-gray-100 hover:bg-soft-white transition-all ${
                            selectedThread === thread.id ? 'bg-coral/5 border-l-4 border-l-coral' : ''
                          }`}
                        >
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-coral/20 to-coral/40 flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-6 h-6 text-coral" />
                          </div>

                          <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-inter font-semibold text-dark-gray text-sm truncate">
                                {thread.partnerName}
                              </h4>
                              {thread.unreadCount > 0 && (
                                <span className="w-5 h-5 bg-coral rounded-full text-white text-xs flex items-center justify-center flex-shrink-0">
                                  {thread.unreadCount}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 font-inter mb-1">
                              {thread.partnerRole}
                            </p>
                            <p className="text-sm text-gray-600 font-inter truncate">
                              {thread.lastMessage}
                            </p>
                            <p className="text-xs text-gray-400 font-inter mt-1">
                              {thread.timestamp}
                            </p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-inter text-sm">
                          No conversations yet
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  {selectedThread ? (
                    <>
                      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral/20 to-coral/40 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-coral" />
                        </div>
                        <div>
                          <h3 className="font-inter font-semibold text-dark-gray">
                            {messageThreads.find(t => t.id === selectedThread)?.partnerName}
                          </h3>
                          <p className="text-xs text-gray-500 font-inter">
                            {messageThreads.find(t => t.id === selectedThread)?.partnerRole}
                          </p>
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {conversationMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-md ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                              <div
                                className={`rounded-2xl px-4 py-3 ${
                                  msg.sender === 'me'
                                    ? 'bg-coral text-white'
                                    : 'bg-gray-100 text-dark-gray'
                                }`}
                              >
                                <p className="font-inter text-sm">{msg.message}</p>
                              </div>
                              <p className={`text-xs text-gray-400 font-inter mt-1 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                                {msg.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 border-t border-gray-200">
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:border-coral"
                          />
                          <button
                            onClick={handleSendMessage}
                            className="px-6 py-3 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all flex items-center gap-2"
                          >
                            <Send className="w-5 h-5" />
                            Send
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-soft-white flex items-center justify-center">
                          <MessageCircle className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-poppins font-semibold text-dark-gray mb-2">
                          Select a conversation
                        </h3>
                        <p className="text-gray-500 font-inter">
                          Choose a conversation from the left to start messaging.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-12">
          <p className="text-center text-gray-500 font-inter text-sm">
            © 2025 ProcureLink. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
