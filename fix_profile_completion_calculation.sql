-- =============================================
-- FIX PROFILE COMPLETION CALCULATION
-- =============================================
-- This script updates the profile completion calculation function
-- to properly include all relevant fields including gender

-- Drop the existing function and trigger
DROP TRIGGER IF EXISTS update_profile_completion ON profiles_emg;
DROP FUNCTION IF EXISTS public.calculate_profile_completion();

-- Create the updated function with proper field counting
CREATE OR REPLACE FUNCTION public.calculate_profile_completion()
RETURNS TRIGGER AS $$
DECLARE
    completion_score INTEGER := 0;
    total_fields INTEGER := 16; -- Updated total number of important fields
BEGIN
    -- Basic info (required fields - 3 points)
    IF NEW.full_name IS NOT NULL AND NEW.full_name != '' THEN
        completion_score := completion_score + 1;
    END IF;
    
    IF NEW.username IS NOT NULL AND NEW.username != '' THEN
        completion_score := completion_score + 1;
    END IF;
    
    IF NEW.bio IS NOT NULL AND NEW.bio != '' THEN
        completion_score := completion_score + 1;
    END IF;
    
    -- Avatar (1 point)
    IF NEW.avatar_url IS NOT NULL AND NEW.avatar_url != '' THEN
        completion_score := completion_score + 1;
    END IF;
    
    -- Personal Details (1 point)
    IF NEW.gender IS NOT NULL AND NEW.gender != '' THEN
        completion_score := completion_score + 1;
    END IF;
    
    -- Location info (3 points)
    IF NEW.country_name IS NOT NULL AND NEW.country_name != '' THEN
        completion_score := completion_score + 1;
    END IF;
    
    IF NEW.city IS NOT NULL AND NEW.city != '' THEN
        completion_score := completion_score + 1;
    END IF;
    
    IF NEW.timezone IS NOT NULL AND NEW.timezone != 'UTC' THEN
        completion_score := completion_score + 1;
    END IF;
    
    -- Contact info (2 points)
    IF NEW.phone_number IS NOT NULL AND NEW.phone_number != '' THEN
        completion_score := completion_score + 1;
    END IF;
    
    IF NEW.website_url IS NOT NULL AND NEW.website_url != '' THEN
        completion_score := completion_score + 1;
    END IF;
    
    -- Professional info (4 points)
    IF NEW.artist_name IS NOT NULL AND NEW.artist_name != '' THEN
        completion_score := completion_score + 1;
    END IF;
    
    IF NEW.music_genres IS NOT NULL AND array_length(NEW.music_genres, 1) > 0 THEN
        completion_score := completion_score + 1;
    END IF;
    
    IF NEW.instruments IS NOT NULL AND array_length(NEW.instruments, 1) > 0 THEN
        completion_score := completion_score + 1;
    END IF;
    
    IF NEW.years_experience IS NOT NULL AND NEW.years_experience > 0 THEN
        completion_score := completion_score + 1;
    END IF;
    
    -- Social media (2 points)
    IF (NEW.instagram_handle IS NOT NULL AND NEW.instagram_handle != '') OR
       (NEW.twitter_handle IS NOT NULL AND NEW.twitter_handle != '') OR
       (NEW.youtube_channel IS NOT NULL AND NEW.youtube_channel != '') THEN
        completion_score := completion_score + 1;
    END IF;
    
    IF NEW.facebook_url IS NOT NULL AND NEW.facebook_url != '' THEN
        completion_score := completion_score + 1;
    END IF;
    
    -- Calculate percentage
    NEW.profile_completion_percentage := ROUND((completion_score::DECIMAL / total_fields::DECIMAL) * 100);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger
CREATE TRIGGER update_profile_completion
    BEFORE INSERT OR UPDATE ON profiles_emg
    FOR EACH ROW EXECUTE FUNCTION public.calculate_profile_completion();

-- =============================================
-- UPDATE EXISTING PROFILES
-- =============================================
-- Update all existing profiles to recalculate completion percentage

UPDATE profiles_emg 
SET profile_completion_percentage = (
    SELECT ROUND((completion_score::DECIMAL / 16::DECIMAL) * 100)
    FROM (
        SELECT 
            -- Basic info (3 points)
            CASE WHEN full_name IS NOT NULL AND full_name != '' THEN 1 ELSE 0 END +
            CASE WHEN username IS NOT NULL AND username != '' THEN 1 ELSE 0 END +
            CASE WHEN bio IS NOT NULL AND bio != '' THEN 1 ELSE 0 END +
            -- Avatar (1 point)
            CASE WHEN avatar_url IS NOT NULL AND avatar_url != '' THEN 1 ELSE 0 END +
            -- Personal Details (1 point)
            CASE WHEN gender IS NOT NULL AND gender != '' THEN 1 ELSE 0 END +
            -- Location info (3 points)
            CASE WHEN country_name IS NOT NULL AND country_name != '' THEN 1 ELSE 0 END +
            CASE WHEN city IS NOT NULL AND city != '' THEN 1 ELSE 0 END +
            CASE WHEN timezone IS NOT NULL AND timezone != 'UTC' THEN 1 ELSE 0 END +
            -- Contact info (2 points)
            CASE WHEN phone_number IS NOT NULL AND phone_number != '' THEN 1 ELSE 0 END +
            CASE WHEN website_url IS NOT NULL AND website_url != '' THEN 1 ELSE 0 END +
            -- Professional info (4 points)
            CASE WHEN artist_name IS NOT NULL AND artist_name != '' THEN 1 ELSE 0 END +
            CASE WHEN music_genres IS NOT NULL AND array_length(music_genres, 1) > 0 THEN 1 ELSE 0 END +
            CASE WHEN instruments IS NOT NULL AND array_length(instruments, 1) > 0 THEN 1 ELSE 0 END +
            CASE WHEN years_experience IS NOT NULL AND years_experience > 0 THEN 1 ELSE 0 END +
            -- Social media (2 points)
            CASE WHEN (instagram_handle IS NOT NULL AND instagram_handle != '') OR
                      (twitter_handle IS NOT NULL AND twitter_handle != '') OR
                      (youtube_channel IS NOT NULL AND youtube_channel != '') THEN 1 ELSE 0 END +
            CASE WHEN facebook_url IS NOT NULL AND facebook_url != '' THEN 1 ELSE 0 END
        AS completion_score
    ) AS calc
)
WHERE id IS NOT NULL;

-- =============================================
-- VERIFICATION QUERIES
-- =============================================

-- Check the updated function
SELECT 
    proname as function_name,
    prosrc as function_body
FROM pg_proc 
WHERE proname = 'calculate_profile_completion';

-- Check some sample profile completion percentages
SELECT 
    username,
    full_name,
    gender,
    country_name,
    city,
    artist_name,
    profile_completion_percentage
FROM profiles_emg 
ORDER BY profile_completion_percentage DESC
LIMIT 10;

-- Check the distribution of completion percentages
SELECT 
    CASE 
        WHEN profile_completion_percentage = 0 THEN '0%'
        WHEN profile_completion_percentage <= 25 THEN '1-25%'
        WHEN profile_completion_percentage <= 50 THEN '26-50%'
        WHEN profile_completion_percentage <= 75 THEN '51-75%'
        WHEN profile_completion_percentage <= 100 THEN '76-100%'
    END as completion_range,
    COUNT(*) as user_count
FROM profiles_emg 
GROUP BY 
    CASE 
        WHEN profile_completion_percentage = 0 THEN '0%'
        WHEN profile_completion_percentage <= 25 THEN '1-25%'
        WHEN profile_completion_percentage <= 50 THEN '26-50%'
        WHEN profile_completion_percentage <= 75 THEN '51-75%'
        WHEN profile_completion_percentage <= 100 THEN '76-100%'
    END
ORDER BY completion_range;
