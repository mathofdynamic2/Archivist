
import React from 'react';
import { motion } from 'framer-motion';

interface VintageButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  className?: string;
  type?: 'button' | 'submit';
}

const VintageButton: React.FC<VintageButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  type = 'button'
}) => {
  const baseStyles = "relative px-8 py-3 rounded-none transition-all duration-300 font-serif-header uppercase tracking-[0.15em] text-xs border overflow-hidden group font-bold";
  
  const variants = {
    primary: "bg-[#1a120b] text-[#fdf6e3] border-[#1a120b] hover:bg-[#3d2b1c]",
    secondary: "bg-transparent text-[#1a120b] border-[#1a120b] hover:bg-[#1a120b]/5",
    danger: "bg-[#8b0000] text-[#fdf6e3] border-[#8b0000] hover:bg-[#a52a2a]",
    ghost: "bg-transparent text-[#4a3728] border-none hover:text-[#1a120b] px-2 py-1"
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 0.5 }}
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 w-1/4 h-full bg-white/10 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[400%] transition-transform duration-700 ease-in-out" />
    </motion.button>
  );
};

export default VintageButton;
