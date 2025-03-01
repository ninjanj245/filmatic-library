
import React, { useState } from 'react';
import { Film } from '@/types/film';
import { useFilms } from '@/context/FilmContext';
import { X, Edit, Trash2 } from 'lucide-react';
import placeholderImage from '/placeholder.svg';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface FilmModalProps {
  film: Film;
  isOpen: boolean;
  onClose: () => void;
}

const FilmModal: React.FC<FilmModalProps> = ({ film, isOpen, onClose }) => {
  const { deleteFilm } = useFilms();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleDelete = () => {
    deleteFilm(film.id);
    onClose();
    toast.success('Film deleted successfully');
  };

  const handleEdit = () => {
    navigate(`/edit/${film.id}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-[10px]">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold">{film.title}</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="rounded-[10px] overflow-hidden mt-2">
          <img
            src={imageError || !film.image ? placeholderImage : film.image}
            alt={film.title}
            onError={() => setImageError(true)}
            className="w-full object-cover aspect-video"
          />
        </div>

        <div className="space-y-3 mt-3">
          <div className="flex justify-between">
            <span className="font-medium">ID Number:</span>
            <span>{film.idNumber}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-medium">Director:</span>
            <span>{film.director}</span>
          </div>
          
          {film.actor && (
            <div className="flex justify-between">
              <span className="font-medium">Actor:</span>
              <span>{film.actor}</span>
            </div>
          )}
          
          {film.year && (
            <div className="flex justify-between">
              <span className="font-medium">Year:</span>
              <span>{film.year}</span>
            </div>
          )}
          
          {film.genre && (
            <div className="flex justify-between">
              <span className="font-medium">Genre:</span>
              <span>{film.genre}</span>
            </div>
          )}
          
          {film.tags && film.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {film.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 px-2 py-1 rounded-[10px] text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="flex sm:justify-between gap-3 mt-4">
          <Button 
            variant="outline" 
            className="border-gray-300 hover:bg-gray-100 text-gray-700 rounded-[10px]"
            onClick={onClose}
          >
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="border-coral hover:bg-coral/10 text-coral rounded-[10px]"
              onClick={handleEdit}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDelete}
              className="rounded-[10px]"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilmModal;
