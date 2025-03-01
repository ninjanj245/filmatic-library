
export interface Film {
  id: string;
  title: string;
  director: string;
  idNumber: string;
  image?: string;
  actor?: string;
  year?: string;
  genre?: string;
  tags?: string[];
  createdAt: Date;
}

export type SortOption = 'alphabetically' | 'director' | 'actor' | 'number' | 'genre' | 'year' | 'tags';

export interface FilmContextType {
  films: Film[];
  addFilm: (film: Omit<Film, 'id' | 'createdAt'>) => void;
  updateFilm: (id: string, film: Partial<Film>) => void;
  deleteFilm: (id: string) => void;
  getFilm: (id: string) => Film | undefined;
  searchFilms: (query: string, option?: SortOption) => Film[];
  recentSearches: Film[];
  recentlyAdded: Film[];
  addToRecentSearches: (film: Film) => void;
}
