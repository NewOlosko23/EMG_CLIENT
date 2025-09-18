-- Fix for user_activity_logs_emg RLS policies
-- The issue is that the table has RLS enabled but no INSERT policy
-- This causes the trigger to fail when trying to log profile updates

-- Add missing INSERT policy for user_activity_logs_emg
CREATE POLICY "System can insert activity logs" ON user_activity_logs_emg
    FOR INSERT WITH CHECK (true);

-- Alternative: More restrictive policy that only allows inserts for the current user
-- Uncomment this and comment out the above if you want more security
-- CREATE POLICY "Users can insert their own activity logs" ON user_activity_logs_emg
--     FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Also add INSERT policy for admin_actions_log_emg to prevent similar issues
CREATE POLICY "System can insert admin action logs" ON admin_actions_log_emg
    FOR INSERT WITH CHECK (true);

-- Grant necessary permissions
GRANT INSERT ON user_activity_logs_emg TO authenticated;
GRANT INSERT ON admin_actions_log_emg TO authenticated;

-- Test the fix by checking if the policies exist
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('user_activity_logs_emg', 'admin_actions_log_emg')
ORDER BY tablename, cmd;
