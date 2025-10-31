# ProcureLink Database Setup

This document explains the database schema for ProcureLink, a laptop procurement marketplace connecting buyers and sellers.

## Database Overview

The ProcureLink database uses **Supabase (PostgreSQL)** with Row Level Security (RLS) enabled for secure multi-tenant data access.

### Key Features:
- ✅ Secure authentication with Supabase Auth
- ✅ Row Level Security (RLS) on all tables
- ✅ Automatic timestamp management
- ✅ Optimized indexes for performance
- ✅ Referential integrity with foreign keys

## Setup Instructions

### 1. Execute the Schema

You have two options to set up the database:

#### Option A: Using Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the entire contents of `supabase_schema.sql`
4. Paste and execute in the SQL Editor

#### Option B: Using Supabase CLI
```bash
supabase db push
```

### 2. Verify Setup

After running the schema, verify all tables were created:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
```

Expected tables:
- profiles
- rfqs
- bids
- panels
- panel_members
- notifications
- message_threads
- messages

## Database Schema

### 1. **profiles**
Extended user information for buyers and sellers.

**Key Fields:**
- `id` - Links to auth.users
- `user_type` - 'buyer' or 'seller'
- `company_name` - Organization name
- `is_verified` - Account verification status

**RLS Policies:**
- Users can read and update their own profile
- All authenticated users can view other profiles (for vendor discovery)

---

### 2. **rfqs** (Request for Quotations)
RFQs created by buyers seeking laptop procurement.

**Key Fields:**
- `buyer_id` - References profiles
- `title`, `description` - RFQ details
- Product specs: `brand`, `model`, `processor`, `ram`, `storage`, etc.
- `quantity` - Number of units needed
- `budget_min`, `budget_max` - Budget range
- `closing_date` - Deadline for bid submission
- `status` - 'draft', 'active', 'closed', 'awarded', 'cancelled'

**RLS Policies:**
- Buyers can CRUD their own RFQs
- Sellers can view only active RFQs

---

### 3. **bids**
Bid submissions from sellers on RFQs.

**Key Fields:**
- `rfq_id` - References rfqs
- `seller_id` - References profiles
- `unit_price`, `total_amount` - Pricing
- `delivery_time`, `warranty_offered` - Offer details
- `status` - 'pending', 'accepted', 'rejected', 'withdrawn'

**Constraints:**
- Unique constraint prevents duplicate bids (same seller on same RFQ)

**RLS Policies:**
- Sellers can read/update their own bids
- Buyers can view and update status of bids on their RFQs

---

### 4. **panels**
Vendor panels created by buyers for preferred suppliers.

**Key Fields:**
- `buyer_id` - References profiles
- `name`, `description` - Panel details

**RLS Policies:**
- Buyers can fully manage their own panels

---

### 5. **panel_members**
Sellers invited to buyer panels.

**Key Fields:**
- `panel_id` - References panels
- `seller_id` - References profiles
- `status` - 'invited', 'active', 'removed'

**RLS Policies:**
- Buyers can manage members of their panels
- Sellers can view their own memberships

---

### 6. **notifications**
System notifications for users.

**Key Fields:**
- `user_id` - References profiles
- `type` - 'rfq', 'bid', 'award', 'system'
- `category` - 'bids', 'awards', 'system'
- `title`, `message` - Notification content
- `is_read` - Read status
- `link` - Optional navigation link

**RLS Policies:**
- Users can read and update their own notifications
- System can create notifications for any user

---

### 7. **message_threads**
Conversation threads between buyers and sellers.

**Key Fields:**
- `buyer_id`, `seller_id` - References profiles
- `rfq_id` - Optional reference to related RFQ
- `last_message_at` - Updated automatically

**Constraints:**
- Unique constraint prevents duplicate threads

**RLS Policies:**
- Users can view threads they're part of

---

### 8. **messages**
Individual messages within threads.

**Key Fields:**
- `thread_id` - References message_threads
- `sender_id` - References profiles
- `message` - Message content
- `is_read` - Read status

**RLS Policies:**
- Users can read messages in their threads
- Users can send messages in their threads

---

## Security (Row Level Security)

### Key Principles:
1. **Default Deny** - All tables have RLS enabled; no access by default
2. **Authentication Required** - All policies require authenticated users
3. **Ownership Checks** - Users can only modify their own data
4. **Contextual Access** - Buyers see bids on their RFQs; sellers see active RFQs

### Example RLS Pattern:
```sql
-- Users can only read their own data
CREATE POLICY "Users can read own data"
  ON table_name FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Buyers can view bids on their RFQs
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
```

---

## Indexes

Optimized indexes are created for:
- Foreign key lookups
- Status filtering
- Date sorting (most recent first)
- Email lookups

---

## Automatic Features

### 1. **Updated At Timestamps**
Triggers automatically update `updated_at` on:
- profiles
- rfqs
- bids
- panels

### 2. **Message Thread Updates**
When a new message is sent, `last_message_at` on the thread is automatically updated.

---

## TypeScript Types

The `src/lib/supabase.ts` file provides TypeScript interfaces for all database tables:

```typescript
import { supabase, type Profile, type RFQ, type Bid } from '@/lib/supabase';

// Example: Fetch user profile
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single();
```

---

## Sample Queries

### Create a new RFQ
```typescript
const { data, error } = await supabase
  .from('rfqs')
  .insert({
    buyer_id: userId,
    title: 'Dell Latitude 5540 - 50 Units',
    description: 'Enterprise laptops for office deployment',
    product_category: 'Laptop',
    brand: 'Dell',
    model: 'Latitude 5540',
    quantity: 50,
    closing_date: '2025-04-30',
    status: 'active'
  });
```

### Fetch all active RFQs (Seller view)
```typescript
const { data: rfqs } = await supabase
  .from('rfqs')
  .select('*, profiles(company_name)')
  .eq('status', 'active')
  .order('created_at', { ascending: false });
```

### Submit a bid
```typescript
const { data, error } = await supabase
  .from('bids')
  .insert({
    rfq_id: rfqId,
    seller_id: userId,
    unit_price: 14250,
    total_amount: 712500,
    delivery_time: '2-3 weeks',
    warranty_offered: '3 years',
    status: 'pending'
  });
```

### Get all bids for a buyer's RFQs
```typescript
const { data: bids } = await supabase
  .from('bids')
  .select(`
    *,
    rfqs(title, quantity),
    profiles(company_name)
  `)
  .in('rfq_id', userRfqIds)
  .order('created_at', { ascending: false });
```

---

## Environment Variables

Required in `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

These are already configured in your project.

---

## Next Steps

1. ✅ Execute `supabase_schema.sql` in your Supabase dashboard
2. ✅ Verify all tables and policies are created
3. ✅ Test RLS policies with different user contexts
4. ✅ Integrate database calls into your React components
5. ✅ Add sample data for testing

---

## Support

For database issues:
1. Check RLS policies are enabled
2. Verify user authentication
3. Review Supabase logs in dashboard
4. Ensure foreign key relationships are valid

---

**Database Version:** 1.0
**Last Updated:** March 2025
**PostgreSQL Version:** 15+
