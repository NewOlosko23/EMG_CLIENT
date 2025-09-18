-- Setup Storage Buckets for EMG Music Platform
-- NOTE: This script should be run by a user with proper permissions
-- If you get "must be owner of table objects" error, use the Supabase Dashboard instead

-- Create avatars bucket for user profile pictures
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Create tracks bucket for audio files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'tracks',
  'tracks',
  true,
  104857600, -- 100MB limit
  ARRAY['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/aac', 'audio/ogg']
) ON CONFLICT (id) DO NOTHING;

-- Create covers bucket for track/album cover art
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'covers',
  'covers',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Note: Storage policies need to be created through the Supabase Dashboard
-- Go to Authentication > Policies > storage.objects to create the following policies:

-- 1. Avatar images are publicly accessible (SELECT)
-- 2. Users can upload their own avatar (INSERT)
-- 3. Users can update their own avatar (UPDATE)
-- 4. Users can delete their own avatar (DELETE)
-- 5. Similar policies for tracks and covers buckets
