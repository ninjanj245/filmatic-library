
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Film, FilmContextType, SortOption } from '@/types/film';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

const FilmContext = createContext<FilmContextType | undefined>(undefined);

export const FilmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [films, setFilms] = useState<Film[]>(() => {
    const savedFilms = localStorage.getItem('films');
    return savedFilms ? JSON.parse(savedFilms) : [];
  });

  const [recentSearches, setRecentSearches] = useState<Film[]>(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    return savedSearches ? JSON.parse(savedSearches) : [];
  });

  // Save films to localStorage when they change
  useEffect(() => {
    localStorage.setItem('films', JSON.stringify(films));
  }, [films]);

  // Save recent searches to localStorage when they change
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const addFilm = (film: Omit<Film, 'id' | 'createdAt'>) => {
    const newFilm: Film = {
      ...film,
      id: uuidv4(),
      createdAt: new Date(),
    };
    
    setFilms(prevFilms => [newFilm, ...prevFilms]);
    toast.success('Film added successfully!');
  };

  const updateFilm = (id: string, updatedFilm: Partial<Film>) => {
    setFilms(prevFilms => 
      prevFilms.map(film => 
        film.id === id ? { ...film, ...updatedFilm } : film
      )
    );
    toast.success('Film updated successfully!');
  };

  const deleteFilm = (id: string) => {
    setFilms(prevFilms => prevFilms.filter(film => film.id !== id));
    setRecentSearches(prevSearches => prevSearches.filter(film => film.id !== id));
    toast.success('Film deleted successfully!');
  };

  const getFilm = (id: string) => {
    return films.find(film => film.id === id);
  };

  const searchFilms = (query: string, option?: SortOption) => {
    if (!query) return [];
    
    const lowerCaseQuery = query.toLowerCase();
    
    let results = films.filter(film => {
      const matchesTitle = film.title.toLowerCase().includes(lowerCaseQuery);
      const matchesDirector = film.director.toLowerCase().includes(lowerCaseQuery);
      const matchesIdNumber = film.idNumber.includes(query);
      const matchesActor = film.actor?.toLowerCase().includes(lowerCaseQuery);
      const matchesGenre = film.genre?.toLowerCase().includes(lowerCaseQuery);
      const matchesYear = film.year?.includes(query);
      const matchesTags = film.tags?.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
      
      return (
        matchesTitle || 
        matchesDirector || 
        matchesIdNumber || 
        matchesActor || 
        matchesGenre || 
        matchesYear || 
        matchesTags
      );
    });
    
    // Sort results based on option
    if (option) {
      switch (option) {
        case 'alphabetically':
          results = results.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'director':
          results = results.sort((a, b) => a.director.localeCompare(b.director));
          break;
        case 'actor':
          results = results.sort((a, b) => {
            if (!a.actor) return 1;
            if (!b.actor) return -1;
            return a.actor.localeCompare(b.actor);
          });
          break;
        case 'number':
          results = results.sort((a, b) => a.idNumber.localeCompare(b.idNumber));
          break;
        case 'genre':
          results = results.sort((a, b) => {
            if (!a.genre) return 1;
            if (!b.genre) return -1;
            return a.genre.localeCompare(b.genre);
          });
          break;
        case 'year':
          results = results.sort((a, b) => {
            if (!a.year) return 1;
            if (!b.year) return -1;
            return a.year.localeCompare(b.year);
          });
          break;
        case 'tags':
          results = results.sort((a, b) => {
            if (!a.tags || a.tags.length === 0) return 1;
            if (!b.tags || b.tags.length === 0) return -1;
            return a.tags[0].localeCompare(b.tags[0]);
          });
          break;
      }
    }
    
    return results;
  };

  const addToRecentSearches = (film: Film) => {
    setRecentSearches(prevSearches => {
      // Remove the film if it's already in recent searches to avoid duplicates
      const filteredSearches = prevSearches.filter(search => search.id !== film.id);
      
      // Add the film to the beginning of the array and limit to 5 items
      return [film, ...filteredSearches].slice(0, 5);
    });
  };

  const recentlyAdded = films.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }).slice(0, 5);

  return (
    <FilmContext.Provider value={{
      films,
      addFilm,
      updateFilm,
      deleteFilm,
      getFilm,
      searchFilms,
      recentSearches,
      recentlyAdded,
      addToRecentSearches,
    }}>
      {children}
    </FilmContext.Provider>
  );
};

export const useFilms = (): FilmContextType => {
  const context = useContext(FilmContext);
  if (!context) {
    throw new Error('useFilms must be used within a FilmProvider');
  }
  return context;
};
