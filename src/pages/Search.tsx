
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useFilms } from '@/context/FilmContext';
import SearchBar from '@/components/SearchBar';
import Navigation from '@/components/Navigation';
import FilmCard from '@/components/FilmCard';
import FilmModal from '@/components/FilmModal';
import { Film, SortOption } from '@/types/film';
import { ArrowLeft } from 'lucide-react';

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { searchFilms, addToRecentSearches } = useFilms();
  
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Film[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('alphabetically');
  
  useEffect(() => {
    if (query) {
      const searchResults = searchFilms(query, sortOption);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query, sortOption, searchFilms]);
  
  const handleSearch = (newQuery: string) => {
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
  };
  
  const handleFilmClick = (film: Film) => {
    setSelectedFilm(film);
    addToRecentSearches(film);
  };
  
  return (
    <div className="min-h-screen pb-20 animate-fade-in">
      <div className="px-4 py-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="mr-3"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Search</h1>
        </div>
        
        <SearchBar 
          initialQuery={query} 
          onSearch={handleSearch}
          className="mb-8"
        />
        
        {results.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <div className="grid grid-cols-2 gap-4">
              {results.map(film => (
                <FilmCard 
                  key={film.id} 
                  film={film} 
                  variant="search"
                  onClick={() => handleFilmClick(film)}
                />
              ))}
            </div>
          </>
        )}
        
        {query && results.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">No results found for "{query}"</p>
            <button
              onClick={() => navigate('/add')}
              className="bg-black text-white py-3 px-6 rounded-xl font-medium"
            >
              Add a new film
            </button>
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

export default Search;
