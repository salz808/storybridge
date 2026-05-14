'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, FadeIn } from '@/components/premium/Reveal';
import { PremiumButton } from '@/components/ui/PremiumButton';

type Story = {
  id: string;
  type: 'text' | 'video';
  firstName: string;
  lastName: string;
  content?: string;
  videoUrl?: string;
  transcript?: string;
  status: 'pending' | 'approved' | 'featured' | 'archived';
  tags: string[];
  createdAt: string;
};

export default function StoryAdminClient({ initialStories }: { initialStories: Story[] }) {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [filter, setFilter] = useState<string>('all');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const filteredStories = stories.filter(s => {
    if (filter === 'all') return true;
    return s.status === filter;
  });

  const updateStatus = (id: string, newStatus: Story['status']) => {
    setStories(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    if (selectedStory?.id === id) {
      setSelectedStory(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="selection:bg-brand-gold/30">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-brand-midnight/5 pb-8">
        <div>
          <Reveal delay={0.1}>
            <h2 className="text-4xl font-serif font-bold text-brand-midnight mb-2">The StoryBox</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-brand-slate font-light uppercase tracking-widest text-xs">Curating the Kingdom's testimonies</p>
          </Reveal>
        </div>
        
        <div className="flex bg-brand-parchment p-1 rounded-2xl border border-brand-midnight/5">
          {['all', 'pending', 'approved', 'featured', 'archived'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                filter === tab 
                  ? 'bg-brand-midnight text-brand-parchment shadow-lg' 
                  : 'text-brand-slate hover:text-brand-midnight'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div 
          key={filter}
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredStories.map(story => (
            <motion.div 
              variants={item}
              key={story.id} 
              className="bg-white rounded-[2rem] shadow-xl border border-brand-midnight/5 p-8 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
              onClick={() => setSelectedStory(story)}
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter ${
                  story.status === 'pending' ? 'bg-brand-gold/20 text-brand-gold' :
                  story.status === 'approved' ? 'bg-green-100 text-green-700' :
                  story.status === 'featured' ? 'bg-brand-midnight text-brand-parchment' :
                  'bg-brand-parchment text-brand-slate'
                }`}>
                  {story.status}
                </span>
                <span className="text-brand-gold/40 text-[10px] uppercase font-bold tracking-widest">{story.type === 'video' ? '📹 Video' : '📄 Text'}</span>
              </div>
              
              <h3 className="font-serif font-bold text-2xl text-brand-midnight mb-4 group-hover:gold-text transition-all">{story.firstName} {story.lastName}</h3>
              
              <p className="text-brand-slate text-sm font-light line-clamp-3 mb-6 leading-relaxed">
                {story.type === 'text' ? story.content : story.transcript}
              </p>

              <div className="flex flex-wrap gap-2">
                {story.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-brand-parchment text-brand-gold text-[8px] font-bold rounded-lg uppercase tracking-widest border border-brand-gold/10">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
          
          {filteredStories.length === 0 && (
            <div className="col-span-full py-24 text-center">
               <p className="font-serif italic text-brand-slate text-xl">The harvest is coming. No stories found in this category.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 bg-brand-midnight/90 backdrop-blur-md z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-brand-parchment rounded-[3rem] max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10"
            >
              {/* Modal Header */}
              <div className="p-8 md:p-12 border-b border-brand-midnight/5 flex justify-between items-center bg-white/50 relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-midnight mb-2">{selectedStory.firstName} {selectedStory.lastName}</h2>
                  <p className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold">Shared on {new Date(selectedStory.createdAt).toLocaleDateString()}</p>
                </div>
                <button 
                  onClick={() => setSelectedStory(null)}
                  className="relative z-10 w-12 h-12 rounded-full border border-brand-midnight/10 flex items-center justify-center text-brand-midnight hover:bg-brand-midnight hover:text-brand-parchment transition-all text-2xl"
                >
                  &times;
                </button>
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
                  {/* Left Side: Content */}
                  <div>
                    <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-8">The Submission</h4>
                    {selectedStory.type === 'video' ? (
                      <div className="aspect-video bg-brand-midnight rounded-[2rem] flex flex-col items-center justify-center text-brand-parchment shadow-2xl relative overflow-hidden group">
                        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-500">🎞️</div>
                        <p className="font-serif italic">Video testimony</p>
                        <p className="text-[10px] mt-4 text-brand-gold tracking-widest uppercase font-bold">Encrypted Link Active</p>
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight/50 to-transparent" />
                      </div>
                    ) : (
                      <div className="prose prose-stone max-w-none text-brand-midnight leading-relaxed text-xl font-light italic font-serif">
                        "{selectedStory.content}"
                      </div>
                    )}
                  </div>

                  {/* Right Side: Admin Tools */}
                  <div className="space-y-12">
                    {selectedStory.type === 'video' && (
                      <FadeIn>
                        <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">AI Insight Transcript</h4>
                        <div className="bg-white/50 p-8 rounded-[2rem] border border-brand-midnight/5 text-brand-midnight/80 leading-relaxed font-light text-sm italic shadow-inner">
                          {selectedStory.transcript}
                        </div>
                      </FadeIn>
                    )}

                    <FadeIn delay={0.2}>
                      <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">The Curator's Edit</h4>
                      <textarea 
                        className="w-full p-6 bg-white border border-brand-midnight/5 rounded-[2rem] text-brand-midnight text-sm font-light leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-gold/50 shadow-xl"
                        rows={6}
                        defaultValue={selectedStory.type === 'text' ? selectedStory.content : selectedStory.transcript}
                      />
                    </FadeIn>

                    <FadeIn delay={0.3}>
                      <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">Spiritual Themes</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Marriage', 'Anxiety', 'Parenting', 'Purpose', 'Healing', 'Community', 'Faith', 'Life Change'].map(tag => (
                          <button 
                            key={tag}
                            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all ${
                              selectedStory.tags.includes(tag)
                                ? 'bg-brand-gold text-brand-midnight shadow-lg'
                                : 'bg-white text-brand-slate border border-brand-midnight/5 hover:border-brand-gold/30'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                        <button className="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-tighter bg-transparent border border-dashed border-brand-midnight/20 text-brand-gold hover:border-brand-gold transition-all">+ Add Insight</button>
                      </div>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                      <h4 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">Localized Outreach</h4>
                      <button 
                        onClick={() => {
                          const slug = selectedStory.firstName.toLowerCase() + '-' + selectedStory.id.substring(0, 4);
                          window.open(`/invite/your-name/${slug}`, '_blank');
                        }}
                        className="w-full bg-brand-midnight text-brand-gold font-bold py-6 rounded-[2rem] text-[10px] uppercase tracking-widest shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4"
                      >
                        <span className="text-xl">🤝</span> Generate Digital Invite Kit
                      </button>
                    </FadeIn>

                    <FadeIn delay={0.5} className="pt-12 border-t border-brand-midnight/5 flex flex-wrap gap-6">
                      <PremiumButton 
                        onClick={() => updateStatus(selectedStory.id, 'approved')}
                        variant={selectedStory.status === 'approved' ? 'primary' : 'outline'}
                        className="flex-1"
                      >
                        {selectedStory.status === 'approved' ? '✓ Verified' : 'Approve for Web'}
                      </PremiumButton>
                      <PremiumButton 
                        onClick={() => updateStatus(selectedStory.id, 'featured')}
                        variant={selectedStory.status === 'featured' ? 'primary' : 'secondary'}
                        className="flex-1"
                      >
                        {selectedStory.status === 'featured' ? '★ Featured Home' : 'Feature Story'}
                      </PremiumButton>
                      <button 
                        onClick={() => updateStatus(selectedStory.id, 'archived')}
                        className="px-8 text-[10px] font-bold uppercase tracking-widest text-brand-slate hover:text-red-500 transition-colors"
                      >
                        Archive
                      </button>
                    </FadeIn>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
