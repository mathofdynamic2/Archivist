
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, LogOut, BookOpen, PenLine, Search, LayoutGrid, List } from 'lucide-react';
import { User, Note } from '../types';
import VintageButton from '../components/VintageButton';
import NoteEditor from '../components/NoteEditor';

interface DashboardPageProps {
  user: User;
  notes: Note[];
  onAddNote: (note: { title: string; content: string }) => void;
  onDeleteNote: (id: string) => void;
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, notes, onAddNote, onDeleteNote, onLogout }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'stack'>('grid');

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen flex flex-col paper-texture">
      {/* Refined Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#fdf6e3]/80 backdrop-blur-md border-b border-[#b08d57]/30 px-8 py-5 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-10">
          <div>
            <h1 className="text-3xl font-serif-header italic text-[#1a120b]">
              The Archivist
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#b08d57] font-bold">Personal Ledger</p>
          </div>
          
          <div className="hidden md:flex items-center bg-[#f4ecd8] border border-[#b08d57]/40 px-4 py-2 rounded-sm shadow-inner">
            <Search size={16} className="text-[#4a3728]" />
            <input 
              type="text" 
              placeholder="Query the scrolls..."
              className="bg-transparent border-none text-sm text-[#1a120b] focus:outline-none px-3 w-64 placeholder:text-[#4a3728]/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-all ${viewMode === 'grid' ? 'text-[#1a120b] bg-[#1a120b]/5' : 'text-[#b08d57] opacity-60'}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('stack')}
              className={`p-2 transition-all ${viewMode === 'stack' ? 'text-[#1a120b] bg-[#1a120b]/5' : 'text-[#b08d57] opacity-60'}`}
            >
              <List size={20} />
            </button>
          </div>
          <div className="h-6 w-[1px] bg-[#b08d57]/30 hidden sm:block" />
          <VintageButton variant="ghost" onClick={onLogout} className="text-[#1a120b]">
            <LogOut size={16} className="mr-2" /> Exit Study
          </VintageButton>
        </div>
      </header>

      <main className="flex-1 p-10 max-w-7xl mx-auto w-full">
        {!isAdding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12 border-b border-[#b08d57]/20 pb-8"
          >
            <h2 className="text-5xl font-serif-header italic text-[#1a120b] mb-3">
              Archives of {user.name}
            </h2>
            <p className="text-[#4a3728] font-cursive text-2xl">
              Currently preserving {notes.length} unique chronicles.
            </p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {isAdding ? (
            <motion.div 
              key="editor"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-5xl mx-auto"
            >
              <NoteEditor 
                onSave={(note) => {
                  onAddNote(note);
                  setIsAdding(false);
                }} 
                onCancel={() => setIsAdding(false)} 
              />
            </motion.div>
          ) : (
            <motion.div 
              key="list"
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
                : "flex flex-col gap-6 max-w-4xl mx-auto"}
            >
              {filteredNotes.length === 0 ? (
                <div className="col-span-full py-40 text-center">
                  <BookOpen size={64} className="mx-auto mb-6 text-[#b08d57] opacity-20" />
                  <p className="text-3xl italic font-serif-header text-[#4a3728]/60 mb-10">
                    {searchQuery ? "No records found in this query." : "Awaiting the first stroke of your pen."}
                  </p>
                  {!searchQuery && (
                    <VintageButton onClick={() => setIsAdding(true)}>
                      <Plus size={18} className="mr-2" /> Write a New Scroll
                    </VintageButton>
                  )}
                </div>
              ) : (
                filteredNotes.map((note, idx) => (
                  <motion.div
                    key={note.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.01 }}
                    className={`
                      relative bg-white/50 p-8 shadow-premium rounded-sm border border-[#b08d57]/20 
                      hover:shadow-premium-hover hover:border-[#1a120b]/30 transition-all duration-300
                      group cursor-default
                    `}
                  >
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onDeleteNote(note.id)}
                        className="text-[#8b0000] p-2 hover:bg-[#8b0000]/5 rounded-sm transition-colors"
                        title="Incinerate Record"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-2xl font-serif-header italic text-[#1a120b] border-b border-[#b08d57]/10 pb-3 pr-8 leading-tight">
                        {note.title}
                      </h3>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#b08d57] block mt-3 font-bold">
                        DATED: {note.timestamp}
                      </span>
                    </div>

                    <p className="text-[#2c1e14] font-serif leading-relaxed line-clamp-6 min-h-[140px] whitespace-pre-wrap italic text-lg opacity-90">
                      {note.content}
                    </p>

                    <div className="mt-8 flex justify-end items-center border-t border-[#b08d57]/10 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-[#b08d57] bg-[#fdf6e3] flex items-center justify-center shadow-sm">
                           <span className="text-[10px] font-bold text-[#1a120b]">{user.name.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-cursive text-[#4a3728] italic">
                          Archived by Scribe {user.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {!isAdding && (
        <motion.div 
          className="fixed bottom-12 right-12 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAdding(true)}
            className="wax-seal w-20 h-20 rounded-full text-[#fdf6e3] flex items-center justify-center shadow-2xl group"
          >
            <Plus size={40} className="group-hover:rotate-90 transition-transform duration-500" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardPage;
