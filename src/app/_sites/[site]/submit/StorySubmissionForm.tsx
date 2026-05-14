'use client';

import { useState } from 'react';
import { submitStory } from './actions';
import { motion, AnimatePresence } from 'framer-motion';

export default function StorySubmissionForm({ churchId, churchName }: { churchId: string, churchName: string }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [type, setType] = useState<'text' | 'video'>('text');
  
  const tags = [
    'Marriage', 'Anxiety', 'Parenting', 'Finding Purpose', 
    'Healing', 'Community', 'Faith', 'Life Change'
  ];

  async function handleSubmit(formData: FormData) {
    setStatus('submitting');
    try {
      const result = await submitStory(formData);
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="text-7xl mb-8">🙏</div>
        <h3 className="text-3xl font-serif font-bold mb-4 text-brand-midnight">Thank you for sharing, friend.</h3>
        <p className="text-brand-slate text-xl leading-relaxed font-light max-w-md mx-auto">
          Your story has been received. We are deeply encouraged by how God is moving in your life.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-12 text-brand-gold font-bold uppercase tracking-widest text-sm hover:text-brand-midnight transition-colors"
        >
          Submit another story
        </button>
      </motion.div>
    );
  }

  const inputClasses = "w-full px-5 py-4 rounded-2xl bg-brand-parchment border border-brand-midnight/5 text-brand-midnight placeholder-brand-midnight/20 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all font-light";
  const labelClasses = "block text-xs uppercase tracking-[0.2em] font-bold mb-3 text-brand-gold";

  return (
    <form action={handleSubmit} className="space-y-10">
      <input type="hidden" name="churchId" value={churchId} />
      <input type="hidden" name="type" value={type} />
      
      <div className="flex gap-2 p-1 bg-brand-parchment rounded-2xl border border-brand-midnight/5">
        <button
          type="button"
          onClick={() => setType('text')}
          className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${type === 'text' ? 'bg-brand-midnight text-brand-parchment shadow-lg' : 'text-brand-slate hover:text-brand-midnight'}`}
        >
          Write My Story
        </button>
        <button
          type="button"
          onClick={() => setType('video')}
          className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${type === 'video' ? 'bg-brand-midnight text-brand-parchment shadow-lg' : 'text-brand-slate hover:text-brand-midnight'}`}
        >
          Record Video
        </button>
      </div>

      <AnimatePresence mode="wait">
        {type === 'text' ? (
          <motion.div
            key="text-field"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <label className={labelClasses}>Your Testimony</label>
            <textarea
              name="content"
              rows={8}
              required
              className={inputClasses}
              placeholder="Share what life was like before, what changed, and how God met you..."
            ></textarea>
          </motion.div>
        ) : (
          <motion.div
            key="video-field"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-12 border-2 border-dashed border-brand-gold/20 rounded-[2rem] text-center bg-brand-parchment/50"
          >
            <div className="text-5xl mb-6 text-brand-gold/40">📹</div>
            <p className="text-brand-midnight font-medium mb-6">Video capture is being prepared</p>
            <input 
              type="file" 
              name="videoFile" 
              accept="video/*"
              className="block w-full text-sm text-brand-slate file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-brand-gold file:text-brand-midnight hover:file:bg-brand-gold/80 cursor-pointer"
            />
            <p className="mt-6 text-xs text-brand-slate/60 uppercase tracking-widest font-bold">Max 3 minutes • 4K Support coming soon</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClasses}>First Name</label>
          <input
            type="text"
            name="firstName"
            required
            className={inputClasses}
            placeholder="Jane"
          />
        </div>
        <div>
          <label className={labelClasses}>Last Name</label>
          <input
            type="text"
            name="lastName"
            required
            className={inputClasses}
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClasses}>Email Address</label>
          <input
            type="email"
            name="email"
            required
            className={inputClasses}
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label className={labelClasses}>Phone (Optional)</label>
          <input
            type="tel"
            name="phone"
            className={inputClasses}
            placeholder="(555) 000-0000"
          />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Thematic Tags</label>
        <div className="flex flex-wrap gap-3">
          {tags.map(tag => (
            <label key={tag} className="inline-flex items-center">
              <input type="checkbox" name="tags" value={tag} className="sr-only peer" />
              <span className="px-5 py-2.5 rounded-full border border-brand-midnight/5 bg-brand-parchment text-brand-slate peer-checked:bg-brand-gold peer-checked:text-brand-midnight peer-checked:border-brand-gold cursor-pointer transition-all text-xs font-bold uppercase tracking-wider shadow-sm hover:border-brand-gold/30">
                {tag}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-4 p-6 bg-brand-parchment rounded-2xl border border-brand-midnight/5">
        <div className="flex items-center h-6">
          <input 
            type="checkbox" 
            name="consent" 
            id="consent" 
            required 
            className="h-5 w-5 rounded border-brand-midnight/10 text-brand-gold focus:ring-brand-gold transition-all cursor-pointer" 
          />
        </div>
        <label htmlFor="consent" className="text-sm text-brand-slate leading-relaxed font-light">
          I give <span className="text-brand-midnight font-bold">{churchName}</span> permission to share my story to encourage others. I understand it may be curated for length and clarity.
        </label>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={status === 'submitting'}
        className={`w-full py-6 rounded-full font-bold text-sm uppercase tracking-[0.2em] shadow-2xl transition-all ${
          status === 'submitting' 
            ? 'bg-brand-midnight/50 text-brand-parchment/50 cursor-not-allowed' 
            : 'bg-brand-midnight text-brand-parchment hover:bg-brand-gold hover:text-brand-midnight'
        }`}
      >
        {status === 'submitting' ? 'Submitting to the Kingdom...' : 'Submit My Story'}
      </motion.button>

      {status === 'error' && (
        <p className="text-red-500 text-center text-sm font-bold uppercase tracking-widest">
          Connection lost. Please try again.
        </p>
      )}
    </form>
  );
}
