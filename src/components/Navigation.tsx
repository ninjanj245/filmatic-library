
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" 
            stroke={isActive('/add') ? "#FF6F61" : "white"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"/>
        </svg>
      </button>
      
      <button 
        onClick={() => navigate('/search')}
        className="flex flex-col items-center justify-center w-16 h-16"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" 
            stroke={isActive('/search') ? "#FF6F61" : "white"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"/>
          <path d="M21 21L16.65 16.65" 
            stroke={isActive('/search') ? "#FF6F61" : "white"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"/>
        </svg>
      </button>
      
      <button 
        onClick={() => navigate('/library')}
        className="flex flex-col items-center justify-center w-16 h-16"
      >
        <img 
          src="/lovable-uploads/5d5b1e4e-5fad-4e3d-ba7c-a58e41a40310.png" 
          alt="Film Library" 
          width="28" 
          height="28"
          className={`${isActive('/library') ? 'brightness-100 opacity-100' : 'brightness-200 opacity-80'} transition-all`}
        />
      </button>
      
      <button 
        onClick={() => navigate('/')}
        className="flex flex-col items-center justify-center w-16 h-16"
      >
        <img 
          src="/lovable-uploads/5033c555-a7e0-4ebf-b9e5-ad038fc34675.png" 
          alt="Home" 
          width="28" 
          height="28"
          className={`${isActive('/') ? 'brightness-100 opacity-100' : 'brightness-200 opacity-80'} transition-all`}
        />
      </button>
    </nav>
  );
};

export default Navigation;
