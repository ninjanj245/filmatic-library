
import React, { useState } from 'react';
import { useFilms } from '@/context/FilmContext';
import Navigation from '@/components/Navigation';
import FilmModal from '@/components/FilmModal';
import { Film, SortOption } from '@/types/film';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Library = () => {
  const { films } = useFilms();
  const navigate = useNavigate();
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('alphabetically');
  const [activeSection, setActiveSection] = useState<string | null>('A');
  
  // Sort films based on current option
  const sortedFilms = [...films].sort((a, b) => {
    switch (sortOption) {
      case 'alphabetically':
        return a.title.localeCompare(b.title);
      case 'director':
        return a.director.localeCompare(b.director);
      case 'actor':
        if (!a.actor) return 1;
        if (!b.actor) return -1;
        return a.actor.localeCompare(b.actor);
      case 'number':
        return a.idNumber.localeCompare(b.idNumber);
      case 'genre':
        if (!a.genre) return 1;
        if (!b.genre) return -1;
        return a.genre.localeCompare(b.genre);
      case 'year':
        if (!a.year) return 1;
        if (!b.year) return -1;
        return a.year.localeCompare(b.year);
      default:
        return a.title.localeCompare(b.title);
    }
  });
  
  // Group films by first letter when sorted alphabetically
  const groupedFilms: Record<string, Film[]> = {};
  
  if (sortOption === 'alphabetically') {
    sortedFilms.forEach(film => {
      const firstLetter = film.title.charAt(0).toUpperCase();
      if (!groupedFilms[firstLetter]) {
        groupedFilms[firstLetter] = [];
      }
      groupedFilms[firstLetter].push(film);
    });
  }
  
  const sections = Object.keys(groupedFilms).sort();
  
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
          <h1 className="text-2xl font-bold">Library</h1>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            className={`py-3 px-4 rounded-xl font-medium text-center transition-all ${
              sortOption === 'alphabetically' 
                ? 'bg-black text-white' 
                : 'bg-white text-black border border-black'
            }`}
            onClick={() => setSortOption('alphabetically')}
          >
            Alphabetically
          </button>
          <button
            className={`py-3 px-4 rounded-xl font-medium text-center transition-all ${
              sortOption === 'director' 
                ? 'bg-black text-white' 
                : 'bg-white text-black border border-black'
            }`}
            onClick={() => setSortOption('director')}
          >
            By Director
          </button>
          <button
            className={`py-3 px-4 rounded-xl font-medium text-center transition-all ${
              sortOption === 'actor' 
                ? 'bg-black text-white' 
                : 'bg-white text-black border border-black'
            }`}
            onClick={() => setSortOption('actor')}
          >
            By Actor
          </button>
          <button
            className={`py-3 px-4 rounded-xl font-medium text-center transition-all ${
              sortOption === 'genre' 
                ? 'bg-black text-white' 
                : 'bg-white text-black border border-black'
            }`}
            onClick={() => setSortOption('genre')}
          >
            By Genre
          </button>
        </div>
        
        {sortOption === 'alphabetically' && sections.length > 0 ? (
          <>
            {sections.map(section => (
              <div key={section} id={section}>
                <h2 className="text-2xl font-bold mt-6 mb-3">{section}</h2>
                <div className="space-y-2">
                  {groupedFilms[section].map(film => (
                    <div
                      key={film.id}
                      onClick={() => setSelectedFilm(film)}
                      className="bg-gray-200 rounded-xl p-4 flex justify-between items-center hover:bg-gray-300 transition-colors cursor-pointer"
                    >
                      <div className="font-medium">{film.title}</div>
                      <div>{film.idNumber}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="space-y-2 mt-4">
            {sortedFilms.map(film => (
              <div
                key={film.id}
                onClick={() => setSelectedFilm(film)}
                className="bg-gray-200 rounded-xl p-4 flex justify-between items-center hover:bg-gray-300 transition-colors cursor-pointer"
              >
                <div className="font-medium">
                  {sortOption === 'director' ? film.director : 
                   sortOption === 'actor' ? film.actor || 'Unknown' : 
                   sortOption === 'genre' ? film.genre || 'Unknown' : 
                   film.title}
                </div>
                <div>{film.idNumber}</div>
              </div>
            ))}
          </div>
        )}
        
        {films.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">Your library is empty</p>
            <button
              onClick={() => navigate('/add')}
              className="bg-black text-white py-3 px-6 rounded-xl font-medium"
            >
              Add your first film
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

export default Library;
