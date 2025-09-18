-- Create storage policies for EMG Music Platform
-- Run this in Supabase SQL Editor

-- Create storage policies for avatars bucket
CREATE POLICY "Public read access for avatars" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload avatars" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update avatars" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete avatars" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create storage policies for tracks bucket
CREATE POLICY "Public read access for tracks" ON storage.objects
FOR SELECT USING (bucket_id = 'tracks');

CREATE POLICY "Users can upload tracks" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'tracks' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update tracks" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'tracks' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete tracks" ON storage.objects
FOR DELETE USING (
  bucket_id = 'tracks' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create storage policies for covers bucket
CREATE POLICY "Public read access for covers" ON storage.objects
FOR SELECT USING (bucket_id = 'covers');

CREATE POLICY "Users can upload covers" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'covers' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update covers" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'covers' AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete covers" ON storage.objects
FOR DELETE USING (
  bucket_id = 'covers' AND auth.uid()::text = (storage.foldername(name))[1]
);
