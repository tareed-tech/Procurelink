export interface User {
  name: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller';
  companyName?: string;
  sellerType?: string;
  businessSize?: string;
  createdAt: string;
}

export function getCurrentUser(): User | null {
  const isAuthenticated = localStorage.getItem('procurelink_auth');
  const userData = localStorage.getItem('procurelink_user');

  if (isAuthenticated === 'true' && userData) {
    return JSON.parse(userData);
  }

  return null;
}

export function isAuthenticated(): boolean {
  return localStorage.getItem('procurelink_auth') === 'true';
}

export function logout() {
  localStorage.removeItem('procurelink_auth');
  localStorage.removeItem('procurelink_user');
  window.location.href = '/login';
}

export function enforceSellerRole() {
  const user = getCurrentUser();

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  if (user.role !== 'seller') {
    window.location.href = '/buyer-dashboard';
    return null;
  }

  return user;
}

export function enforceBuyerRole() {
  const user = getCurrentUser();

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  if (user.role !== 'buyer') {
    window.location.href = '/seller-dashboard';
    return null;
  }

  return user;
}
