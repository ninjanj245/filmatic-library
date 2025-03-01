
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilms } from '@/context/FilmContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Film } from '@/types/film';
import { CheckCircle } from 'lucide-react';

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
  const [showSuccess, setShowSuccess] = useState(false);
  
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
    setShowSuccess(true);
    
    // Reset form for next entry
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/');
    }, 2000);
  };
  
  if (showSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center animate-fade-in">
        <div className="text-center p-8">
          <CheckCircle className="w-20 h-20 text-coral mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Success!</h2>
          <p className="text-gray-600 mb-4">Film added to your library</p>
          <Button
            onClick={() => navigate('/')}
            className="bg-coral hover:bg-coral/90 text-white text-lg rounded-[10px] font-medium px-8 py-4"
          >
            Return to Home
          </Button>
        </div>
        <Navigation />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-20 animate-fade-in">
      <div className="max-w-md mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Add</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              placeholder="Film Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full py-4 px-4 rounded-[10px] border border-gray-300"
              required
            />
          </div>
          
          <div>
            <label htmlFor="director" className="block text-sm font-medium text-gray-700 mb-1">
              Director <span className="text-red-500">*</span>
            </label>
            <Input
              id="director"
              placeholder="Director"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              className="w-full py-4 px-4 rounded-[10px] border border-gray-300"
              required
            />
          </div>
          
          <div>
            <label htmlFor="actor" className="block text-sm font-medium text-gray-700 mb-1">
              Actor
            </label>
            <Input
              id="actor"
              placeholder="Actor"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              className="w-full py-4 px-4 rounded-[10px] border border-gray-300"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
                Genre
              </label>
              <Input
                id="genre"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full py-4 px-4 rounded-[10px] border border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">
                ID Number <span className="text-red-500">*</span>
              </label>
              <Input
                id="idNumber"
                placeholder="ID number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="w-full py-4 px-4 rounded-[10px] border border-gray-300"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <Input
                id="tags"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full py-4 px-4 rounded-[10px] border border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <Input
                id="year"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full py-4 px-4 rounded-[10px] border border-gray-300"
                type="number"
                min="1888"
                max={new Date().getFullYear().toString()}
              />
            </div>
          </div>
          
          <div className="border border-gray-300 rounded-[10px] p-4 h-40 flex items-center justify-center">
            <p className="text-gray-500 text-center">Drag & drop for upload</p>
          </div>
          
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <Input
              id="imageUrl"
              placeholder="Upload image via URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full py-4 px-4 rounded-[10px] border border-gray-300"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button
              type="submit"
              className="w-full py-6 bg-[#84cc16] hover:bg-[#84cc16]/90 text-white text-lg rounded-[10px] font-medium"
            >
              Add
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full py-6 bg-coral text-white text-lg rounded-[10px] font-medium border-none"
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
