import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  original_language: string;
  popularity: number;
}

export interface MovieDetails extends TMDBMovie {
  genres: { id: number; name: string }[];
  runtime: number;
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: { iso_639_1: string; name: string }[];
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      gender: number;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      gender: number;
    }>;
  };
}

class MovieService {
  private apiKey: string;
  private baseURL: string;

  constructor() {
    this.apiKey = TMDB_API_KEY || '';
    this.baseURL = TMDB_BASE_URL;
  }

  private async makeRequest(endpoint: string, params: Record<string, any> = {}) {
    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        params: {
          api_key: this.apiKey,
          ...params
        }
      });
      return response.data;
    } catch (error) {
      console.error('TMDB API Error:', error);
      throw error;
    }
  }

  async searchMovies(query: string, page: number = 1): Promise<{ results: TMDBMovie[]; total_pages: number }> {
    return this.makeRequest('/search/movie', { query, page });
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    const movie = await this.makeRequest(`/movie/${movieId}`);
    const credits = await this.makeRequest(`/movie/${movieId}/credits`);
    return { ...movie, credits };
  }

  async getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<TMDBMovie[]> {
    const response = await this.makeRequest(`/trending/movie/${timeWindow}`);
    return response.results;
  }

  async getPopularMovies(page: number = 1): Promise<TMDBMovie[]> {
    const response = await this.makeRequest('/movie/popular', { page });
    return response.results;
  }

  async getMoviesByGenre(genreId: number, page: number = 1): Promise<TMDBMovie[]> {
    const response = await this.makeRequest('/discover/movie', {
      with_genres: genreId,
      page,
      sort_by: 'popularity.desc'
    });
    return response.results;
  }

  async getMoviesByCountry(countryCode: string, page: number = 1): Promise<TMDBMovie[]> {
    const response = await this.makeRequest('/discover/movie', {
      with_origin_country: countryCode,
      page,
      sort_by: 'popularity.desc'
    });
    return response.results;
  }

  async getGenres(): Promise<{ id: number; name: string }[]> {
    const response = await this.makeRequest('/genre/movie/list');
    return response.genres;
  }

  getImageURL(path: string, size: 'w200' | 'w300' | 'w500' | 'original' = 'w500'): string {
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }

  // Analyze movie for bias and fairness
  async analyzeMovieFairness(movie: MovieDetails): Promise<{
    diversityScore: number;
    genderBalance: number;
    culturalRepresentation: number;
    fairnessTags: string[];
  }> {
    const cast = movie.credits?.cast || [];
    const crew = movie.credits?.crew || [];
    
    // Gender balance analysis
    const totalCast = cast.length;
    const femaleCast = cast.filter(person => person.gender === 1).length;
    const maleCast = cast.filter(person => person.gender === 2).length;
    const genderBalance = totalCast > 0 ? Math.min(femaleCast, maleCast) / totalCast * 200 : 50;

    // Cultural representation
    const countries = movie.production_countries || [];
    const languages = movie.spoken_languages || [];
    const culturalRepresentation = Math.min((countries.length + languages.length) * 20, 100);

    // Director gender diversity
    const directors = crew.filter(person => person.job === 'Director');
    const femaleDirectors = directors.filter(person => person.gender === 1).length;
    const directorDiversity = directors.length > 0 ? (femaleDirectors / directors.length) * 100 : 0;

    const diversityScore = Math.round((genderBalance + culturalRepresentation + directorDiversity) / 3);

    const fairnessTags: string[] = [];
    if (genderBalance > 40) fairnessTags.push('Gender Balanced');
    if (culturalRepresentation > 60) fairnessTags.push('Culturally Diverse');
    if (diversityScore > 80) fairnessTags.push('Highly Inclusive');
    if (diversityScore > 90) fairnessTags.push('Bias-Free');

    return {
      diversityScore,
      genderBalance: Math.round(genderBalance),
      culturalRepresentation: Math.round(culturalRepresentation),
      fairnessTags
    };
  }
}

export const movieService = new MovieService();