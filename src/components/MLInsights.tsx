import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Users, Globe, Zap, Shield } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';
import { recommendationService } from '../services/openaiService';

export const MLInsights: React.FC = () => {
  const { userProfile } = useUserProfile();
  const [insights, setInsights] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadInsights();
  }, [userProfile]);

  const loadInsights = async () => {
    setIsLoading(true);
    try {
      // Simulate ML insights based on user profile
      const mockInsights = {
        personalizedScore: Math.floor(85 + Math.random() * 15),
        biasReduction: Math.floor(92 + Math.random() * 8),
        culturalAlignment: Math.floor(88 + Math.random() * 12),
        genderBalance: Math.floor(90 + Math.random() * 10),
        diversityIndex: Math.floor(87 + Math.random() * 13),
        recommendations: {
          total: Math.floor(1200 + Math.random() * 800),
          accepted: Math.floor(800 + Math.random() * 400),
          accuracy: Math.floor(89 + Math.random() * 11)
        },
        demographics: {
          similarUsers: Math.floor(2500 + Math.random() * 1500),
          countryPopularity: Math.floor(75 + Math.random() * 25),
          ageGroupTrends: Math.floor(82 + Math.random() * 18)
        }
      };
      
      setInsights(mockInsights);
    } catch (error) {
      console.error('Error loading ML insights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !insights) {
    return (
      <div className="bg-gradient-to-r from-[#00D9FF]/10 to-[#39FF14]/10 border border-[#00D9FF]/30 rounded-2xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#00D9FF]/10 to-[#39FF14]/10 border border-[#00D9FF]/30 rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Brain size={24} className="mr-3 text-[#00D9FF]" />
          ML Personalization Insights
        </h2>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></div>
          <span className="text-gray-300">Real-time Analysis</span>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gray-900/50 p-4 rounded-xl text-center">
          <Zap size={20} className="mx-auto mb-2 text-[#00D9FF]" />
          <div className="text-2xl font-bold text-[#00D9FF]">{insights.personalizedScore}%</div>
          <div className="text-xs text-gray-400">Personalization</div>
        </div>
        
        <div className="bg-gray-900/50 p-4 rounded-xl text-center">
          <Shield size={20} className="mx-auto mb-2 text-[#39FF14]" />
          <div className="text-2xl font-bold text-[#39FF14]">{insights.biasReduction}%</div>
          <div className="text-xs text-gray-400">Bias Reduction</div>
        </div>
        
        <div className="bg-gray-900/50 p-4 rounded-xl text-center">
          <Globe size={20} className="mx-auto mb-2 text-purple-400" />
          <div className="text-2xl font-bold text-purple-400">{insights.culturalAlignment}%</div>
          <div className="text-xs text-gray-400">Cultural Match</div>
        </div>
        
        <div className="bg-gray-900/50 p-4 rounded-xl text-center">
          <Users size={20} className="mx-auto mb-2 text-pink-400" />
          <div className="text-2xl font-bold text-pink-400">{insights.genderBalance}%</div>
          <div className="text-xs text-gray-400">Gender Balance</div>
        </div>
        
        <div className="bg-gray-900/50 p-4 rounded-xl text-center">
          <TrendingUp size={20} className="mx-auto mb-2 text-yellow-400" />
          <div className="text-2xl font-bold text-yellow-400">{insights.diversityIndex}%</div>
          <div className="text-xs text-gray-400">Diversity Index</div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recommendation Performance */}
        <div className="bg-gray-900/30 p-4 rounded-xl">
          <h3 className="font-semibold mb-3 flex items-center">
            <Brain size={16} className="mr-2 text-[#00D9FF]" />
            ML Performance
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Total Recommendations</span>
              <span className="font-medium">{insights.recommendations.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">User Accepted</span>
              <span className="font-medium text-[#39FF14]">{insights.recommendations.accepted.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Accuracy Rate</span>
              <span className="font-medium text-[#00D9FF]">{insights.recommendations.accuracy}%</span>
            </div>
          </div>
        </div>

        {/* User Demographics */}
        <div className="bg-gray-900/30 p-4 rounded-xl">
          <h3 className="font-semibold mb-3 flex items-center">
            <Users size={16} className="mr-2 text-purple-400" />
            Demographic Analysis
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Similar Users</span>
              <span className="font-medium">{insights.demographics.similarUsers.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">{userProfile.country} Popularity</span>
              <span className="font-medium text-purple-400">{insights.demographics.countryPopularity}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Age Group Trends</span>
              <span className="font-medium text-yellow-400">{insights.demographics.ageGroupTrends}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Summary */}
      <div className="mt-6 p-4 bg-gray-900/30 rounded-xl">
        <h3 className="font-semibold mb-3">Your ML Profile</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Demographics:</span>
            <div className="font-medium">{userProfile.age}yo {userProfile.gender} from {userProfile.country}</div>
          </div>
          <div>
            <span className="text-gray-400">Top Genres:</span>
            <div className="font-medium">{userProfile.favoriteGenres.slice(0, 2).join(', ')}</div>
          </div>
          <div>
            <span className="text-gray-400">Languages:</span>
            <div className="font-medium">{userProfile.languages.slice(0, 2).join(', ')}</div>
          </div>
          <div>
            <span className="text-gray-400">Watch History:</span>
            <div className="font-medium">{userProfile.watchHistory.length} movies</div>
          </div>
        </div>
      </div>
    </div>
  );
};