import React, { useState } from 'react';
import { MovieCard } from './MovieCard';

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
}

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  showAIScore?: boolean;
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({
  title,
  movies,
  showAIScore = false
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`carousel-${title.replace(/\s+/g, '-')}`);
    if (container) {
      const scrollAmount = 320;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            disabled={scrollPosition === 0}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div 
        id={`carousel-${title.replace(/\s+/g, '-')}`}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0">
            <MovieCard movie={movie} showAIScore={showAIScore} />
          </div>
        ))}
      </div>
    </div>
  );
};