
import { Dropbox } from 'dropbox';

// Initialize Dropbox client
const dropboxClient = new Dropbox({
  clientId: 'YOUR_DROPBOX_CLIENT_ID',
});

// Get authentication URL
export const getAuthUrl = () => {
  return dropboxClient.auth.getAuthenticationUrl(window.location.origin + '/auth');
};

// Set the access token after authentication
export const setAccessToken = (accessToken: string) => {
  dropboxClient.auth.setAccessToken(accessToken);
  localStorage.setItem('dropboxAccessToken', accessToken);
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem('dropboxAccessToken') !== null;
};

// Initialize client with stored token if available
export const initializeDropbox = () => {
  const token = localStorage.getItem('dropboxAccessToken');
  if (token) {
    dropboxClient.auth.setAccessToken(token);
    return true;
  }
  return false;
};

// Sync films to Dropbox
export const syncFilmsToDropbox = async (films: any[]) => {
  try {
    if (!isAuthenticated()) {
      throw new Error('Not authenticated with Dropbox');
    }
    
    const filmsJson = JSON.stringify(films);
    const response = await dropboxClient.filesUpload({
      path: '/films.json',
      contents: filmsJson,
      mode: { '.tag': 'overwrite' },
    });
    
    return response;
  } catch (error) {
    console.error('Failed to sync with Dropbox', error);
    throw error;
  }
};

// Get films from Dropbox
export const getFilmsFromDropbox = async () => {
  try {
    if (!isAuthenticated()) {
      throw new Error('Not authenticated with Dropbox');
    }
    
    const response = await dropboxClient.filesDownload({ path: '/films.json' });
    
    // @ts-ignore - The type definitions for Dropbox are not perfect
    const fileBlob = response.result.fileBlob;
    const fileText = await fileBlob.text();
    
    return JSON.parse(fileText);
  } catch (error) {
    console.error('Failed to get films from Dropbox', error);
    return null;
  }
};
