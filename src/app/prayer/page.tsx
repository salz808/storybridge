'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitPrayerRequest } from './actions';
import { Reveal, FadeIn } from '@/components/premium/Reveal';

export default function PrayerBridgePage() {
  const [step, setStep] = useState<'form' | 'submitting' | 'success'>('form');
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    request: ''
  });
  const [match, setMatch] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('submitting');
    
    const result = await submitPrayerRequest(formData);
    
    if (result.success) {
      setMatch(result.match);
      setStep('success');
    } else {
      alert('Something went wrong. Please try again.');
      setStep('form');
    }
  };

  return (
    <div className="min-h-screen bg-brand-parchment/30 flex items-center justify-center p-6 selection:bg-brand-gold/30">
      <div className="max-w-xl w-full">
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-12 rounded-[3rem] shadow-2xl border border-brand-midnight/5"
            >
              <div className="text-center mb-10">
                <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">The Prayer Bridge</span>
                <h1 className="text-4xl font-serif font-bold text-brand-midnight mb-4">How can we pray for you?</h1>
                <p className="text-brand-slate font-light leading-relaxed">
                  We're your neighbors, and we believe in the power of community and prayer. Share what's on your heart, and our team will personally pray for you this week.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-midnight mb-2 ml-1">Your First Name</label>
                  <input 
                    required
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-brand-parchment/50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand-gold/50 transition-all font-light"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-midnight mb-2 ml-1">Email Address</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-brand-parchment/50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand-gold/50 transition-all font-light"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-midnight mb-2 ml-1">How can we support you?</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.request}
                    onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                    className="w-full bg-brand-parchment/50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand-gold/50 transition-all font-light"
                    placeholder="I'm walking through a difficult season with..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-midnight text-brand-gold font-bold py-5 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-xs mt-4"
                >
                  Send Prayer Request
                </button>
              </form>
            </motion.div>
          )}

          {step === 'submitting' && (
            <motion.div 
              key="submitting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center p-20"
            >
              <div className="w-16 h-16 border-4 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin mx-auto mb-8" />
              <p className="text-brand-midnight font-serif text-xl italic">Sending your request to our team...</p>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-brand-midnight text-brand-parchment p-12 rounded-[3rem] shadow-2xl relative overflow-hidden"
            >
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🙏</div>
                <h2 className="text-4xl font-serif font-bold text-white mb-4">We've got you, {formData.firstName}.</h2>
                <p className="text-white/70 font-light leading-relaxed">
                  Our team has received your request and someone will be praying for you personally. We've sent a confirmation to your email.
                </p>
              </div>

              {match && (
                <FadeIn delay={0.3}>
                  <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 mt-8">
                    <p className="text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-4">While you wait, you might find hope in this story:</p>
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-brand-gold/20 rounded-xl flex items-center justify-center text-brand-gold font-serif text-2xl font-bold">
                        {match.reasoning?.includes('tag') ? '✨' : '📖'}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-white text-lg">A Story of Hope</h4>
                        <p className="text-white/50 text-xs line-clamp-2 italic">
                          "{match.reasoning}"
                        </p>
                      </div>
                    </div>
                    <button className="w-full mt-6 bg-brand-gold text-brand-midnight font-bold py-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-white transition-colors">
                      Watch Story
                    </button>
                  </div>
                </FadeIn>
              )}

              <div className="mt-12 text-center">
                <button 
                  onClick={() => setStep('form')}
                  className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/60 hover:text-brand-gold transition-colors"
                >
                  Send another request
                </button>
              </div>

              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
