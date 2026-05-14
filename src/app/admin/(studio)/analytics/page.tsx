'use client';

import { motion } from 'framer-motion';
import { Reveal, FadeIn } from '@/components/premium/Reveal';

export default function AnalyticsPage() {
  const metrics = [
    { label: 'Response Velocity', value: '4.2m', trend: 'down 12%', color: 'text-green-500' },
    { label: 'Video Engagement', value: '78%', trend: 'up 5%', color: 'text-brand-gold' },
    { label: 'Conversion Speed', value: '1.2d', trend: 'down 2%', color: 'text-green-500' },
    { label: 'Retention Rate', value: '62%', trend: 'up 8%', color: 'text-brand-gold' },
  ];

  const heatmap = [
    { theme: 'Marriage help', volume: 45 },
    { theme: 'Purpose', volume: 38 },
    { theme: 'Anxiety', volume: 32 },
    { theme: 'Community', volume: 28 },
    { theme: 'Healing', volume: 15 },
  ];

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto selection:bg-brand-gold/30">
      <header className="mb-12 border-b border-brand-midnight/5 pb-8">
        <Reveal delay={0.1}>
          <h1 className="text-4xl font-serif font-bold text-brand-midnight mb-2">The Impact Suite</h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-brand-slate font-light uppercase tracking-widest text-xs">Proprietary growth forecasting & health metrics</p>
        </Reveal>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Retention Health Score */}
        <FadeIn className="lg:col-span-1">
          <div className="bg-brand-midnight text-brand-parchment p-12 rounded-[3rem] shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-serif font-bold mb-8">Visitor Retention Health</h3>
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                 <svg className="w-full h-full transform -rotate-90">
                   <circle 
                    cx="96" cy="96" r="88" 
                    fill="transparent" 
                    stroke="rgba(197,160,89,0.1)" 
                    strokeWidth="12" 
                   />
                   <motion.circle 
                    initial={{ strokeDasharray: "0 553" }}
                    animate={{ strokeDasharray: "470 553" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    cx="96" cy="96" r="88" 
                    fill="transparent" 
                    stroke="#C5A059" 
                    strokeWidth="12" 
                    strokeLinecap="round"
                   />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-6xl font-serif font-black text-brand-gold">85</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold/60">Strong</span>
                 </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/5 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Algorithm Insight</p>
              <p className="text-sm font-light leading-relaxed text-white/70 italic">
                "Your video connection engagement is 24% higher than the regional average, driving immediate trust."
              </p>
            </div>
            
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
          </div>
        </FadeIn>

        {/* Core Metrics Grid */}
        <div className="lg:col-span-2 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {metrics.map((m, i) => (
              <FadeIn key={m.label} delay={i * 0.1}>
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-brand-midnight/5 group hover:border-brand-gold/20 transition-all">
                  <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">{m.label}</p>
                  <div className="flex items-baseline gap-4">
                    <h3 className="text-5xl font-serif font-bold text-brand-midnight group-hover:gold-text transition-all">{m.value}</h3>
                    <span className={`text-[10px] font-black uppercase tracking-tighter ${m.color}`}>{m.trend}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Needs Heatmap */}
          <FadeIn delay={0.4}>
            <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-brand-midnight/5">
               <h3 className="text-xl font-serif font-bold text-brand-midnight mb-10 flex items-center gap-4">
                 <span className="text-2xl">🔥</span> Community Needs Heatmap
               </h3>
               <div className="space-y-8">
                 {heatmap.map((item) => (
                   <div key={item.theme} className="space-y-3">
                     <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-brand-midnight">
                       <span>{item.theme}</span>
                       <span className="text-brand-gold">{item.volume}% volume</span>
                     </div>
                     <div className="h-2 bg-brand-parchment rounded-full overflow-hidden">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.volume}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full gold-gradient rounded-full" 
                       />
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
