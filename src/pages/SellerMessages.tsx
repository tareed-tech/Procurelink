import { useState, useEffect } from 'react';
import SellerSidebar from '../components/SellerSidebar';
import { MessageSquare, Send, Search, Circle } from 'lucide-react';
import { enforceSellerRole, getCurrentUser } from '../utils/auth';
import { showToast } from '../utils/toast';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  buyerName: string;
  buyerCompany: string;
  rfqTitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export default function SellerMessages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    enforceSellerRole();
    loadConversations();
  }, []);

  const loadConversations = () => {
    const stored = localStorage.getItem('seller_messages');
    if (stored) {
      const data = JSON.parse(stored);
      setConversations(data);
      if (data.length > 0) {
        setSelectedConversation(data[0]);
      }
    } else {
      const mockConversations: Conversation[] = [
        {
          id: '1',
          buyerName: 'John Anderson',
          buyerCompany: 'TechNova Solutions',
          rfqTitle: 'HP EliteBook 840 G10',
          lastMessage: 'Can you provide more details on warranty coverage?',
          lastMessageTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          unreadCount: 2,
          messages: [
            {
              id: 'm1',
              senderId: 'buyer1',
              senderName: 'John Anderson',
              content: 'Hi, I received your bid for the HP EliteBook RFQ.',
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            },
            {
              id: 'm2',
              senderId: 'seller',
              senderName: 'You',
              content: 'Thank you! We are pleased to offer competitive pricing and fast delivery.',
              timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
            },
            {
              id: 'm3',
              senderId: 'buyer1',
              senderName: 'John Anderson',
              content: 'Can you provide more details on warranty coverage?',
              timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            },
          ],
        },
        {
          id: '2',
          buyerName: 'Sarah Mitchell',
          buyerCompany: 'Global Enterprises',
          rfqTitle: 'Dell Latitude 5540',
          lastMessage: 'What are your delivery timelines?',
          lastMessageTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          unreadCount: 0,
          messages: [
            {
              id: 'm4',
              senderId: 'buyer2',
              senderName: 'Sarah Mitchell',
              content: 'Hello, interested in your Dell Latitude bid.',
              timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            },
            {
              id: 'm5',
              senderId: 'seller',
              senderName: 'You',
              content: 'Hello Sarah! We can deliver within 7-10 business days.',
              timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            },
            {
              id: 'm6',
              senderId: 'buyer2',
              senderName: 'Sarah Mitchell',
              content: 'What are your delivery timelines?',
              timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
            },
          ],
        },
        {
          id: '3',
          buyerName: 'Michael Chen',
          buyerCompany: 'Innovate Corp',
          rfqTitle: 'Lenovo ThinkPad X1 Carbon',
          lastMessage: 'Thank you for the quote',
          lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          unreadCount: 0,
          messages: [
            {
              id: 'm7',
              senderId: 'buyer3',
              senderName: 'Michael Chen',
              content: 'We reviewed your bid for the Lenovo RFQ.',
              timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
            },
            {
              id: 'm8',
              senderId: 'seller',
              senderName: 'You',
              content: 'Great! Let me know if you need any additional information.',
              timestamp: new Date(Date.now() - 24.5 * 60 * 60 * 1000).toISOString(),
            },
            {
              id: 'm9',
              senderId: 'buyer3',
              senderName: 'Michael Chen',
              content: 'Thank you for the quote',
              timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            },
          ],
        },
      ];
      setConversations(mockConversations);
      setSelectedConversation(mockConversations[0]);
      localStorage.setItem('seller_messages', JSON.stringify(mockConversations));
    }
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const user = getCurrentUser();
    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: 'seller',
      senderName: user?.name || 'You',
      content: messageInput,
      timestamp: new Date().toISOString(),
    };

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: messageInput,
          lastMessageTime: newMessage.timestamp,
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    const updatedSelected = updatedConversations.find(c => c.id === selectedConversation.id);
    if (updatedSelected) {
      setSelectedConversation(updatedSelected);
    }
    localStorage.setItem('seller_messages', JSON.stringify(updatedConversations));
    setMessageInput('');
    showToast('Message sent', 'success');
  };

  const handleSelectConversation = (conversation: Conversation) => {
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversation.id) {
        return { ...conv, unreadCount: 0 };
      }
      return conv;
    });
    setConversations(updatedConversations);
    setSelectedConversation(conversation);
    localStorage.setItem('seller_messages', JSON.stringify(updatedConversations));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredConversations = conversations.filter(conv =>
    conv.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.buyerCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.rfqTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="min-h-screen bg-soft-white flex">
      <SellerSidebar activePage="messages" />

      <div className="flex-1 ml-64">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-poppins font-semibold text-dark-gray flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-coral" />
                Messages
              </h1>
              <p className="text-gray-500 font-inter mt-1">
                {totalUnread > 0 ? `${totalUnread} unread message${totalUnread !== 1 ? 's' : ''}` : 'Stay connected with buyers'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-120px)]">
          <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleSelectConversation(conversation)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-all ${selectedConversation?.id === conversation.id ? 'bg-coral/5 border-l-4 border-l-coral' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-poppins font-semibold text-dark-gray">
                          {conversation.buyerName}
                        </h3>
                        {conversation.unreadCount > 0 && (
                          <Circle className="w-2 h-2 text-coral fill-coral" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 font-inter">
                        {conversation.buyerCompany}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 font-inter">
                      {formatTimestamp(conversation.lastMessageTime)}
                    </span>
                  </div>
                  <p className="text-sm text-coral font-inter mb-1">
                    RFQ: {conversation.rfqTitle}
                  </p>
                  <p className="text-sm text-gray-600 font-inter truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-white">
            {selectedConversation ? (
              <>
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-poppins font-semibold text-dark-gray">
                    {selectedConversation.buyerName}
                  </h2>
                  <p className="text-sm text-gray-500 font-inter">
                    {selectedConversation.buyerCompany} • {selectedConversation.rfqTitle}
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 'seller' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-md px-4 py-3 rounded-2xl ${message.senderId === 'seller' ? 'bg-coral text-white' : 'bg-gray-100 text-dark-gray'}`}
                      >
                        <p className="font-inter">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.senderId === 'seller' ? 'text-white/70' : 'text-gray-500'}`}>
                          {formatMessageTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-coral/50 focus:border-coral transition-all"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="px-6 py-3 bg-coral text-white rounded-xl font-poppins font-medium hover:bg-coral/90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-inter text-lg">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
