'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal, FadeIn } from '@/components/premium/Reveal';

function DashboardContent() {
  const searchParams = useSearchParams();
  const showWelcome = searchParams.get('welcome') === 'true';

  const [checklist, setChecklist] = useState([
    { id: 1, label: 'Launch your first PYV Page', completed: true },
    { id: 2, label: 'Invite team members', completed: false },
    { id: 3, label: 'Collect first StoryBox entry', completed: false },
    { id: 4, label: 'Embed PYV on homepage', completed: false },
  ]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto selection:bg-brand-gold/30">
      {showWelcome && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-gold text-brand-midnight p-8 rounded-[2rem] mb-12 flex justify-between items-center shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold mb-2 text-brand-midnight">Welcome to StoryBridge, Partner.</h2>
            <p className="text-brand-midnight/70 font-light text-lg">Your church's digital hospitality engine is now active.</p>
          </div>
          <button className="relative z-10 bg-brand-midnight text-brand-parchment px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-brand-midnight/80 transition shadow-xl">
            Dismiss
          </button>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
        </motion.div>
      )}

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-12"
      >
        {/* Main Dashboard Stats */}
        <div className="lg:col-span-2 space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <motion.div variants={item} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-brand-midnight/5 group hover:border-brand-gold/20 transition-colors">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">Total Scheduled Visits</p>
              <h3 className="text-6xl font-serif font-bold text-brand-midnight group-hover:gold-text transition-all">0</h3>
            </motion.div>
            <motion.div variants={item} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-brand-midnight/5 group hover:border-brand-gold/20 transition-colors">
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">Pending StoryBox Submissions</p>
              <h3 className="text-6xl font-serif font-bold text-brand-midnight group-hover:gold-text transition-all">0</h3>
            </motion.div>
          </div>

          <motion.div variants={item} className="bg-white p-16 rounded-[3rem] shadow-2xl border border-brand-midnight/5 min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden">
             <div className="text-6xl mb-8 opacity-20">📊</div>
             <h3 className="text-2xl font-serif font-bold text-brand-midnight mb-4">Patience in the Planting</h3>
             <p className="text-brand-slate max-w-sm font-light leading-relaxed">
               No data has arrived yet. Share your "Plan Your Visit" link on social media to begin the harvest.
             </p>
             <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          </motion.div>
        </div>

        {/* Success Checklist */}
        <div className="space-y-8">
          <motion.div variants={item} className="bg-brand-midnight text-brand-parchment p-10 rounded-[2.5rem] shadow-2xl border border-brand-gold/10 relative overflow-hidden">
            <h3 className="text-xl font-serif font-bold mb-8 flex items-center justify-between">
              The Launchpad
              <span className="text-[10px] font-sans font-bold bg-brand-gold text-brand-midnight px-3 py-1 rounded-full uppercase tracking-tighter">1 / 4 Complete</span>
            </h3>
            <div className="space-y-6 relative z-10">
              {checklist.map(item => (
                <div key={item.id} className="flex items-start gap-4 group cursor-default">
                  <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-500 ${item.completed ? 'bg-brand-gold border-brand-gold scale-110' : 'border-brand-gold/30'}`}>
                    {item.completed && <span className="text-brand-midnight text-[8px] font-black">✓</span>}
                  </div>
                  <span className={`text-sm font-light tracking-wide transition-all duration-500 ${item.completed ? 'text-brand-parchment/40 line-through' : 'text-brand-parchment group-hover:text-brand-gold'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
          </motion.div>

          <motion.div variants={item} className="bg-brand-parchment border border-brand-gold/20 p-8 rounded-[2rem] relative">
             <h4 className="font-bold text-brand-gold mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
                <span className="text-xl">🖋️</span> The Curator's Lens
             </h4>
             <p className="text-sm text-brand-midnight/70 leading-relaxed font-light italic">
                "Digital hospitality is the bridge unchurched people cross before they ever see your stage."
             </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-serif italic text-brand-slate">Preparing your sanctuary...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
