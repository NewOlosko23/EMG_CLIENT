-- =============================================
-- Disable the trigger temporarily for testing
-- =============================================

-- Drop the trigger to prevent database errors during signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop the function as well
DROP FUNCTION IF EXISTS public.handle_new_user();

-- This will allow signup to work without the trigger
-- The AuthContext will handle user creation manually
