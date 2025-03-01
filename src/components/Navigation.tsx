
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus, Search, Film, Home } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-navBlack flex items-center justify-around z-50 transition-all duration-300 animate-fade-in">
      <button 
        onClick={() => navigate('/add')}
        className="flex flex-col items-center justify-center w-16 h-16"
      >
        <Plus className={`w-7 h-7 ${isActive('/add') ? 'text-coral' : 'text-white'} transition-colors duration-300`} />
      </button>
      
      <button 
        onClick={() => navigate('/search')}
        className="flex flex-col items-center justify-center w-16 h-16"
      >
        <Search className={`w-7 h-7 ${isActive('/search') ? 'text-coral' : 'text-white'} transition-colors duration-300`} />
      </button>
      
      <button 
        onClick={() => navigate('/library')}
        className="flex flex-col items-center justify-center w-16 h-16"
      >
        <Film className={`w-7 h-7 ${isActive('/library') ? 'text-coral' : 'text-white'} transition-colors duration-300`} />
      </button>
      
      <button 
        onClick={() => navigate('/')}
        className="flex flex-col items-center justify-center w-16 h-16"
      >
        <Home className={`w-7 h-7 ${isActive('/') ? 'text-coral' : 'text-white'} transition-colors duration-300`} />
      </button>
    </nav>
  );
};

export default Navigation;
