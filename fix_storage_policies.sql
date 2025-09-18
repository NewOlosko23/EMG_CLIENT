-- Fix storage policies for EMG Music Platform
-- Run this to fix the row-level security policy issues

-- Drop existing policies first
DROP POLICY IF EXISTS "Public read access for avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete avatars" ON storage.objects;

-- Create simpler, working policies for avatars bucket
CREATE POLICY "Avatar files are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own avatars" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can delete their own avatars" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' AND auth.role() = 'authenticated'
);

-- Create similar policies for tracks bucket
DROP POLICY IF EXISTS "Public read access for tracks" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload tracks" ON storage.objects;
DROP POLICY IF EXISTS "Users can update tracks" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete tracks" ON storage.objects;

CREATE POLICY "Track files are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'tracks');

CREATE POLICY "Authenticated users can upload tracks" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'tracks' AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own tracks" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'tracks' AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can delete their own tracks" ON storage.objects
FOR DELETE USING (
  bucket_id = 'tracks' AND auth.role() = 'authenticated'
);

-- Create similar policies for covers bucket
DROP POLICY IF EXISTS "Public read access for covers" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload covers" ON storage.objects;
DROP POLICY IF EXISTS "Users can update covers" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete covers" ON storage.objects;

CREATE POLICY "Cover files are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'covers');

CREATE POLICY "Authenticated users can upload covers" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'covers' AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own covers" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'covers' AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can delete their own covers" ON storage.objects
FOR DELETE USING (
  bucket_id = 'covers' AND auth.role() = 'authenticated'
);
