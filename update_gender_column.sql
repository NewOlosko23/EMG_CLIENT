-- =============================================
-- UPDATE GENDER COLUMN IN SUPABASE
-- =============================================
-- This script updates the gender column in profiles_emg table
-- to only allow 'Male' and 'Female' options
-- Run this in your Supabase SQL Editor

-- Step 1: Update existing data to match new format
-- Convert lowercase values to proper case and clear invalid options
UPDATE profiles_emg 
SET gender = CASE 
    WHEN gender = 'male' THEN 'Male'
    WHEN gender = 'female' THEN 'Female'
    WHEN gender = 'other' OR gender = 'prefer_not_to_say' THEN NULL
    ELSE NULL
END
WHERE gender IS NOT NULL;

-- Step 2: Drop the existing check constraint
ALTER TABLE profiles_emg DROP CONSTRAINT IF EXISTS profiles_emg_gender_check;

-- Step 3: Add the new check constraint with only Male/Female options
ALTER TABLE profiles_emg ADD CONSTRAINT profiles_emg_gender_check 
CHECK (gender IN ('Male', 'Female'));

-- Step 4: Add a comment to document the column
COMMENT ON COLUMN profiles_emg.gender IS 'User gender - Male or Female only';

-- Step 5: Verify the constraint was added correctly
SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'profiles_emg'::regclass 
AND conname = 'profiles_emg_gender_check';

-- Step 6: Check current gender values in the table
SELECT 
    gender,
    COUNT(*) as count
FROM profiles_emg 
GROUP BY gender
ORDER BY gender;

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================
-- Ensure users can update their own gender field

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can update own profile" ON profiles_emg;

-- Create comprehensive policy for profile updates
CREATE POLICY "Users can update own profile" ON profiles_emg
FOR UPDATE USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- =============================================
-- VERIFICATION QUERIES
-- =============================================

-- Test that the constraint works (this should fail)
-- INSERT INTO profiles_emg (id, username, full_name, gender) 
-- VALUES (gen_random_uuid(), 'test_user', 'Test User', 'Invalid');

-- Test that valid values work (this should succeed)
-- UPDATE profiles_emg SET gender = 'Male' WHERE username = 'your_test_username';
-- UPDATE profiles_emg SET gender = 'Female' WHERE username = 'your_test_username';
-- UPDATE profiles_emg SET gender = NULL WHERE username = 'your_test_username';
