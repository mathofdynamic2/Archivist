
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User as UserIcon, Mail, Lock } from 'lucide-react';
import VintageButton from '../components/VintageButton';
import { User, ViewType } from '../types';

interface AuthPageProps {
  type: 'signin' | 'signup';
  onToggle: () => void;
  onSuccess: (user: User) => void;
  onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ type, onToggle, onSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || formData.email.split('@')[0],
      email: formData.email
    });
  };

  const inputStyles = "w-full bg-[#fdf6e3] border-b-2 border-[#b08d57]/40 px-10 py-4 text-xl focus:outline-none focus:border-[#1a120b] transition-all placeholder:text-[#4a3728]/30 text-[#1a120b] font-serif";

  return (
    <div className="bg-white/80 backdrop-blur-md p-10 md:p-16 shadow-premium-hover rounded-sm border-[10px] border-[#f4ecd8] relative">
      <button 
        onClick={onBack}
        className="absolute top-6 left-6 text-[#1a120b] hover:text-[#b08d57] transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold"
      >
        <ArrowLeft size={16} /> Return to Hall
      </button>

      <div className="text-center mb-12 mt-6">
        <h2 className="text-5xl font-serif-header italic text-[#1a120b]">
          {type === 'signin' ? 'Sign the Register' : 'New Chronicle'}
        </h2>
        <div className="w-16 h-[2px] bg-[#b08d57] mx-auto mt-4"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {type === 'signup' && (
          <div className="relative">
            <UserIcon className="absolute left-2 top-5 text-[#b08d57]" size={20} />
            <input 
              required
              type="text" 
              placeholder="Name of the Scribe"
              className={inputStyles}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
        )}

        <div className="relative">
          <Mail className="absolute left-2 top-5 text-[#b08d57]" size={20} />
          <input 
            required
            type="email" 
            placeholder="Electronic Address"
            className={inputStyles}
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-2 top-5 text-[#b08d57]" size={20} />
          <input 
            required
            type="password" 
            placeholder="Secret Passphrase"
            className={inputStyles}
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>

        <div className="pt-6 flex flex-col items-center gap-8">
          <VintageButton type="submit" className="w-full !py-4 text-sm">
            {type === 'signin' ? 'Authenticate' : 'Begin Registry'}
          </VintageButton>

          <button 
            type="button"
            onClick={onToggle}
            className="text-sm italic text-[#4a3728] hover:text-[#1a120b] underline underline-offset-4"
          >
            {type === 'signin' 
              ? "New here? Commission a new chronicle." 
              : "Registered? Return to your ledger."}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
