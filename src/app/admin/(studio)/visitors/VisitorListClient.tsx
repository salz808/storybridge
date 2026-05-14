'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/premium/Reveal';
import { PremiumButton } from '@/components/ui/PremiumButton';
import VideoRecorder from './VideoRecorder';

type Visitor = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  visitDate: string;
  kidsInfo: string;
  status: string;
  createdAt: string;
  aiMatch?: {
    storyId: string;
    storyName: string;
    reasoning: string;
    suggestedDraft: string;
  } | null;
};

type Video = {
  id: string;
  visitorId: string;
  watchedAt: string | null;
};

export default function VisitorListClient({ 
  initialVisitors, 
  sentVideos 
}: { 
  initialVisitors: Visitor[],
  sentVideos: Video[]
}) {
  const [visitors] = useState<Visitor[]>(initialVisitors);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const [sharingId, setSharingId] = useState<string | null>(null);

  const handleShare = (visitor: Visitor) => {
    if (!visitor.aiMatch) return;
    setSharingId(visitor.id);
    
    // Simulate API call for sharing
    console.log(`[SHARE ACTION] Sending to ${visitor.phone}: ${visitor.aiMatch.suggestedDraft}`);
    
    setTimeout(() => {
      setSharingId(null);
      alert(`Success! Matched story shared with ${visitor.firstName} via SMS.`);
    }, 1500);
  };

  const hasVideoSent = (visitorId: string) => sentVideos.some(v => v.visitorId === visitorId);
  const isVideoWatched = (visitorId: string) => sentVideos.some(v => v.visitorId === visitorId && v.watchedAt);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        {visitors.map((visitor) => (
          <FadeIn key={visitor.id}>
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-brand-midnight/5 flex flex-col md:flex-row justify-between items-center group hover:border-brand-gold/20 transition-all">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-serif font-bold text-brand-midnight">{visitor.firstName} {visitor.lastName}</h3>
                  {hasVideoSent(visitor.id) && (
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter ${isVideoWatched(visitor.id) ? 'bg-green-100 text-green-700' : 'bg-brand-gold/20 text-brand-gold'}`}>
                      {isVideoWatched(visitor.id) ? '✓ Watched' : 'Video Sent'}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-6 text-sm text-brand-slate font-light">
                  <p><span className="font-bold text-brand-gold uppercase text-[10px] tracking-widest mr-2">Visit:</span> {visitor.visitDate}</p>
                  <p><span className="font-bold text-brand-gold uppercase text-[10px] tracking-widest mr-2">Kids:</span> {visitor.kidsInfo}</p>
                  <p><span className="font-bold text-brand-gold uppercase text-[10px] tracking-widest mr-2">Phone:</span> {visitor.phone}</p>
                </div>

                {/* AI Matchmaker Preview */}
                {visitor.aiMatch ? (
                  <div className="pt-4 border-t border-brand-midnight/5 flex items-center gap-4">
                     <div className="w-8 h-8 rounded-full bg-brand-midnight flex items-center justify-center text-[10px]">✨</div>
                     <p className="text-xs text-brand-midnight/60 font-light italic">
                        AI Match: <span className="text-brand-midnight font-bold">{visitor.aiMatch.storyName}</span>. {visitor.aiMatch.reasoning}
                        <button 
                          onClick={() => handleShare(visitor)}
                          disabled={sharingId === visitor.id}
                          className="ml-4 text-brand-gold font-bold underline cursor-pointer hover:text-brand-midnight transition-colors disabled:opacity-50 disabled:no-underline"
                        >
                          {sharingId === visitor.id ? "Sharing..." : "One-Click Share"}
                        </button>
                     </p>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-brand-midnight/5 flex items-center gap-4 opacity-50">
                     <div className="w-8 h-8 rounded-full bg-brand-parchment flex items-center justify-center text-[10px]">🤖</div>
                     <p className="text-xs text-brand-midnight/60 font-light italic">
                        No semantic story matches found for this visitor's needs.
                     </p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 md:mt-0 flex gap-4">
                <PremiumButton 
                  variant={hasVideoSent(visitor.id) ? "outline" : "primary"}
                  onClick={() => {
                    setSelectedVisitor(visitor);
                    setIsRecording(true);
                  }}
                  className="text-xs py-3 px-6"
                >
                  {hasVideoSent(visitor.id) ? "Re-record Welcome" : "Record Welcome"}
                </PremiumButton>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <AnimatePresence>
        {isRecording && selectedVisitor && (
          <VideoRecorder 
            visitor={selectedVisitor} 
            onClose={() => {
              setIsRecording(false);
              setSelectedVisitor(null);
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
