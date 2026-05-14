'use client';

import { motion } from 'framer-motion';
import { Reveal, FadeIn } from '@/components/premium/Reveal';

const NEIGHBORHOODS = [
  { name: 'Downtown', zip: '30303', impact: 85, color: 'bg-brand-gold' },
  { name: 'Midtown', zip: '30309', impact: 65, color: 'bg-brand-gold/70' },
  { name: 'Buckhead', zip: '30305', impact: 42, color: 'bg-brand-gold/40' },
  { name: 'Old Fourth Ward', zip: '30312', impact: 92, color: 'bg-brand-gold' },
  { name: 'Inman Park', zip: '30307', impact: 28, color: 'bg-brand-gold/20' },
  { name: 'West End', zip: '30310', impact: 15, color: 'bg-brand-gold/10' },
];

const SOURCES = [
  { label: 'Social Outreach', value: 45, color: 'bg-brand-midnight' },
  { label: 'Member Invites', value: 35, color: 'bg-brand-gold' },
  { label: 'Organic Search', value: 20, color: 'bg-brand-slate' },
];

export default function ImpactDashboard() {
  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto selection:bg-brand-gold/30">
      <header className="mb-12 border-b border-brand-midnight/5 pb-8">
        <Reveal delay={0.1}>
          <h1 className="text-4xl font-serif font-bold text-brand-midnight mb-2">Community Impact Dashboard</h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-brand-slate font-light uppercase tracking-widest text-xs">Visualizing StoryBridge resonance across your city</p>
        </Reveal>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Semantic Heatmap Visualization */}
        <div className="lg:col-span-2">
          <FadeIn>
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-brand-midnight/5 relative overflow-hidden h-full">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-serif font-bold text-brand-midnight">Regional Impact Heatmap</h3>
                <div className="flex gap-4">
                  <span className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-brand-slate">
                    <div className="w-2 h-2 rounded-full bg-brand-gold/10" /> Low engagement
                  </span>
                  <span className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-brand-slate">
                    <div className="w-2 h-2 rounded-full bg-brand-gold" /> High engagement
                  </span>
                </div>
              </div>

              {/* Styled SVG Map Placeholder (The "Heatmap") */}
              <div className="relative aspect-[4/3] bg-brand-parchment/30 rounded-[2rem] border border-brand-midnight/5 overflow-hidden group">
                 {/* This represents a stylized map with "impact bubbles" */}
                 <div className="absolute inset-0 p-12 grid grid-cols-4 grid-rows-3 gap-4">
                    {NEIGHBORHOODS.map((nh, i) => (
                        <motion.div 
                          key={nh.name}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: i * 0.1 + 0.5, type: 'spring' }}
                          className="relative flex items-center justify-center"
                        >
                            <div 
                                className={`rounded-full ${nh.color} shadow-lg transition-transform hover:scale-110 cursor-help`}
                                style={{ 
                                    width: `${nh.impact * 1.5}px`, 
                                    height: `${nh.impact * 1.5}px`,
                                    filter: 'blur(8px)',
                                    opacity: 0.6
                                }}
                            />
                            <div className="absolute flex flex-col items-center">
                                <span className="text-[10px] font-bold text-brand-midnight uppercase tracking-tighter drop-shadow-sm">{nh.name}</span>
                                <span className="text-[8px] text-brand-midnight/60 font-black">{nh.impact}%</span>
                            </div>
                        </motion.div>
                    ))}
                 </div>
                 
                 {/* Map Grid Overlay */}
                 <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
                      style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
                 />
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Top Neighborhoods</p>
                    {NEIGHBORHOODS.slice(0, 3).map(nh => (
                        <div key={nh.name} className="flex justify-between items-center border-b border-brand-midnight/5 pb-2">
                           <span className="text-sm font-serif font-bold text-brand-midnight">{nh.name} <span className="text-[10px] font-sans text-brand-slate/40 ml-2">{nh.zip}</span></span>
                           <span className="text-xs font-bold text-brand-midnight">{nh.impact}%</span>
                        </div>
                    ))}
                 </div>
                 <div className="p-6 bg-brand-midnight rounded-[2rem] text-brand-parchment flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-2">Growth Opportunity</p>
                    <p className="text-sm font-serif leading-relaxed italic">
                        "Engagement in **West End** is 40% below city average despite high search volume for 'community support' in that area."
                    </p>
                 </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Outreach Sources & Impact Scores */}
        <div className="space-y-12">
            <FadeIn delay={0.2}>
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-brand-midnight/5">
                    <h3 className="text-xl font-serif font-bold text-brand-midnight mb-8">Outreach Origin</h3>
                    <div className="space-y-8">
                        {SOURCES.map(source => (
                            <div key={source.label} className="space-y-3">
                                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-brand-midnight">
                                    <span>{source.label}</span>
                                    <span className="text-brand-gold">{source.value}%</span>
                                </div>
                                <div className="h-3 bg-brand-parchment rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${source.value}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className={`h-full ${source.color} rounded-full`} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </FadeIn>

            <FadeIn delay={0.4}>
                <div className="bg-brand-midnight p-10 rounded-[2.5rem] shadow-2xl text-brand-parchment relative overflow-hidden">
                    <h3 className="text-xl font-serif font-bold mb-6">Local Impact Score</h3>
                    <div className="flex items-baseline gap-4 mb-8">
                        <span className="text-7xl font-serif font-black text-brand-gold tracking-tighter">74</span>
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold/60">/ 100</span>
                    </div>
                    <div className="pt-6 border-t border-white/10">
                        <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-3">Resonance Analysis</p>
                        <p className="text-xs text-white/70 font-light leading-relaxed">
                            Your stories are reaching 12% of the local population monthly. Member sharing is currently the strongest growth lever.
                        </p>
                    </div>
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl" />
                </div>
            </FadeIn>
        </div>
      </div>
    </div>
  );
}
