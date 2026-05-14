'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, FadeIn } from '@/components/premium/Reveal';
import { PremiumButton } from '@/components/ui/PremiumButton';

export default function PartnerPortal() {
  const [activeTab, setActiveTab] = useState<'needs' | 'impact' | 'messages'>('needs');
  const [isSubmittingNeed, setIsSubmittingNeed] = useState(false);
  const [submittedNeed, setSubmittedNeed] = useState(false);

  const needs = [
    { id: '1', category: 'Supplies', title: 'School Supplies for Fall', status: 'In Review', urgency: 'High', date: '2026-05-12' },
    { id: '2', category: 'Volunteers', title: 'Reading Mentors', status: 'Matched', urgency: 'Medium', date: '2026-05-10' },
    { id: '3', category: 'Space', title: 'Community Garden Workshop', status: 'Completed', urgency: 'Low', date: '2026-04-28' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingNeed(true);
    setTimeout(() => {
      setIsSubmittingNeed(false);
      setSubmittedNeed(true);
      setTimeout(() => setSubmittedNeed(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-parchment/10 p-8 md:p-12 lg:p-20 selection:bg-brand-gold/30">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <Reveal delay={0.1}>
              <h1 className="text-5xl font-serif font-bold text-brand-midnight mb-4 tracking-tight">Partner Bridge Portal</h1>
            </Reveal>
            <div className="flex gap-4">
              <span className="px-3 py-1 bg-brand-gold/20 text-brand-gold text-[10px] font-bold rounded-full uppercase tracking-widest border border-brand-gold/10">White-Labeled Suite</span>
              <span className="text-brand-slate text-[10px] font-bold uppercase tracking-[0.2em] self-center">Downtown Elementary • Community Partner</span>
            </div>
          </div>
          
          <nav className="flex gap-8 border-b border-brand-midnight/5 w-full md:w-auto">
             {['needs', 'impact', 'messages'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-brand-gold' : 'text-brand-slate hover:text-brand-midnight'}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="partner-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold" />
                  )}
                </button>
             ))}
          </nav>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
             <AnimatePresence mode="wait">
                {activeTab === 'needs' ? (
                  <motion.div 
                    key="needs"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex justify-between items-center mb-4">
                       <h2 className="text-2xl font-serif font-bold text-brand-midnight">Community Need Cards</h2>
                       <button className="text-[10px] font-bold text-brand-gold uppercase tracking-widest border-b border-brand-gold/30 pb-1 hover:border-brand-gold transition-all">+ Request Support</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="md:col-span-2 bg-white p-8 rounded-[3rem] shadow-xl border border-brand-midnight/5">
                          <h3 className="text-lg font-serif font-bold text-brand-midnight mb-6">Submit New Need</h3>
                          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <label className="text-[10px] font-bold text-brand-slate uppercase tracking-widest ml-1">Category</label>
                                <select className="w-full p-4 bg-brand-parchment/30 border border-brand-midnight/5 rounded-2xl text-sm font-light outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all">
                                   <option>Supplies</option>
                                   <option>Volunteers</option>
                                   <option>Space</option>
                                   <option>Prayer</option>
                                </select>
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-bold text-brand-slate uppercase tracking-widest ml-1">Urgency</label>
                                <select className="w-full p-4 bg-brand-parchment/30 border border-brand-midnight/5 rounded-2xl text-sm font-light outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all">
                                   <option>Low</option>
                                   <option>Medium</option>
                                   <option>High</option>
                                   <option>Critical</option>
                                </select>
                             </div>
                             <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-bold text-brand-slate uppercase tracking-widest ml-1">Description</label>
                                <textarea 
                                  placeholder="Describe how the church can help your organization..."
                                  className="w-full p-4 bg-brand-parchment/30 border border-brand-midnight/5 rounded-2xl text-sm font-light outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all min-h-[100px]"
                                />
                             </div>
                             <div className="md:col-span-2">
                                <PremiumButton disabled={isSubmittingNeed} className="w-full py-5">
                                   {isSubmittingNeed ? 'Submitting...' : submittedNeed ? 'Need Submitted Successfully' : 'Post Need Card'}
                                </PremiumButton>
                             </div>
                          </form>
                       </div>

                       {needs.map((need, i) => (
                         <FadeIn key={need.id} delay={i * 0.1}>
                           <div className="bg-white p-8 rounded-[3rem] shadow-lg border border-brand-midnight/5 group hover:border-brand-gold/20 transition-all">
                              <div className="flex justify-between items-start mb-4">
                                 <span className="px-2 py-0.5 bg-brand-parchment text-brand-gold text-[8px] font-bold rounded-full uppercase tracking-tighter">{need.category}</span>
                                 <span className={`text-[8px] font-bold uppercase tracking-widest ${need.urgency === 'High' ? 'text-red-500' : 'text-brand-slate'}`}>{need.urgency} Priority</span>
                              </div>
                              <h4 className="text-xl font-serif font-bold text-brand-midnight mb-2 group-hover:text-brand-gold transition-colors">{need.title}</h4>
                              <p className="text-[10px] text-brand-slate font-light uppercase tracking-widest mb-6">Requested {need.date}</p>
                              <div className="flex justify-between items-center pt-4 border-t border-brand-midnight/5">
                                 <span className="text-[10px] font-black uppercase tracking-widest text-brand-midnight/40">{need.status}</span>
                                 <button className="text-[10px] font-bold text-brand-gold uppercase tracking-widest hover:text-brand-midnight transition-colors">Details &rarr;</button>
                              </div>
                           </div>
                         </FadeIn>
                       ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="impact"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center p-20 text-center bg-white rounded-[4rem] shadow-xl border border-brand-midnight/5 min-h-[500px]"
                  >
                     <div className="text-5xl mb-8">🤝</div>
                     <h2 className="text-3xl font-serif font-bold text-brand-midnight mb-4">Strategic Partnership Impact</h2>
                     <p className="text-brand-slate font-light max-w-md leading-relaxed">
                        Through our partnership with Northside Church, 12 major needs have been met in the last 6 months, impacting over 450 students.
                     </p>
                     <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
                        {[
                          { label: 'Needs Met', val: '12' },
                          { label: 'Volunteers', val: '84' },
                          { label: 'Hours Gifted', val: '210' },
                          { label: 'Value Provided', val: '$14.2k' }
                        ].map(stat => (
                          <div key={stat.label} className="text-center">
                             <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1">{stat.label}</p>
                             <p className="text-2xl font-serif font-bold text-brand-midnight">{stat.val}</p>
                          </div>
                        ))}
                     </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>

          {/* Sidebar: Matchmaking & Support */}
          <div className="lg:col-span-1 space-y-12">
             <FadeIn delay={0.3}>
                <div className="bg-brand-midnight text-brand-parchment p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                   <h3 className="text-2xl font-serif font-bold mb-6">Partner AI Matchmaker</h3>
                   <div className="space-y-8">
                      <div className="p-6 bg-white/5 rounded-3xl border border-white/10 relative group hover:border-brand-gold/50 transition-all">
                         <p className="text-xs font-light italic leading-relaxed opacity-70 mb-4">
                           "Our AI matched your 'Mentors' request with 3 StoryBox members who expressed a passion for youth development."
                         </p>
                         <div className="flex -space-x-3 mb-4">
                            {[1, 2, 3].map(i => (
                               <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-midnight bg-brand-parchment/20 flex items-center justify-center text-xs">👤</div>
                            ))}
                         </div>
                         <PremiumButton className="w-full py-3 text-[10px]">Review Candidate Matches</PremiumButton>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-white/5">
                         <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">Outreach Director</h4>
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-brand-gold flex items-center justify-center text-brand-midnight font-bold shadow-lg">JD</div>
                            <div>
                               <p className="text-sm font-serif font-bold text-white">James Dalton</p>
                               <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest opacity-60">Online Now</p>
                            </div>
                         </div>
                         <button className="w-full py-4 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all">Send Direct Message</button>
                      </div>
                   </div>
                   <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
                </div>
             </FadeIn>

             <FadeIn delay={0.4}>
                <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-brand-midnight/5 text-center">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-slate mb-6">Resource Hub</h4>
                   <div className="space-y-3">
                      {['Partner Agreement', 'Volunteer Vetting Process', 'Facility Use Policy', 'Event Calendar'].map(file => (
                        <button key={file} className="w-full p-4 text-left text-xs font-light border border-brand-midnight/5 rounded-2xl hover:bg-brand-parchment transition-all flex justify-between items-center">
                           {file}
                           <span className="opacity-30">⬇</span>
                        </button>
                      ))}
                   </div>
                </div>
             </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
