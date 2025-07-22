import React, { useState } from 'react';
import { Bot, Sparkles, Mic, Send, Loader2 } from 'lucide-react';
import { recommendationService, UserProfile } from '../services/openaiService';
import { useUserProfile } from '../hooks/useUserProfile';

export const AIAssistant: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const { userProfile, learnFromInteraction } = useUserProfile();

  const suggestions = [
    `🎬 Movies for ${userProfile.mood || 'any'} mood`,
    `😄 ${userProfile.country} cinema recommendations`,
    "🏆 Bias-free Oscar winners",
    "🌟 Culturally diverse hidden gems",
    `🎭 ${userProfile.favoriteGenres[0]} movies with female directors`
  ];

  const handleSendMessage = async () => {
    if (message.trim()) {
      setIsLoading(true);
      try {
        // Determine request type based on message content
        let requestType: 'trending' | 'personalized' | 'mood-based' | 'cultural' = 'personalized';
        if (message.toLowerCase().includes('trending')) requestType = 'trending';
        if (message.toLowerCase().includes('mood') || message.toLowerCase().includes('feel')) requestType = 'mood-based';
        if (message.toLowerCase().includes('country') || message.toLowerCase().includes('cultural')) requestType = 'cultural';

        const aiRecommendations = await recommendationService.getPersonalizedRecommendations(
          userProfile,
          requestType,
          5
        );

        setRecommendations(aiRecommendations);
        setAiResponse(`Based on your profile (${userProfile.age}yo ${userProfile.gender} from ${userProfile.country}), here are my personalized recommendations:`);
        
        // Learn from this interaction
        aiRecommendations.forEach(rec => {
          learnFromInteraction(rec.title, rec.genre, 'like');
        });
      } catch (error) {
        setAiResponse('Sorry, I encountered an error. Please try again.');
        console.error('AI Assistant Error:', error);
      } finally {
        setIsLoading(false);
      }
      setMessage('');
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Handle voice input
  };

  return (
    <>
      {/* Main AI Banner */}
      <div 
        className={`mx-4 md:mx-8 bg-gradient-to-r from-[#00D9FF]/10 to-[#39FF14]/10 border border-[#00D9FF]/30 rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
          isExpanded ? 'mb-4' : ''
        }`}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#00D9FF] to-[#39FF14] rounded-xl flex items-center justify-center animate-pulse">
              <Bot size={24} className="text-black" />
            </div>
            <div>
              <h2 className="text-xl font-semibold flex items-center">
                <Sparkles size={20} className="mr-2 text-[#39FF14]" />
                Ask FairFlicks AI
              </h2>
              <p className="text-gray-400 text-sm">
                Get personalized, bias-free movie recommendations
              </p>
            </div>
          </div>
          
          {!isExpanded && (
            <div className="text-[#00D9FF] animate-bounce">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Status indicators */}
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></div>
            <span className="text-gray-300">AI Online</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300">Fairness Engine Active</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-gray-300">Learning Your Preferences</span>
          </div>
        </div>
      </div>

      {/* Expanded Chat Interface */}
      {isExpanded && (
        <div className="mx-4 md:mx-8 bg-gray-900 border border-gray-700 rounded-2xl p-6 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Chat with AI Assistant</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setMessage(suggestion)}
                className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
          
          {/* Input Area */}
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Ask me for ${userProfile.country} movies, ${userProfile.favoriteGenres[0]} recommendations, or bias-free suggestions...`}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:border-[#00D9FF] transition-colors"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
              />
            </div>
            
            <button
              onClick={handleVoiceInput}
              className={`p-3 rounded-xl transition-all ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
              disabled={isLoading}
            >
              <Mic size={20} />
            </button>
            
            <button
              onClick={handleSendMessage}
              className="p-3 bg-[#00D9FF] hover:bg-[#00D9FF]/80 rounded-xl transition-colors disabled:opacity-50"
              disabled={!message.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 size={20} className="text-black animate-spin" />
              ) : (
                <Send size={20} className="text-black" />
              )}
            </button>
          </div>
          
          {/* AI Response Area */}
          <div className="bg-gray-800 rounded-xl p-4 min-h-[200px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Loader2 size={32} className="mx-auto mb-2 text-[#00D9FF] animate-spin" />
                  <p className="text-gray-400">AI is analyzing your preferences...</p>
                </div>
              </div>
            ) : aiResponse ? (
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Bot size={24} className="text-[#00D9FF] mt-1" />
                  <div className="flex-1">
                    <p className="text-white mb-4">{aiResponse}</p>
                    {recommendations.length > 0 && (
                      <div className="space-y-3">
                        {recommendations.map((rec, index) => (
                          <div key={index} className="bg-gray-700 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-[#39FF14]">{rec.title}</h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs bg-[#00D9FF]/20 text-[#00D9FF] px-2 py-1 rounded-full">
                                  {rec.fairnessScore}% Fair
                                </span>
                                <span className="text-xs text-yellow-400">★ {rec.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-300 mb-2">{rec.reason}</p>
                            <div className="flex flex-wrap gap-1">
                              {rec.genre.map((g: string, i: number) => (
                                <span key={i} className="text-xs bg-gray-600 px-2 py-1 rounded-full">
                                  {g}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs text-gray-400 mt-2 italic">{rec.biasAnalysis}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <Bot size={32} className="mx-auto mb-2 text-[#00D9FF]" />
                  <p>Ask me for personalized, bias-free movie recommendations!</p>
                  <p className="text-xs mt-2">I consider your age ({userProfile.age}), location ({userProfile.country}), and preferences</p>
                </div>
              </div>
            )}
            </div>
          </div>
      )}
    </>
  );
};