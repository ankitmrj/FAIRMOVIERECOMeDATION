import React, { useState } from 'react';
import { Search, Menu, User, Settings, Bell, Sliders } from 'lucide-react';
import { UserProfileSetup } from './UserProfileSetup';
import { useUserProfile } from '../hooks/useUserProfile';

interface HeaderProps {
  onMenuClick: () => void;
  onProfileClick: () => void;
  onAdminClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  onProfileClick,
  onAdminClick,
  searchQuery,
  onSearchChange
}) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const { userProfile } = useUserProfile();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/95 backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors md:hidden"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#00D9FF] to-[#39FF14] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">FF</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00D9FF] to-[#39FF14] bg-clip-text text-transparent">
              FairFlicks
            </h1>
          </div>
        </div>

        {/* Search section */}
        <div className="flex-1 max-w-2xl mx-8 hidden md:block">
          <div className={`relative transition-all duration-300 ${searchFocused ? 'transform scale-105' : ''}`}>
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search movies, genres, actors..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`w-full pl-12 pr-4 py-3 bg-gray-900 border-2 rounded-xl text-white placeholder-gray-400 
                focus:outline-none transition-all duration-300 ${
                searchFocused 
                  ? 'border-[#00D9FF] shadow-lg shadow-[#00D9FF]/20' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            />
            {searchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 rounded-xl border border-gray-700 shadow-2xl">
                <div className="p-4 text-sm text-gray-400">
                  💡 Try: "action movies", "comedy 2023", "Oscar winners"
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowProfileSetup(true)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Personalize Recommendations"
          >
            <Sliders size={20} />
          </button>
          
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#39FF14] rounded-full"></span>
          </button>
          
          <button
            onClick={onAdminClick}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Admin Analytics"
          >
            <Settings size={20} />
          </button>
          
          <button
            onClick={onProfileClick}
            className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-[#39FF14] to-[#00D9FF] rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xs">
                {userProfile.country}
              </span>
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium">Profile</div>
              <div className="text-xs text-gray-400">{userProfile.age}yo • {userProfile.gender}</div>
            </div>
          </button>
        </div>
      </div>
    </header>
    
    <UserProfileSetup 
      isOpen={showProfileSetup}
      onClose={() => setShowProfileSetup(false)}
    />
    </>
  );
};