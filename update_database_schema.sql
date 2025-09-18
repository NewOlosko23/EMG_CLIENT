-- EMG Music Platform Database Schema Update
-- This script adds new tables and columns to support the comprehensive admin dashboard
-- Run this script to update your existing database schema

-- =============================================
-- NEW TABLES FOR ADMIN DASHBOARD FEATURES
-- =============================================

-- Support Tickets (Enhanced version of messages_emg)
CREATE TABLE IF NOT EXISTS support_tickets_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ticket_number VARCHAR(20) UNIQUE NOT NULL, -- Auto-generated ticket number
    user_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    assigned_admin_id UUID REFERENCES profiles_emg(id) ON DELETE SET NULL,
    subject VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- billing, technical, account, legal, etc.
    priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed', 'archived')),
    tags TEXT[], -- Array of tags for categorization
    resolution_notes TEXT,
    closed_at TIMESTAMP WITH TIME ZONE,
    first_response_at TIMESTAMP WITH TIME ZONE,
    last_response_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Support Ticket Messages (Conversation history)
CREATE TABLE IF NOT EXISTS support_ticket_messages_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ticket_id UUID REFERENCES support_tickets_emg(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES profiles_emg(id) ON DELETE SET NULL,
    sender_type VARCHAR(10) NOT NULL CHECK (sender_type IN ('user', 'admin', 'system')),
    message TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT FALSE, -- Internal admin notes
    attachments JSONB, -- Array of attachment URLs/metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced Announcements (Replaces basic announcements_emg)
CREATE TABLE IF NOT EXISTS platform_announcements_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT, -- Short summary for previews
    type VARCHAR(20) DEFAULT 'general' CHECK (type IN ('general', 'feature', 'maintenance', 'welcome', 'promotion', 'update', 'warning')),
    priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'active', 'archived')),
    target_audience VARCHAR(20) DEFAULT 'all' CHECK (target_audience IN ('all', 'artists', 'users', 'new_users', 'premium', 'admins')),
    author_id UUID REFERENCES profiles_emg(id) ON DELETE SET NULL,
    scheduled_at TIMESTAMP WITH TIME ZONE, -- For scheduled announcements
    published_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE, -- Optional expiration
    view_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    cover_image_url TEXT,
    tags TEXT[], -- Array of tags
    metadata JSONB, -- Additional data like click tracking, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System Settings (Configuration management)
CREATE TABLE IF NOT EXISTS system_settings_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    category VARCHAR(50) NOT NULL, -- general, email, payment, storage, security, etc.
    setting_key VARCHAR(100) NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(20) DEFAULT 'string' CHECK (setting_type IN ('string', 'number', 'boolean', 'json', 'array')),
    description TEXT,
    is_encrypted BOOLEAN DEFAULT FALSE, -- For sensitive data like API keys
    is_public BOOLEAN DEFAULT FALSE, -- Whether setting can be read by non-admins
    updated_by UUID REFERENCES profiles_emg(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(category, setting_key)
);

-- User Activity Logs (For admin monitoring)
CREATE TABLE IF NOT EXISTS user_activity_logs_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL, -- login, logout, upload_track, edit_profile, etc.
    resource_type VARCHAR(50), -- track, profile, playlist, etc.
    resource_id UUID, -- ID of the affected resource
    ip_address INET,
    user_agent TEXT,
    metadata JSONB, -- Additional context data
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Actions Log (Audit trail for admin actions)
CREATE TABLE IF NOT EXISTS admin_actions_log_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    admin_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL, -- approve_track, ban_user, update_settings, etc.
    target_type VARCHAR(50), -- user, track, announcement, etc.
    target_id UUID, -- ID of the affected resource
    old_values JSONB, -- Previous values (for updates)
    new_values JSONB, -- New values (for updates)
    reason TEXT, -- Reason for the action
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collaboration Requests (Enhanced collaboration system)
CREATE TABLE IF NOT EXISTS collaboration_requests_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    requester_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    target_artist_id UUID REFERENCES profiles_emg(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- vocal_collaboration, production_help, songwriting, etc.
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed', 'cancelled')),
    related_track_id UUID REFERENCES tracks_emg(id) ON DELETE SET NULL,
    response_message TEXT,
    response_date TIMESTAMP WITH TIME ZONE,
    deadline DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Active Collaborations (Ongoing projects)
CREATE TABLE IF NOT EXISTS active_collaborations_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    collaboration_request_id UUID REFERENCES collaboration_requests_emg(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'review', 'completed', 'cancelled')),
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    deadline DATE,
    last_update TEXT, -- Recent update message
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Platform Analytics (Detailed analytics data)
CREATE TABLE IF NOT EXISTS platform_analytics_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    date DATE NOT NULL,
    metric_name VARCHAR(100) NOT NULL, -- user_growth, track_uploads, revenue, etc.
    metric_value DECIMAL(15,2) NOT NULL,
    metric_type VARCHAR(20) DEFAULT 'count' CHECK (metric_type IN ('count', 'percentage', 'currency', 'duration')),
    category VARCHAR(50), -- user, content, revenue, engagement, etc.
    breakdown JSONB, -- Detailed breakdown by country, genre, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date, metric_name, category)
);

-- Device and Browser Analytics
CREATE TABLE IF NOT EXISTS device_analytics_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    date DATE NOT NULL,
    device_type VARCHAR(20) NOT NULL, -- mobile, desktop, tablet
    browser VARCHAR(50),
    os VARCHAR(50),
    country VARCHAR(2),
    user_count INTEGER DEFAULT 0,
    session_count INTEGER DEFAULT 0,
    avg_session_duration INTEGER DEFAULT 0, -- in seconds
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date, device_type, browser, os, country)
);

-- Content Moderation Log
CREATE TABLE IF NOT EXISTS content_moderation_log_emg (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    moderator_id UUID REFERENCES profiles_emg(id) ON DELETE SET NULL,
    content_type VARCHAR(20) NOT NULL CHECK (content_type IN ('track', 'album', 'profile', 'comment')),
    content_id UUID NOT NULL,
    action VARCHAR(20) NOT NULL CHECK (action IN ('approve', 'reject', 'flag', 'unflag')),
    reason TEXT,
    moderation_notes TEXT,
    previous_status VARCHAR(20),
    new_status VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ENHANCED EXISTING TABLES
-- =============================================

-- Add new columns to profiles_emg
ALTER TABLE profiles_emg 
ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS login_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS account_locked_until TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS two_factor_secret TEXT,
ADD COLUMN IF NOT EXISTS email_verification_token TEXT,
ADD COLUMN IF NOT EXISTS password_reset_token TEXT,
ADD COLUMN IF NOT EXISTS password_reset_expires TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS profile_views INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_banned BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS ban_reason TEXT,
ADD COLUMN IF NOT EXISTS ban_expires_at TIMESTAMP WITH TIME ZONE;

-- Add new columns to tracks_emg
ALTER TABLE tracks_emg
ADD COLUMN IF NOT EXISTS moderation_notes TEXT,
ADD COLUMN IF NOT EXISTS moderation_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS moderated_by UUID REFERENCES profiles_emg(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS share_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS featured_until TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS copyright_claim BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS copyright_notes TEXT;

-- Add new columns to announcements_emg (if it exists, otherwise use platform_announcements_emg)
ALTER TABLE announcements_emg 
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS tags TEXT[],
ADD COLUMN IF NOT EXISTS cover_image_url TEXT;

-- =============================================
-- NEW INDEXES FOR PERFORMANCE
-- =============================================

-- Support tickets indexes
CREATE INDEX IF NOT EXISTS idx_support_tickets_emg_user_id ON support_tickets_emg(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_emg_status ON support_tickets_emg(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_emg_priority ON support_tickets_emg(priority);
CREATE INDEX IF NOT EXISTS idx_support_tickets_emg_category ON support_tickets_emg(category);
CREATE INDEX IF NOT EXISTS idx_support_tickets_emg_created_at ON support_tickets_emg(created_at);
CREATE INDEX IF NOT EXISTS idx_support_tickets_emg_assigned_admin ON support_tickets_emg(assigned_admin_id);

-- Support ticket messages indexes
CREATE INDEX IF NOT EXISTS idx_support_ticket_messages_emg_ticket_id ON support_ticket_messages_emg(ticket_id);
CREATE INDEX IF NOT EXISTS idx_support_ticket_messages_emg_created_at ON support_ticket_messages_emg(created_at);

-- Platform announcements indexes
CREATE INDEX IF NOT EXISTS idx_platform_announcements_emg_status ON platform_announcements_emg(status);
CREATE INDEX IF NOT EXISTS idx_platform_announcements_emg_type ON platform_announcements_emg(type);
CREATE INDEX IF NOT EXISTS idx_platform_announcements_emg_target_audience ON platform_announcements_emg(target_audience);
CREATE INDEX IF NOT EXISTS idx_platform_announcements_emg_scheduled_at ON platform_announcements_emg(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_platform_announcements_emg_published_at ON platform_announcements_emg(published_at);

-- System settings indexes
CREATE INDEX IF NOT EXISTS idx_system_settings_emg_category ON system_settings_emg(category);
CREATE INDEX IF NOT EXISTS idx_system_settings_emg_key ON system_settings_emg(setting_key);

-- Activity logs indexes
CREATE INDEX IF NOT EXISTS idx_user_activity_logs_emg_user_id ON user_activity_logs_emg(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_logs_emg_action ON user_activity_logs_emg(action);
CREATE INDEX IF NOT EXISTS idx_user_activity_logs_emg_created_at ON user_activity_logs_emg(created_at);

-- Admin actions log indexes
CREATE INDEX IF NOT EXISTS idx_admin_actions_log_emg_admin_id ON admin_actions_log_emg(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_actions_log_emg_action ON admin_actions_log_emg(action);
CREATE INDEX IF NOT EXISTS idx_admin_actions_log_emg_target_type ON admin_actions_log_emg(target_type);
CREATE INDEX IF NOT EXISTS idx_admin_actions_log_emg_created_at ON admin_actions_log_emg(created_at);

-- Collaboration indexes
CREATE INDEX IF NOT EXISTS idx_collaboration_requests_emg_requester ON collaboration_requests_emg(requester_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_requests_emg_target ON collaboration_requests_emg(target_artist_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_requests_emg_status ON collaboration_requests_emg(status);

-- Analytics indexes
CREATE INDEX IF NOT EXISTS idx_platform_analytics_emg_date ON platform_analytics_emg(date);
CREATE INDEX IF NOT EXISTS idx_platform_analytics_emg_metric ON platform_analytics_emg(metric_name);
CREATE INDEX IF NOT EXISTS idx_platform_analytics_emg_category ON platform_analytics_emg(category);

-- Device analytics indexes
CREATE INDEX IF NOT EXISTS idx_device_analytics_emg_date ON device_analytics_emg(date);
CREATE INDEX IF NOT EXISTS idx_device_analytics_emg_device_type ON device_analytics_emg(device_type);

-- Content moderation indexes
CREATE INDEX IF NOT EXISTS idx_content_moderation_log_emg_content ON content_moderation_log_emg(content_type, content_id);
CREATE INDEX IF NOT EXISTS idx_content_moderation_log_emg_moderator ON content_moderation_log_emg(moderator_id);
CREATE INDEX IF NOT EXISTS idx_content_moderation_log_emg_created_at ON content_moderation_log_emg(created_at);

-- =============================================
-- ROW LEVEL SECURITY POLICIES FOR NEW TABLES
-- =============================================

-- Enable RLS on new tables
ALTER TABLE support_tickets_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_ticket_messages_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_announcements_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_logs_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_actions_log_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_requests_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE active_collaborations_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_analytics_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE device_analytics_emg ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_moderation_log_emg ENABLE ROW LEVEL SECURITY;

-- Support tickets policies
CREATE POLICY "Users can view their own tickets" ON support_tickets_emg
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all tickets" ON support_tickets_emg
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Users can create tickets" ON support_tickets_emg
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update tickets" ON support_tickets_emg
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Support ticket messages policies
CREATE POLICY "Users can view messages for their tickets" ON support_ticket_messages_emg
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM support_tickets_emg 
            WHERE id = ticket_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can view all messages" ON support_ticket_messages_emg
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Users can send messages to their tickets" ON support_ticket_messages_emg
    FOR INSERT WITH CHECK (
        sender_type = 'user' AND 
        sender_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM support_tickets_emg 
            WHERE id = ticket_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can send messages to any ticket" ON support_ticket_messages_emg
    FOR INSERT WITH CHECK (
        sender_type = 'admin' AND 
        sender_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Platform announcements policies
CREATE POLICY "Everyone can view active announcements" ON platform_announcements_emg
    FOR SELECT USING (status = 'active' AND (expires_at IS NULL OR expires_at > NOW()));

CREATE POLICY "Admins can manage all announcements" ON platform_announcements_emg
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- System settings policies
CREATE POLICY "Admins can view all settings" ON system_settings_emg
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Users can view public settings" ON system_settings_emg
    FOR SELECT USING (is_public = true);

CREATE POLICY "Admins can update settings" ON system_settings_emg
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- User activity logs policies
CREATE POLICY "Users can view their own activity" ON user_activity_logs_emg
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all activity" ON user_activity_logs_emg
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Admin actions log policies
CREATE POLICY "Admins can view admin actions" ON admin_actions_log_emg
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Collaboration requests policies
CREATE POLICY "Users can view their collaboration requests" ON collaboration_requests_emg
    FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = target_artist_id);

CREATE POLICY "Users can create collaboration requests" ON collaboration_requests_emg
    FOR INSERT WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update their collaboration requests" ON collaboration_requests_emg
    FOR UPDATE USING (auth.uid() = requester_id OR auth.uid() = target_artist_id);

-- Active collaborations policies
CREATE POLICY "Users can view their collaborations" ON active_collaborations_emg
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM collaboration_requests_emg 
            WHERE id = collaboration_request_id AND 
            (requester_id = auth.uid() OR target_artist_id = auth.uid())
        )
    );

-- Platform analytics policies
CREATE POLICY "Admins can view platform analytics" ON platform_analytics_emg
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Device analytics policies
CREATE POLICY "Admins can view device analytics" ON device_analytics_emg
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Content moderation log policies
CREATE POLICY "Admins can view moderation logs" ON content_moderation_log_emg
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles_emg 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =============================================
-- FUNCTIONS AND TRIGGERS FOR NEW TABLES
-- =============================================

-- Function to generate ticket numbers
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.ticket_number := 'TKT-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(nextval('ticket_sequence')::text, 4, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for ticket numbers
CREATE SEQUENCE IF NOT EXISTS ticket_sequence START 1;

-- Trigger for ticket number generation
CREATE TRIGGER generate_support_ticket_number
    BEFORE INSERT ON support_tickets_emg
    FOR EACH ROW EXECUTE FUNCTION generate_ticket_number();

-- Function to update ticket timestamps
CREATE OR REPLACE FUNCTION update_ticket_timestamps()
RETURNS TRIGGER AS $$
BEGIN
    -- Update last_response_at when a message is added
    IF TG_TABLE_NAME = 'support_ticket_messages_emg' THEN
        UPDATE support_tickets_emg 
        SET last_response_at = NEW.created_at,
            updated_at = NOW()
        WHERE id = NEW.ticket_id;
        
        -- Set first_response_at if this is the first admin response
        IF NEW.sender_type = 'admin' AND NOT EXISTS (
            SELECT 1 FROM support_ticket_messages_emg 
            WHERE ticket_id = NEW.ticket_id AND sender_type = 'admin' AND id != NEW.id
        ) THEN
            UPDATE support_tickets_emg 
            SET first_response_at = NEW.created_at
            WHERE id = NEW.ticket_id;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for ticket message timestamps
CREATE TRIGGER update_ticket_on_message
    AFTER INSERT ON support_ticket_messages_emg
    FOR EACH ROW EXECUTE FUNCTION update_ticket_timestamps();

-- Function to log user activity
CREATE OR REPLACE FUNCTION log_user_activity()
RETURNS TRIGGER AS $$
BEGIN
    -- Log profile updates
    IF TG_TABLE_NAME = 'profiles_emg' AND TG_OP = 'UPDATE' THEN
        INSERT INTO user_activity_logs_emg (user_id, action, resource_type, resource_id, metadata)
        VALUES (
            NEW.id,
            'update_profile',
            'profile',
            NEW.id,
            jsonb_build_object(
                'changed_fields', (
                    SELECT jsonb_object_agg(key, value)
                    FROM jsonb_each(to_jsonb(NEW))
                    WHERE key IN (SELECT column_name FROM information_schema.columns WHERE table_name = 'profiles_emg')
                    AND to_jsonb(NEW)->>key IS DISTINCT FROM to_jsonb(OLD)->>key
                )
            )
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for user activity logging
CREATE TRIGGER log_profile_activity
    AFTER UPDATE ON profiles_emg
    FOR EACH ROW EXECUTE FUNCTION log_user_activity();

-- Function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action()
RETURNS TRIGGER AS $$
DECLARE
    admin_id UUID;
BEGIN
    -- Get current admin user ID (you may need to adjust this based on your auth system)
    admin_id := auth.uid();
    
    -- Only log if user is admin
    IF EXISTS (SELECT 1 FROM profiles_emg WHERE id = admin_id AND role = 'admin') THEN
        -- Log track approval/rejection
        IF TG_TABLE_NAME = 'tracks_emg' AND TG_OP = 'UPDATE' THEN
            IF OLD.approval_status IS DISTINCT FROM NEW.approval_status THEN
                INSERT INTO admin_actions_log_emg (admin_id, action, target_type, target_id, old_values, new_values)
                VALUES (
                    admin_id,
                    CASE 
                        WHEN NEW.approval_status = 'approved' THEN 'approve_track'
                        WHEN NEW.approval_status = 'rejected' THEN 'reject_track'
                        ELSE 'update_track_status'
                    END,
                    'track',
                    NEW.id,
                    jsonb_build_object('approval_status', OLD.approval_status),
                    jsonb_build_object('approval_status', NEW.approval_status, 'rejection_reason', NEW.rejection_reason)
                );
            END IF;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for admin action logging
CREATE TRIGGER log_track_admin_actions
    AFTER UPDATE ON tracks_emg
    FOR EACH ROW EXECUTE FUNCTION log_admin_action();

-- =============================================
-- INSERT DEFAULT SYSTEM SETTINGS
-- =============================================

-- Insert default system settings
INSERT INTO system_settings_emg (category, setting_key, setting_value, setting_type, description, is_public) VALUES
-- General Settings
('general', 'platform_name', 'EMG Music Platform', 'string', 'Name of the platform', true),
('general', 'platform_description', 'The ultimate platform for independent artists', 'string', 'Platform description', true),
('general', 'maintenance_mode', 'false', 'boolean', 'Enable maintenance mode', false),
('general', 'registration_enabled', 'true', 'boolean', 'Allow new user registration', true),
('general', 'email_verification_required', 'true', 'boolean', 'Require email verification', true),

-- Email Settings
('email', 'smtp_host', 'smtp.gmail.com', 'string', 'SMTP server host', false),
('email', 'smtp_port', '587', 'number', 'SMTP server port', false),
('email', 'from_name', 'EMG Music Platform', 'string', 'Default sender name', false),
('email', 'from_email', 'noreply@emgmusic.com', 'string', 'Default sender email', false),

-- Payment Settings
('payment', 'commission_rate', '10', 'number', 'Platform commission rate (%)', false),
('payment', 'minimum_payout', '25', 'number', 'Minimum payout amount', false),
('payment', 'payout_schedule', 'monthly', 'string', 'Payout schedule', false),
('payment', 'currency', 'USD', 'string', 'Default currency', true),

-- Storage Settings
('storage', 'max_file_size', '100', 'number', 'Maximum file size in MB', false),
('storage', 'allowed_formats', '["mp3", "wav", "flac", "aac"]', 'array', 'Allowed audio formats', true),
('storage', 'cdn_enabled', 'true', 'boolean', 'Enable CDN for file delivery', false),

-- Security Settings
('security', 'session_timeout', '24', 'number', 'Session timeout in hours', false),
('security', 'max_login_attempts', '5', 'number', 'Maximum login attempts', false),
('security', 'two_factor_required', 'false', 'boolean', 'Require two-factor authentication', false),
('security', 'password_min_length', '8', 'number', 'Minimum password length', true),

-- Notification Settings
('notifications', 'email_notifications', 'true', 'boolean', 'Enable email notifications', false),
('notifications', 'push_notifications', 'true', 'boolean', 'Enable push notifications', false),
('notifications', 'sms_notifications', 'false', 'boolean', 'Enable SMS notifications', false),

-- API Settings
('api', 'api_version', 'v1', 'string', 'API version', true),
('api', 'rate_limit_enabled', 'true', 'boolean', 'Enable API rate limiting', false),
('api', 'api_key_required', 'false', 'boolean', 'Require API key', false)
ON CONFLICT (category, setting_key) DO NOTHING;

-- =============================================
-- CREATE VIEWS FOR ADMIN DASHBOARD
-- =============================================

-- View for admin dashboard statistics
CREATE OR REPLACE VIEW admin_dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM profiles_emg WHERE is_active = true) as total_active_users,
    (SELECT COUNT(*) FROM profiles_emg WHERE created_at >= CURRENT_DATE) as new_users_today,
    (SELECT COUNT(*) FROM tracks_emg WHERE approval_status = 'pending') as pending_tracks,
    (SELECT COUNT(*) FROM support_tickets_emg WHERE status = 'open') as open_tickets,
    (SELECT COUNT(*) FROM support_tickets_emg WHERE status = 'in_progress') as in_progress_tickets,
    (SELECT COALESCE(SUM(revenue_amount), 0) FROM earnings_emg WHERE period_start >= DATE_TRUNC('month', CURRENT_DATE)) as monthly_revenue,
    (SELECT COUNT(*) FROM platform_announcements_emg WHERE status = 'active') as active_announcements;

-- View for user management
CREATE OR REPLACE VIEW user_management_view AS
SELECT 
    p.id,
    p.username,
    p.full_name,
    u.email,
    p.role,
    p.is_active,
    p.is_verified,
    p.subscription_tier,
    p.country,
    p.city,
    p.created_at,
    p.last_login_at,
    p.profile_completion_percentage,
    (SELECT COUNT(*) FROM tracks_emg WHERE artist_id = p.id) as track_count,
    (SELECT COUNT(*) FROM support_tickets_emg WHERE user_id = p.id) as ticket_count
FROM profiles_emg p
LEFT JOIN auth.users u ON p.id = u.id;

-- View for content moderation
CREATE OR REPLACE VIEW content_moderation_view AS
SELECT 
    t.id,
    t.title,
    t.artist_id,
    p.username as artist_username,
    p.full_name as artist_name,
    t.genre,
    t.duration,
    t.approval_status,
    t.rejection_reason,
    t.created_at,
    t.updated_at,
    (SELECT COUNT(*) FROM track_plays_emg WHERE track_id = t.id) as play_count
FROM tracks_emg t
JOIN profiles_emg p ON t.artist_id = p.id;

-- =============================================
-- GRANT PERMISSIONS
-- =============================================

-- Grant necessary permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON support_tickets_emg TO authenticated;
GRANT SELECT, INSERT ON support_ticket_messages_emg TO authenticated;
GRANT SELECT ON platform_announcements_emg TO authenticated;
GRANT SELECT ON system_settings_emg TO authenticated;
GRANT SELECT, INSERT ON user_activity_logs_emg TO authenticated;
GRANT SELECT, INSERT, UPDATE ON collaboration_requests_emg TO authenticated;
GRANT SELECT, INSERT, UPDATE ON active_collaborations_emg TO authenticated;

-- Grant admin permissions
GRANT ALL ON support_tickets_emg TO authenticated;
GRANT ALL ON support_ticket_messages_emg TO authenticated;
GRANT ALL ON platform_announcements_emg TO authenticated;
GRANT ALL ON system_settings_emg TO authenticated;
GRANT ALL ON user_activity_logs_emg TO authenticated;
GRANT ALL ON admin_actions_log_emg TO authenticated;
GRANT ALL ON platform_analytics_emg TO authenticated;
GRANT ALL ON device_analytics_emg TO authenticated;
GRANT ALL ON content_moderation_log_emg TO authenticated;

-- Grant permissions on views
GRANT SELECT ON admin_dashboard_stats TO authenticated;
GRANT SELECT ON user_management_view TO authenticated;
GRANT SELECT ON content_moderation_view TO authenticated;

-- =============================================
-- COMPLETION MESSAGE
-- =============================================

DO $$
BEGIN
    RAISE NOTICE 'Database schema update completed successfully!';
    RAISE NOTICE 'New tables created: support_tickets_emg, platform_announcements_emg, system_settings_emg, user_activity_logs_emg, admin_actions_log_emg, collaboration_requests_emg, active_collaborations_emg, platform_analytics_emg, device_analytics_emg, content_moderation_log_emg';
    RAISE NOTICE 'Enhanced existing tables with new columns for better admin dashboard functionality';
    RAISE NOTICE 'Created views for admin dashboard statistics and management';
    RAISE NOTICE 'Added comprehensive RLS policies for security';
    RAISE NOTICE 'Inserted default system settings';
END $$;
