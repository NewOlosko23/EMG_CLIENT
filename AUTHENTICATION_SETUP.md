# EMG Music Platform - Authentication Setup Guide

## Overview
This guide will help you set up authentication for your EMG Music Platform using React Context and Supabase.

## Features Implemented
- ✅ React Context for authentication state management
- ✅ Protected routes for dashboard access
- ✅ Role-based access control (user, artist, admin)
- ✅ Login/Signup forms with validation
- ✅ Admin dashboard with user management
- ✅ Automatic profile creation on signup
- ✅ Secure logout functionality

## Setup Instructions

### 1. Supabase Database Setup

1. **Run the SQL commands** in your Supabase project:
   - Open your Supabase project dashboard
   - Go to SQL Editor
   - Copy and paste the contents of `supabase_setup.sql`
   - Execute the SQL script

2. **Configure Authentication Settings**:
   - Go to Authentication > Settings in your Supabase dashboard
   - Enable email confirmations
   - Configure your email templates
   - Set up your domain for email confirmations

### 2. Environment Variables

Create a `.env.local` file in your project root with:

```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

You can find these values in your Supabase project settings.

### 3. Create Your First Admin User

1. **Sign up through your app** using the signup form
2. **Update the user role** to admin by running this SQL in Supabase:
   ```sql
   UPDATE public.profiles 
   SET role = 'admin' 
   WHERE id = 'your-user-id-here';
   ```
   Or update the user's metadata in the Supabase dashboard.

## File Structure

```
src/
├── contexts/
│   └── AuthContext.jsx          # Authentication context and provider
├── components/
│   └── ProtectedRoute.jsx       # Protected route wrapper component
├── pages/
│   ├── Login.jsx               # Updated login form with auth integration
│   ├── Signup.jsx              # Updated signup form with auth integration
│   └── Admin.jsx               # Admin dashboard with user info
├── routes/
│   └── Routers.jsx             # Updated routing with protected routes
└── App.jsx                     # Updated with AuthProvider
```

## Usage

### Protected Routes
- `/Dashboard` - Requires authentication (any role)
- `/Admin` - Requires authentication + admin role

### Authentication Context
Use the `useAuth` hook in any component:

```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, signOut } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      <p>Welcome, {user?.user_metadata?.full_name}!</p>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}
```

### Role-Based Access
The system supports three roles:
- `user` - Regular users
- `artist` - Artists with additional permissions
- `admin` - Full administrative access

## Database Schema

### Tables Created:
1. **profiles** - User profile information
2. **artists** - Artist-specific information
3. **tracks** - Music tracks (for future use)

### Security:
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Public read access for published content

## Testing

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Test the authentication flow**:
   - Visit `/Signup` to create a new account
   - Check your email for confirmation
   - Visit `/Login` to sign in
   - Try accessing `/Dashboard` (should work after login)
   - Try accessing `/Admin` (should work only for admin users)

## Troubleshooting

### Common Issues:

1. **"useAuth must be used within an AuthProvider"**
   - Make sure your app is wrapped with `<AuthProvider>`

2. **Authentication not working**
   - Check your environment variables
   - Verify Supabase project settings
   - Check browser console for errors

3. **Email confirmations not working**
   - Configure email templates in Supabase dashboard
   - Check spam folder
   - Verify domain settings

4. **Role-based access not working**
   - Ensure user has the correct role in the profiles table
   - Check that the role is set in user metadata

## Next Steps

Consider implementing:
- Password reset functionality
- Email verification flow
- Social login (Google, GitHub, etc.)
- User profile management
- Artist profile management
- Music upload functionality

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify your Supabase configuration
3. Ensure all SQL commands were executed successfully
4. Check that environment variables are set correctly
