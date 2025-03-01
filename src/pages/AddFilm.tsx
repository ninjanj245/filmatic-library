
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilms } from '@/context/FilmContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Film } from '@/types/film';

const AddFilm = () => {
  const navigate = useNavigate();
  const { addFilm } = useFilms();
  
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [actor, setActor] = useState('');
  const [genre, setGenre] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [year, setYear] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !director || !idNumber) {
      toast.error('Please fill in all required fields: Title, Director, and ID Number');
      return;
    }
    
    const newFilm: Omit<Film, 'id' | 'createdAt'> = {
      title,
      director,
      idNumber,
      image: imageUrl,
      actor: actor || undefined,
      genre: genre || undefined,
      year: year || undefined,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : undefined,
    };
    
    addFilm(newFilm);
    navigate('/');
  };
  
  return (
    <div className="min-h-screen pb-20 animate-fade-in">
      <div className="max-w-md mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Add film</h1>
        
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
          
          <div className="border border-gray-300 rounded-xl p-4 h-40 flex items-center justify-center">
            <p className="text-gray-500 text-center">Drag & drop for upload</p>
          </div>
          
          <div>
            <Input
              placeholder="Upload image via URL"
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
              Add film
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

export default AddFilm;
