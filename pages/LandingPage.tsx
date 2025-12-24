
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import VintageButton from '../components/VintageButton';
import { 
  Feather, 
  Book, 
  ScrollText, 
  ChevronDown, 
  Search, 
  ShieldCheck, 
  PenTool, 
  Library,
  Zap
} from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative">
        <motion.div
          style={{ y: yParallax }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-12 relative"
        >
          <div className="wax-seal w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl relative z-10">
            <Feather className="text-amber-50/90 w-16 h-16" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif-header mb-6 text-[#1a120b] italic leading-tight">
            The Archivist
          </h1>
          <div className="h-[2px] w-24 bg-[#b08d57] mx-auto mb-8" />
          <p className="text-2xl md:text-3xl font-cursive mb-12 text-[#4a3728]">
            Where your thoughts become a legacy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-8"
        >
          <VintageButton onClick={onStart} className="min-w-[260px]">
            Begin Your Chronicle
          </VintageButton>
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="text-[#b08d57] cursor-pointer"
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. CORE UTILITY SECTION */}
      <section className="max-w-6xl mx-auto py-32 px-6">
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif-header italic text-[#1a120b] mb-4">The Scribe's Utility</h2>
          <p className="text-xl text-[#4a3728] max-w-2xl mx-auto font-serif italic">
            A digital toolkit built for modern efficiency, wrapped in the elegance of the past.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#b08d57]/10 flex items-center justify-center rounded-sm text-[#b08d57]">
                <PenTool size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-serif-header mb-2 text-[#1a120b]">Focused Journaling</h3>
                <p className="text-[#4a3728] font-serif leading-relaxed">
                  Our full-screen editor removes modern distractions, featuring real-time word counting and an aged-paper texture to keep your focus on the story.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#b08d57]/10 flex items-center justify-center rounded-sm text-[#b08d57]">
                <Search size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-serif-header mb-2 text-[#1a120b]">Precision Retrieval</h3>
                <p className="text-[#4a3728] font-serif leading-relaxed">
                  The Archive Query system allows you to search through centuries of entries (or just your last week) with instantaneous results across titles and contents.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#b08d57]/10 flex items-center justify-center rounded-sm text-[#b08d57]">
                <Library size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-serif-header mb-2 text-[#1a120b]">Curated Layouts</h3>
                <p className="text-[#4a3728] font-serif leading-relaxed">
                  Switch between Grid View for a visual gallery of your thoughts or Stack View for a focused, chronological reading experience.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-white/40 shadow-premium border-8 border-[#f4ecd8] p-8 flex flex-col gap-4">
              <div className="h-4 w-3/4 bg-[#b08d57]/20 rounded-full" />
              <div className="h-4 w-full bg-[#b08d57]/10 rounded-full" />
              <div className="h-4 w-5/6 bg-[#b08d57]/10 rounded-full" />
              <div className="h-4 w-full bg-[#b08d57]/10 rounded-full" />
              <div className="mt-8 grid grid-cols-2 gap-4">
                 <div className="h-32 bg-[#b08d57]/5 rounded-sm flex items-center justify-center text-[#b08d57]/30 italic font-serif">Note Card</div>
                 <div className="h-32 bg-[#b08d57]/5 rounded-sm flex items-center justify-center text-[#b08d57]/30 italic font-serif">Note Card</div>
              </div>
            </div>
            {/* Abstract Floating Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#b08d57] rotate-12 flex items-center justify-center text-white shadow-2xl">
              <Zap size={48} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. THE WORKFLOW (PROCESS) SECTION */}
      <section className="bg-[#1a120b]/5 py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif-header italic text-[#1a120b] mb-4">The Archival Lifecycle</h2>
            <div className="h-[1px] w-16 bg-[#b08d57] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                step: "01", 
                title: "Register", 
                desc: "Establish your unique scribe signature with our private registry. Your chronicles are yours alone.", 
                icon: <ShieldCheck /> 
              },
              { 
                step: "02", 
                title: "Inscribe", 
                desc: "Draft entries in our focused editor. Utilize the tactile notebook lines to guide your creative flow.", 
                icon: <PenTool /> 
              },
              { 
                step: "03", 
                title: "Seal", 
                desc: "Communicate your entry to the archives. Once sealed, it joins your eternal library for future reflection.", 
                icon: <ScrollText /> 
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative p-8 text-center group"
              >
                <span className="text-6xl font-serif-header text-[#b08d57]/10 absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none group-hover:text-[#b08d57]/20 transition-colors">
                  {item.step}
                </span>
                <div className="text-[#b08d57] mb-6 flex justify-center relative z-10">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                </div>
                <h4 className="text-xl font-serif-header mb-4 text-[#1a120b] relative z-10">{item.title}</h4>
                <p className="text-[#4a3728] font-serif text-sm leading-relaxed relative z-10">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PHILOSOPHICAL QUOTE SECTION */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-3xl md:text-5xl font-serif-header italic text-[#1a120b] leading-tight"
          >
            "A life unexamined is like a ledger left blank. We do not write to remember, but to understand."
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-[#b08d57] font-cursive text-2xl"
          >
            — The Society of Archivists
          </motion.p>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <Feather size={400} />
        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section className="py-32 bg-[#1a120b] text-[#fdf6e3] text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-serif-header italic mb-8">Ready to start your ledger?</h2>
          <p className="text-xl text-[#b08d57] mb-12 max-w-xl mx-auto font-serif">
            Join thousands of writers who have returned to the focused art of digital inscription.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <VintageButton onClick={onStart} className="min-w-[240px] !border-white !text-white hover:!bg-white/10">
              Sign the Register
            </VintageButton>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm uppercase tracking-widest font-serif-header hover:text-[#b08d57] transition-colors"
            >
              Return to Top
            </button>
          </div>
        </motion.div>
      </section>

      <footer className="py-12 text-center text-[10px] uppercase tracking-[0.3em] text-[#4a3728] opacity-40">
        The Archivist Digital Ledger &copy; MCMXXIV — MMXXV
      </footer>
    </div>
  );
};

export default LandingPage;
