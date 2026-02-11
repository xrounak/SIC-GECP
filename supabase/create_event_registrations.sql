-- Create event_registrations table from scratch with team support
-- Run this in Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the event_registrations table with team structure
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  
  -- Team Leader Information (Required)
  team_leader_name TEXT NOT NULL,
  team_leader_branch TEXT NOT NULL,
  team_leader_year TEXT NOT NULL,
  team_leader_email TEXT NOT NULL,
  team_leader_mobile TEXT NOT NULL,
  
  -- Team Member 1 (Optional)
  member1_name TEXT,
  member1_branch TEXT,
  member1_year TEXT,
  
  -- Team Member 2 (Optional)
  member2_name TEXT,
  member2_branch TEXT,
  member2_year TEXT,
  
  -- Team Member 3 (Optional)
  member3_name TEXT,
  member3_branch TEXT,
  member3_year TEXT,
  
  -- Team Member 4 (Optional)
  member4_name TEXT,
  member4_branch TEXT,
  member4_year TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow anyone to register (public insert)
CREATE POLICY "Enable insert access for all users" 
  ON event_registrations 
  FOR INSERT 
  WITH CHECK (true);

-- Only authenticated users (admins) can view registrations
CREATE POLICY "Enable read access for authenticated users only" 
  ON event_registrations 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Only authenticated users can delete registrations
CREATE POLICY "Enable delete for authenticated users only" 
  ON event_registrations 
  FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Verify table creation
SELECT * FROM event_registrations LIMIT 1;
