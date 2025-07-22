import React from 'react';
import { X, Film, Heart, Globe, Sparkles, TrendingUp, Clock } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onCategorySelect
}) => {
  const genres = [
    { id: 'action', name: 'Action', icon: '💥', count: 234 },
    { id: 'comedy', name: 'Comedy', icon: '😄', count: 189 },
    { id: 'drama', name: 'Drama', icon: '🎭', count: 312 },
    { id: 'horror', name: 'Horror', icon: '👻', count: 156 },
    { id: 'sci-fi', name: 'Sci-Fi', icon: '🚀', count: 198 },
    { id: 'romance', name: 'Romance', icon: '💕', count: 167 }
  ];

  const moods = [
    { id: 'feel-good', name: 'Feel Good', icon: '😊' },
    { id: 'thrilling', name: 'Thrilling', icon: '⚡' },
    { id: 'emotional', name: 'Emotional', icon: '💫' },
    { id: 'inspiring', name: 'Inspiring', icon: '🌟' }
  ];

  const languages = [
    { id: 'english', name: 'English', flag: '🇺🇸', count: 892 },
    { id: 'spanish', name: 'Spanish', flag: '🇪🇸', count: 234 },
    { id: 'french', name: 'French', flag: '🇫🇷', count: 156 },
    { id: 'japanese', name: 'Japanese', flag: '🇯🇵', count: 123 }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-[#1a1a1a] border-r border-gray-800 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-lg font-semibold">Explore</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors md:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Quick Access */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center">
                <TrendingUp size={16} className="mr-2" />
                QUICK ACCESS
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors text-left">
                  <Sparkles size={16} className="text-[#39FF14]" />
                  <span>AI Recommendations</span>
                  <span className="ml-auto text-xs bg-[#39FF14] text-black px-2 py-1 rounded-full">NEW</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors text-left">
                  <Heart size={16} className="text-red-400" />
                  <span>My Watchlist</span>
                  <span className="ml-auto text-xs text-gray-400">12</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors text-left">
                  <Clock size={16} className="text-blue-400" />
                  <span>Continue Watching</span>
                  <span className="ml-auto text-xs text-gray-400">3</span>
                </button>
              </div>
            </div>

            {/* Genres */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center">
                <Film size={16} className="mr-2" />
                GENRES
              </h3>
              <div className="space-y-1">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => onCategorySelect(genre.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left ${
                      selectedCategory === genre.id 
                        ? 'bg-[#00D9FF]/20 border border-[#00D9FF]/30' 
                        : 'hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{genre.icon}</span>
                      <span>{genre.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{genre.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Moods */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-4">MOODS</h3>
              <div className="grid grid-cols-2 gap-2">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    className="flex flex-col items-center p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <span className="text-lg mb-1">{mood.icon}</span>
                    <span className="text-xs text-center">{mood.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center">
                <Globe size={16} className="mr-2" />
                LANGUAGES
              </h3>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{lang.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};