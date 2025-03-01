
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilms } from '@/context/FilmContext';
import { Film } from '@/types/film';
import Navigation from '@/components/Navigation';
import FilmCard from '@/components/FilmCard';
import FilmModal from '@/components/FilmModal';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const { films, recentSearches, recentlyAdded } = useFilms();
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

  const handleFilmClick = (film: Film) => {
    setSelectedFilm(film);
  };

  const handleCloseModal = () => {
    setSelectedFilm(null);
  };

  return (
    <div className="min-h-screen pb-20 animate-fade-in">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => navigate('/add')}
            className="bg-coral hover:bg-coral/90 text-white rounded-[10px] px-6 py-3"
          >
            Add Film
          </Button>
          <Button
            onClick={() => navigate('/library')}
            variant="outline"
            className="border-gray-300 text-gray-700 rounded-[10px] px-6 py-3"
          >
            View Library
          </Button>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold">Search</h3>
        </div>

        <SearchBar className="mb-6" />

        {recentSearches.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Last 5 Searches</h3>
            <div className="grid grid-cols-2 gap-4">
              {recentSearches.slice(0, 5).map((film) => (
                <FilmCard
                  key={film.id}
                  film={film}
                  onClick={() => handleFilmClick(film)}
                />
              ))}
            </div>
          </div>
        )}

        {recentlyAdded.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Last 5 Added Films</h3>
            <div className="grid grid-cols-2 gap-4">
              {recentlyAdded.slice(0, 5).map((film) => (
                <FilmCard
                  key={film.id}
                  film={film}
                  onClick={() => handleFilmClick(film)}
                />
              ))}
            </div>
          </div>
        )}

        {films.length === 0 && (
          <div className="text-center mt-8 p-6 border border-gray-200 rounded-[10px]">
            <p className="text-gray-500">Your film library is empty. Add your first film!</p>
          </div>
        )}
      </div>

      {selectedFilm && (
        <FilmModal
          film={selectedFilm}
          isOpen={!!selectedFilm}
          onClose={handleCloseModal}
        />
      )}

      <Navigation />
    </div>
  );
};

export default Index;
