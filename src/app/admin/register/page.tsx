'use client';

import { useState } from 'react';
import { registerChurch } from './actions';
import { motion } from 'framer-motion';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { Reveal, FadeIn } from '@/components/premium/Reveal';

export default function RegisterChurch() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [slug, setSlug] = useState('');

  async function handleSubmit(formData: FormData) {
    setStatus('submitting');
    const result = await registerChurch(formData);
    if (result.success) {
      setSlug(result.slug || '');
      setStatus('success');
    } else {
      setStatus('idle');
      alert('Error registering church architecture.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-brand-parchment selection:bg-brand-gold/30">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl max-w-xl w-full text-center border border-brand-midnight/5"
        >
          <div className="text-7xl mb-8">✨</div>
          <h1 className="text-4xl font-serif font-bold mb-6 text-brand-midnight text-balance">The Foundation is Laid.</h1>
          <p className="text-brand-slate text-lg font-light mb-12 leading-relaxed">
            Your church ecosystem has been initialized. It's time to build the bridge.
          </p>
          <a href="/admin/onboarding">
            <PremiumButton className="w-full py-6">
              Enter The Studio
            </PremiumButton>
          </a>
        </motion.div>
      </div>
    );
  }

  const inputClasses = "w-full p-6 bg-brand-parchment border border-brand-midnight/5 rounded-2xl focus:ring-2 focus:ring-brand-gold/50 focus:border-transparent outline-none transition-all font-light text-brand-midnight placeholder-brand-midnight/20 shadow-inner";
  const labelClasses = "block text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-3";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-brand-parchment selection:bg-brand-gold/30 relative overflow-hidden">
      <FadeIn>
        <div className="bg-white p-10 md:p-20 rounded-[3.5rem] shadow-2xl max-w-2xl w-full border border-brand-midnight/5 relative z-10">
          <div className="text-center mb-16">
             <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-midnight mb-4">Register Your Church</h1>
             <p className="text-brand-slate font-light tracking-wide italic">Join the movement of story-driven growth.</p>
          </div>
          
          <form action={handleSubmit} className="flex flex-col gap-10">
            <div>
              <label className={labelClasses}>Ecclesiastical Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Grace Cathedral"
                className={inputClasses}
                required
              />
            </div>
            <div>
              <label className={labelClasses}>Unique Subdomain Slug</label>
              <div className="relative">
                <input
                  type="text"
                  name="slug"
                  placeholder="e.g. grace-cathedral"
                  className={inputClasses}
                  required
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-brand-gold uppercase tracking-widest pointer-events-none">.storybridge.io</div>
              </div>
            </div>
            <div>
              <label className={labelClasses}>Signature Emblem URL (Optional)</label>
              <input
                type="url"
                name="logoUrl"
                placeholder="https://..."
                className={inputClasses}
              />
            </div>
            <PremiumButton 
              type="submit" 
              disabled={status === 'submitting'}
              className="py-6"
            >
              {status === 'submitting' ? 'Initializing Architecture...' : 'Establish My Sanctuary'}
            </PremiumButton>
          </form>
        </div>
      </FadeIn>
      
      {/* Decorative background elements */}
      <div className="absolute -bottom-40 -left-40 w-[40rem] h-[40rem] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] bg-brand-midnight/5 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
