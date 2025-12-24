
import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { User, Note, ViewType } from './types';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  // Simulation of "Persistence" during session
  const navigate = (view: ViewType) => setCurrentView(view);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    navigate('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('landing');
  };

  const addNote = (note: Omit<Note, 'id' | 'authorId' | 'timestamp'>) => {
    if (!currentUser) return;
    const newNote: Note = {
      ...note,
      id: Math.random().toString(36).substr(2, 9),
      authorId: currentUser.id,
      timestamp: new Date().toLocaleString(),
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const userNotes = useMemo(() => 
    notes.filter(n => n.authorId === currentUser?.id),
    [notes, currentUser]
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <LandingPage onStart={() => navigate('signin')} />
          </motion.div>
        )}

        {(currentView === 'signin' || currentView === 'signup') && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <AuthPage 
              type={currentView} 
              onToggle={() => navigate(currentView === 'signin' ? 'signup' : 'signin')}
              onSuccess={handleLogin}
              onBack={() => navigate('landing')}
            />
          </motion.div>
        )}

        {currentView === 'dashboard' && currentUser && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col items-center"
          >
            <DashboardPage 
              user={currentUser}
              notes={userNotes}
              onAddNote={addNote}
              onDeleteNote={deleteNote}
              onLogout={handleLogout}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="fixed bottom-4 text-xs opacity-50 uppercase tracking-widest pointer-events-none">
        MCMXXIV &copy; The Archivist Society
      </footer>
    </div>
  );
};

export default App;
