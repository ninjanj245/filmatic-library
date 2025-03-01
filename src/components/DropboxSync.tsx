
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  getAuthUrl, 
  syncFilmsToDropbox, 
  isAuthenticated,
  initializeDropbox,
  getFilmsFromDropbox
} from '@/services/dropboxService';
import { useFilms } from '@/context/FilmContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const DropboxSync: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { films, addFilm } = useFilms();
  
  const handleAuth = () => {
    window.location.href = getAuthUrl();
  };
  
  const handleSync = async () => {
    try {
      setIsSyncing(true);
      await syncFilmsToDropbox(films);
      toast.success('Films synced to Dropbox successfully');
      setIsSyncing(false);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Failed to sync with Dropbox');
      setIsSyncing(false);
    }
  };
  
  const handleImport = async () => {
    try {
      setIsSyncing(true);
      const importedFilms = await getFilmsFromDropbox();
      
      if (importedFilms && Array.isArray(importedFilms)) {
        // Add each film from Dropbox that doesn't already exist
        let addedCount = 0;
        importedFilms.forEach((film) => {
          if (!films.find(f => f.id === film.id)) {
            addFilm(film);
            addedCount++;
          }
        });
        
        toast.success(`Imported ${addedCount} films from Dropbox`);
      } else {
        toast.info('No films found in Dropbox');
      }
      
      setIsSyncing(false);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Failed to import from Dropbox');
      setIsSyncing(false);
    }
  };
  
  const isLoggedIn = initializeDropbox();
  
  return (
    <>
      <Button 
        onClick={() => setIsDialogOpen(true)}
        variant="outline" 
        size="sm"
        className="rounded-[10px]"
      >
        Dropbox Sync
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-[10px]">
          <DialogHeader>
            <DialogTitle>Dropbox Synchronization</DialogTitle>
            <DialogDescription>
              Sync your film library with Dropbox to access it across devices.
            </DialogDescription>
          </DialogHeader>
          
          {!isLoggedIn ? (
            <div className="space-y-4">
              <p>Connect to Dropbox to start syncing your film library.</p>
              <Button onClick={handleAuth} className="w-full bg-[#0061FF] hover:bg-[#0050D5] rounded-[10px]">
                Connect to Dropbox
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p>Your account is connected to Dropbox.</p>
              
              <div className="flex justify-between gap-4">
                <Button 
                  onClick={handleSync} 
                  disabled={isSyncing}
                  className="flex-1 bg-coral hover:bg-coral/90 rounded-[10px]"
                >
                  {isSyncing ? 'Syncing...' : 'Sync to Dropbox'}
                </Button>
                
                <Button 
                  onClick={handleImport} 
                  disabled={isSyncing}
                  variant="outline"
                  className="flex-1 rounded-[10px]"
                >
                  {isSyncing ? 'Importing...' : 'Import from Dropbox'}
                </Button>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="rounded-[10px]"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DropboxSync;
