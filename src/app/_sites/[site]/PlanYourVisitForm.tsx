'use client';

import { useState } from 'react';
import { submitPlanVisit } from './actions';
import { motion } from 'framer-motion';

export default function PlanYourVisitForm({ churchId, churchName }: { churchId: string, churchName: string }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [visitorName, setVisitorName] = useState('');

  async function handleSubmit(formData: FormData) {
    setStatus('submitting');
    setVisitorName(formData.get('firstName') as string);
    
    try {
      const result = await submitPlanVisit(formData);
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
        className="text-center py-10"
      >
        <div className="text-6xl mb-6">✨</div>
        <h3 className="text-3xl font-serif font-bold mb-4 text-brand-parchment">We can't wait to meet you, {visitorName}!</h3>
        <p className="text-brand-parchment/60 text-xl leading-relaxed font-light">
          Keep an eye on your phone for a personal message from our team. <br /> We'll see you this Sunday!
        </p>
      </motion.div>
    );
  }

  const inputClasses = "w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-brand-parchment placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all font-light";
  const labelClasses = "block text-xs uppercase tracking-[0.2em] font-bold mb-3 text-brand-gold/80";

  return (
    <form action={handleSubmit} className="space-y-8">
      <input type="hidden" name="churchId" value={churchId} />
      <input type="hidden" name="churchName" value={churchName} />
      
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
          <label className={labelClasses}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            required
            className={inputClasses}
            placeholder="(555) 000-0000"
          />
        </div>
      </div>

      <div>
        <label className={labelClasses}>When are you visiting?</label>
        <div className="relative">
          <select
            name="visitDate"
            required
            className={`${inputClasses} appearance-none cursor-pointer`}
          >
            <option value="" className="bg-brand-midnight text-brand-parchment">Select a Sunday</option>
            <option value="This Sunday" className="bg-brand-midnight text-brand-parchment">This Sunday</option>
            <option value="Next Sunday" className="bg-brand-midnight text-brand-parchment">Next Sunday</option>
            <option value="In a few weeks" className="bg-brand-midnight text-brand-parchment">In a few weeks</option>
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gold">
            ↓
          </div>
        </div>
      </div>

      <div>
        <label className={labelClasses}>Bringing kids? (Ages/Grades)</label>
        <textarea
          name="kidsInfo"
          rows={2}
          className={inputClasses}
          placeholder="e.g. 5 year old girl, 2nd grade boy"
        ></textarea>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={status === 'submitting'}
        className={`w-full py-5 rounded-full font-bold text-sm uppercase tracking-[0.2em] shadow-2xl transition-all ${
          status === 'submitting' 
            ? 'bg-brand-midnight/50 text-white/50 cursor-not-allowed border border-white/5' 
            : 'bg-brand-gold text-brand-midnight hover:bg-brand-parchment hover:text-brand-midnight'
        }`}
      >
        {status === 'submitting' ? 'Preparing Your Welcome...' : 'Schedule My Visit'}
      </motion.button>

      {status === 'error' && (
        <p className="text-red-400 text-center text-sm font-medium">
          Something went wrong. Please try again or contact support.
        </p>
      )}
    </form>
  );
}
