'use client';

import { motion } from 'framer-motion';
import { Reveal, FadeIn } from '@/components/premium/Reveal';
import { PremiumButton } from '@/components/ui/PremiumButton';

export default function ROIDashboard() {
  const metrics = [
    { label: 'Visitor Velocity', val: '4.2 Days', desc: 'Avg. time from Discovery to Belonging', trend: '-15% (Faster)', color: 'text-green-500' },
    { label: 'Retention Health', val: '82%', desc: 'Predictive engagement score for new visitors', trend: '+5%', color: 'text-brand-gold' },
    { label: 'Belonging Value', val: '$42k', desc: 'Estimated community impact of connected members', trend: 'Growing', color: 'text-green-500' },
    { label: 'Strategic Reach', val: '124k', desc: 'Total local reach via Ad & Partner bridges', trend: '+22%', color: 'text-brand-gold' },
  ];

  return (
    <div className="p-8 md:p-12 lg:p-20 selection:bg-brand-gold/30">
      <header className="mb-16 border-b border-brand-midnight/5 pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <Reveal delay={0.1}>
            <h1 className="text-5xl font-serif font-bold text-brand-midnight mb-4 tracking-tight">Ministry ROI Dashboard</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-brand-slate font-light uppercase tracking-[0.3em] text-[10px]">Strategic Impact • Executive Leadership View</p>
          </Reveal>
        </div>
        <div className="flex gap-4">
           <PremiumButton className="px-8 py-4 text-[10px]">Export Board PDF</PremiumButton>
           <button className="px-8 py-4 border border-brand-midnight/10 rounded-xl text-[10px] font-bold text-brand-midnight uppercase tracking-widest hover:bg-brand-parchment transition-all">Configure Goals</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
         {metrics.map((stat, i) => (
           <FadeIn key={stat.label} delay={i * 0.1}>
             <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-brand-midnight/5 h-full flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold mb-6">{stat.label}</p>
                  <h4 className="text-4xl font-serif font-bold text-brand-midnight mb-2">{stat.val}</h4>
                  <p className="text-[10px] text-brand-slate font-light leading-relaxed">{stat.desc}</p>
                </div>
                <div className="mt-8 pt-6 border-t border-brand-midnight/5">
                   <span className={`text-[10px] font-black uppercase tracking-widest ${stat.color}`}>{stat.trend}</span>
                </div>
             </div>
           </FadeIn>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Strategic ROI Visualization */}
         <div className="lg:col-span-2 space-y-8">
            <FadeIn>
               <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-brand-midnight/5">
                  <div className="flex justify-between items-center mb-12">
                     <h3 className="text-2xl font-serif font-bold text-brand-midnight">The "Belonging" Funnel Efficiency</h3>
                     <div className="flex gap-4">
                        {['Velocity', 'Retention', 'Engagement'].map(l => (
                          <span key={l} className="text-[10px] font-bold text-brand-slate uppercase tracking-widest cursor-pointer hover:text-brand-gold transition-colors">{l}</span>
                        ))}
                     </div>
                  </div>
                  
                  <div className="h-96 relative flex items-end gap-12 px-8">
                     {[40, 65, 85, 100].map((h, i) => (
                       <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: i * 0.1 + 0.5, duration: 1 }}
                            className="w-full gold-gradient rounded-t-[2rem] shadow-2xl relative overflow-hidden group-hover:brightness-110 transition-all"
                          >
                             <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '100% 20px' }} />
                          </motion.div>
                          <span className="text-[10px] font-black text-brand-midnight uppercase tracking-tighter">Month {i + 1}</span>
                       </div>
                     ))}
                  </div>
                  <div className="mt-16 p-8 bg-brand-parchment/30 rounded-[3rem] border border-brand-midnight/5">
                     <p className="text-xs font-light text-brand-slate leading-relaxed italic text-center">
                        "Current momentum suggests a 25% increase in member connection by Q4, based on current story engagement velocity."
                     </p>
                  </div>
               </div>
            </FadeIn>
         </div>

         {/* Boardroom Insights Sidebar */}
         <div className="lg:col-span-1 space-y-8">
            <FadeIn delay={0.4}>
               <div className="bg-brand-midnight text-brand-parchment p-12 rounded-[4rem] shadow-2xl relative overflow-hidden h-full">
                  <h3 className="text-2xl font-serif font-bold mb-8 text-brand-gold">Executive Summary</h3>
                  <div className="space-y-10 relative z-10">
                     <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white opacity-40 mb-3">Story of the Month Impact</h4>
                        <p className="text-sm font-serif font-bold leading-relaxed">
                           "Sarah's Recovery Testimony" led to 14 new visitors and a 3.4x spike in prayer request volume.
                        </p>
                     </div>
                     <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white opacity-40 mb-3">Community Hub Score</h4>
                        <p className="text-4xl font-serif font-bold text-brand-gold">9.2</p>
                        <p className="text-[10px] font-light mt-2 opacity-60 italic">Top 5% of churches in regional partnership volume.</p>
                     </div>
                     <div className="pt-8 border-t border-white/10">
                        <PremiumButton className="w-full py-5">Review ROI Multipliers</PremiumButton>
                     </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl" />
                  <div className="absolute bottom-10 left-10 w-48 h-48 bg-brand-gold/10 rounded-full blur-[100px]" />
               </div>
            </FadeIn>
         </div>
      </div>
    </div>
  );
}
