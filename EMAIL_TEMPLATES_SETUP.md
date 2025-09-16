# EMG Music Platform - Email Templates Setup Guide

## Overview
This guide will help you set up professional email templates for your EMG Music Platform authentication system using Supabase.

## Email Templates Included

### 1. Email Confirmation Template
- **File**: `email_templates/confirmation_email.html`
- **Purpose**: Sent when users sign up to confirm their email address
- **Features**: 
  - Professional EMG Music branding
  - Clear call-to-action button
  - Security information
  - Platform features preview
  - Mobile-responsive design

### 2. Password Reset Template
- **File**: `email_templates/password_reset_email.html`
- **Purpose**: Sent when users request a password reset
- **Features**:
  - Security-focused design
  - Clear instructions
  - Expiration notice
  - Alternative link option

### 3. Email Change Confirmation Template
- **File**: `email_templates/email_change_confirmation.html`
- **Purpose**: Sent when users request to change their email address
- **Features**:
  - Orange/amber theme for change notifications
  - Clear before/after email display
  - Security warnings
  - Professional change confirmation flow

### 4. User Invitation Template
- **File**: `email_templates/invite_user.html`
- **Purpose**: Sent when inviting new users to join the platform
- **Features**:
  - Green theme for positive invitation
  - Exclusive invitation branding
  - Platform benefits preview
  - Social media integration

### 5. Magic Link Template
- **File**: `email_templates/magic_link.html`
- **Purpose**: Sent for passwordless login via magic link
- **Features**:
  - Purple theme matching main brand
  - Animated sparkle effects
  - Quick access features preview
  - Security information

### 6. Reauthentication Confirmation Template
- **File**: `email_templates/reauthentication_confirmation.html`
- **Purpose**: Sent when users need to verify their identity for sensitive operations
- **Features**:
  - Red theme for high-security operations
  - Large, clear verification code display
  - Step-by-step instructions
  - Copy-to-clipboard functionality
  - Strong security warnings

## Setup Instructions

### Step 1: Access Supabase Email Templates

1. **Login to your Supabase Dashboard**
2. **Navigate to Authentication > Email Templates**
3. **You'll see three template types**:
   - Confirm signup
   - Reset password
   - Magic link

### Step 2: Configure Email Confirmation Template

1. **Click on "Confirm signup" template**
2. **Replace the default template** with the content from `confirmation_email.html`
3. **Configure the following settings**:
   - **Subject**: `Welcome to EMG Music - Confirm Your Account`
   - **From name**: `EMG Music Team`
   - **From email**: `noreply@yourdomain.com` (use your domain)

### Step 3: Configure Password Reset Template

1. **Click on "Reset password" template**
2. **Replace the default template** with the content from `password_reset_email.html`
3. **Configure the following settings**:
   - **Subject**: `EMG Music - Reset Your Password`
   - **From name**: `EMG Music Security`
   - **From email**: `security@yourdomain.com`

### Step 4: Configure Magic Link Template

1. **Click on "Magic Link" template**
2. **Replace the default template** with the content from `magic_link.html`
3. **Configure the following settings**:
   - **Subject**: `EMG Music - Your Login Link is Ready`
   - **From name**: `EMG Music`
   - **From email**: `noreply@yourdomain.com`

### Step 5: Configure Reauthentication Template

1. **Click on "Reauthentication" template** (if available in your Supabase version)
2. **Replace the default template** with the content from `reauthentication_confirmation.html`
3. **Configure the following settings**:
   - **Subject**: `EMG Music - Security Verification Required`
   - **From name**: `EMG Music Security`
   - **From email**: `security@yourdomain.com`

### Step 6: Configure Additional Templates (Optional)

If you want to enable other authentication methods, you can create similar templates:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your EMG Music Login Link</title>
    <style>
        /* Use similar styling as confirmation email */
        body { font-family: Arial, sans-serif; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 40px; text-align: center; color: white; }
        .content { padding: 40px; text-align: center; }
        .login-button { display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 50px; font-weight: 600; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>EMG MUSIC</h1>
            <p>Your Gateway to Musical Excellence</p>
        </div>
        <div class="content">
            <h2>Your Login Link is Ready! 🎵</h2>
            <p>Click the button below to securely log into your EMG Music account:</p>
            <a href="{{ .ConfirmationURL }}" class="login-button">🎵 Login to EMG Music</a>
            <p><small>This link will expire in 1 hour for your security.</small></p>
        </div>
    </div>
</body>
</html>
```

## Template Variables

Supabase provides these variables for use in templates:

### Available Variables:
- `{{ .ConfirmationURL }}` - The confirmation/reset URL
- `{{ .Token }}` - The confirmation token
- `{{ .Email }}` - The user's email address
- `{{ .SiteURL }}` - Your site URL
- `{{ .RedirectTo }}` - Redirect URL after confirmation

### Example Usage:
```html
<p>Hello {{ .Email }},</p>
<p>Click here to confirm: <a href="{{ .ConfirmationURL }}">Confirm Account</a></p>
<p>Or visit: {{ .SiteURL }}</p>
```

## Customization Options

### 1. Branding
- **Logo**: Replace "EMG MUSIC" with your actual logo image
- **Colors**: Update the gradient colors in the CSS
- **Fonts**: Change font families to match your brand

### 2. Content
- **Welcome message**: Customize the welcome text
- **Features**: Update the platform features list
- **Social links**: Add your actual social media URLs
- **Support email**: Update the support contact information

### 3. Styling
- **Layout**: Modify the container width, padding, margins
- **Buttons**: Change button styles, colors, and hover effects
- **Responsive**: Adjust mobile responsiveness

## Testing Your Templates

### 1. Test Email Confirmation
1. **Sign up with a test email**
2. **Check your email inbox**
3. **Verify the template renders correctly**
4. **Test the confirmation link**

### 2. Test Password Reset
1. **Go to login page**
2. **Click "Forgot password"**
3. **Enter your email**
4. **Check for the reset email**
5. **Test the reset link**

### 3. Email Client Compatibility
Test your templates in:
- **Gmail** (web and mobile)
- **Outlook** (web and desktop)
- **Apple Mail**
- **Yahoo Mail**

## Advanced Configuration

### 1. Custom SMTP (Optional)
If you want to use your own email service:

1. **Go to Authentication > Settings**
2. **Scroll to "SMTP Settings"**
3. **Configure your SMTP provider**:
   - **Host**: Your SMTP server
   - **Port**: Usually 587 or 465
   - **Username**: Your email username
   - **Password**: Your email password
   - **Sender name**: Your brand name
   - **Sender email**: Your verified email

### 2. Email Rate Limiting
Configure rate limiting in Authentication > Settings:
- **Max emails per hour**: Set appropriate limits
- **Max emails per day**: Prevent abuse

### 3. Custom Domain
For professional emails:
1. **Set up a custom domain** (e.g., `emgmusic.com`)
2. **Configure DNS records** for email
3. **Update email addresses** in templates

## Troubleshooting

### Common Issues:

1. **Emails not sending**
   - Check SMTP configuration
   - Verify email addresses
   - Check rate limits

2. **Templates not rendering**
   - Validate HTML syntax
   - Check for missing closing tags
   - Test with simple HTML first

3. **Links not working**
   - Verify `{{ .ConfirmationURL }}` is correct
   - Check redirect URLs in settings
   - Test in different email clients

4. **Styling issues**
   - Use inline CSS for better compatibility
   - Test in multiple email clients
   - Avoid complex CSS features

## Best Practices

### 1. Email Design
- **Keep it simple**: Avoid complex layouts
- **Use web-safe fonts**: Arial, Helvetica, Times New Roman
- **Include alt text**: For images
- **Test thoroughly**: In multiple email clients

### 2. Security
- **Use HTTPS**: For all links
- **Include expiration**: For reset links
- **Clear instructions**: For security actions
- **Contact information**: For support

### 3. User Experience
- **Clear subject lines**: Descriptive and actionable
- **Prominent buttons**: Easy to find and click
- **Mobile-friendly**: Responsive design
- **Fallback options**: Alternative links

## Support

If you need help with email templates:
1. **Check Supabase documentation**: [Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
2. **Test with simple templates first**: Start basic, then add complexity
3. **Use email testing tools**: Like Litmus or Email on Acid
4. **Contact Supabase support**: For platform-specific issues

## Next Steps

After setting up email templates:
1. **Test the complete authentication flow**
2. **Monitor email delivery rates**
3. **Gather user feedback**
4. **Iterate and improve templates**
5. **Set up email analytics** (optional)
