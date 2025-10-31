export interface MockBid {
  id: string;
  rfq_title: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected';
  submitted_at: string;
}

export interface MockNotification {
  id: string;
  title: string;
  message: string;
  type: 'bid' | 'award' | 'system';
  is_read: boolean;
  created_at: string;
}

const MOCK_BIDS_KEY = 'procurelink_mock_bids';
const MOCK_NOTIFICATIONS_KEY = 'procurelink_mock_notifications';

const DEFAULT_BIDS: MockBid[] = [
  {
    id: '1',
    rfq_title: 'HP EliteBook 840 G10 – 25 Units',
    amount: 16500,
    status: 'pending',
    submitted_at: '2025-10-22',
  },
  {
    id: '2',
    rfq_title: 'Dell Latitude 5540 – 15 Units',
    amount: 17200,
    status: 'accepted',
    submitted_at: '2025-10-21',
  },
  {
    id: '3',
    rfq_title: 'Lenovo ThinkPad T14 – 40 Units',
    amount: 15800,
    status: 'rejected',
    submitted_at: '2025-10-20',
  },
  {
    id: '4',
    rfq_title: 'MacBook Pro 14-inch M3 – 20 Units',
    amount: 24500,
    status: 'pending',
    submitted_at: '2025-10-19',
  },
  {
    id: '5',
    rfq_title: 'ASUS ROG Zephyrus G14 – 30 Units',
    amount: 19800,
    status: 'accepted',
    submitted_at: '2025-10-18',
  },
];

const DEFAULT_NOTIFICATIONS: MockNotification[] = [
  {
    id: '1',
    title: 'Bid Accepted',
    message: 'Your bid for "Dell Latitude 5540 – 15 Units" has been accepted!',
    type: 'award',
    is_read: false,
    created_at: '2025-10-22T10:30:00Z',
  },
  {
    id: '2',
    title: 'New RFQ Available',
    message: 'A new RFQ matching your profile has been posted.',
    type: 'system',
    is_read: false,
    created_at: '2025-10-22T09:15:00Z',
  },
  {
    id: '3',
    title: 'Bid Under Review',
    message: 'Your bid for "HP EliteBook 840 G10 – 25 Units" is being reviewed.',
    type: 'bid',
    is_read: true,
    created_at: '2025-10-21T14:20:00Z',
  },
  {
    id: '4',
    title: 'Bid Rejected',
    message: 'Unfortunately, your bid for "Lenovo ThinkPad T14 – 40 Units" was not selected.',
    type: 'bid',
    is_read: true,
    created_at: '2025-10-20T16:45:00Z',
  },
];

export function initializeMockData() {
  if (!localStorage.getItem(MOCK_BIDS_KEY)) {
    localStorage.setItem(MOCK_BIDS_KEY, JSON.stringify(DEFAULT_BIDS));
  }

  if (!localStorage.getItem(MOCK_NOTIFICATIONS_KEY)) {
    localStorage.setItem(MOCK_NOTIFICATIONS_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS));
  }
}

export function getMockBids(): MockBid[] {
  const bids = localStorage.getItem(MOCK_BIDS_KEY);
  if (!bids) {
    initializeMockData();
    return DEFAULT_BIDS;
  }
  return JSON.parse(bids);
}

export function getMockNotifications(): MockNotification[] {
  const notifications = localStorage.getItem(MOCK_NOTIFICATIONS_KEY);
  if (!notifications) {
    initializeMockData();
    return DEFAULT_NOTIFICATIONS;
  }
  return JSON.parse(notifications);
}

export function addMockBid(bid: Omit<MockBid, 'id'>) {
  const bids = getMockBids();
  const newBid: MockBid = {
    ...bid,
    id: String(Date.now()),
  };
  bids.unshift(newBid);
  localStorage.setItem(MOCK_BIDS_KEY, JSON.stringify(bids));
  return newBid;
}

export function markNotificationAsRead(notificationId: string) {
  const notifications = getMockNotifications();
  const updated = notifications.map(n =>
    n.id === notificationId ? { ...n, is_read: true } : n
  );
  localStorage.setItem(MOCK_NOTIFICATIONS_KEY, JSON.stringify(updated));
}

export function getUnreadNotificationCount(): number {
  const notifications = getMockNotifications();
  return notifications.filter(n => !n.is_read).length;
}
