-- =============================================
-- ADD EVENTS AND CAMPAIGNS FUNCTIONALITY
-- This file adds the events_emg table and enhances campaigns_emg
-- Run this in your SQL editor to add the new functionality
-- =============================================

-- =============================================
-- CREATE EVENTS TABLE
-- =============================================

-- Calendar events table
CREATE TABLE IF NOT EXISTS events_emg (
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
-- ENABLE ROW LEVEL SECURITY
-- =============================================

-- Enable RLS on events table
ALTER TABLE events_emg ENABLE ROW LEVEL SECURITY;

-- =============================================
-- CREATE INDEXES FOR PERFORMANCE
-- =============================================

-- Events indexes
CREATE INDEX IF NOT EXISTS idx_events_emg_user_id ON events_emg(user_id);
CREATE INDEX IF NOT EXISTS idx_events_emg_event_type ON events_emg(event_type);
CREATE INDEX IF NOT EXISTS idx_events_emg_event_date ON events_emg(event_date);
CREATE INDEX IF NOT EXISTS idx_events_emg_status ON events_emg(status);

-- =============================================
-- CREATE ROW LEVEL SECURITY POLICIES
-- =============================================

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
-- CREATE TRIGGERS FOR UPDATED_AT
-- =============================================

-- Create trigger for events table updated_at
CREATE TRIGGER update_events_emg_updated_at BEFORE UPDATE ON events_emg
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- VERIFY SETUP
-- =============================================

-- Check if events table was created successfully
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'events_emg' 
ORDER BY ordinal_position;

-- Check if policies were created
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'events_emg';

-- Check if indexes were created
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'events_emg';

-- =============================================
-- SAMPLE DATA (OPTIONAL - FOR TESTING)
-- =============================================

-- Uncomment the following lines to insert sample events for testing
-- Note: Replace 'your-user-id-here' with an actual user ID from your profiles_emg table

/*
INSERT INTO events_emg (user_id, title, description, event_type, event_date, event_time, location, status, notes) VALUES
('your-user-id-here', 'New Single Release', 'Releasing my latest single "Summer Vibes"', 'release', '2024-04-01', '00:00', 'All Platforms', 'upcoming', 'Make sure all platforms are ready'),
('your-user-id-here', 'Studio Session', 'Recording session with producer', 'meeting', '2024-04-05', '14:00', 'Studio A', 'upcoming', 'Bring lyrics and reference tracks'),
('your-user-id-here', 'Playlist Submission Deadline', 'Submit tracks for Electronic Vibes playlist', 'deadline', '2024-04-10', '23:59', 'Online', 'upcoming', 'Submit "Neon Lights" and "Electric Dreams"'),
('your-user-id-here', 'Live Performance', 'Live set at Club Electronica', 'performance', '2024-04-15', '20:00', 'Club Electronica', 'upcoming', 'Setlist finalized, equipment checked'),
('your-user-id-here', 'Promotion Campaign Launch', 'Launch social media promotion campaign', 'promotion', '2024-04-20', '09:00', 'Social Media', 'upcoming', 'Content created, posting schedule set');
*/

-- =============================================
-- NOTES
-- =============================================

/*
This SQL script adds:

1. events_emg table with all necessary fields for calendar functionality
2. Proper indexes for performance optimization
3. Row Level Security policies for data protection
4. Triggers for automatic updated_at timestamp management
5. Verification queries to confirm successful setup

The events table supports:
- Multiple event types (release, meeting, deadline, performance, promotion, other)
- Date and time management with all-day event support
- Location tracking
- Status management (upcoming, completed, cancelled, postponed)
- Notes and reminders
- User-specific data with proper RLS policies

To use this:
1. Run this entire script in your Supabase SQL editor
2. The events table will be created with all necessary policies and indexes
3. Your existing data will remain untouched
4. The frontend code is already updated to work with this new table structure

If you want to test with sample data, uncomment the INSERT statements and replace 'your-user-id-here' with an actual user ID from your profiles_emg table.
*/
