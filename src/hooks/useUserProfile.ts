import { useState, useEffect } from 'react';
import { UserProfile } from '../services/openaiService';

const DEFAULT_PROFILE: UserProfile = {
  age: 25,
  gender: 'non-binary',
  country: 'US',
  favoriteGenres: ['Action', 'Drama', 'Sci-Fi'],
  watchHistory: [],
  ratings: {},
  languages: ['English'],
  mood: 'any'
};

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fairflicks_user_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('fairflicks_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const addToWatchHistory = (movieTitle: string) => {
    setUserProfile(prev => ({
      ...prev,
      watchHistory: [...prev.watchHistory.slice(-49), movieTitle] // Keep last 50
    }));
  };

  const rateMovie = (movieId: string, rating: number) => {
    setUserProfile(prev => ({
      ...prev,
      ratings: { ...prev.ratings, [movieId]: rating }
    }));
  };

  const setMood = (mood: string) => {
    setUserProfile(prev => ({ ...prev, mood }));
  };

  // Simulate learning from user behavior
  const learnFromInteraction = (movieTitle: string, genre: string[], interaction: 'like' | 'dislike' | 'watch') => {
    if (interaction === 'like' || interaction === 'watch') {
      const newGenres = genre.filter(g => !userProfile.favoriteGenres.includes(g));
      if (newGenres.length > 0) {
        setUserProfile(prev => ({
          ...prev,
          favoriteGenres: [...prev.favoriteGenres, ...newGenres.slice(0, 2)]
        }));
      }
    }
  };

  return {
    userProfile,
    updateProfile,
    addToWatchHistory,
    rateMovie,
    setMood,
    learnFromInteraction,
    isLoading,
    setIsLoading
  };
};