-- Fix for infinite recursion in profiles_emg policies
-- The issue is that admin policies are querying the same table they're protecting

-- Drop the problematic policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles_emg;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles_emg;

-- Create a function to check if user is admin (avoids circular reference)
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if user exists and has admin role
    -- This function can be called without triggering RLS policies
    RETURN EXISTS (
        SELECT 1 FROM profiles_emg 
        WHERE id = user_id AND role = 'admin'
    );
EXCEPTION
    WHEN OTHERS THEN
        -- If there's any error (like policy issues), return false
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the admin policies using the function
CREATE POLICY "Admins can view all profiles" ON profiles_emg
    FOR SELECT USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update all profiles" ON profiles_emg
    FOR UPDATE USING (is_admin(auth.uid()));

-- Also fix other admin policies that might have the same issue
DROP POLICY IF EXISTS "Admins can view all uploads" ON file_uploads_emg;
DROP POLICY IF EXISTS "Admins can manage all tracks" ON tracks_emg;
DROP POLICY IF EXISTS "Admins can view all earnings" ON earnings_emg;

-- Recreate them with the function
CREATE POLICY "Admins can view all uploads" ON file_uploads_emg
    FOR SELECT USING (is_admin(auth.uid()));

CREATE POLICY "Admins can manage all tracks" ON tracks_emg
    FOR ALL USING (is_admin(auth.uid()));

CREATE POLICY "Admins can view all earnings" ON earnings_emg
    FOR SELECT USING (is_admin(auth.uid()));

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION is_admin(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION is_admin(UUID) TO anon;
