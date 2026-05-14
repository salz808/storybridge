'use client';

import { motion } from 'framer-motion';
import { Reveal, FadeIn } from '@/components/premium/Reveal';
import { PremiumButton } from '@/components/ui/PremiumButton';

interface ScraperSuccessProps {
  data: {
    name: string;
    primaryColor: string;
    brandColorName: string;
    themeName: string;
    serviceTimes: string;
    address: string;
    mission: string;
  };
  onComplete: () => void;
}

export default function ScraperSuccess({ data, onComplete }: ScraperSuccessProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="space-y-12 py-8"
    >
      <header className="text-center mb-16">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-brand-midnight rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(197,160,89,0.3)] border border-brand-gold/30"
        >
          <span className="text-4xl">✨</span>
        </motion.div>
        <Reveal delay={0.2}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-midnight mb-4">Your Digital Foundation is Ready.</h2>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="text-brand-slate font-light text-lg max-w-2xl mx-auto leading-relaxed italic">
            While you were busy serving your community, our discovery engine was hard at work. We’ve analyzed your digital presence to build a StoryBridge experience that feels exactly like home.
          </p>
        </Reveal>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Identity */}
        <motion.div variants={item} className="bg-brand-parchment/30 p-10 rounded-[3rem] border border-brand-midnight/5 hover:border-brand-gold/20 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-brand-midnight flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">🎨</div>
          <h3 className="text-xl font-serif font-bold text-brand-midnight mb-4">We’ve Captured Your Aesthetic.</h3>
          <p className="text-xs text-brand-slate font-light leading-relaxed">
            A church’s brand is its first handshake. We’ve discovered your signature <strong className="text-brand-midnight" style={{ color: data.primaryColor }}>{data.brandColorName} ({data.primaryColor})</strong> and seamlessly integrated it into our <strong className="text-brand-midnight">{data.themeName}</strong> system. Your 'Plan Your Visit' page and StoryBox portal will now mirror the unique beauty of your physical campus.
          </p>
          <div className="mt-8 flex gap-2">
             <div className="w-full h-8 rounded-full shadow-inner border border-white/50" style={{ backgroundColor: data.primaryColor }} />
             <div className="w-full h-8 rounded-full bg-brand-midnight opacity-10" />
             <div className="w-full h-8 rounded-full bg-brand-gold opacity-20" />
          </div>
        </motion.div>

        {/* Logistical Intelligence */}
        <motion.div variants={item} className="bg-brand-parchment/30 p-10 rounded-[3rem] border border-brand-midnight/5 hover:border-brand-gold/20 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-brand-midnight flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">📍</div>
          <h3 className="text-xl font-serif font-bold text-brand-midnight mb-4">Your Logistics, Simplified.</h3>
          <p className="text-xs text-brand-slate font-light leading-relaxed">
            We found your rhythm. Your Sunday services at <strong className="text-brand-midnight">{data.serviceTimes}</strong> and your location at <strong className="text-brand-midnight">{data.address}</strong> have been mapped and verified. We’ve already pre-configured your 'Parking to Pew' guide with these details.
          </p>
          <div className="mt-8 p-4 bg-white/50 rounded-2xl border border-brand-midnight/5">
             <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest text-brand-gold mb-2">
                <span>Verified Location</span>
                <span>Active</span>
             </div>
             <div className="h-1 bg-brand-gold/20 rounded-full w-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-full bg-brand-gold"
                />
             </div>
          </div>
        </motion.div>

        {/* Mission & Values */}
        <motion.div variants={item} className="bg-brand-parchment/30 p-10 rounded-[3rem] border border-brand-midnight/5 hover:border-brand-gold/20 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-brand-midnight flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">❤️</div>
          <h3 className="text-xl font-serif font-bold text-brand-midnight mb-4">We Understand Your Heart.</h3>
          <p className="text-xs text-brand-slate font-light leading-relaxed italic">
            StoryBridge is built for your mission. We’ve identified your core focus: <strong className="text-brand-midnight">"{data.mission}"</strong>. This statement has been woven into your automated follow-up sequences and used to calibrate our <strong className="text-brand-gold">AI Story Matchmaker</strong>.
          </p>
          <div className="mt-8 flex items-center gap-3">
             <div className="w-8 h-8 rounded-full border-2 border-brand-gold flex items-center justify-center text-[10px] text-brand-gold font-bold">AI</div>
             <div className="flex-1 h-[1px] bg-brand-midnight/10" />
             <div className="text-[8px] font-bold text-brand-gold uppercase tracking-tighter">Calibrating Resonance...</div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={item} className="pt-12 text-center max-w-xl mx-auto">
        <h4 className="text-2xl font-serif font-bold text-brand-midnight mb-4">The Heavy Lifting is Done.</h4>
        <p className="text-sm text-brand-slate font-light leading-relaxed mb-10">
          We’ve handled the technical foundation so you can focus on the human connection. Your story-driven outreach engine is fueled and ready.
        </p>
        <PremiumButton onClick={onComplete} className="w-full py-6 text-xs uppercase tracking-widest font-bold">
          Step Into Your Dashboard
        </PremiumButton>
      </motion.div>
    </motion.div>
  );
}
