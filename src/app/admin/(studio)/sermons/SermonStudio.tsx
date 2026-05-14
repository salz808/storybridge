'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, FadeIn } from '@/components/premium/Reveal';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { processSermon, publishClipToStoryBox } from './actions';

export default function SermonStudio() {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [clips, setClips] = useState<any[]>([]);
  const [selectedClipId, setSelectedClipId] = useState<string | null>(null);

  const handleImport = async () => {
    if (!url) return;
    setIsProcessing(true);
    const result = await processSermon(url);
    if (result.success) {
      setClips(result.clips);
    }
    setIsProcessing(false);
  };

  const handlePublish = async (clip: any) => {
    setSelectedClipId(clip.id);
    const result = await publishClipToStoryBox(clip);
    if (result.success) {
      alert('Clip published to StoryBox!');
    }
    setSelectedClipId(null);
  };

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto selection:bg-brand-gold/30">
      <header className="mb-12 border-b border-brand-midnight/5 pb-8 flex justify-between items-end">
        <div>
          <Reveal delay={0.1}>
            <h1 className="text-5xl font-serif font-bold text-brand-midnight mb-2 tracking-tight">Sermon-to-Story Studio</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-brand-slate font-light uppercase tracking-widest text-[10px]">AI-Assisted Content Extraction • Premium Growth Lever</p>
          </Reveal>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Source Ingestion */}
        <div className="lg:col-span-1 space-y-8">
           <FadeIn>
             <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-brand-midnight/5">
                <h3 className="text-xl font-serif font-bold text-brand-midnight mb-6 flex items-center gap-3">
                   <span className="text-2xl">📽️</span> Ingest Sermon
                </h3>
                <div className="space-y-6">
                   <div>
                      <label className="block text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-3 ml-1">YouTube or Vimeo URL</label>
                      <input 
                        type="url" 
                        placeholder="https://youtube.com/watch?v=..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full p-5 bg-brand-parchment/50 border border-brand-midnight/5 rounded-2xl outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all font-light text-sm"
                      />
                   </div>
                   <PremiumButton 
                    onClick={handleImport} 
                    disabled={isProcessing}
                    className="w-full py-5"
                   >
                     {isProcessing ? 'AI Analyzing Sermon...' : 'Extract Golden Nuggets'}
                   </PremiumButton>
                   <div className="pt-4 border-t border-brand-midnight/5">
                      <p className="text-[10px] text-brand-slate uppercase font-bold tracking-widest text-center">Or drag & drop video file</p>
                   </div>
                </div>
             </div>
           </FadeIn>

           {clips.length > 0 && (
             <FadeIn delay={0.2}>
                <div className="bg-brand-midnight text-brand-parchment p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
                   <h3 className="text-xl font-serif font-bold mb-4">Studio Intelligence</h3>
                   <p className="text-sm font-light leading-relaxed opacity-70 mb-6 italic">
                     "Our AI identified 3 high-resonance stories from this message. We recommend tagging 'Finding Hope' for the Discovery funnel."
                   </p>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-brand-midnight text-xs font-black">AI</div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Calibrated for Growth</span>
                   </div>
                   <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl" />
                </div>
             </FadeIn>
           )}
        </div>

        {/* Extraction Review */}
        <div className="lg:col-span-2">
           <AnimatePresence mode="wait">
              {clips.length === 0 ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[500px] bg-brand-parchment/20 border-2 border-dashed border-brand-midnight/10 rounded-[3rem] flex flex-col items-center justify-center p-20 text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-3xl shadow-xl mb-8">💎</div>
                  <h3 className="text-2xl font-serif font-bold text-brand-midnight mb-4">Mining for Kingdom Gold</h3>
                  <p className="text-brand-slate font-light max-w-md">Import a sermon to allow our AI to find the testimonies and illustrations that will resonate most with your community.</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="clips"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {clips.map((clip, i) => (
                    <FadeIn key={clip.id} delay={i * 0.1}>
                       <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-brand-midnight/5 group hover:border-brand-gold/20 transition-all">
                          <div className="flex flex-col md:flex-row gap-8">
                             <div className="md:w-64 aspect-video bg-brand-midnight rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:shadow-2xl transition-all">
                                <span className="text-3xl">🎞️</span>
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                   <span className="bg-brand-midnight/80 backdrop-blur-md px-2 py-1 rounded text-[8px] font-black text-brand-gold uppercase tracking-widest">{clip.startTime} - {clip.endTime}</span>
                                </div>
                                <div className="absolute inset-0 bg-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-4">
                                   <div>
                                      <h3 className="text-2xl font-serif font-bold text-brand-midnight mb-1 group-hover:text-brand-gold transition-colors">{clip.title}</h3>
                                      <p className="text-[10px] font-bold text-brand-slate uppercase tracking-widest">{clip.funnelStage} Funnel Recommendation</p>
                                   </div>
                                   <div className="flex gap-2">
                                      {clip.tags.map((tag: string) => (
                                        <span key={tag} className="px-2 py-0.5 bg-brand-parchment text-brand-gold text-[8px] font-bold rounded-full uppercase tracking-tighter">{tag}</span>
                                      ))}
                                   </div>
                                </div>
                                <p className="text-sm text-brand-slate font-light leading-relaxed line-clamp-2 mb-6 italic">
                                   "{clip.transcript}"
                                </p>
                                <div className="flex gap-4">
                                   <PremiumButton 
                                    onClick={() => handlePublish(clip)}
                                    disabled={selectedClipId === clip.id}
                                    className="flex-1 py-4 text-[10px]"
                                   >
                                     {selectedClipId === clip.id ? 'Publishing...' : 'Add to StoryBox'}
                                   </PremiumButton>
                                   <button className="px-8 border border-brand-midnight/10 rounded-xl text-[10px] font-bold text-brand-midnight uppercase tracking-widest hover:bg-brand-parchment transition-all">
                                      Refine Clip
                                   </button>
                                </div>
                             </div>
                          </div>
                       </div>
                    </FadeIn>
                  ))}
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
