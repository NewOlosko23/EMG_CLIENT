// Test script for storage setup
// Run this with: node test_storage_setup.js

import { createClient } from '@supabase/supabase-js';
import { storageSetup } from './src/lib/storageSetup.js';

// You'll need to set these environment variables or replace with your actual values
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

if (supabaseUrl === 'your-supabase-url' || supabaseKey === 'your-supabase-anon-key') {
  console.error('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testStorageSetup() {
  console.log('Testing storage setup...');
  
  try {
    // Test listing existing buckets
    console.log('\n1. Listing existing buckets:');
    const listResult = await storageSetup.listBuckets();
    if (listResult.success) {
      console.log('Existing buckets:', listResult.data.map(b => b.name));
    } else {
      console.error('Error listing buckets:', listResult.error);
    }

    // Test checking if avatars bucket exists
    console.log('\n2. Checking if avatars bucket exists:');
    const avatarsExists = await storageSetup.bucketExists('avatars');
    console.log('Avatars bucket exists:', avatarsExists);

    // Test setting up all buckets
    console.log('\n3. Setting up all required buckets:');
    const setupResult = await storageSetup.setupAllBuckets();
    console.log('Setup results:', setupResult);

    // Test uploading a small file (if we have a test file)
    console.log('\n4. Testing file upload...');
    // This would require an actual file, so we'll skip for now
    console.log('File upload test skipped (requires actual file)');

    console.log('\n✅ Storage setup test completed!');
    
  } catch (error) {
    console.error('❌ Error during storage setup test:', error);
  }
}

// Run the test
testStorageSetup();
