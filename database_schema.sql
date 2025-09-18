-- EMG Music Platform Database Schema
-- All tables end with _emg suffix as requested

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USER MANAGEMENT TABLES
-- =============================================

-- User profiles table (extends Supabase auth.users)
CREATE TABLE profiles_emg (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    bio TEXT,
    avatar_url TEXT, -- URL to uploaded avatar image
    avatar_public_id TEXT, -- Cloudinary/Storage public ID for avatar
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'pro')),
    
    -- Location Information
    country VARCHAR(2), -- ISO country code (e.g., 'US', 'KE', 'NG')
    country_name VARCHAR(100), -- Full country name
    state_province VARCHAR(100), -- State or Province
    city VARCHAR(100), -- City or Town
    postal_code VARCHAR(20), -- Postal/ZIP code
    
    -- Contact Information
    phone_number VARCHAR(20), -- International format (e.g., +1234567890)
    phone_verified BOOLEAN DEFAULT FALSE,
    website_url TEXT, -- Personal website or social media
    instagram_handle VARCHAR(50),
    twitter_handle VARCHAR(50),
    facebook_url TEXT,
    youtube_channel VARCHAR(100),
    tiktok_handle VARCHAR(50),
    
    -- Personal Details
    date_of_birth DATE,
    gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
    language VARCHAR(5) DEFAULT 'en', -- Primary language (ISO 639-1)
    timezone VARCHAR(50) DEFAULT 'UTC', -- User's timezone
    
    -- Professional Information
    artist_name VARCHAR(100), -- Stage name or artist name
    record_label VARCHAR(100), -- Associated record label
    music_genres TEXT[], -- Array of music genres
    years_experience INTEGER DEFAULT 0, -- Years in music industry
    instruments TEXT[], -- Array of instruments played
    
    -- Account Status
    last_login_at TIMESTAMP WITH TIME ZONE,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    phone_verified_at TIMESTAMP WITH TIME ZONE,
    profile_completion_percentage INTEGER DEFAULT 0, -- 0-100%
    
    -- Privacy & Preferences
    profile_visibility VARCHAR(20) DEFAULT 'public' CHECK (profile_visibility IN ('public', 'private', 'friends_only')),
    show_email BOOLEAN DEFAULT FALSE,
    show_phone BOOLEAN DEFAULT FALSE,
    allow_messages BOOLEAN DEFAULT TRUE,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User settings and preferences
CREATE TABLE user_settings_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    
    -- Notification Preferences
    email_notifications BOOLEAN DEFAULT TRUE,
    sms_notifications BOOLEAN DEFAULT FALSE,
    push_notifications BOOLEAN DEFAULT TRUE,
    newsletter_subscription BOOLEAN DEFAULT TRUE,
    marketing_emails BOOLEAN DEFAULT FALSE,
    new_follower_notifications BOOLEAN DEFAULT TRUE,
    track_approval_notifications BOOLEAN DEFAULT TRUE,
    earnings_notifications BOOLEAN DEFAULT TRUE,
    collaboration_notifications BOOLEAN DEFAULT TRUE,
    
    -- Privacy Settings
    privacy_level VARCHAR(20) DEFAULT 'public' CHECK (privacy_level IN ('public', 'private', 'friends')),
    show_online_status BOOLEAN DEFAULT TRUE,
    show_last_seen BOOLEAN DEFAULT TRUE,
    allow_friend_requests BOOLEAN DEFAULT TRUE,
    allow_direct_messages BOOLEAN DEFAULT TRUE,
    
    -- Localization
    language VARCHAR(5) DEFAULT 'en',
    currency VARCHAR(3) DEFAULT 'USD',
    date_format VARCHAR(20) DEFAULT 'MM/DD/YYYY',
    time_format VARCHAR(10) DEFAULT '12h', -- 12h or 24h
    
    -- Music Preferences
    default_genre VARCHAR(50),
    auto_play BOOLEAN DEFAULT FALSE,
    crossfade_duration INTEGER DEFAULT 0, -- in seconds
    audio_quality VARCHAR(10) DEFAULT 'high', -- low, medium, high, lossless
    
    -- UI Preferences
    theme VARCHAR(10) DEFAULT 'light', -- light, dark, auto
    compact_mode BOOLEAN DEFAULT FALSE,
    show_explicit_content BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- File uploads table for managing user uploads (avatars, track covers, etc.)
CREATE TABLE file_uploads_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL, -- image/jpeg, audio/mpeg, etc.
    file_size BIGINT NOT NULL, -- in bytes
    file_url TEXT NOT NULL, -- URL to access the file
    public_id TEXT, -- Cloudinary/Storage public ID
    upload_type VARCHAR(20) NOT NULL, -- avatar, track_cover, track_audio, etc.
    is_processed BOOLEAN DEFAULT FALSE,
    processing_status VARCHAR(20) DEFAULT 'pending', -- pending, processing, completed, failed
    metadata JSONB, -- Additional file metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- MUSIC CONTENT TABLES
-- =============================================

-- Albums/EPs
CREATE TABLE albums_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    artist_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    cover_art_url TEXT,
    release_date DATE,
    genre VARCHAR(50),
    subgenre VARCHAR(50),
    is_explicit BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    approval_status VARCHAR(20) DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
    rejection_reason TEXT,
    total_tracks INTEGER DEFAULT 0,
    total_duration INTEGER DEFAULT 0, -- in seconds
    upc VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tracks/Songs
CREATE TABLE tracks_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    artist_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    album_id UUID REFERENCES albums_emg(id) ON DELETE SET NULL,
    title VARCHAR(200) NOT NULL,
    duration INTEGER NOT NULL, -- in seconds
    file_url TEXT NOT NULL,
    file_size BIGINT,
    file_format VARCHAR(10),
    cover_art_url TEXT,
    is_explicit BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    approval_status VARCHAR(20) DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
    rejection_reason TEXT,
    track_number INTEGER,
    isrc VARCHAR(12),
    lyrics TEXT,
    tags TEXT[], -- array of tags
    genre VARCHAR(50),
    subgenre VARCHAR(50),
    mood VARCHAR(50),
    bpm INTEGER,
    key_signature VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Playlists
CREATE TABLE playlists_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    cover_art_url TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    total_tracks INTEGER DEFAULT 0,
    total_duration INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Playlist tracks (many-to-many relationship)
CREATE TABLE playlist_tracks_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    playlist_id UUID REFERENCES playlists_emg(id) ON DELETE CASCADE,
    track_id UUID REFERENCES tracks_emg(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(playlist_id, track_id)
);

-- =============================================
-- ANALYTICS & STATISTICS TABLES
-- =============================================

-- Track plays/streams
CREATE TABLE track_plays_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    track_id UUID REFERENCES tracks_emg(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles_emg(id) ON DELETE SET NULL, -- NULL for anonymous plays
    platform VARCHAR(50), -- spotify, apple_music, youtube, etc.
    country VARCHAR(2),
    city VARCHAR(100),
    device_type VARCHAR(20),
    play_duration INTEGER, -- how long they listened in seconds
    is_complete BOOLEAN DEFAULT FALSE, -- did they listen to the full track
    played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User favorites/likes
CREATE TABLE user_favorites_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    track_id UUID REFERENCES tracks_emg(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, track_id)
);

-- User follows (artist following)
CREATE TABLE user_follows_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    follower_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    following_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(follower_id, following_id)
);

-- =============================================
-- EARNINGS & PAYMENTS TABLES
-- =============================================

-- Earnings records
CREATE TABLE earnings_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    artist_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    track_id UUID REFERENCES tracks_emg(id) ON DELETE SET NULL,
    platform VARCHAR(50) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    plays_count INTEGER DEFAULT 0,
    revenue_amount DECIMAL(10,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    payout_status VARCHAR(20) DEFAULT 'pending' CHECK (payout_status IN ('pending', 'paid', 'processing')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payouts
CREATE TABLE payouts_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    artist_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    payment_method VARCHAR(50), -- bank_transfer, paypal, etc.
    payment_details JSONB, -- encrypted payment info
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- PROMOTION & MARKETING TABLES
-- =============================================

-- Promotional campaigns
CREATE TABLE campaigns_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    artist_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    budget DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    start_date DATE,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'cancelled')),
    target_audience JSONB, -- targeting criteria
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaign tracks
CREATE TABLE campaign_tracks_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    campaign_id UUID REFERENCES campaigns_emg(id) ON DELETE CASCADE,
    track_id UUID REFERENCES tracks_emg(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Calendar events
CREATE TABLE events_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('release', 'meeting', 'deadline', 'performance', 'promotion', 'other')),
    event_date DATE NOT NULL,
    event_time TIME,
    location VARCHAR(200),
    status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled', 'postponed')),
    notes TEXT,
    is_all_day BOOLEAN DEFAULT FALSE,
    reminder_minutes INTEGER DEFAULT 15, -- minutes before event to remind
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- NOTIFICATIONS & MESSAGING TABLES
-- =============================================

-- Notifications
CREATE TABLE notifications_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- track_approved, new_follower, earnings_update, etc.
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT, -- link to relevant page
    metadata JSONB, -- additional data
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages/Support tickets
CREATE TABLE messages_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES profiles_emg(id) ON DELETE SET NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- SYSTEM & ADMIN TABLES
-- =============================================

-- System announcements
CREATE TABLE announcements_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(20) DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
    is_active BOOLEAN DEFAULT TRUE,
    target_audience VARCHAR(20) DEFAULT 'all' CHECK (target_audience IN ('all', 'users', 'admins')),
    created_by UUID REFERENCES profiles_emg(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Platform statistics (for admin dashboard)
CREATE TABLE platform_stats_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    date DATE NOT NULL,
    total_users INTEGER DEFAULT 0,
    total_tracks INTEGER DEFAULT 0,
    total_plays INTEGER DEFAULT 0,
    total_revenue DECIMAL(12,2) DEFAULT 0,
    new_users INTEGER DEFAULT 0,
    new_tracks INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date)
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- User indexes
CREATE INDEX idx_profiles_emg_username ON profiles_emg(username);
CREATE INDEX idx_profiles_emg_role ON profiles_emg(role);
CREATE INDEX idx_profiles_emg_created_at ON profiles_emg(created_at);
CREATE INDEX idx_profiles_emg_country ON profiles_emg(country);
CREATE INDEX idx_profiles_emg_city ON profiles_emg(city);
CREATE INDEX idx_profiles_emg_artist_name ON profiles_emg(artist_name);
CREATE INDEX idx_profiles_emg_is_verified ON profiles_emg(is_verified);
CREATE INDEX idx_profiles_emg_is_active ON profiles_emg(is_active);
CREATE INDEX idx_profiles_emg_last_login ON profiles_emg(last_login_at);

-- File uploads indexes
CREATE INDEX idx_file_uploads_emg_user_id ON file_uploads_emg(user_id);
CREATE INDEX idx_file_uploads_emg_upload_type ON file_uploads_emg(upload_type);
CREATE INDEX idx_file_uploads_emg_created_at ON file_uploads_emg(created_at);
CREATE INDEX idx_file_uploads_emg_processing_status ON file_uploads_emg(processing_status);

-- Track indexes
CREATE INDEX idx_tracks_emg_artist_id ON tracks_emg(artist_id);
CREATE INDEX idx_tracks_emg_album_id ON tracks_emg(album_id);
CREATE INDEX idx_tracks_emg_approval_status ON tracks_emg(approval_status);
CREATE INDEX idx_tracks_emg_created_at ON tracks_emg(created_at);
CREATE INDEX idx_tracks_emg_genre ON tracks_emg(genre);

-- Campaign indexes
CREATE INDEX idx_campaigns_emg_artist_id ON campaigns_emg(artist_id);
CREATE INDEX idx_campaigns_emg_status ON campaigns_emg(status);
CREATE INDEX idx_campaigns_emg_start_date ON campaigns_emg(start_date);
CREATE INDEX idx_campaigns_emg_end_date ON campaigns_emg(end_date);

-- Events indexes
CREATE INDEX idx_events_emg_user_id ON events_emg(user_id);
CREATE INDEX idx_events_emg_event_type ON events_emg(event_type);
CREATE INDEX idx_events_emg_event_date ON events_emg(event_date);
CREATE INDEX idx_events_emg_status ON events_emg(status);

-- Analytics indexes
CREATE INDEX idx_track_plays_emg_track_id ON track_plays_emg(track_id);
CREATE INDEX idx_track_plays_emg_played_at ON track_plays_emg(played_at);
CREATE INDEX idx_track_plays_emg_platform ON track_plays_emg(platform);

-- Earnings indexes
CREATE INDEX idx_earnings_emg_artist_id ON earnings_emg(artist_id);
CREATE INDEX idx_earnings_emg_period ON earnings_emg(period_start, period_end);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE profiles_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE albums_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlists_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlist_tracks_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE track_plays_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_follows_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE earnings_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_tracks_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE events_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_stats_emg ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles_emg
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view public profiles" ON profiles_emg
    FOR SELECT USING (profile_visibility = 'public');

CREATE POLICY "Users can update their own profile" ON profiles_emg
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles_emg
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all profiles" ON profiles_emg
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- User settings policies
CREATE POLICY "Users can view their own settings" ON user_settings_emg
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings" ON user_settings_emg
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings" ON user_settings_emg
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- File uploads policies
CREATE POLICY "Users can view their own uploads" ON file_uploads_emg
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own uploads" ON file_uploads_emg
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own uploads" ON file_uploads_emg
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own uploads" ON file_uploads_emg
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all uploads" ON file_uploads_emg
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Tracks policies
CREATE POLICY "Users can view approved tracks" ON tracks_emg
    FOR SELECT USING (is_approved = true OR artist_id = auth.uid());

CREATE POLICY "Users can insert their own tracks" ON tracks_emg
    FOR INSERT WITH CHECK (artist_id = auth.uid());

CREATE POLICY "Users can update their own tracks" ON tracks_emg
    FOR UPDATE USING (artist_id = auth.uid());

CREATE POLICY "Admins can manage all tracks" ON tracks_emg
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Earnings policies
CREATE POLICY "Users can view their own earnings" ON earnings_emg
    FOR SELECT USING (artist_id = auth.uid());

CREATE POLICY "Admins can view all earnings" ON earnings_emg
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Campaigns policies
CREATE POLICY "Users can view their own campaigns" ON campaigns_emg
    FOR SELECT USING (artist_id = auth.uid());

CREATE POLICY "Users can insert their own campaigns" ON campaigns_emg
    FOR INSERT WITH CHECK (artist_id = auth.uid());

CREATE POLICY "Users can update their own campaigns" ON campaigns_emg
    FOR UPDATE USING (artist_id = auth.uid());

CREATE POLICY "Admins can manage all campaigns" ON campaigns_emg
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Events policies
CREATE POLICY "Users can view their own events" ON events_emg
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own events" ON events_emg
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own events" ON events_emg
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own events" ON events_emg
    FOR DELETE USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all events" ON events_emg
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to relevant tables
CREATE TRIGGER update_profiles_emg_updated_at BEFORE UPDATE ON profiles_emg
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_emg_updated_at BEFORE UPDATE ON user_settings_emg
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_albums_emg_updated_at BEFORE UPDATE ON albums_emg
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tracks_emg_updated_at BEFORE UPDATE ON tracks_emg
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_playlists_emg_updated_at BEFORE UPDATE ON playlists_emg
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_earnings_emg_updated_at BEFORE UPDATE ON earnings_emg
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_emg_updated_at BEFORE UPDATE ON campaigns_emg
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_emg_updated_at BEFORE UPDATE ON events_emg
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_messages_emg_updated_at BEFORE UPDATE ON messages_emg
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_emg_updated_at BEFORE UPDATE ON announcements_emg
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles_emg (
        id, 
        username, 
        full_name,
        email_verified_at,
        last_login_at
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        CASE WHEN NEW.email_confirmed_at IS NOT NULL THEN NEW.email_confirmed_at ELSE NULL END,
        NEW.last_sign_in_at
    );
    
    INSERT INTO public.user_settings_emg (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to calculate profile completion percentage
CREATE OR REPLACE FUNCTION public.calculate_profile_completion()
RETURNS TRIGGER AS $$
DECLARE
    completion_score INTEGER := 0;
    total_fields INTEGER := 15; -- Total number of important fields
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
    
    -- Location info (3 points)
    IF NEW.country IS NOT NULL AND NEW.country != '' THEN
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

-- Trigger to update profile completion percentage
CREATE TRIGGER update_profile_completion
    BEFORE INSERT OR UPDATE ON profiles_emg
    FOR EACH ROW EXECUTE FUNCTION public.calculate_profile_completion();
