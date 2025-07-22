import React, { useState } from 'react';
import { X, User, Globe, Calendar, Heart } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';

interface UserProfileSetupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileSetup: React.FC<UserProfileSetupProps> = ({ isOpen, onClose }) => {
  const { userProfile, updateProfile } = useUserProfile();
  const [formData, setFormData] = useState(userProfile);

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' }
  ];

  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music',
    'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Japanese', 'Korean', 'Mandarin', 'Hindi', 'Arabic', 'Russian'
  ];

  const handleSave = () => {
    updateProfile(formData);
    onClose();
  };

  const toggleGenre = (genre: string) => {
    const currentGenres = formData.favoriteGenres;
    if (currentGenres.includes(genre)) {
      setFormData({
        ...formData,
        favoriteGenres: currentGenres.filter(g => g !== genre)
      });
    } else {
      setFormData({
        ...formData,
        favoriteGenres: [...currentGenres, genre]
      });
    }
  };

  const toggleLanguage = (language: string) => {
    const currentLanguages = formData.languages;
    if (currentLanguages.includes(language)) {
      setFormData({
        ...formData,
        languages: currentLanguages.filter(l => l !== language)
      });
    } else {
      setFormData({
        ...formData,
        languages: [...currentLanguages, language]
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold flex items-center">
            <User size={24} className="mr-3 text-[#00D9FF]" />
            Personalize Your Experience
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                <Calendar size={16} className="inline mr-2" />
                Age
              </label>
              <input
                type="number"
                min="13"
                max="100"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 18 })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-[#00D9FF]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Gender Identity</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-[#00D9FF]"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <Globe size={16} className="inline mr-2" />
              Country
            </label>
            <select
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-[#00D9FF]"
            >
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Favorite Genres */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <Heart size={16} className="inline mr-2" />
              Favorite Genres (Select up to 5)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  disabled={!formData.favoriteGenres.includes(genre) && formData.favoriteGenres.length >= 5}
                  className={`p-2 rounded-lg text-sm transition-colors ${
                    formData.favoriteGenres.includes(genre)
                      ? 'bg-[#00D9FF] text-black'
                      : 'bg-gray-800 hover:bg-gray-700 disabled:opacity-50'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium mb-2">Preferred Languages</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {languages.map(language => (
                <button
                  key={language}
                  onClick={() => toggleLanguage(language)}
                  className={`p-2 rounded-lg text-sm transition-colors ${
                    formData.languages.includes(language)
                      ? 'bg-[#39FF14] text-black'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2 text-[#39FF14]">🔒 Privacy & Fairness</h3>
            <p className="text-sm text-gray-300">
              Your data helps us provide personalized, bias-free recommendations. We use this information to:
            </p>
            <ul className="text-sm text-gray-400 mt-2 space-y-1">
              <li>• Ensure diverse and inclusive movie suggestions</li>
              <li>• Avoid gender and cultural stereotypes</li>
              <li>• Recommend content from your region and preferred languages</li>
              <li>• Continuously improve our fairness algorithms</li>
            </ul>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full py-3 bg-gradient-to-r from-[#00D9FF] to-[#39FF14] text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Save Profile & Get Personalized Recommendations
          </button>
        </div>
      </div>
    </div>
  );
};