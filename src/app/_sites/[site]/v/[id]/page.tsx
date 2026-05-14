'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal, FadeIn } from '@/components/premium/Reveal';
import { PremiumButton } from '@/components/ui/PremiumButton';

export default function VisitorVideoView({ params }: { params: { site: string; id: string } }) {
  const [churchName, setChurchName] = useState('Grace Cathedral');
  const [hostName, setHostName] = useState('Pastor David');
  
  // In a real app, we would fetch the video data and church data here
  // and call markVideoAsWatched(params.id)

  return (
    <div className="min-h-screen bg-brand-parchment text-brand-midnight selection:bg-brand-gold/30 flex flex-col">
      {/* Hospitality Header */}
      <nav className="p-8 flex justify-center border-b border-brand-midnight/5 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-midnight rounded-lg flex items-center justify-center text-brand-gold font-serif font-bold">S</div>
          <span className="font-serif font-bold text-xl tracking-tight">{churchName}</span>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 max-w-4xl mx-auto w-full">
        <div className="w-full luxury-spacing">
          <header className="text-center">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">A Personal Welcome</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold">Exclusive Connection for our Guest</p>
            </Reveal>
          </header>

          {/* Video Player Box */}
          <FadeIn delay={0.4}>
            <div className="aspect-video bg-brand-midnight rounded-[3rem] shadow-2xl relative overflow-hidden border border-brand-gold/20 group">
               {/* Placeholder for actual video player */}
               <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-parchment">
                  <div className="w-24 h-24 rounded-full bg-brand-gold/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 cursor-pointer">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-brand-gold border-b-[12px] border-b-transparent ml-2" />
                  </div>
                  <p className="font-serif italic text-xl">Press to play your message</p>
               </div>
               
               {/* Subtle overlay */}
               <div className="absolute bottom-8 left-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-parchment border border-brand-gold/20 flex items-center justify-center text-brand-midnight font-bold">
                    D
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold uppercase tracking-widest">{hostName}</p>
                    <p className="text-brand-gold text-[10px] font-medium">Your Sunday Host</p>
                  </div>
               </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-brand-midnight/5 text-center">
               <h3 className="text-2xl font-serif font-bold mb-6">We can't wait to meet you.</h3>
               <p className="text-brand-slate font-light leading-relaxed mb-10 max-w-lg mx-auto">
                 "Hospitality is not just a greeting; it's a bridge to belonging. See you this Sunday at 10:00 AM."
               </p>
               <div className="flex flex-col sm:flex-row gap-6 justify-center">
                 <PremiumButton variant="primary">Add to Calendar</PremiumButton>
                 <PremiumButton variant="outline">Get Directions</PremiumButton>
               </div>
            </div>
          </FadeIn>
        </div>
      </main>

      <footer className="p-12 text-center text-brand-slate/40 text-[10px] uppercase tracking-widest font-bold">
        Powered by StoryBridge Studio
      </footer>
    </div>
  );
}
