
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Feather } from 'lucide-react';
import VintageButton from './VintageButton';

interface NoteEditorProps {
  onSave: (note: { title: string; content: string }) => void;
  onCancel: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSave({ title, content });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-12 md:p-24 shadow-premium-hover border-t-[12px] border-[#b08d57] min-h-[80vh] relative overflow-hidden rounded-sm"
    >
      <div className="absolute top-10 right-10 opacity-[0.03] rotate-12 pointer-events-none">
        <Feather size={200} className="text-[#1a120b]" />
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col h-full space-y-12">
        <input 
          type="text"
          placeholder="Subject of the Chronicle..."
          className="w-full bg-transparent text-5xl md:text-6xl font-serif-header border-none focus:outline-none placeholder:text-[#4a3728]/20 italic text-[#1a120b] tracking-tight"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        
        <div className="h-[2px] w-full bg-[#b08d57]/20" />

        <div className="flex-1">
          <textarea
            placeholder="Let your thoughts flow onto the page..."
            className="w-full min-h-[450px] bg-transparent notebook-lines text-2xl md:text-3xl font-serif leading-[2.5rem] focus:outline-none resize-none px-4 text-[#2c1e14] italic placeholder:text-[#4a3728]/10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center pt-12 border-t border-[#b08d57]/20">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#b08d57]" />
            <p className="text-sm uppercase tracking-[0.25em] text-[#b08d57] font-bold">
              Archival Progress: {content.split(/\s+/).filter(Boolean).length} Words
            </p>
          </div>
          <div className="flex gap-6">
            <VintageButton variant="secondary" onClick={onCancel} className="!px-10 border-[#b08d57]/40">
              <X size={16} className="mr-2" /> Discard
            </VintageButton>
            <VintageButton type="submit" className="!px-14">
              <Check size={18} className="mr-2" /> Seal Record
            </VintageButton>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default NoteEditor;
