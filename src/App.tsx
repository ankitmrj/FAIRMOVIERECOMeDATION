import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MovieCarousel } from './components/MovieCarousel';
import { AIAssistant } from './components/AIAssistant';
import { AdminAnalytics } from './components/AdminAnalytics';
import { UserDashboard } from './components/UserDashboard';
import { MLInsights } from './components/MLInsights';
import { useUserProfile } from './hooks/useUserProfile';
import { recommendationService } from './services/openaiService';

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

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [mlRecommendations, setMlRecommendations] = useState<Movie[]>([]);
  const [isLoadingML, setIsLoadingML] = useState(false);
  const { userProfile } = useUserProfile();

  // Load ML recommendations when user profile changes
  useEffect(() => {
    loadMLRecommendations();
  }, [userProfile]);

  const loadMLRecommendations = async () => {
    setIsLoadingML(true);
    try {
      const recommendations = await recommendationService.getPersonalizedRecommendations(
        userProfile,
        'personalized',
        8
      );
      
      // Convert AI recommendations to Movie format
      const mlMovies: Movie[] = recommendations.map((rec, index) => ({
        id: 1000 + index,
        title: rec.title,
        genre: rec.genre,
        rating: rec.rating,
        year: rec.year,
        poster: `https://images.pexels.com/photos/${7991579 + index}/pexels-photo-${7991579 + index}.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop`,
        description: rec.reason,
        fairnessTags: rec.fairnessScore > 95 ? ['Bias-Free', 'Highly Inclusive'] : 
                     rec.fairnessScore > 85 ? ['Inclusive'] : [],
        aiScore: rec.fairnessScore,
        biasAnalysis: rec.biasAnalysis,
        culturalRelevance: rec.culturalRelevance * 10,
        genderBalance: rec.fairnessScore > 90 ? 85 + Math.random() * 15 : 70 + Math.random() * 20
      }));
      
      setMlRecommendations(mlMovies);
    } catch (error) {
      console.error('Error loading ML recommendations:', error);
    } finally {
      setIsLoadingML(false);
    }
  };

  // Sample movie data with fairness indicators
  const trendingMovies: Movie[] = [
    {
      id: 1,
      title: "Dune: Part Two",
      genre: ["Sci-Fi", "Adventure"],
      rating: 8.8,
      year: 2024,
      poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
      description: "Epic sci-fi continuation of the Dune saga",
      fairnessTags: ["Inclusive", "Diverse Cast"],
      aiScore: 94,
      biasAnalysis: "Features diverse cast with strong female characters and multicultural representation",
      culturalRelevance: 85,
      genderBalance: 78
    },
    {
      id: 2,
      title: "Spider-Man: Across",
      genre: ["Animation", "Action"],
      rating: 9.1,
      year: 2023,
      poster: "https://images.pexels.com/photos/7991221/pexels-photo-7991221.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
      description: "Multiverse animated adventure",
      fairnessTags: ["Bias-Free", "Cultural Rep."],
      aiScore: 96,
      biasAnalysis: "Celebrates diversity through multiverse storytelling with Latino protagonist",
      culturalRelevance: 92,
      genderBalance: 88
    },
    {
      id: 3,
      title: "Everything Everywhere",
      genre: ["Comedy", "Drama", "Sci-Fi"],
      rating: 8.9,
      year: 2022,
      poster: "https://images.pexels.com/photos/7991580/pexels-photo-7991580.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
      description: "Mind-bending multiverse story",
      fairnessTags: ["Inclusive", "Bias-Free"],
      aiScore: 98,
      biasAnalysis: "Asian-American led film exploring immigrant experience with LGBTQ+ themes",
      culturalRelevance: 95,
      genderBalance: 92
    },
    {
      id: 4,
      title: "The Batman",
      genre: ["Action", "Crime"],
      rating: 8.2,
      year: 2022,
      poster: "https://images.pexels.com/photos/7991222/pexels-photo-7991222.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
      description: "Dark and gritty Batman reboot",
      fairnessTags: ["Diverse Cast"],
      aiScore: 87,
      biasAnalysis: "Includes diverse supporting cast with strong female characters",
      culturalRelevance: 75,
      genderBalance: 72
    },
    {
      id: 5,
      title: "Top Gun: Maverick",
      genre: ["Action", "Drama"],
      rating: 8.7,
      year: 2022,
      poster: "https://images.pexels.com/photos/7991578/pexels-photo-7991578.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
      description: "High-flying action sequel",
      fairnessTags: ["Inclusive"],
      aiScore: 91,
      biasAnalysis: "Features diverse military personnel and strong female pilot character",
      culturalRelevance: 80,
      genderBalance: 75
    }
  ];

  const recommendedMovies: Movie[] = [
    {
      id: 6,
      title: "Oppenheimer",
      genre: ["Biography", "Drama"],
      rating: 8.9,
      year: 2023,
      poster: "https://images.pexels.com/photos/7991576/pexels-photo-7991576.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
      description: "Historical biographical thriller",
      fairnessTags: ["Bias-Free"],
      aiScore: 93,
      biasAnalysis: "Historical accuracy maintained while highlighting diverse scientific community",
      culturalRelevance: 88,
      genderBalance: 68
    },
    {
      id: 7,
      title: "Avatar: The Way",
      genre: ["Adventure", "Sci-Fi"],
      rating: 8.1,
      year: 2022,
      poster: "https://images.pexels.com/photos/7991577/pexels-photo-7991577.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
      description: "Pandora underwater adventure",
      fairnessTags: ["Cultural Rep.", "Inclusive"],
      aiScore: 89,
      biasAnalysis: "Indigenous themes and environmental consciousness with diverse cast",
      culturalRelevance: 90,
      genderBalance: 82
    },
    {
      id: 8,
      title: "Black Panther 2",
      genre: ["Action", "Adventure"],
      rating: 8.3,
      year: 2022,
      poster: "https://images.pexels.com/photos/7991223/pexels-photo-7991223.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
      description: "Wakanda Forever sequel",
      fairnessTags: ["Diverse Cast", "Cultural Rep."],
      aiScore: 90,
      biasAnalysis: "Celebrates African culture with predominantly Black cast and female leadership",
      culturalRelevance: 98,
      genderBalance: 89
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white font-['Poppins',sans-serif] overflow-x-hidden">
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        
        <div className="flex-1 relative">
          <Header 
            onMenuClick={() => setSidebarOpen(true)}
            onProfileClick={() => setShowUserDashboard(true)}
            onAdminClick={() => setShowAdminPanel(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          
          <main className="pt-20 pb-8">
            <AIAssistant />
            
            <div className="px-4 md:px-8">
              <MLInsights />
            </div>
            
            <div className="px-4 md:px-8 space-y-12">
              <MovieCarousel 
                title="🔥 Trending Now" 
                movies={trendingMovies} 
                showAIScore={true}
              />
              
              {mlRecommendations.length > 0 && (
                <MovieCarousel 
                  title={`🤖 AI Personalized for ${userProfile.country} • ${userProfile.age}yo ${userProfile.gender}`}
                  movies={mlRecommendations} 
                  showAIScore={true}
                />
              )}
              
              <MovieCarousel 
                title="🌟 Culturally Diverse Picks" 
                movies={recommendedMovies} 
                showAIScore={true}
              />
              
              <MovieCarousel 
                title="⭐ Based on Your Ratings" 
                movies={trendingMovies.slice(1, 4)} 
                showAIScore={false}
              />
              
              {showAdminPanel && <AdminAnalytics />}
            </div>
          </main>
        </div>
      </div>
      
      {showUserDashboard && (
        <UserDashboard onClose={() => setShowUserDashboard(false)} />
      )}
    </div>
  );
}

export default App;