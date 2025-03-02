
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilms } from '@/context/FilmContext';
import { Film, SortOption } from '@/types/film';
import Navigation from '@/components/Navigation';
import FilmCard from '@/components/FilmCard';
import FilmModal from '@/components/FilmModal';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const navigate = useNavigate();
  const { films, recentSearches, recentlyAdded, searchFilms, addToRecentSearches } = useFilms();
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('alphabetically');

  const handleFilmClick = (film: Film) => {
    setSelectedFilm(film);
    // Add to recent searches when a film is clicked
    addToRecentSearches(film);
  };

  const handleCloseModal = () => {
    setSelectedFilm(null);
  };

  const handleSearch = (query: string) => {
    const results = searchFilms(query, sortOption);
    if (results.length > 0) {
      navigate(`/search?q=${encodeURIComponent(query)}&sort=${sortOption}`);
    } else {
      navigate(`/search?q=${encodeURIComponent(query)}&sort=${sortOption}`);
    }
  };

  return (
    <div className="min-h-screen pb-20 animate-fade-in">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => navigate('/add')}
            className="bg-coral hover:bg-coral/90 text-white rounded-[10px] px-6 py-3 w-[48%]"
          >
            Add Film
          </Button>
          <Button
            onClick={() => navigate('/library')}
            variant="outline"
            className="border-gray-300 text-gray-700 rounded-[10px] px-6 py-3 w-[48%]"
          >
            View Library
          </Button>
        </div>

        <SearchBar className="mb-4" onSearch={handleSearch} />
        
        <div className="flex justify-end mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-300 text-gray-700 rounded-[10px] flex items-center gap-1">
                Filter by: {sortOption === 'alphabetically' ? 'Title' : 
                           sortOption === 'director' ? 'Director' : 
                           sortOption === 'actor' ? 'Actor' : 
                           sortOption === 'genre' ? 'Genre' : 
                           sortOption === 'year' ? 'Year' : 
                           sortOption === 'number' ? 'ID Number' : 'Tags'}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white rounded-[10px] border border-gray-200 shadow-md w-56">
              <DropdownMenuRadioGroup value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                <DropdownMenuRadioItem value="alphabetically">Title</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="director">Director</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="actor">Actor</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="genre">Genre</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="year">Year</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="number">ID Number</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="tags">Tags</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {recentSearches.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Last 5 Searches</h3>
            <div className="overflow-x-auto pb-4">
              <div className="flex space-x-4" style={{ minWidth: 'max-content' }}>
                {recentSearches.slice(0, 5).map((film) => (
                  <div className="w-48 flex-shrink-0" key={film.id}>
                    <FilmCard
                      film={film}
                      onClick={() => handleFilmClick(film)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {recentlyAdded.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Last 5 Added Films</h3>
            <div className="grid grid-cols-2 gap-4">
              {recentlyAdded.slice(0, 5).map((film) => (
                <div key={film.id}>
                  <FilmCard
                    film={film}
                    onClick={() => handleFilmClick(film)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {films.length === 0 && (
          <div className="text-center mt-8 p-6 border-2 border-gray-200 rounded-[10px]">
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
