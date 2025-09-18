-- Comprehensive fix for all RLS policy issues in EMG Music Platform
-- This addresses the profile update issue and other potential RLS problems

-- =============================================
-- 1. FIX USER ACTIVITY LOGS POLICIES
-- =============================================

-- Add missing INSERT policy for user_activity_logs_emg (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'user_activity_logs_emg' 
        AND policyname = 'System can insert activity logs'
    ) THEN
        CREATE POLICY "System can insert activity logs" ON user_activity_logs_emg
            FOR INSERT WITH CHECK (true);
    END IF;
END $$;

-- Add INSERT policy for admin_actions_log_emg (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'admin_actions_log_emg' 
        AND policyname = 'System can insert admin action logs'
    ) THEN
        CREATE POLICY "System can insert admin action logs" ON admin_actions_log_emg
            FOR INSERT WITH CHECK (true);
    END IF;
END $$;

-- =============================================
-- 2. FIX CIRCULAR REFERENCE ISSUES IN ADMIN POLICIES
-- =============================================

-- Drop problematic admin policies that cause circular references
DROP POLICY IF EXISTS "Admins can view all activity" ON user_activity_logs_emg;
DROP POLICY IF EXISTS "Admins can view admin actions" ON admin_actions_log_emg;

-- Create a secure function to check admin status without circular reference
CREATE OR REPLACE FUNCTION is_admin_secure(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    -- Use a more secure approach that doesn't trigger RLS
    RETURN EXISTS (
        SELECT 1 FROM profiles_emg 
        WHERE id = user_id AND role = 'admin'
    );
EXCEPTION
    WHEN OTHERS THEN
        -- If there's any error, return false
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate admin policies using the secure function
CREATE POLICY "Admins can view all activity" ON user_activity_logs_emg
    FOR SELECT USING (is_admin_secure(auth.uid()));

CREATE POLICY "Admins can view admin actions" ON admin_actions_log_emg
    FOR SELECT USING (is_admin_secure(auth.uid()));

-- =============================================
-- 3. FIX OTHER POTENTIAL ADMIN POLICY ISSUES
-- =============================================

-- Fix support tickets admin policies
DROP POLICY IF EXISTS "Admins can view all tickets" ON support_tickets_emg;
DROP POLICY IF EXISTS "Admins can update tickets" ON support_tickets_emg;

CREATE POLICY "Admins can view all tickets" ON support_tickets_emg
    FOR SELECT USING (is_admin_secure(auth.uid()));

CREATE POLICY "Admins can update tickets" ON support_tickets_emg
    FOR UPDATE USING (is_admin_secure(auth.uid()));

-- Fix support ticket messages admin policies
DROP POLICY IF EXISTS "Admins can view all messages" ON support_ticket_messages_emg;
DROP POLICY IF EXISTS "Admins can send messages to any ticket" ON support_ticket_messages_emg;

CREATE POLICY "Admins can view all messages" ON support_ticket_messages_emg
    FOR SELECT USING (is_admin_secure(auth.uid()));

CREATE POLICY "Admins can send messages to any ticket" ON support_ticket_messages_emg
    FOR INSERT WITH CHECK (
        sender_type = 'admin' AND 
        sender_id = auth.uid() AND
        is_admin_secure(auth.uid())
    );

-- Fix platform announcements admin policies
DROP POLICY IF EXISTS "Admins can manage all announcements" ON platform_announcements_emg;

CREATE POLICY "Admins can manage all announcements" ON platform_announcements_emg
    FOR ALL USING (is_admin_secure(auth.uid()));

-- Fix system settings admin policies
DROP POLICY IF EXISTS "Admins can view all settings" ON system_settings_emg;
DROP POLICY IF EXISTS "Admins can update settings" ON system_settings_emg;

CREATE POLICY "Admins can view all settings" ON system_settings_emg
    FOR SELECT USING (is_admin_secure(auth.uid()));

CREATE POLICY "Admins can update settings" ON system_settings_emg
    FOR UPDATE USING (is_admin_secure(auth.uid()));

-- Fix platform analytics admin policies
DROP POLICY IF EXISTS "Admins can view platform analytics" ON platform_analytics_emg;

CREATE POLICY "Admins can view platform analytics" ON platform_analytics_emg
    FOR SELECT USING (is_admin_secure(auth.uid()));

-- Fix device analytics admin policies
DROP POLICY IF EXISTS "Admins can view device analytics" ON device_analytics_emg;

CREATE POLICY "Admins can view device analytics" ON device_analytics_emg
    FOR SELECT USING (is_admin_secure(auth.uid()));

-- Fix content moderation log admin policies
DROP POLICY IF EXISTS "Admins can view moderation logs" ON content_moderation_log_emg;

CREATE POLICY "Admins can view moderation logs" ON content_moderation_log_emg
    FOR SELECT USING (is_admin_secure(auth.uid()));

-- =============================================
-- 4. GRANT NECESSARY PERMISSIONS
-- =============================================

-- Grant permissions for activity logging
GRANT INSERT ON user_activity_logs_emg TO authenticated;
GRANT INSERT ON admin_actions_log_emg TO authenticated;

-- Grant execute permission on the secure admin function
GRANT EXECUTE ON FUNCTION is_admin_secure(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION is_admin_secure(UUID) TO anon;

-- =============================================
-- 5. VERIFICATION QUERIES
-- =============================================

-- Check that all policies are properly created
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
AND tablename IN (
    'user_activity_logs_emg', 
    'admin_actions_log_emg',
    'support_tickets_emg',
    'support_ticket_messages_emg',
    'platform_announcements_emg',
    'system_settings_emg',
    'platform_analytics_emg',
    'device_analytics_emg',
    'content_moderation_log_emg'
)
ORDER BY tablename, cmd;

-- Check that the function exists and is accessible
SELECT 
    routine_name, 
    routine_type, 
    security_type,
    is_deterministic
FROM information_schema.routines 
WHERE routine_name = 'is_admin_secure' 
AND routine_schema = 'public';

-- =============================================
-- 6. COMPLETION MESSAGE
-- =============================================

DO $$
BEGIN
    RAISE NOTICE 'RLS policy fixes completed successfully!';
    RAISE NOTICE 'Fixed user_activity_logs_emg INSERT policy issue';
    RAISE NOTICE 'Fixed circular reference issues in admin policies';
    RAISE NOTICE 'Created secure is_admin_secure() function';
    RAISE NOTICE 'Updated all admin policies to use the secure function';
    RAISE NOTICE 'Profile updates should now work without RLS violations';
END $$;
