'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getLocalResonanceTrends, ResonanceTrend } from '@/lib/resonance';
import { FadeIn, Reveal } from '@/components/premium/Reveal';

interface CommunityResonanceProps {
  onSelectTrend: (theme: string) => void;
}

export default function CommunityResonance({ onSelectTrend }: CommunityResonanceProps) {
  const [trends, setTrends] = useState<ResonanceTrend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrends() {
      const data = await getLocalResonanceTrends('30303'); // Demo zip
      setTrends(data);
      setLoading(false);
    }
    loadTrends();
  }, []);

  return (
    <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-brand-midnight/5 h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-serif font-bold text-brand-midnight flex items-center gap-3">
            <span className="text-2xl">📡</span> Prophetic Intelligence
          </h3>
          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mt-1">Local Resonance Feed</p>
        </div>
        <div className="px-3 py-1 bg-green-50 text-green-700 text-[8px] font-black uppercase tracking-widest rounded-full border border-green-100">
          Live Analysis
        </div>
      </div>

      {loading ? (
        <div className="space-y-4 py-12">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-brand-parchment/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {trends.map((trend, i) => (
            <motion.div 
              key={trend.theme}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-brand-midnight/5 bg-brand-parchment/20 hover:border-brand-gold/30 hover:bg-white transition-all cursor-pointer group"
              onClick={() => onSelectTrend(trend.theme)}
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-serif font-bold text-brand-midnight group-hover:text-brand-gold transition-colors">{trend.theme}</h4>
                <span className={`text-[8px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full ${
                  trend.sentiment === 'critical' ? 'bg-red-100 text-red-700' :
                  trend.sentiment === 'rising' ? 'bg-brand-gold/20 text-brand-gold' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {trend.sentiment} Resonance
                </span>
              </div>
              <p className="text-xs text-brand-slate font-light leading-relaxed mb-4">
                {trend.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-1.5 bg-brand-midnight/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${trend.volume}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full gold-gradient rounded-full"
                  />
                </div>
                <span className="text-[10px] font-bold text-brand-midnight">{trend.volume}% volume</span>
              </div>
            </motion.div>
          ))}
          
          <div className="pt-4">
             <button className="w-full py-4 border border-dashed border-brand-midnight/20 rounded-xl text-[10px] font-bold text-brand-slate uppercase tracking-widest hover:border-brand-gold hover:text-brand-gold transition-all">
                Deep-Scan Neighborhood Sentiment
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
