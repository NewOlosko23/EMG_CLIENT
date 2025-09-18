// Storage Setup Utilities for EMG Music Platform
// This file contains utilities to set up and manage Supabase storage buckets

import { supabase } from './supabaseClient';

export const storageSetup = {
  // Check if a bucket exists
  async bucketExists(bucketName) {
    try {
      const { data, error } = await supabase.storage.getBucket(bucketName);
      return !error && data;
    } catch (error) {
      return false;
    }
  },

  // Create a storage bucket
  async createBucket(bucketName, options = {}) {
    try {
      const { data, error } = await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 5242880, // 5MB default
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        ...options
      });

      if (error) {
        console.error(`Error creating bucket ${bucketName}:`, error);
        return { success: false, error };
      }

      console.log(`Successfully created bucket: ${bucketName}`);
      return { success: true, data };
    } catch (error) {
      console.error(`Error creating bucket ${bucketName}:`, error);
      return { success: false, error };
    }
  },

  // Setup all required buckets for the EMG platform
  async setupAllBuckets() {
    const buckets = [
      {
        name: 'avatars',
        options: {
          public: true,
          fileSizeLimit: 5242880, // 5MB
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        }
      },
      {
        name: 'tracks',
        options: {
          public: true,
          fileSizeLimit: 104857600, // 100MB
          allowedMimeTypes: ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/aac', 'audio/ogg']
        }
      },
      {
        name: 'covers',
        options: {
          public: true,
          fileSizeLimit: 10485760, // 10MB
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        }
      }
    ];

    const results = [];
    
    for (const bucket of buckets) {
      const exists = await this.bucketExists(bucket.name);
      
      if (!exists) {
        console.log(`Creating bucket: ${bucket.name}`);
        const result = await this.createBucket(bucket.name, bucket.options);
        results.push({ bucket: bucket.name, ...result });
      } else {
        console.log(`Bucket ${bucket.name} already exists`);
        results.push({ bucket: bucket.name, success: true, exists: true });
      }
    }

    return results;
  },

  // Get bucket information
  async getBucketInfo(bucketName) {
    try {
      const { data, error } = await supabase.storage.getBucket(bucketName);
      if (error) {
        return { success: false, error };
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  },

  // List all buckets
  async listBuckets() {
    try {
      const { data, error } = await supabase.storage.listBuckets();
      if (error) {
        return { success: false, error };
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Delete a bucket (use with caution)
  async deleteBucket(bucketName) {
    try {
      const { data, error } = await supabase.storage.deleteBucket(bucketName);
      if (error) {
        return { success: false, error };
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }
};

// Helper function to check and setup storage if needed
export const ensureStorageSetup = async () => {
  try {
    const results = await storageSetup.setupAllBuckets();
    const failed = results.filter(r => !r.success);
    
    if (failed.length > 0) {
      console.warn('Some storage buckets failed to setup:', failed);
      return { success: false, results };
    }
    
    return { success: true, results };
  } catch (error) {
    console.error('Error setting up storage:', error);
    return { success: false, error };
  }
};

export default storageSetup;
