// SEO Configuration for EMG Music Platform
export const SEO_CONFIG = {
  // Default SEO settings
  default: {
    title: "EMG Music Platform - Independent Artist Music Distribution & Analytics",
    description: "Join EMG Music Platform - the ultimate destination for independent artists to distribute music, track analytics, and monetize their content across global streaming platforms.",
    keywords: "music distribution, independent artists, music analytics, streaming platforms, music monetization, artist platform, music upload, track analytics, music promotion",
    image: "https://emg-build.onrender.com/logo.png",
    url: "https://emg-build.onrender.com/",
    type: "website"
  },

  // Page-specific SEO configurations
  pages: {
    home: {
      title: "EMG Music Platform - Independent Artist Music Distribution & Analytics",
      description: "Join EMG Music Platform - the ultimate destination for independent artists to distribute music, track analytics, and monetize their content across global streaming platforms.",
      keywords: "music distribution, independent artists, music analytics, streaming platforms, music monetization, artist platform, music upload, track analytics, music promotion, Spotify, Apple Music, YouTube Music"
    },
    
    login: {
      title: "Login - EMG Music Platform | Artist Dashboard Access",
      description: "Sign in to your EMG Music Platform account to access your artist dashboard, upload music, track analytics, and manage your music distribution.",
      keywords: "login, artist login, music platform login, EMG login, artist dashboard, music distribution login"
    },
    
    signup: {
      title: "Sign Up - EMG Music Platform | Start Your Music Journey",
      description: "Create your free EMG Music Platform account and start distributing your music to global streaming platforms. Join thousands of independent artists.",
      keywords: "sign up, register, music platform registration, artist signup, free music distribution, independent artist platform"
    },
    
    discover: {
      title: "Discover Music - EMG Music Platform | Find New Artists & Tracks",
      description: "Discover amazing independent artists and their music on EMG Music Platform. Explore new tracks, genres, and emerging talent.",
      keywords: "discover music, independent artists, new music, music discovery, emerging artists, music exploration"
    },
    
    artists: {
      title: "Featured Artists - EMG Music Platform | Independent Music Creators",
      description: "Meet the talented independent artists on EMG Music Platform. Discover their stories, music, and connect with emerging talent.",
      keywords: "featured artists, independent musicians, music creators, artist profiles, emerging talent, music community"
    },
    
    dashboard: {
      title: "Artist Dashboard - EMG Music Platform | Manage Your Music",
      description: "Access your comprehensive artist dashboard to upload music, track analytics, manage earnings, and grow your music career.",
      keywords: "artist dashboard, music management, upload music, track analytics, music earnings, artist tools"
    },
    
    help: {
      title: "Help & Support - EMG Music Platform | Get Assistance",
      description: "Get help with EMG Music Platform. Find answers to common questions, tutorials, and contact our support team.",
      keywords: "help, support, FAQ, music platform help, artist support, technical assistance"
    }
  },

  // Structured data templates
  structuredData: {
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "EMG Music Platform",
      "url": "https://emg-build.onrender.com/",
      "description": "The ultimate platform for independent artists to distribute music, track analytics, and monetize their content across global streaming platforms.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://emg-build.onrender.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "EMG Music Platform",
        "url": "https://emg-build.onrender.com/"
      }
    },
    
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "EMG Music Platform",
      "alternateName": "Explorer Music Group",
      "url": "https://emg-build.onrender.com/",
      "logo": "https://emg-build.onrender.com/logo.png",
      "description": "The ultimate platform for independent artists to distribute music, track analytics, and monetize their content across global streaming platforms.",
      "foundingDate": "2024",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "url": "https://emg-build.onrender.com/help"
      },
      "sameAs": [
        "https://emg-build.onrender.com/"
      ]
    },
    
    webApplication: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "EMG Music Platform",
      "alternateName": "Explorer Music Group",
      "url": "https://emg-build.onrender.com/",
      "description": "The ultimate platform for independent artists to distribute music, track analytics, and monetize their content across global streaming platforms.",
      "applicationCategory": "MusicApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free music distribution platform for independent artists"
      },
      "creator": {
        "@type": "Organization",
        "name": "EMG Music Platform",
        "url": "https://emg-build.onrender.com/"
      },
      "featureList": [
        "Music Distribution",
        "Analytics Dashboard",
        "Revenue Tracking",
        "Artist Profile Management",
        "Global Platform Reach"
      ]
    }
  }
};

// Helper function to get SEO config for a specific page
export const getSEOConfig = (pageName, customData = {}) => {
  const pageConfig = SEO_CONFIG.pages[pageName] || SEO_CONFIG.default;
  return {
    ...SEO_CONFIG.default,
    ...pageConfig,
    ...customData
  };
};

// Helper function to get structured data for a specific type
export const getStructuredData = (type, customData = {}) => {
  const baseData = SEO_CONFIG.structuredData[type] || SEO_CONFIG.structuredData.website;
  return {
    ...baseData,
    ...customData
  };
};
