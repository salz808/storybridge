'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/premium/Reveal';
import { PremiumButton } from '@/components/ui/PremiumButton';

export default function ChurchProfile() {
  const church = {
    name: 'Grace Cathedral',
    slug: 'grace-cathedral',
    logoUrl: null,
  };

  return (
    <main className="p-8 md:p-24 max-w-4xl mx-auto">
      <FadeIn>
          <div className="bg-white rounded-[3rem] shadow-2xl border border-brand-midnight/5 overflow-hidden">
            <div className="bg-brand-midnight h-32 relative">
               <div className="absolute -bottom-16 left-12 w-32 h-32 rounded-[2rem] bg-white border-4 border-brand-parchment shadow-xl flex items-center justify-center overflow-hidden">
                  {church.logoUrl ? (
                    <img src={church.logoUrl} alt={church.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-4xl">⛪</div>
                  )}
               </div>
            </div>
            
            <div className="pt-24 p-12 md:p-20">
               <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-brand-midnight/5 pb-12 mb-12">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-midnight mb-2">{church.name}</h1>
                    <p className="text-brand-gold uppercase tracking-[0.2em] text-[10px] font-bold">Ecclesiastical Identity Verified</p>
                  </div>
                  <PremiumButton variant="outline" className="text-xs py-2 px-6">Edit Identity</PremiumButton>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <label className="block text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-3">Subdomain Access</label>
                    <p className="text-xl font-light text-brand-midnight italic">{church.slug}.storybridge.io</p>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-3">Architecture Status</label>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                       <p className="text-sm font-bold uppercase tracking-widest text-brand-midnight">Live in Production</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </FadeIn>
      </main>
  );
}
