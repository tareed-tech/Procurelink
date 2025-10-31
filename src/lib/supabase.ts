import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  user_type: 'buyer' | 'seller';
  full_name: string;
  email: string;
  phone?: string;
  company_name: string;
  business_type?: 'OEM' | 'Reseller' | 'Corporate Buyer' | 'Government';
  business_size?: 'Micro' | 'Small' | 'Medium' | 'Large';
  country: string;
  city?: string;
  website?: string;
  avatar_url?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface RFQ {
  id: string;
  buyer_id: string;
  title: string;
  description: string;
  product_category: string;
  brand?: string;
  model?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  display_size?: string;
  operating_system?: string;
  quantity: number;
  budget_min?: number;
  budget_max?: number;
  delivery_timeline?: string;
  closing_date: string;
  warranty_requirement?: string;
  additional_requirements?: string;
  status: 'draft' | 'active' | 'closed' | 'awarded' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Bid {
  id: string;
  rfq_id: string;
  seller_id: string;
  unit_price: number;
  total_amount: number;
  delivery_time: string;
  warranty_offered: string;
  product_condition: 'new' | 'refurbished';
  notes?: string;
  terms_and_conditions?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  created_at: string;
  updated_at: string;
}

export interface Panel {
  id: string;
  buyer_id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface PanelMember {
  id: string;
  panel_id: string;
  seller_id: string;
  status: 'invited' | 'active' | 'removed';
  invited_at: string;
  joined_at?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'rfq' | 'bid' | 'award' | 'system';
  category: 'bids' | 'awards' | 'system';
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  created_at: string;
}

export interface MessageThread {
  id: string;
  buyer_id: string;
  seller_id: string;
  rfq_id?: string;
  last_message_at: string;
  created_at: string;
}

export interface Message {
  id: string;
  thread_id: string;
  sender_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
