
import React, { useState } from 'react';
import { Film } from '@/types/film';
import placeholderImage from '/placeholder.svg';

interface FilmCardProps {
  film: Film;
  onClick?: () => void;
  variant?: 'search' | 'recent' | 'library';
}

const FilmCard: React.FC<FilmCardProps> = ({ 
  film, 
  onClick,
  variant = 'recent'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const bgColor = variant === 'search' 
    ? 'bg-softPink' 
    : variant === 'recent' 
      ? 'bg-coral' 
      : 'bg-white';

  return (
    <div 
      onClick={onClick}
      className={`
        ${bgColor} rounded-2xl overflow-hidden shadow-md film-card-shadow 
        transform transition-all duration-300 hover:scale-102 hover:shadow-lg
        cursor-pointer animate-fade-in
      `}
    >
      <div className="relative aspect-square overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <img
          src={imageError || !film.image ? placeholderImage : film.image}
          alt={film.title}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`
            object-cover w-full h-full transition-opacity duration-300
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
      </div>
      <div className="p-3">
        <div className="truncate font-medium text-lg">{film.title}</div>
        <div className="text-gray-600 text-sm">{film.idNumber}</div>
      </div>
    </div>
  );
};

export default FilmCard;
