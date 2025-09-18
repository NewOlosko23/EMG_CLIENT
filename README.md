# EMG Music Platform

A comprehensive music platform built with React, Vite, and Supabase for artists to showcase their music, manage their profiles, and connect with fans.

## Features

### Artist Profile Management
- **Comprehensive Profile Setup**: Artists can update their profiles with detailed information including:
  - Basic information (username, full name, artist name, bio)
  - Location details (country, state, city)
  - Contact information (phone, website, social media links)
  - Professional details (music genres, instruments, years of experience)
  - Privacy settings and preferences
  - Profile picture upload with preview
  - Real-time profile completion tracking

- **Profile Completion Tracking**: Visual progress indicator showing profile completion percentage to encourage artists to provide complete information

- **Social Media Integration**: Easy setup for Instagram, Twitter, Facebook, YouTube, and TikTok profiles

- **Music Genre & Instrument Management**: Dynamic addition/removal of music genres and instruments with common options provided

### Technical Features
- Built with React 18 and Vite for fast development and hot module replacement
- Supabase integration for authentication and database management
- Responsive design with Tailwind CSS
- Real-time data synchronization
- File upload support for profile pictures
- Form validation and error handling
- Toast notifications for user feedback

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Navigate to the artist profile page at `/dashboard/profile` to update your profile information.

## Project Structure

- `src/pages/ArtistProfile.jsx` - Main artist profile management component
- `src/routes/Routers.jsx` - Application routing configuration
- `src/pages/Dashboard.jsx` - Dashboard with navigation to profile page
- `database_schema.sql` - Complete database schema with artist profile fields

## Database Schema

The platform uses a comprehensive `profiles_emg` table that includes:
- Basic user information
- Location and contact details
- Professional music information
- Privacy and preference settings
- Profile completion tracking
- Social media links

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
