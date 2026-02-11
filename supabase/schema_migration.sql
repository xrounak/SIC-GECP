-- Migration: Update event_registrations table for team-based registrations
-- Created: 2026-02-10

-- Step 1: Add new columns for team leader and members
ALTER TABLE event_registrations
  ADD COLUMN team_leader_name TEXT,
  ADD COLUMN team_leader_branch TEXT,
  ADD COLUMN team_leader_year TEXT,
  ADD COLUMN team_leader_email TEXT,
  ADD COLUMN team_leader_mobile TEXT,
  
  -- Team Member 1
  ADD COLUMN member1_name TEXT,
  ADD COLUMN member1_branch TEXT,
  ADD COLUMN member1_year TEXT,
  
  -- Team Member 2
  ADD COLUMN member2_name TEXT,
  ADD COLUMN member2_branch TEXT,
  ADD COLUMN member2_year TEXT,
  
  -- Team Member 3
  ADD COLUMN member3_name TEXT,
  ADD COLUMN member3_branch TEXT,
  ADD COLUMN member3_year TEXT,
  
  -- Team Member 4
  ADD COLUMN member4_name TEXT,
  ADD COLUMN member4_branch TEXT,
  ADD COLUMN member4_year TEXT;

-- Step 2: Migrate existing data (if any)
-- Move old 'name' to 'team_leader_name' and 'email' to 'team_leader_email'
UPDATE event_registrations
SET 
  team_leader_name = name,
  team_leader_email = email,
  team_leader_branch = 'Not Specified',
  team_leader_year = 'Not Specified',
  team_leader_mobile = 'Not Specified'
WHERE name IS NOT NULL;

-- Step 3: Drop old columns
ALTER TABLE event_registrations
  DROP COLUMN IF EXISTS name,
  DROP COLUMN IF EXISTS email;

-- Step 4: Set NOT NULL constraints on team leader fields
ALTER TABLE event_registrations
  ALTER COLUMN team_leader_name SET NOT NULL,
  ALTER COLUMN team_leader_branch SET NOT NULL,
  ALTER COLUMN team_leader_year SET NOT NULL,
  ALTER COLUMN team_leader_email SET NOT NULL,
  ALTER COLUMN team_leader_mobile SET NOT NULL;

-- Verify the updated schema
-- SELECT * FROM event_registrations LIMIT 1;
