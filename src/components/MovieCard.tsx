import React, { useState } from 'react';
import { Heart, Play, Plus, Star, Zap, Shield, Users } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';

interface Movie {
  id: number;
  title: string;
  genre: string[];
  rating: number;
  year: number;
  poster: string;
  description: string;
  fairnessTags: string[];
  aiScore: number;
  biasAnalysis?: string;
  culturalRelevance?: number;
  genderBalance?: number;
}

interface MovieCardProps {
  movie: Movie;
  showAIScore?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, showAIScore = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { learnFromInteraction, addToWatchHistory } = useUserProfile();

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);
    learnFromInteraction(movie.title, movie.genre, isInWatchlist ? 'dislike' : 'like');
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    learnFromInteraction(movie.title, movie.genre, isLiked ? 'dislike' : 'like');
  };

  const handlePlay = () => {
    addToWatchHistory(movie.title);
    learnFromInteraction(movie.title, movie.genre, 'watch');
  };

  const getFairnessTagColor = (tag: string) => {
    switch (tag) {
      case 'Bias-Free':
        return 'bg-[#39FF14]/20 text-[#39FF14] border-[#39FF14]/30';
      case 'Inclusive':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Diverse Cast':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Cultural Rep.':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Gender Balanced':
        return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'Highly Inclusive':
        return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div
      className={`w-72 bg-gray-900 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
        isHovered ? 'transform scale-105 shadow-2xl shadow-[#00D9FF]/20' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-96 object-cover"
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-90' : 'opacity-60'
        }`} />
        
        {/* Play button */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              onClick={handlePlay}
              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </button>
          </div>
        )}
        
        {/* AI Score Badge */}
        {showAIScore && (
          <div className="absolute top-3 left-3 flex items-center space-x-1 bg-[#00D9FF]/20 backdrop-blur-sm px-2 py-1 rounded-full border border-[#00D9FF]/30">
            <Zap size={12} className="text-[#00D9FF]" />
            <span className="text-xs font-medium text-[#00D9FF]">{movie.aiScore}%</span>
          </div>
        )}
        
        {/* Fairness Indicators */}
        {isHovered && (movie.genderBalance || movie.culturalRelevance) && (
          <div className="absolute top-3 left-3 space-y-1">
            {movie.genderBalance && movie.genderBalance > 60 && (
              <div className="flex items-center space-x-1 bg-pink-500/20 backdrop-blur-sm px-2 py-1 rounded-full border border-pink-500/30">
                <Users size={10} className="text-pink-400" />
                <span className="text-xs text-pink-400">{movie.genderBalance}% Balanced</span>
              </div>
            )}
            {movie.culturalRelevance && movie.culturalRelevance > 70 && (
              <div className="flex items-center space-x-1 bg-purple-500/20 backdrop-blur-sm px-2 py-1 rounded-full border border-purple-500/30">
                <Shield size={10} className="text-purple-400" />
                <span className="text-xs text-purple-400">Cultural+</span>
              </div>
            )}
          </div>
        )}
        
        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star size={12} className="text-yellow-400" fill="currentColor" />
          <span className="text-xs font-medium">{movie.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{movie.title}</h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {movie.genre.slice(0, 2).map((g) => (
            <span
              key={g}
              className="px-2 py-1 bg-gray-800 text-xs rounded-full text-gray-300"
            >
              {g}
            </span>
          ))}
          <span className="text-xs text-gray-400">{movie.year}</span>
        </div>
        
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {movie.description}
        </p>
        
        {/* Fairness Tags */}
        {movie.fairnessTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {movie.fairnessTags.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-1 text-xs rounded-full border ${getFairnessTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Bias Analysis (on hover) */}
        {isHovered && movie.biasAnalysis && (
          <div className="mb-4 p-2 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-300 italic">{movie.biasAnalysis}</p>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLikeToggle}
              className={`p-2 rounded-full transition-colors ${
                isLiked ? 'bg-red-500 text-white' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            
            <button
              onClick={handleWatchlistToggle}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isInWatchlist 
                  ? 'bg-[#39FF14] text-black' 
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              <Plus size={16} />
              <span className="text-sm">
                {isInWatchlist ? 'Added' : 'Watchlist'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};