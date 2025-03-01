
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
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.9001 10.8999C19.5063 10.8999 19.129 11.0527 18.8539 11.3277C18.5789 11.6028 18.4261 11.9801 18.4261 12.3739V18.4259C18.4261 18.8197 18.2733 19.197 17.9983 19.472C17.7232 19.7471 17.346 19.8999 16.9521 19.8999H7.04787C6.65402 19.8999 6.27678 19.7471 6.00174 19.472C5.7267 19.197 5.57388 18.8197 5.57388 18.4259V5.57384C5.57388 5.18 5.7267 4.80275 6.00174 4.52771C6.27678 4.25267 6.65402 4.09985 7.04787 4.09985H16.9521C17.346 4.09985 17.7232 4.25267 17.9983 4.52771C18.2733 4.80275 18.4261 5.18 18.4261 5.57384V7.04783C18.4261 7.44168 18.5789 7.81892 18.8539 8.09396C19.129 8.369 19.5063 8.52183 19.9001 8.52183C20.294 8.52183 20.6712 8.369 20.9463 8.09396C21.2213 7.81892 21.3741 7.44168 21.3741 7.04783V5.57384C21.3741 4.39231 20.9057 3.25959 20.0805 2.43447C19.2554 1.60935 18.1227 1.14087 16.9411 1.14087H7.04787C5.86634 1.14087 4.73362 1.60935 3.9085 2.43447C3.08338 3.25959 2.6149 4.39231 2.6149 5.57384V18.4259C2.6149 19.6075 3.08338 20.7402 3.9085 21.5653C4.73362 22.3904 5.86634 22.8589 7.04787 22.8589H16.9521C18.1336 22.8589 19.2663 22.3904 20.0914 21.5653C20.9166 20.7402 21.3851 19.6075 21.3851 18.4259V12.3739C21.3851 11.9801 21.2322 11.6028 20.9572 11.3277C20.6822 11.0527 20.3049 10.8999 19.9111 10.8999H19.9001Z" 
            stroke={isActive('/library') ? "#FF6F61" : "white"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"/>
          <path d="M12 16.949C13.0449 16.949 13.895 16.0989 13.895 15.054C13.895 14.0091 13.0449 13.159 12 13.159C10.9551 13.159 10.105 14.0091 10.105 15.054C10.105 16.0989 10.9551 16.949 12 16.949Z" 
            stroke={isActive('/library') ? "#FF6F61" : "white"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"/>
          <path d="M12 13.158V8.53687" 
            stroke={isActive('/library') ? "#FF6F61" : "white"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"/>
          <path d="M10.106 10.105L12 8.53687L13.895 10.105" 
            stroke={isActive('/library') ? "#FF6F61" : "white"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"/>
        </svg>
      </button>
      
      <button 
        onClick={() => navigate('/')}
        className="flex flex-col items-center justify-center w-16 h-16"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
            stroke={isActive('/') ? "#FF6F61" : "white"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"/>
          <path d="M9 22V12H15V22" 
            stroke={isActive('/') ? "#FF6F61" : "white"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"/>
        </svg>
      </button>
    </nav>
  );
};

export default Navigation;
