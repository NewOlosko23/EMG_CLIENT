# Supabase Storage Setup Guide

Since you're getting the "must be owner of table objects" error, here's how to set up storage buckets through the Supabase Dashboard instead.

## Method 1: Using Supabase Dashboard (Recommended)

### Step 1: Create Storage Buckets

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"**
4. Create the following buckets:

#### Bucket 1: `avatars`
- **Name**: `avatars`
- **Public**: ✅ Yes
- **File size limit**: `5 MB`
- **Allowed MIME types**: `image/jpeg, image/png, image/gif, image/webp`

#### Bucket 2: `tracks`
- **Name**: `tracks`
- **Public**: ✅ Yes
- **File size limit**: `100 MB`
- **Allowed MIME types**: `audio/mpeg, audio/wav, audio/flac, audio/aac, audio/ogg`

#### Bucket 3: `covers`
- **Name**: `covers`
- **Public**: ✅ Yes
- **File size limit**: `10 MB`
- **Allowed MIME types**: `image/jpeg, image/png, image/gif, image/webp`

### Step 2: Set Up Storage Policies

1. Go to **Authentication** → **Policies**
2. Find the `storage.objects` table
3. Create the following policies:

#### Policy 1: Public Read Access for Avatars
- **Policy name**: `Avatar images are publicly accessible`
- **Operation**: `SELECT`
- **Target roles**: `public`
- **Policy definition**:
```sql
bucket_id = 'avatars'
```

#### Policy 2: User Upload for Avatars
- **Policy name**: `Users can upload their own avatar`
- **Operation**: `INSERT`
- **Target roles**: `authenticated`
- **Policy definition**:
```sql
bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
```

#### Policy 3: User Update for Avatars
- **Policy name**: `Users can update their own avatar`
- **Operation**: `UPDATE`
- **Target roles**: `authenticated`
- **Policy definition**:
```sql
bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
```

#### Policy 4: User Delete for Avatars
- **Policy name**: `Users can delete their own avatar`
- **Operation**: `DELETE`
- **Target roles**: `authenticated`
- **Policy definition**:
```sql
bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
```

#### Repeat for Tracks Bucket:
- **Public Read**: `bucket_id = 'tracks'`
- **User Upload**: `bucket_id = 'tracks' AND auth.uid()::text = (storage.foldername(name))[1]`
- **User Update**: `bucket_id = 'tracks' AND auth.uid()::text = (storage.foldername(name))[1]`
- **User Delete**: `bucket_id = 'tracks' AND auth.uid()::text = (storage.foldername(name))[1]`

#### Repeat for Covers Bucket:
- **Public Read**: `bucket_id = 'covers'`
- **User Upload**: `bucket_id = 'covers' AND auth.uid()::text = (storage.foldername(name))[1]`
- **User Update**: `bucket_id = 'covers' AND auth.uid()::text = (storage.foldername(name))[1]`
- **User Delete**: `bucket_id = 'covers' AND auth.uid()::text = (storage.foldername(name))[1]`

## Method 2: Using JavaScript (Alternative)

If you prefer to use the JavaScript approach, the `storageSetup.js` file I created will automatically handle bucket creation when a user tries to upload an avatar. This method will work without requiring special permissions.

## Method 3: Using Supabase CLI (Advanced)

If you have the Supabase CLI installed:

```bash
# Create buckets
supabase storage create avatars --public
supabase storage create tracks --public
supabase storage create covers --public

# Set policies (you'll need to create policy files)
supabase storage policy create avatars-public-read
supabase storage policy create avatars-user-upload
# ... etc
```

## Testing the Setup

After setting up the buckets and policies:

1. Go to your app's Artist Profile page
2. Try uploading an avatar image
3. Check the browser console for any errors
4. Verify the image appears in your Supabase Storage dashboard

## Troubleshooting

### If you still get permission errors:
1. Make sure you're logged in as the project owner
2. Check that RLS (Row Level Security) is enabled on `storage.objects`
3. Verify the policies are correctly configured

### If uploads still fail:
1. Check the browser network tab for specific error messages
2. Verify the file size is under the limit
3. Ensure the file type is allowed
4. Check that the user is authenticated

## Quick Fix for Immediate Testing

If you want to test immediately without setting up policies, you can temporarily make the buckets completely public by creating a policy like this:

```sql
-- TEMPORARY: Allow all operations (use only for testing)
CREATE POLICY "Allow all operations" ON storage.objects
FOR ALL USING (true);
```

**⚠️ Warning**: This policy allows anyone to upload/delete files. Only use for testing and remove it before going to production.

## Next Steps

Once the storage is set up:
1. Test avatar uploads
2. Test with different file types and sizes
3. Verify the uploaded files appear in the correct buckets
4. Test the public URL generation
5. Remove any temporary policies if you used them
