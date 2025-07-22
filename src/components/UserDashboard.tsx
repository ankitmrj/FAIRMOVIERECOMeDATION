import React, { useState } from 'react';
import { X, Star, Clock, Heart, TrendingUp, Award } from 'lucide-react';

interface UserDashboardProps {
  onClose: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = {
    moviesWatched: 347,
    hoursWatched: 692,
    averageRating: 4.2,
    favoriteGenre: 'Sci-Fi',
    watchlistCount: 23,
    streakDays: 15
  };

  const recentRatings = [
    { title: 'Dune: Part Two', rating: 5, poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=150&h=200&fit=crop' },
    { title: 'Everything Everywhere', rating: 5, poster: 'https://images.pexels.com/photos/7991580/pexels-photo-7991580.jpeg?auto=compress&cs=tinysrgb&w=150&h=200&fit=crop' },
    { title: 'Spider-Man: Across', rating: 4, poster: 'https://images.pexels.com/photos/7991221/pexels-photo-7991221.jpeg?auto=compress&cs=tinysrgb&w=150&h=200&fit=crop' },
    { title: 'The Batman', rating: 4, poster: 'https://images.pexels.com/photos/7991222/pexels-photo-7991222.jpeg?auto=compress&cs=tinysrgb&w=150&h=200&fit=crop' }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4">
      <div className="bg-[#1a1a1a] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#39FF14] to-[#00D9FF] rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">JD</span>
            </div>
            <div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-gray-400">Movie Enthusiast • Member since 2023</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'ratings', label: 'My Ratings', icon: Star },
            { id: 'watchlist', label: 'Watchlist', icon: Heart },
            { id: 'history', label: 'Watch History', icon: Clock }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-6 py-4 transition-colors ${
                activeTab === id 
                  ? 'border-b-2 border-[#00D9FF] text-[#00D9FF]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-900 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-[#39FF14]">{userStats.moviesWatched}</div>
                  <div className="text-sm text-gray-400">Movies Watched</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-[#00D9FF]">{userStats.hoursWatched}h</div>
                  <div className="text-sm text-gray-400">Hours Watched</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-400">{userStats.averageRating}</div>
                  <div className="text-sm text-gray-400">Average Rating</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-purple-400">{userStats.favoriteGenre}</div>
                  <div className="text-sm text-gray-400">Favorite Genre</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-red-400">{userStats.watchlistCount}</div>
                  <div className="text-sm text-gray-400">In Watchlist</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-orange-400">{userStats.streakDays}</div>
                  <div className="text-sm text-gray-400">Day Streak</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Star size={20} className="mr-2 text-yellow-400" />
                  Recent Ratings
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recentRatings.map((movie, index) => (
                    <div key={index} className="bg-gray-900 rounded-xl overflow-hidden">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-3">
                        <h4 className="font-medium text-sm mb-2 line-clamp-1">{movie.title}</h4>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={12}
                              className={star <= movie.rating ? 'text-yellow-400' : 'text-gray-600'}
                              fill={star <= movie.rating ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Award size={20} className="mr-2 text-[#39FF14]" />
                  Achievements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-[#39FF14]/20 to-transparent border border-[#39FF14]/30 p-4 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#39FF14] rounded-full flex items-center justify-center">
                        <Award size={16} className="text-black" />
                      </div>
                      <div>
                        <h4 className="font-medium">Movie Buff</h4>
                        <p className="text-sm text-gray-400">Watched 100+ movies</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500/20 to-transparent border border-blue-500/30 p-4 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Star size={16} className="text-black" />
                      </div>
                      <div>
                        <h4 className="font-medium">Critic</h4>
                        <p className="text-sm text-gray-400">Rated 50+ movies</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ratings' && (
            <div className="text-center py-8">
              <Star size={48} className="mx-auto mb-4 text-yellow-400" />
              <h3 className="text-lg font-semibold mb-2">Your Movie Ratings</h3>
              <p className="text-gray-400">View and manage all your movie ratings</p>
            </div>
          )}

          {activeTab === 'watchlist' && (
            <div className="text-center py-8">
              <Heart size={48} className="mx-auto mb-4 text-red-400" />
              <h3 className="text-lg font-semibold mb-2">Your Watchlist</h3>
              <p className="text-gray-400">Movies you want to watch later</p>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="text-center py-8">
              <Clock size={48} className="mx-auto mb-4 text-blue-400" />
              <h3 className="text-lg font-semibold mb-2">Watch History</h3>
              <p className="text-gray-400">Your complete viewing history</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};