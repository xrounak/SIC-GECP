-- Add team_name column to event_registrations table
ALTER TABLE event_registrations 
ADD COLUMN IF NOT EXISTS team_name TEXT;
