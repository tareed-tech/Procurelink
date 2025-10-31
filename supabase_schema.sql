-- =====================================================
-- ProcureLink Database Schema
-- =====================================================
-- This schema supports a laptop procurement marketplace
-- connecting buyers and sellers through RFQs and bids
-- =====================================================

-- =====================================================
-- 1. PROFILES TABLE
-- =====================================================
-- Stores extended user information for both buyers and sellers
-- Links to Supabase auth.users table

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type text NOT NULL CHECK (user_type IN ('buyer', 'seller')),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company_name text NOT NULL,
  business_type text CHECK (business_type IN ('OEM', 'Reseller', 'Corporate Buyer', 'Government')),
  business_size text CHECK (business_size IN ('Micro', 'Small', 'Medium', 'Large')),
  country text NOT NULL,
  city text,
  website text,
  avatar_url text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Authenticated users can view other profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- 2. RFQS (Request for Quotations) TABLE
-- =====================================================
-- Stores RFQ details created by buyers

CREATE TABLE IF NOT EXISTS rfqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,

  -- Product specifications
  product_category text NOT NULL,
  brand text,
  model text,
  processor text,
  ram text,
  storage text,
  display_size text,
  operating_system text,

  -- Procurement details
  quantity integer NOT NULL CHECK (quantity > 0),
  budget_min decimal(12, 2),
  budget_max decimal(12, 2),

  -- Timeline
  delivery_timeline text,
  closing_date timestamptz NOT NULL,

  -- Additional requirements
  warranty_requirement text,
  additional_requirements text,

  -- Status
  status text DEFAULT 'active' CHECK (status IN ('draft', 'active', 'closed', 'awarded', 'cancelled')),

  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE rfqs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Buyers can read own RFQs"
  ON rfqs FOR SELECT
  TO authenticated
  USING (buyer_id = auth.uid());

CREATE POLICY "Buyers can create RFQs"
  ON rfqs FOR INSERT
  TO authenticated
  WITH CHECK (buyer_id = auth.uid());

CREATE POLICY "Buyers can update own RFQs"
  ON rfqs FOR UPDATE
  TO authenticated
  USING (buyer_id = auth.uid())
  WITH CHECK (buyer_id = auth.uid());

CREATE POLICY "Sellers can view active RFQs"
  ON rfqs FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Buyers can delete own RFQs"
  ON rfqs FOR DELETE
  TO authenticated
  USING (buyer_id = auth.uid());

-- =====================================================
-- 3. BIDS TABLE
-- =====================================================
-- Stores bid submissions from sellers on RFQs

CREATE TABLE IF NOT EXISTS bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rfq_id uuid NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
  seller_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Pricing
  unit_price decimal(12, 2) NOT NULL CHECK (unit_price > 0),
  total_amount decimal(12, 2) NOT NULL CHECK (total_amount > 0),

  -- Offer details
  delivery_time text NOT NULL,
  warranty_offered text NOT NULL,
  product_condition text DEFAULT 'new' CHECK (product_condition IN ('new', 'refurbished')),

  -- Additional information
  notes text,
  terms_and_conditions text,

  -- Status
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),

  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  -- Prevent duplicate bids from same seller on same RFQ
  UNIQUE(rfq_id, seller_id)
);

-- Enable RLS
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Sellers can read own bids"
  ON bids FOR SELECT
  TO authenticated
  USING (seller_id = auth.uid());

CREATE POLICY "Sellers can create bids"
  ON bids FOR INSERT
  TO authenticated
  WITH CHECK (seller_id = auth.uid());

CREATE POLICY "Sellers can update own bids"
  ON bids FOR UPDATE
  TO authenticated
  USING (seller_id = auth.uid())
  WITH CHECK (seller_id = auth.uid());

CREATE POLICY "Buyers can view bids on own RFQs"
  ON bids FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM rfqs
      WHERE rfqs.id = bids.rfq_id
      AND rfqs.buyer_id = auth.uid()
    )
  );

CREATE POLICY "Buyers can update bid status on own RFQs"
  ON bids FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM rfqs
      WHERE rfqs.id = bids.rfq_id
      AND rfqs.buyer_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM rfqs
      WHERE rfqs.id = bids.rfq_id
      AND rfqs.buyer_id = auth.uid()
    )
  );

-- =====================================================
-- 4. PANELS TABLE
-- =====================================================
-- Stores vendor panels created by buyers

CREATE TABLE IF NOT EXISTS panels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE panels ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Buyers can manage own panels"
  ON panels FOR ALL
  TO authenticated
  USING (buyer_id = auth.uid())
  WITH CHECK (buyer_id = auth.uid());

-- =====================================================
-- 5. PANEL_MEMBERS TABLE
-- =====================================================
-- Stores sellers invited to buyer panels

CREATE TABLE IF NOT EXISTS panel_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  panel_id uuid NOT NULL REFERENCES panels(id) ON DELETE CASCADE,
  seller_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status text DEFAULT 'invited' CHECK (status IN ('invited', 'active', 'removed')),
  invited_at timestamptz DEFAULT now(),
  joined_at timestamptz,

  -- Prevent duplicate memberships
  UNIQUE(panel_id, seller_id)
);

-- Enable RLS
ALTER TABLE panel_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Buyers can manage panel members"
  ON panel_members FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM panels
      WHERE panels.id = panel_members.panel_id
      AND panels.buyer_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM panels
      WHERE panels.id = panel_members.panel_id
      AND panels.buyer_id = auth.uid()
    )
  );

CREATE POLICY "Sellers can view own panel memberships"
  ON panel_members FOR SELECT
  TO authenticated
  USING (seller_id = auth.uid());

-- =====================================================
-- 6. NOTIFICATIONS TABLE
-- =====================================================
-- Stores system notifications for users

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('rfq', 'bid', 'award', 'system')),
  category text NOT NULL CHECK (category IN ('bids', 'awards', 'system')),
  title text NOT NULL,
  message text NOT NULL,
  link text,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- =====================================================
-- 7. MESSAGE_THREADS TABLE
-- =====================================================
-- Stores conversation threads between buyers and sellers

CREATE TABLE IF NOT EXISTS message_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  seller_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rfq_id uuid REFERENCES rfqs(id) ON DELETE SET NULL,
  last_message_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),

  -- Prevent duplicate threads between same parties
  UNIQUE(buyer_id, seller_id, rfq_id)
);

-- Enable RLS
ALTER TABLE message_threads ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own threads"
  ON message_threads FOR SELECT
  TO authenticated
  USING (buyer_id = auth.uid() OR seller_id = auth.uid());

CREATE POLICY "Users can create threads"
  ON message_threads FOR INSERT
  TO authenticated
  WITH CHECK (buyer_id = auth.uid() OR seller_id = auth.uid());

-- =====================================================
-- 8. MESSAGES TABLE
-- =====================================================
-- Stores individual messages within threads

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL REFERENCES message_threads(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read messages in own threads"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM message_threads
      WHERE message_threads.id = messages.thread_id
      AND (message_threads.buyer_id = auth.uid() OR message_threads.seller_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in own threads"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM message_threads
      WHERE message_threads.id = messages.thread_id
      AND (message_threads.buyer_id = auth.uid() OR message_threads.seller_id = auth.uid())
    )
  );

CREATE POLICY "Users can update own messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (sender_id = auth.uid())
  WITH CHECK (sender_id = auth.uid());

-- =====================================================
-- 9. INDEXES FOR PERFORMANCE
-- =====================================================

-- Profile indexes
CREATE INDEX IF NOT EXISTS idx_profiles_user_type ON profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- RFQ indexes
CREATE INDEX IF NOT EXISTS idx_rfqs_buyer_id ON rfqs(buyer_id);
CREATE INDEX IF NOT EXISTS idx_rfqs_status ON rfqs(status);
CREATE INDEX IF NOT EXISTS idx_rfqs_closing_date ON rfqs(closing_date);
CREATE INDEX IF NOT EXISTS idx_rfqs_created_at ON rfqs(created_at DESC);

-- Bid indexes
CREATE INDEX IF NOT EXISTS idx_bids_rfq_id ON bids(rfq_id);
CREATE INDEX IF NOT EXISTS idx_bids_seller_id ON bids(seller_id);
CREATE INDEX IF NOT EXISTS idx_bids_status ON bids(status);
CREATE INDEX IF NOT EXISTS idx_bids_created_at ON bids(created_at DESC);

-- Panel indexes
CREATE INDEX IF NOT EXISTS idx_panels_buyer_id ON panels(buyer_id);
CREATE INDEX IF NOT EXISTS idx_panel_members_panel_id ON panel_members(panel_id);
CREATE INDEX IF NOT EXISTS idx_panel_members_seller_id ON panel_members(seller_id);

-- Notification indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- Message indexes
CREATE INDEX IF NOT EXISTS idx_message_threads_buyer_id ON message_threads(buyer_id);
CREATE INDEX IF NOT EXISTS idx_message_threads_seller_id ON message_threads(seller_id);
CREATE INDEX IF NOT EXISTS idx_messages_thread_id ON messages(thread_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- =====================================================
-- 10. FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rfqs_updated_at
  BEFORE UPDATE ON rfqs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bids_updated_at
  BEFORE UPDATE ON bids
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_panels_updated_at
  BEFORE UPDATE ON panels
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to update message thread's last_message_at
CREATE OR REPLACE FUNCTION update_thread_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE message_threads
  SET last_message_at = NEW.created_at
  WHERE id = NEW.thread_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_thread_on_message
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_thread_last_message();
