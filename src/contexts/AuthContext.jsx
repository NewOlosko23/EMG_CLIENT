import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { APP_CONFIG } from '../config/constants';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  // Function to fetch user data from our users table
  const fetchUserData = async (authUser) => {
    if (!authUser?.id) {
      console.log('No auth user ID provided');
      return authUser;
    }
    
    try {
      console.log('Fetching user data for ID:', authUser.id);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();
      
      if (error) {
        console.error('Error fetching user data:', error);
        
        // If user doesn't exist in database, create a basic record
        if (error.code === 'PGRST116') {
          console.log('User not found in database, creating basic record...');
          try {
            const { data: newUser, error: insertError } = await supabase
              .from('users')
              .insert({
                id: authUser.id,
                username: authUser.user_metadata?.username || `user_${authUser.id.substring(0, 8)}`,
                email: authUser.email,
                role: authUser.user_metadata?.role || 'user'
              })
              .select()
              .single();
            
            if (insertError) {
              console.error('Error creating user record:', insertError);
              return authUser;
            }
            
            console.log('Successfully created user record:', newUser);
            
            // Return auth user with database data
            return {
              ...authUser,
              user_metadata: {
                ...authUser.user_metadata,
                username: newUser.username,
                role: newUser.role,
                avatar: newUser.avatar,
                phone: newUser.phone,
                location: newUser.location,
                country: newUser.country
              }
            };
          } catch (insertError) {
            console.error('Error creating user record:', insertError);
            return authUser;
          }
        }
        
        // Return auth user even if database fetch fails
        return authUser;
      }
      
      console.log('Successfully fetched user data:', data);
      
      // Merge auth user data with database user data
      return {
        ...authUser,
        user_metadata: {
          ...authUser.user_metadata,
          username: data.username,
          role: data.role,
          avatar: data.avatar,
          phone: data.phone,
          location: data.location,
          country: data.country
        }
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Return auth user even if database fetch fails
      return authUser;
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('Getting initial session...');
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Initial session:', session);
        setSession(session);
        
        if (session?.user) {
          console.log('User found in session, fetching user data...');
          const userWithData = await fetchUserData(session.user);
          setUser(userWithData);
        } else {
          console.log('No user in session');
          setUser(null);
        }
        
        console.log('Setting loading to false');
        setLoading(false);
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        setLoading(false);
      }
    };

    getInitialSession();

    // Fallback timeout to ensure loading is set to false
    const fallbackTimeout = setTimeout(() => {
      console.log('Fallback timeout: setting loading to false');
      setLoading(false);
    }, 5000); // 5 second timeout

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          console.log('Auth state change:', event, session);
          setSession(session);
          
          if (session?.user) {
            console.log('User found in auth state change, fetching user data...');
            const userWithData = await fetchUserData(session.user);
            setUser(userWithData);
          } else {
            console.log('No user in auth state change');
            setUser(null);
          }
          
          console.log('Setting loading to false in auth state change');
          setLoading(false);
        } catch (error) {
          console.error('Error in auth state change:', error);
          setLoading(false);
        }
      }
    );

    return () => {
      clearTimeout(fallbackTimeout);
      subscription.unsubscribe();
    };
  }, []);

  // Sign up function
  const signUp = async (email, password, userData = {}) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      if (error) throw error;
      
      // If user was created successfully, manually create user record
      if (data.user) {
        try {
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              username: userData.username || `user_${data.user.id.substring(0, 8)}`,
              email: email,
              role: userData.role || 'user'
            });
          
          if (insertError) {
            console.error('Error creating user record:', insertError);
            // Don't fail the signup if user record creation fails
          }
        } catch (insertError) {
          console.error('Error creating user record:', insertError);
          // Don't fail the signup if user record creation fails
        }
        
        // Fetch the user data
        const userWithData = await fetchUserData(data.user);
        setUser(userWithData);
      }
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  // Sign in function
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Fetch user data after successful sign in
      if (data.user) {
        const userWithData = await fetchUserData(data.user);
        setUser(userWithData);
      }
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      console.log('Starting signOut process');
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('SignOut successful');
      // Clear user state
      setUser(null);
      setSession(null);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (email) => {
    try {
      // Use production domain for email redirects
      const redirectUrl = APP_CONFIG.getEmailRedirectUrl(APP_CONFIG.REDIRECT_PATHS.RESET_PASSWORD);
      
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Update password function
  const updatePassword = async (newPassword) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    updatePassword,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
