
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '@/services/dropboxService';
import { toast } from 'sonner';

const DropboxAuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the access token from the URL hash
    const hashParams = new URLSearchParams(
      window.location.hash.substring(1)
    );
    const accessToken = hashParams.get('access_token');

    if (accessToken) {
      setAccessToken(accessToken);
      toast.success('Successfully connected to Dropbox');
      navigate('/');
    } else {
      toast.error('Failed to connect to Dropbox');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl">Connecting to Dropbox...</p>
    </div>
  );
};

export default DropboxAuthCallback;
