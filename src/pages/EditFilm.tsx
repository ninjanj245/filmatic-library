
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFilms } from '@/context/FilmContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const EditFilm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getFilm, updateFilm } = useFilms();
  
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [actor, setActor] = useState('');
  const [genre, setGenre] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [year, setYear] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  useEffect(() => {
    if (id) {
      const film = getFilm(id);
      if (film) {
        setTitle(film.title);
        setDirector(film.director);
        setActor(film.actor || '');
        setGenre(film.genre || '');
        setIdNumber(film.idNumber);
        setYear(film.year || '');
        setTags(film.tags ? film.tags.join(', ') : '');
        setImageUrl(film.image || '');
      } else {
        toast.error('Film not found');
        navigate('/');
      }
    }
  }, [id, getFilm, navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) return;
    
    if (!title || !director || !idNumber) {
      toast.error('Please fill in all required fields: Title, Director, and ID Number');
      return;
    }
    
    updateFilm(id, {
      title,
      director,
      idNumber,
      image: imageUrl || undefined,
      actor: actor || undefined,
      genre: genre || undefined,
      year: year || undefined,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : undefined,
    });
    
    navigate('/');
  };
  
  return (
    <div className="min-h-screen pb-20 animate-fade-in">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="mr-3"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Edit film</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Film Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full py-4 px-4 rounded-full border border-gray-300"
              required
            />
          </div>
          
          <div>
            <Input
              placeholder="Director"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              className="w-full py-4 px-4 rounded-full border border-gray-300"
              required
            />
          </div>
          
          <div>
            <Input
              placeholder="Actor"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              className="w-full py-4 px-4 rounded-full border border-gray-300"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full py-4 px-4 rounded-full border border-gray-300"
              />
            </div>
            <div>
              <Input
                placeholder="ID number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="w-full py-4 px-4 rounded-full border border-gray-300"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full py-4 px-4 rounded-full border border-gray-300"
              />
            </div>
            <div>
              <Input
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full py-4 px-4 rounded-full border border-gray-300"
                type="number"
                min="1888"
                max={new Date().getFullYear().toString()}
              />
            </div>
          </div>
          
          {imageUrl && (
            <div className="border border-gray-300 rounded-xl overflow-hidden h-40">
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            </div>
          )}
          
          <div>
            <Input
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full py-4 px-4 rounded-full border border-gray-300"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button
              type="submit"
              className="w-full py-6 bg-coral hover:bg-coral/90 text-white text-lg rounded-xl font-medium"
            >
              Save changes
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full py-6 bg-coral text-white text-lg rounded-xl font-medium border-none"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
      
      <Navigation />
    </div>
  );
};

export default EditFilm;
