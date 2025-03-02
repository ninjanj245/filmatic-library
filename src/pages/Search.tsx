
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useFilms } from '@/context/FilmContext';
import SearchBar from '@/components/SearchBar';
import Navigation from '@/components/Navigation';
import FilmCard from '@/components/FilmCard';
import FilmModal from '@/components/FilmModal';
import { Film, SortOption } from '@/types/film';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

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
          className="mb-4"
        />
        
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
