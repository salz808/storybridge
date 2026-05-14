'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, FadeIn } from '@/components/premium/Reveal';
import { PremiumButton } from '@/components/ui/PremiumButton';
import CommunityResonance from './CommunityResonance';

import { generateSocialAssets, launchLocalAd } from '@/lib/marketing';
import { triggerPhysicalWelcome } from '@/lib/hospitality';

interface Story {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  tags: string[];
  thumbnail: string;
  type: string;
}

export default function CampaignCommandCenter({ initialStories }: { initialStories: Story[] }) {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [isAmplifying, setIsAmplifying] = useState(false);
  const [amplificationStep, setAmplificationStep] = useState(0);
  const [view, setView] = useState<'launch' | 'pulse'>('launch');

  const selectedStory = initialStories.find(s => s.id === selectedStoryId);

  const handleAmplify = async () => {
    if (!selectedStoryId) return;
    setIsAmplifying(true);
    
    // Phase 1: Social Architect
    setAmplificationStep(1);
    await generateSocialAssets(selectedStoryId);
    
    // Phase 2: Ad Bridge
    setAmplificationStep(2);
    await launchLocalAd(selectedStoryId, 10, 300);
    
    // Phase 3: Physical Hospitality
    setAmplificationStep(3);
    await triggerPhysicalWelcome('demo-visitor-id', 'postcard');
    
    // Phase 4: Intelligence Calibration
    setAmplificationStep(4);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="space-y-12 selection:bg-brand-gold/30">
      <header className="mb-12 border-b border-brand-midnight/5 pb-8 flex justify-between items-end">
        <div>
          <Reveal delay={0.1}>
            <h1 className="text-5xl font-serif font-bold text-brand-midnight mb-2 tracking-tight">Campaign Command Center</h1>
          </Reveal>
          <div className="flex gap-6 mt-4">
             {['launch', 'pulse'].map((v) => (
                <button 
                  key={v}
                  onClick={() => setView(v as any)}
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] pb-2 border-b-2 transition-all ${view === v ? 'text-brand-gold border-brand-gold' : 'text-brand-slate border-transparent hover:text-brand-midnight'}`}
                >
                  {v === 'launch' ? 'Launch Suite' : 'Outreach Pulse'}
                </button>
             ))}
          </div>
        </div>
        <div className="flex gap-4">
           <div className="text-right">
             <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1">Weekly Reach</p>
             <p className="text-2xl font-serif font-bold text-brand-midnight">12,450</p>
           </div>
           <div className="w-px h-10 bg-brand-midnight/5 self-center" />
           <div className="text-right">
             <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1">Active Ads</p>
             <p className="text-2xl font-serif font-bold text-brand-midnight">4</p>
           </div>
        </div>
      </header>

      {view === 'launch' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Intelligence & Story Selection */}
          <div className="lg:col-span-1 space-y-12">
            <FadeIn>
              <CommunityResonance onSelectTrend={(theme) => {
                console.log("Selected theme:", theme);
              }} />
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-brand-midnight text-brand-parchment p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                 <h3 className="text-xl font-serif font-bold mb-6">Select a Source Story</h3>
                 <div className="space-y-4">
                    {initialStories.map(story => (
                      <button 
                        key={story.id}
                        onClick={() => setSelectedStoryId(story.id)}
                        className={`w-full p-4 rounded-2xl border transition-all text-left group flex items-center gap-4 ${
                          selectedStoryId === story.id 
                          ? 'bg-brand-gold border-brand-gold text-brand-midnight' 
                          : 'bg-white/5 border-white/10 hover:border-brand-gold/50'
                        }`}
                      >
                         <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                            <img src={story.thumbnail} alt={story.firstName} className="w-full h-full object-cover" />
                         </div>
                         <div className="flex-1 min-w-0">
                            <h4 className={`font-serif font-bold truncate ${selectedStoryId === story.id ? 'text-brand-midnight' : 'text-white'}`}>{story.firstName}'s Story</h4>
                            <p className={`text-[8px] font-black uppercase tracking-widest ${selectedStoryId === story.id ? 'text-brand-midnight/60' : 'text-brand-gold/60'}`}>{story.tags.join(' • ')}</p>
                         </div>
                         {selectedStoryId === story.id && (
                           <div className="w-2 h-2 rounded-full bg-brand-midnight animate-pulse" />
                         )}
                      </button>
                    ))}
                 </div>
                 <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
              </div>
            </FadeIn>
          </div>

          {/* Center/Right Columns: Amplification & Controls */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {!selectedStoryId ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full bg-brand-parchment/20 border-2 border-dashed border-brand-midnight/10 rounded-[3rem] flex flex-col items-center justify-center p-20 text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-3xl shadow-xl mb-8">🔭</div>
                  <h3 className="text-2xl font-serif font-bold text-brand-midnight mb-4">Awaiting Strategic Selection</h3>
                  <p className="text-brand-slate font-light max-w-md">Select an approved story from your StoryBox or follow an AI resonance recommendation to begin the amplification process.</p>
                </motion.div>
              ) : isAmplifying ? (
                <motion.div 
                  key="amplifying"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-16 rounded-[4rem] shadow-2xl border border-brand-midnight/5 text-center relative overflow-hidden"
                >
                   <div className="relative z-10">
                      <div className="w-24 h-24 bg-brand-midnight rounded-full flex items-center justify-center text-3xl mx-auto mb-10 shadow-2xl border-4 border-brand-gold/20">
                         <span className="animate-ping absolute inset-0 rounded-full bg-brand-gold opacity-20" />
                         ✨
                      </div>
                      <h2 className="text-4xl font-serif font-bold text-brand-midnight mb-6">Amplification in Progress</h2>
                      
                      <div className="max-w-md mx-auto space-y-8">
                         <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">
                            <span>Processing Phase</span>
                            <span>{amplificationStep * 25}%</span>
                         </div>
                         <div className="h-1 bg-brand-parchment rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${amplificationStep * 25}%` }}
                              className="h-full gold-gradient rounded-full"
                            />
                         </div>

                         <div className="text-left space-y-4 pt-8">
                            {[
                              { step: 1, label: 'AI Social Architect: Generating Vertical Reels' },
                              { step: 2, label: 'Local Ad Bridge: Configuring Facebook & Meta Target' },
                              { step: 3, label: 'Physical Hospitality: Queuing First-Visit Postcards' },
                              { step: 4, label: 'Prophetic Intelligence: Calibrating Local SEO' }
                            ].map(s => (
                              <div key={s.step} className={`flex items-center gap-4 transition-all ${amplificationStep >= s.step ? 'opacity-100' : 'opacity-20'}`}>
                                 <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold border ${amplificationStep >= s.step ? 'bg-brand-gold border-brand-gold text-brand-midnight' : 'border-brand-midnight/20 text-brand-midnight/40'}`}>
                                    {amplificationStep > s.step ? '✓' : s.step}
                                 </div>
                                 <span className="text-xs font-bold uppercase tracking-widest text-brand-midnight">{s.label}</span>
                              </div>
                            ))}
                         </div>
                      </div>

                      {amplificationStep === 4 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="pt-12"
                        >
                           <PremiumButton onClick={() => setIsAmplifying(false)} className="px-12 py-5">View Active Campaign</PremiumButton>
                        </motion.div>
                      )}
                   </div>
                   <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold opacity-10" />
                   <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
                </motion.div>
              ) : selectedStory ? (
                <motion.div
                  key="ready"

                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-12 rounded-[4rem] shadow-2xl border border-brand-midnight/5 flex flex-col h-full"
                >
                   <div className="flex-1">
                      <div className="flex justify-between items-start mb-10">
                         <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                               <img src={selectedStory.thumbnail} className="w-full h-full object-cover" />
                            </div>
                            <div>
                               <h2 className="text-3xl font-serif font-bold text-brand-midnight">{selectedStory.firstName}'s Testimony</h2>
                               <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mt-1">Ready for neighborhood-wide reach</p>
                            </div>
                         </div>
                         <button 
                          onClick={() => setSelectedStoryId(null)}
                          className="w-10 h-10 rounded-full border border-brand-midnight/5 flex items-center justify-center text-brand-slate hover:bg-brand-midnight hover:text-white transition-all"
                         >
                           &times;
                         </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         <div className="space-y-6 p-8 bg-brand-parchment/20 rounded-[2.5rem] border border-brand-midnight/5">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">Amplify Strategy</h4>
                            <div className="space-y-4">
                               {[
                                 { icon: '📱', title: 'Social Distribution', desc: 'Auto-post 9:16 Reels to IG, TikTok & Shorts' },
                                 { icon: '📣', title: 'Local Meta Ads', desc: 'Target 15-mile radius around church' },
                                 { icon: '✉️', title: 'Physical Postcards', desc: 'Triggered for upcoming visitors' }
                               ].map(opt => (
                                 <div key={opt.title} className="flex gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center text-lg">{opt.icon}</div>
                                    <div>
                                       <h5 className="text-xs font-bold uppercase tracking-widest text-brand-midnight">{opt.title}</h5>
                                       <p className="text-[10px] text-brand-slate font-light leading-tight mt-1">{opt.desc}</p>
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>

                         <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">Outreach Goals</h4>
                            <div className="grid grid-cols-2 gap-4">
                               <div className="bg-white p-6 rounded-3xl border border-brand-midnight/5 shadow-lg">
                                  <p className="text-[8px] font-bold uppercase tracking-widest text-brand-slate mb-1">Est. Reach</p>
                                  <p className="text-xl font-serif font-bold text-brand-midnight">4.5k - 8k</p>
                               </div>
                               <div className="bg-white p-6 rounded-3xl border border-brand-midnight/5 shadow-lg text-brand-gold">
                                  <p className="text-[8px] font-bold uppercase tracking-widest opacity-60 mb-1 text-brand-midnight">Visits Target</p>
                                  <p className="text-xl font-serif font-bold">12 - 25</p>
                               </div>
                            </div>
                            
                            <div className="bg-brand-midnight p-8 rounded-[2.5rem] text-brand-parchment relative overflow-hidden group">
                               <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-2">Prophetic Match</p>
                               <p className="text-xs font-light italic leading-relaxed opacity-80">
                                  "This story has an 82% resonance match with the current 'anxiety' surge in Downtown Atlanta."
                                </p>
                               <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl" />
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="pt-12 border-t border-brand-midnight/5 mt-auto">
                      <button
                        onClick={handleAmplify}
                        className="w-full bg-brand-midnight text-brand-gold font-bold py-8 rounded-[2.5rem] shadow-2xl flex items-center justify-center gap-6 group hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                         <span className="text-[10px] uppercase tracking-[0.4em] font-black">Begin Strategic Amplification</span>
                         <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-brand-midnight shadow-lg group-hover:rotate-12 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                         </div>
                      </button>
                   </div>
                   </motion.div>
                   ) : null}
                   </AnimatePresence>
                   </div>
                   </div>

      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           <FadeIn className="lg:col-span-3">
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-brand-midnight/5">
                 <h3 className="text-xl font-serif font-bold text-brand-midnight mb-8 flex items-center gap-3">
                    <span className="text-2xl">📈</span> Outreach Pulse
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { label: 'Neighborhood Reach', value: '42.8k', trend: 'up 12%', color: 'text-green-500' },
                      { label: 'Story Engagement', value: '18.2%', trend: 'up 5%', color: 'text-brand-gold' },
                      { label: 'Visit Intent', value: '245', trend: 'up 18%', color: 'text-green-500' }
                    ].map(stat => (
                      <div key={stat.label} className="p-6 bg-brand-parchment/30 rounded-[2rem] border border-brand-midnight/5">
                         <p className="text-[8px] font-bold text-brand-slate uppercase tracking-widest mb-2">{stat.label}</p>
                         <div className="flex items-baseline gap-3">
                            <h4 className="text-3xl font-serif font-bold text-brand-midnight">{stat.value}</h4>
                            <span className={`text-[8px] font-black uppercase ${stat.color}`}>{stat.trend}</span>
                         </div>
                      </div>
                    ))}
                 </div>
                 
                 <div className="mt-12 h-64 bg-brand-parchment/10 rounded-[2rem] border border-brand-midnight/5 relative overflow-hidden flex items-center justify-center">
                    <p className="text-[10px] font-bold text-brand-slate uppercase tracking-widest italic opacity-40">Regional Resonance Visualization Grid</p>
                    {/* Stylized Chart Background */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                 </div>
              </div>
           </FadeIn>
           
           <FadeIn delay={0.2} className="lg:col-span-1">
              <div className="bg-brand-midnight text-brand-parchment p-8 rounded-[3rem] shadow-2xl h-full relative overflow-hidden">
                 <h3 className="text-xl font-serif font-bold mb-6">Fulfillment Queue</h3>
                 <div className="space-y-6">
                    {[
                      { visitor: 'Sarah J.', type: 'Postcard', status: 'Sent' },
                      { visitor: 'Mike R.', type: 'Note', status: 'In Transit' },
                      { visitor: 'David L.', type: 'Gift', status: 'Queued' }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0">
                         <div>
                            <p className="text-sm font-serif font-bold">{item.visitor}</p>
                            <p className="text-[8px] font-bold text-brand-gold uppercase tracking-widest">{item.type}</p>
                         </div>
                         <span className="text-[8px] font-black uppercase tracking-tighter px-2 py-1 bg-white/5 rounded-full">{item.status}</span>
                      </div>
                    ))}
                 </div>
                 <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-brand-midnight transition-all">View All Physical Hospitality</button>
                 <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
              </div>
           </FadeIn>
        </div>
      )}
    </div>
  );
}
