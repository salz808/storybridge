'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Reveal, FadeIn } from '@/components/premium/Reveal';
import { markAsPrayed } from '@/app/prayer/actions';

// Mock data for initial UI if DB is empty for demo
const MOCK_PRAYERS = [
  {
    id: '1',
    firstName: 'Sarah',
    email: 'sarah@example.com',
    request: 'I am struggling with high anxiety about my job security right now. I feel so overwhelmed.',
    aiSummary: 'Anxiety regarding employment and job security.',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    firstName: 'Michael',
    email: 'mike@test.com',
    request: 'Our marriage is in a very difficult place. We are considering separation and I do not know where to turn.',
    aiSummary: 'Marriage crisis and potential separation.',
    status: 'prayed',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

export default function AdminPrayerPage() {
  const [prayers, setPrayers] = useState(MOCK_PRAYERS);

  const handleMarkPrayed = async (id: string) => {
    // Optimistic update
    setPrayers(prayers.map(p => p.id === id ? { ...p, status: 'prayed' } : p));
    await markAsPrayed(id);
  };

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto selection:bg-brand-gold/30">
      <header className="mb-12 border-b border-brand-midnight/5 pb-8 flex justify-between items-end">
        <div>
          <Reveal delay={0.1}>
            <h1 className="text-4xl font-serif font-bold text-brand-midnight mb-2">Prayer Bridge Inbox</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-brand-slate font-light uppercase tracking-widest text-xs">Connecting community needs with congregation care</p>
          </Reveal>
        </div>
        <div className="flex gap-4">
           <div className="text-right">
             <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">Active Requests</p>
             <p className="text-2xl font-serif font-bold text-brand-midnight">{prayers.filter(p => p.status === 'pending').length}</p>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {prayers.map((prayer, i) => (
          <FadeIn key={prayer.id} delay={i * 0.1}>
            <div className={`bg-white p-8 rounded-[2.5rem] shadow-xl border ${prayer.status === 'prayed' ? 'border-green-500/20 bg-green-50/10' : 'border-brand-midnight/5'} group transition-all`}>
              <div className="flex flex-col md:flex-row gap-8 justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-serif font-bold text-lg ${prayer.status === 'prayed' ? 'bg-green-100 text-green-600' : 'bg-brand-parchment text-brand-gold'}`}>
                      {prayer.firstName[0]}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl text-brand-midnight">{prayer.firstName}</h3>
                      <p className="text-[10px] font-bold text-brand-slate uppercase tracking-widest">{prayer.email}</p>
                    </div>
                    {prayer.status === 'prayed' && (
                      <span className="bg-green-100 text-green-700 text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Personally Prayed</span>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-brand-parchment/30 p-6 rounded-2xl border border-brand-midnight/5">
                      <p className="text-[10px] font-bold text-brand-midnight uppercase tracking-widest mb-2 opacity-40">Original Request</p>
                      <p className="text-brand-midnight font-light italic leading-relaxed">"{prayer.request}"</p>
                    </div>
                    
                    <div className="flex items-start gap-3 px-2">
                       <span className="text-lg">🤖</span>
                       <div>
                         <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">AI Summary for Staff</p>
                         <p className="text-sm text-brand-slate">{prayer.aiSummary}</p>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-64 flex flex-col justify-between items-end">
                  <p className="text-[10px] font-bold text-brand-slate/40 uppercase tracking-widest">
                    {new Date(prayer.createdAt).toLocaleDateString()}
                  </p>
                  
                  <div className="space-y-3 w-full mt-8">
                    {prayer.status === 'pending' ? (
                      <button 
                        onClick={() => handleMarkPrayed(prayer.id)}
                        className="w-full bg-brand-midnight text-brand-gold font-bold py-4 rounded-xl text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
                      >
                        Mark as Prayed
                      </button>
                    ) : (
                      <div className="w-full text-center py-4 text-[10px] font-bold text-green-600 uppercase tracking-widest">
                        Completed
                      </div>
                    )}
                    <button className="w-full border border-brand-midnight/10 text-brand-midnight font-bold py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-brand-parchment transition-all">
                      Follow Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
