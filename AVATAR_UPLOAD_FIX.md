# Avatar Upload Fix

This document explains the fixes applied to resolve the avatar upload issues in the EMG Music Platform.

## Issues Fixed

### 1. Controlled/Uncontrolled Input Error
**Problem**: React was throwing errors about controlled/uncontrolled inputs because form field values were changing from `undefined` to defined values.

**Solution**: Updated the `loadProfile` function in `ArtistProfile.jsx` to ensure all form fields have proper default values using the `||` operator to provide fallbacks for `null` or `undefined` values.

### 2. Storage Bucket Not Found Error
**Problem**: The avatar upload was failing because the `avatars` storage bucket didn't exist in Supabase.

**Solution**: 
- Created `setup_storage_buckets.sql` with SQL commands to create the required storage buckets
- Created `src/lib/storageSetup.js` with JavaScript utilities to programmatically set up storage buckets
- Updated the upload function to automatically attempt bucket creation if it doesn't exist

## Files Modified

1. **`src/pages/ArtistProfile.jsx`**
   - Fixed controlled input issue by ensuring all form fields have default values
   - Updated upload function to use `fileHelpers` and handle bucket creation
   - Added automatic storage setup as fallback

2. **`src/lib/storageSetup.js`** (New)
   - Utility functions for managing Supabase storage buckets
   - Functions to create, check, and manage storage buckets
   - Automatic setup of all required buckets

3. **`setup_storage_buckets.sql`** (New)
   - SQL script to create storage buckets and policies
   - Can be run directly in Supabase SQL editor

4. **`test_storage_setup.js`** (New)
   - Test script to verify storage setup works correctly

## How to Apply the Fix

### Option 1: Run SQL Script (Recommended)
1. Open your Supabase dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of `setup_storage_buckets.sql`
4. Run the script

### Option 2: Use JavaScript Setup (Automatic)
The application will now automatically attempt to create the storage buckets if they don't exist when a user tries to upload an avatar.

### Option 3: Manual Setup via Supabase Dashboard
1. Go to Storage in your Supabase dashboard
2. Create the following buckets:
   - `avatars` (public, 5MB limit, image files)
   - `tracks` (public, 100MB limit, audio files)
   - `covers` (public, 10MB limit, image files)

## Storage Buckets Created

1. **avatars** - For user profile pictures
   - Public access
   - 5MB file size limit
   - Allowed types: JPEG, PNG, GIF, WebP

2. **tracks** - For audio files
   - Public access
   - 100MB file size limit
   - Allowed types: MP3, WAV, FLAC, AAC, OGG

3. **covers** - For track/album cover art
   - Public access
   - 10MB file size limit
   - Allowed types: JPEG, PNG, GIF, WebP

## Testing

After applying the fix:

1. Navigate to the Artist Profile page
2. Try uploading an avatar image
3. The upload should work without errors
4. Check the browser console for any remaining issues

## Troubleshooting

If you still encounter issues:

1. **Check Supabase Storage**: Ensure the buckets were created successfully
2. **Check Permissions**: Verify that the storage policies are set up correctly
3. **Check File Size**: Ensure the uploaded file is under the size limit
4. **Check File Type**: Ensure the file type is allowed
5. **Check Network**: Ensure there are no network connectivity issues

## Additional Notes

- The fix includes automatic retry logic if the initial upload fails
- Error messages are now more user-friendly
- The system will attempt to set up storage automatically if needed
- All form inputs now have proper default values to prevent React warnings
