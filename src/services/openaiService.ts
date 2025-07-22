import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
});

export interface UserProfile {
  age: number;
  gender: string;
  country: string;
  favoriteGenres: string[];
  watchHistory: string[];
  ratings: { [movieId: string]: number };
  languages: string[];
  mood?: string;
}

export interface MovieRecommendation {
  title: string;
  genre: string[];
  year: number;
  rating: number;
  reason: string;
  fairnessScore: number;
  biasAnalysis: string;
  culturalRelevance: number;
}

export class OpenAIRecommendationService {
  private static instance: OpenAIRecommendationService;

  public static getInstance(): OpenAIRecommendationService {
    if (!OpenAIRecommendationService.instance) {
      OpenAIRecommendationService.instance = new OpenAIRecommendationService();
    }
    return OpenAIRecommendationService.instance;
  }

  async getPersonalizedRecommendations(
    userProfile: UserProfile,
    requestType: 'trending' | 'personalized' | 'mood-based' | 'cultural' = 'personalized',
    count: number = 5
  ): Promise<MovieRecommendation[]> {
    try {
      const prompt = this.buildRecommendationPrompt(userProfile, requestType, count);
      
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are FairFlicks AI, an advanced movie recommendation system that prioritizes fairness, diversity, and cultural sensitivity. You analyze user preferences while ensuring recommendations are bias-free and inclusive. Always consider gender representation, cultural diversity, and avoid stereotypical suggestions.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const recommendations = this.parseRecommendations(response.choices[0].message.content || '');
      return recommendations;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return this.getFallbackRecommendations(userProfile);
    }
  }

  private buildRecommendationPrompt(
    userProfile: UserProfile,
    requestType: string,
    count: number
  ): string {
    const { age, gender, country, favoriteGenres, watchHistory, mood, languages } = userProfile;

    return `
Generate ${count} movie recommendations for a user with the following profile:
- Age: ${age}
- Gender: ${gender}
- Country: ${country}
- Favorite Genres: ${favoriteGenres.join(', ')}
- Languages: ${languages.join(', ')}
- Recent Watch History: ${watchHistory.slice(-10).join(', ')}
- Current Mood: ${mood || 'Any'}
- Request Type: ${requestType}

Requirements:
1. Ensure gender-balanced recommendations (avoid gender stereotypes)
2. Include diverse cultural perspectives and international cinema
3. Consider regional preferences for ${country}
4. Provide fairness analysis for each recommendation
5. Include bias-free reasoning for each suggestion
6. Rate cultural relevance (1-10) for each movie

Return EXACTLY ${count} recommendations in this JSON format:
[
  {
    "title": "Movie Title",
    "genre": ["Genre1", "Genre2"],
    "year": 2023,
    "rating": 8.5,
    "reason": "Personalized reason why this movie fits the user",
    "fairnessScore": 95,
    "biasAnalysis": "Analysis of potential biases and why this recommendation is fair",
    "culturalRelevance": 8
  }
]

Focus on recent movies (2020-2024) and ensure diversity in directors, cast, and storytelling perspectives.
`;
  }

  private parseRecommendations(response: string): MovieRecommendation[] {
    try {
      // Extract JSON from the response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const recommendations = JSON.parse(jsonMatch[0]);
        return recommendations.map((rec: any) => ({
          title: rec.title,
          genre: rec.genre || [],
          year: rec.year || 2023,
          rating: rec.rating || 8.0,
          reason: rec.reason || 'Recommended based on your preferences',
          fairnessScore: rec.fairnessScore || 90,
          biasAnalysis: rec.biasAnalysis || 'Bias-free recommendation',
          culturalRelevance: rec.culturalRelevance || 7
        }));
      }
    } catch (error) {
      console.error('Error parsing recommendations:', error);
    }
    
    return this.getFallbackRecommendations();
  }

  private getFallbackRecommendations(userProfile?: UserProfile): MovieRecommendation[] {
    return [
      {
        title: "Everything Everywhere All at Once",
        genre: ["Comedy", "Drama", "Sci-Fi"],
        year: 2022,
        rating: 8.9,
        reason: "Highly acclaimed film with diverse representation and universal themes",
        fairnessScore: 98,
        biasAnalysis: "Features Asian-American leads, explores immigrant experience, gender-inclusive storytelling",
        culturalRelevance: 9
      },
      {
        title: "Parasite",
        genre: ["Thriller", "Drama"],
        year: 2019,
        rating: 8.6,
        reason: "International cinema masterpiece with social commentary",
        fairnessScore: 95,
        biasAnalysis: "Korean film that challenges Western cinema dominance, class-conscious narrative",
        culturalRelevance: 10
      }
    ];
  }

  async analyzeBias(movieTitle: string, userProfile: UserProfile): Promise<{
    biasScore: number;
    analysis: string;
    recommendations: string[];
  }> {
    try {
      const prompt = `
Analyze potential bias in recommending "${movieTitle}" to a ${userProfile.age}-year-old ${userProfile.gender} from ${userProfile.country}.

Consider:
1. Gender stereotypes in the recommendation
2. Cultural assumptions
3. Age appropriateness
4. Representation in the film
5. Potential algorithmic bias

Provide:
- Bias score (0-100, where 100 is completely bias-free)
- Detailed analysis
- Suggestions to improve fairness

Format as JSON:
{
  "biasScore": 85,
  "analysis": "Detailed bias analysis",
  "recommendations": ["Suggestion 1", "Suggestion 2"]
}
`;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a bias detection expert for recommendation systems."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return {
        biasScore: result.biasScore || 80,
        analysis: result.analysis || 'No significant bias detected',
        recommendations: result.recommendations || []
      };
    } catch (error) {
      console.error('Bias analysis error:', error);
      return {
        biasScore: 80,
        analysis: 'Unable to perform bias analysis',
        recommendations: []
      };
    }
  }

  async getCulturalRecommendations(country: string, count: number = 5): Promise<MovieRecommendation[]> {
    const prompt = `
Recommend ${count} movies that would be culturally relevant and popular in ${country}.
Include both local cinema and international films that resonate with ${country} audiences.

Consider:
1. Local film industry productions
2. Cultural themes and values
3. Popular international films in the region
4. Diverse representation
5. Recent releases (2020-2024)

Return as JSON array with the same format as previous recommendations.
`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a cultural cinema expert with knowledge of global film preferences."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      });

      return this.parseRecommendations(response.choices[0].message.content || '');
    } catch (error) {
      console.error('Cultural recommendations error:', error);
      return this.getFallbackRecommendations();
    }
  }
}

export const recommendationService = OpenAIRecommendationService.getInstance();