-- Add Markdown content fields to events, members, and gallery tables

-- Add field for event details
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS content_md TEXT;

-- Add field for member bio
ALTER TABLE members 
ADD COLUMN IF NOT EXISTS bio_md TEXT;

-- Add field for gallery image details
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS details_md TEXT;

-- Update RLS policies to include new columns (usually handled by SELECT *)
-- No changes needed if the existing policy uses 'true' for select.
