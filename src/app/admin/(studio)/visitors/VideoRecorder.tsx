'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { sendPersonalizedVideo } from './actions';

type Visitor = {
  id: string;
  firstName: string;
  lastName: string;
  kidsInfo: string;
};

export default function VideoRecorder({ 
  visitor, 
  onClose 
}: { 
  visitor: Visitor, 
  onClose: () => void 
}) {
  const [status, setStatus] = useState<'idle' | 'recording' | 'preview' | 'uploading' | 'success'>('idle');
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (status === 'recording') {
      timerRef.current = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setStatus('recording');
  const handleStop = () => setStatus('preview');
  const handleUpload = async () => {
    setStatus('uploading');
    
    // Simulate a video URL
    const simulatedUrl = "https://example.com/videos/welcome.mp4";
    
    const result = await sendPersonalizedVideo(visitor.id, simulatedUrl);
    
    if (result.success) {
      setStatus('success');
    } else {
      setStatus('preview');
      alert('Failed to deliver bridge. Please try again.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-brand-midnight/95 backdrop-blur-xl z-[100] flex items-center justify-center p-6"
    >
      <div className="max-w-4xl w-full bg-brand-midnight rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] relative">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50 text-2xl"
        >
          &times;
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
          {/* Camera View Area */}
          <div className="lg:col-span-2 bg-black relative flex items-center justify-center overflow-hidden">
            {status === 'idle' && (
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📷</span>
                </div>
                <p className="text-white/60 font-light">Camera initialization ready...</p>
              </div>
            )}

            {(status === 'recording' || status === 'preview') && (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                   <div className="w-32 h-32 border-4 border-brand-gold/20 rounded-full animate-ping" />
                </div>
                <p className="text-brand-gold/40 font-serif italic text-2xl">Camera Simulation Active</p>
                
                {status === 'recording' && (
                  <div className="absolute top-8 left-8 flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                    <span className="text-white font-mono text-xl">{formatTime(timer)}</span>
                  </div>
                )}
              </div>
            )}

            {status === 'uploading' && (
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                <p className="text-brand-gold font-bold uppercase tracking-[0.2em] text-xs">Architecting the delivery...</p>
              </div>
            )}

            {status === 'success' && (
              <div className="text-center p-12">
                <div className="text-6xl mb-8">🕊️</div>
                <h3 className="text-3xl font-serif font-bold text-white mb-4 text-balance">The Bridge is Delivered.</h3>
                <p className="text-white/60 font-light max-w-sm mx-auto mb-10 leading-relaxed">
                  Sarah has been notified via SMS with her unique, branded connection link.
                </p>
                <PremiumButton onClick={onClose}>Return to Pipeline</PremiumButton>
              </div>
            )}

            {/* Teleprompter Overlay */}
            {(status === 'idle' || status === 'recording') && (
              <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black to-transparent pointer-events-none">
                <div className="max-w-md mx-auto">
                  <p className="text-brand-gold text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-center">Teleprompter Logic</p>
                  <div className="text-white text-xl font-light text-center leading-relaxed italic">
                    "Hi {visitor.firstName}! I'm so glad you're planning to visit us this Sunday. We've got {visitor.kidsInfo === 'None' ? 'a seat' : 'a spot in our kids program'} ready for you. See you soon!"
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Controls Area */}
          <div className="p-10 flex flex-col justify-between bg-brand-midnight">
            <div>
              <h4 className="text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] mb-8">Personalized Connection</h4>
              <div className="space-y-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                   <p className="text-white/40 text-[8px] font-bold uppercase tracking-widest mb-1">Target Visitor</p>
                   <p className="text-white font-serif font-bold text-lg">{visitor.firstName} {visitor.lastName}</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                   <p className="text-white/40 text-[8px] font-bold uppercase tracking-widest mb-1">Visit Context</p>
                   <p className="text-white text-sm font-light italic">{visitor.kidsInfo}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {status === 'idle' && (
                <PremiumButton onClick={handleStart} className="w-full py-6">Begin Recording</PremiumButton>
              )}
              {status === 'recording' && (
                <button 
                  onClick={handleStop}
                  className="w-full py-6 bg-red-600 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-red-700 transition shadow-xl"
                >
                  End Session
                </button>
              )}
              {status === 'preview' && (
                <>
                  <PremiumButton onClick={handleUpload} className="w-full py-6">Deliver Welcome</PremiumButton>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="w-full py-4 text-white/50 text-[10px] font-bold uppercase tracking-widest hover:text-white transition"
                  >
                    Discard & Retake
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
