
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import Navigation from '@/components/Navigation';
import FilmCard from '@/components/FilmCard';
import FilmModal from '@/components/FilmModal';
import { useFilms } from '@/context/FilmContext';
import { Film } from '@/types/film';

const Index = () => {
  const navigate = useNavigate();
  const { recentSearches, recentlyAdded } = useFilms();
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  
  return (
    <div className="min-h-screen pb-20 px-4">
      <div className="py-8">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => navigate('/add')}
            className="bg-black text-white py-4 rounded-2xl font-medium text-lg transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Add film
          </button>
          <button
            onClick={() => navigate('/library')}
            className="bg-white text-black border border-black py-4 rounded-2xl font-medium text-lg transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            View Library
          </button>
        </div>
        
        <div className="mb-8">
          <SearchBar />
        </div>
        
        {recentSearches.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Last 5 searches</h2>
            <div className="grid grid-cols-2 gap-4">
              {recentSearches.map(film => (
                <FilmCard 
                  key={film.id} 
                  film={film} 
                  variant="search"
                  onClick={() => setSelectedFilm(film)}
                />
              ))}
            </div>
          </div>
        )}
        
        {recentlyAdded.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Last 5 added</h2>
            <div className="grid grid-cols-2 gap-4">
              {recentlyAdded.map(film => (
                <FilmCard 
                  key={film.id} 
                  film={film} 
                  variant="recent"
                  onClick={() => setSelectedFilm(film)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Navigation />
      
      {selectedFilm && (
        <FilmModal 
          film={selectedFilm} 
          isOpen={!!selectedFilm} 
          onClose={() => setSelectedFilm(null)} 
        />
      )}
    </div>
  );
};

export default Index;
