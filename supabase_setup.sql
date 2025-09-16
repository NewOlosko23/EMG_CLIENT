-- =============================================
-- EMG Music Platform - Simple Database Setup
-- =============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. USERS TABLE
-- =============================================
-- Simple users table with all necessary fields
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'artist', 'admin')),
    avatar TEXT,
    phone TEXT,
    location TEXT,
    country TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 2. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can view all user profiles
CREATE POLICY "Users are viewable by everyone" ON public.users
    FOR SELECT USING (true);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile" ON public.users
    FOR INSERT WITH CHECK (true);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (true);

-- =============================================
-- 3. FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to handle new user signup with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_username TEXT;
    user_role TEXT;
BEGIN
    -- Extract username from metadata, with fallback
    user_username := COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8));
    
    -- Extract role from metadata, with fallback
    user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'user');
    
    -- Insert into users table with error handling
    BEGIN
        INSERT INTO public.users (id, username, email, role)
        VALUES (NEW.id, user_username, NEW.email, user_role);
    EXCEPTION
        WHEN OTHERS THEN
            -- Log the error but don't fail the auth signup
            RAISE WARNING 'Failed to insert user into users table: %', SQLERRM;
            -- Try with a different username if there's a conflict
            BEGIN
                INSERT INTO public.users (id, username, email, role)
                VALUES (NEW.id, user_username || '_' || substr(NEW.id::text, 1, 4), NEW.email, user_role);
            EXCEPTION
                WHEN OTHERS THEN
                    RAISE WARNING 'Failed to insert user with fallback username: %', SQLERRM;
            END;
    END;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger to automatically create user record on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on user changes
DROP TRIGGER IF EXISTS on_user_updated ON public.users;
CREATE TRIGGER on_user_updated
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =============================================
-- 4. SAMPLE DATA (OPTIONAL)
-- =============================================

-- Insert sample admin user (replace with your details)
-- INSERT INTO public.users (username, email, role, location, country) 
-- VALUES ('admin', 'admin@example.com', 'admin', 'New York', 'USA');

-- =============================================
-- 5. USEFUL QUERIES FOR MANAGEMENT
-- =============================================

-- View all users with their roles
-- SELECT id, username, email, role, location, country, created_at
-- FROM public.users
-- ORDER BY created_at DESC;

-- Update user role to admin
-- UPDATE public.users SET role = 'admin' WHERE email = 'your-email@example.com';

-- =============================================
-- 6. DEBUGGING QUERIES
-- =============================================

-- Check if users table exists and has correct structure
-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'users' AND table_schema = 'public';

-- Check if trigger exists
-- SELECT trigger_name, event_manipulation, action_statement
-- FROM information_schema.triggers
-- WHERE trigger_name = 'on_auth_user_created';

-- =============================================
-- SETUP COMPLETE
-- =============================================

-- After running this SQL:
-- 1. Test the signup/login flow
-- 2. Create your first admin user by updating their role
-- 3. Use the simple users table for all user management

COMMENT ON TABLE public.users IS 'Simple users table with all necessary user information';