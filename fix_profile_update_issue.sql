-- Simple fix for the profile update issue
-- This script safely checks and creates only the missing policies

-- Check if the INSERT policy already exists for user_activity_logs_emg
DO $$
BEGIN
    -- Check if the policy exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'user_activity_logs_emg' 
        AND policyname = 'System can insert activity logs'
        AND cmd = 'INSERT'
    ) THEN
        -- Create the policy if it doesn't exist
        CREATE POLICY "System can insert activity logs" ON user_activity_logs_emg
            FOR INSERT WITH CHECK (true);
        
        RAISE NOTICE 'Created INSERT policy for user_activity_logs_emg';
    ELSE
        RAISE NOTICE 'INSERT policy for user_activity_logs_emg already exists';
    END IF;
END $$;

-- Check if the INSERT policy already exists for admin_actions_log_emg
DO $$
BEGIN
    -- Check if the policy exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'admin_actions_log_emg' 
        AND policyname = 'System can insert admin action logs'
        AND cmd = 'INSERT'
    ) THEN
        -- Create the policy if it doesn't exist
        CREATE POLICY "System can insert admin action logs" ON admin_actions_log_emg
            FOR INSERT WITH CHECK (true);
        
        RAISE NOTICE 'Created INSERT policy for admin_actions_log_emg';
    ELSE
        RAISE NOTICE 'INSERT policy for admin_actions_log_emg already exists';
    END IF;
END $$;

-- Grant necessary permissions (safe to run multiple times)
GRANT INSERT ON user_activity_logs_emg TO authenticated;
GRANT INSERT ON admin_actions_log_emg TO authenticated;

-- Verify the policies exist
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    cmd,
    CASE 
        WHEN cmd = 'INSERT' THEN '✅ INSERT policy exists'
        ELSE '❌ Missing INSERT policy'
    END as status
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('user_activity_logs_emg', 'admin_actions_log_emg')
AND cmd = 'INSERT'
ORDER BY tablename;

-- Show completion message
DO $$
BEGIN
    RAISE NOTICE 'Profile update fix completed!';
    RAISE NOTICE 'Your artist profile updates should now work without RLS violations.';
END $$;
