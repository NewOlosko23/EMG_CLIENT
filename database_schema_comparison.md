# Database Schema Update Comparison

## Overview
This document compares the original `database_schema.sql` with the new `update_database_schema.sql` to show what has been added and enhanced to support the comprehensive admin dashboard.

## New Tables Added

### 1. Support Tickets System
- **`support_tickets_emg`** - Enhanced support ticket management
  - Auto-generated ticket numbers
  - Assignment to admin users
  - Priority and status tracking
  - Resolution notes and timestamps
  - Category and tag support

- **`support_ticket_messages_emg`** - Conversation history
  - Message threading
  - Sender type (user/admin/system)
  - Internal admin notes
  - Attachment support

### 2. Enhanced Announcements
- **`platform_announcements_emg`** - Comprehensive announcement system
  - Multiple announcement types (feature, maintenance, welcome, etc.)
  - Scheduling and expiration
  - Target audience specification
  - View tracking and analytics
  - Featured announcements
  - Rich content support

### 3. System Configuration
- **`system_settings_emg`** - Centralized settings management
  - Category-based organization
  - Encrypted sensitive data support
  - Public/private setting visibility
  - Type-safe value storage (string, number, boolean, json, array)

### 4. Activity and Audit Logging
- **`user_activity_logs_emg`** - User activity tracking
  - Action logging (login, upload, edit, etc.)
  - Resource tracking
  - IP and user agent logging
  - Metadata support

- **`admin_actions_log_emg`** - Admin action audit trail
  - Admin action tracking
  - Before/after value comparison
  - Reason and context logging
  - Security audit support

### 5. Collaboration System
- **`collaboration_requests_emg`** - Artist collaboration requests
  - Request management
  - Status tracking (pending, accepted, rejected)
  - Response messaging
  - Deadline management

- **`active_collaborations_emg`** - Ongoing collaboration projects
  - Progress tracking
  - Status updates
  - Deadline management
  - Project notes

### 6. Analytics and Reporting
- **`platform_analytics_emg`** - Detailed platform metrics
  - Metric tracking (user growth, revenue, etc.)
  - Category-based organization
  - Breakdown data support
  - Historical data storage

- **`device_analytics_emg`** - Device and browser analytics
  - Device type tracking
  - Browser and OS analytics
  - Geographic data
  - Session analytics

### 7. Content Moderation
- **`content_moderation_log_emg`** - Moderation audit trail
  - Moderation action logging
  - Reason and notes tracking
  - Status change history
  - Moderator accountability

## Enhanced Existing Tables

### profiles_emg Enhancements
```sql
-- New columns added:
- last_activity_at TIMESTAMP WITH TIME ZONE
- login_count INTEGER DEFAULT 0
- failed_login_attempts INTEGER DEFAULT 0
- account_locked_until TIMESTAMP WITH TIME ZONE
- two_factor_enabled BOOLEAN DEFAULT FALSE
- two_factor_secret TEXT
- email_verification_token TEXT
- password_reset_token TEXT
- password_reset_expires TIMESTAMP WITH TIME ZONE
- profile_views INTEGER DEFAULT 0
- is_banned BOOLEAN DEFAULT FALSE
- ban_reason TEXT
- ban_expires_at TIMESTAMP WITH TIME ZONE
```

### tracks_emg Enhancements
```sql
-- New columns added:
- moderation_notes TEXT
- moderation_date TIMESTAMP WITH TIME ZONE
- moderated_by UUID REFERENCES profiles_emg(id)
- view_count INTEGER DEFAULT 0
- download_count INTEGER DEFAULT 0
- share_count INTEGER DEFAULT 0
- average_rating DECIMAL(3,2) DEFAULT 0
- rating_count INTEGER DEFAULT 0
- is_featured BOOLEAN DEFAULT FALSE
- featured_until TIMESTAMP WITH TIME ZONE
- copyright_claim BOOLEAN DEFAULT FALSE
- copyright_notes TEXT
```

### announcements_emg Enhancements
```sql
-- New columns added:
- view_count INTEGER DEFAULT 0
- scheduled_at TIMESTAMP WITH TIME ZONE
- expires_at TIMESTAMP WITH TIME ZONE
- tags TEXT[]
- cover_image_url TEXT
```

## New Indexes for Performance

### Support System Indexes
- `idx_support_tickets_emg_user_id`
- `idx_support_tickets_emg_status`
- `idx_support_tickets_emg_priority`
- `idx_support_tickets_emg_category`
- `idx_support_tickets_emg_created_at`
- `idx_support_tickets_emg_assigned_admin`

### Analytics Indexes
- `idx_platform_analytics_emg_date`
- `idx_platform_analytics_emg_metric`
- `idx_platform_analytics_emg_category`
- `idx_device_analytics_emg_date`
- `idx_device_analytics_emg_device_type`

### Activity and Audit Indexes
- `idx_user_activity_logs_emg_user_id`
- `idx_user_activity_logs_emg_action`
- `idx_admin_actions_log_emg_admin_id`
- `idx_admin_actions_log_emg_action`
- `idx_content_moderation_log_emg_content`

## New Row Level Security Policies

### Support Tickets
- Users can view their own tickets
- Admins can view all tickets
- Users can create tickets
- Admins can update tickets

### Platform Announcements
- Everyone can view active announcements
- Admins can manage all announcements

### System Settings
- Admins can view all settings
- Users can view public settings
- Admins can update settings

### Activity Logs
- Users can view their own activity
- Admins can view all activity

### Collaboration System
- Users can view their collaboration requests
- Users can create collaboration requests
- Users can update their collaboration requests

## New Functions and Triggers

### Ticket Management
- `generate_ticket_number()` - Auto-generates ticket numbers
- `update_ticket_timestamps()` - Updates ticket response timestamps

### Activity Logging
- `log_user_activity()` - Logs user profile updates
- `log_admin_action()` - Logs admin actions for audit

### Triggers
- `generate_support_ticket_number` - Generates ticket numbers on insert
- `update_ticket_on_message` - Updates ticket timestamps on message insert
- `log_profile_activity` - Logs profile updates
- `log_track_admin_actions` - Logs track moderation actions

## New Views for Admin Dashboard

### admin_dashboard_stats
Provides real-time statistics for the admin dashboard:
- Total active users
- New users today
- Pending tracks
- Open tickets
- In-progress tickets
- Monthly revenue
- Active announcements

### user_management_view
Comprehensive user data for user management:
- User profile information
- Activity metrics
- Track count
- Ticket count

### content_moderation_view
Track data for content moderation:
- Track information
- Artist details
- Approval status
- Play count

## Default System Settings

The update script includes default system settings for:
- **General**: Platform name, description, maintenance mode, registration settings
- **Email**: SMTP configuration, sender information
- **Payment**: Commission rates, payout settings, currency
- **Storage**: File size limits, allowed formats, CDN settings
- **Security**: Session timeout, login attempts, 2FA settings
- **Notifications**: Email, push, SMS notification settings
- **API**: Version, rate limiting, API key requirements

## Security Enhancements

### Enhanced User Security
- Account locking after failed attempts
- Two-factor authentication support
- Password reset token management
- Email verification tokens
- Account banning capabilities

### Admin Audit Trail
- Complete admin action logging
- Before/after value tracking
- Reason and context logging
- IP and user agent tracking

### Content Moderation
- Detailed moderation logging
- Moderator accountability
- Status change tracking
- Reason and notes support

## Performance Optimizations

### New Indexes
- Comprehensive indexing on all new tables
- Optimized queries for admin dashboard
- Fast lookups for user management
- Efficient analytics queries

### Views
- Pre-computed statistics
- Optimized data access patterns
- Reduced query complexity

## Migration Notes

1. **Backward Compatibility**: All existing tables and data remain unchanged
2. **New Features**: All new functionality is additive
3. **Default Values**: New columns have appropriate default values
4. **Permissions**: Proper RLS policies ensure security
5. **Performance**: New indexes ensure good query performance

## Usage Instructions

1. **Run the Update Script**: Execute `update_database_schema.sql` on your database
2. **Verify Installation**: Check that all new tables and views are created
3. **Test Permissions**: Ensure RLS policies are working correctly
4. **Configure Settings**: Update system settings as needed for your environment
5. **Monitor Performance**: Watch for any performance issues with new indexes

This update provides a comprehensive foundation for the admin dashboard while maintaining backward compatibility and ensuring security and performance.
