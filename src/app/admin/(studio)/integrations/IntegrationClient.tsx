'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { Reveal, FadeIn } from '@/components/premium/Reveal';

export default function IntegrationClient({ initialSettings, logs }: { initialSettings: any, logs: any[] }) {
  const [provider, setProvider] = useState(initialSettings?.provider || 'pco');
  const [apiKey, setApiKey] = useState('');
  const [activeTab, setActiveTab] = useState<'settings' | 'logs'>('settings');

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-brand-midnight/5 overflow-hidden selection:bg-brand-gold/30">
      <div className="flex bg-brand-parchment/50 border-b border-brand-midnight/5">
        <button 
          onClick={() => setActiveTab('settings')}
          className={`px-10 py-6 font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'settings' ? 'text-brand-midnight border-b-2 border-brand-gold bg-white' : 'text-brand-slate hover:text-brand-midnight'}`}
        >
          Connection Settings
        </button>
        <button 
          onClick={() => setActiveTab('logs')}
          className={`px-10 py-6 font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'logs' ? 'text-brand-midnight border-b-2 border-brand-gold bg-white' : 'text-brand-slate hover:text-brand-midnight'}`}
        >
          Sync Intelligence
        </button>
      </div>

      <div className="p-8 md:p-16">
        <AnimatePresence mode="wait">
          {activeTab === 'settings' ? (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-3xl"
            >
              <div className="mb-12">
                <label className="block text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-6">Select Your ChMS Architecture</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: 'pco', name: 'Planning Center', type: 'OAuth2 / API' },
                    { id: 'ccb', name: 'Church Community Builder', type: 'REST API' }
                  ].map((p) => (
                    <button 
                      key={p.id}
                      onClick={() => setProvider(p.id)}
                      className={`p-8 rounded-[2rem] border-2 transition-all text-left relative overflow-hidden group ${provider === p.id ? 'border-brand-gold bg-brand-parchment' : 'border-brand-midnight/5 hover:border-brand-gold/30'}`}
                    >
                      <div className={`font-serif font-bold text-xl mb-1 ${provider === p.id ? 'text-brand-midnight' : 'text-brand-slate'}`}>{p.name}</div>
                      <div className="text-[10px] text-brand-gold font-bold uppercase tracking-wider">{p.type}</div>
                      {provider === p.id && (
                        <div className="absolute top-4 right-4 text-brand-gold">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <label className="block text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">
                    {provider === 'pco' ? 'PCO Private Key' : 'CCB Secure Token'}
                  </label>
                  <input 
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="••••••••••••••••••••••••"
                    className="w-full p-6 bg-brand-parchment border border-brand-midnight/5 rounded-2xl outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all font-mono text-sm shadow-inner"
                  />
                  <p className="mt-4 text-[10px] text-brand-slate italic">Your credentials are encrypted with AES-256 and never stored in plain text.</p>
                </div>

                <div className="pt-8 border-t border-brand-midnight/5">
                  <h3 className="text-xl font-serif font-bold text-brand-midnight mb-8 text-balance">Intelligence Routing</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-brand-parchment/30 rounded-2xl border border-brand-midnight/5 gap-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-midnight">Plan Your Visit Events</span>
                      <select className="bg-white border border-brand-midnight/10 rounded-xl p-3 text-xs outline-none focus:ring-1 focus:ring-brand-gold">
                        <option>Route to "First-Time Guest" Pipeline</option>
                        <option>Route to "Newcomer Alpha" Group</option>
                      </select>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-brand-parchment/30 rounded-2xl border border-brand-midnight/5 gap-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-midnight">StoryBox Submissions</span>
                      <select className="bg-white border border-brand-midnight/10 rounded-xl p-3 text-xs outline-none focus:ring-1 focus:ring-brand-gold">
                        <option>Route to "Testimony Curation" Team</option>
                        <option>No External Routing</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-10">
                  <PremiumButton className="w-full">
                    Synchronize Ecosystem
                  </PremiumButton>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="logs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] border-b border-brand-midnight/5">
                      <th className="pb-6">Intelligence Entity</th>
                      <th className="pb-6">Status</th>
                      <th className="pb-6">Ecosystem</th>
                      <th className="pb-6">Metadata</th>
                      <th className="pb-6">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-midnight/5">
                    {logs.map((log: any) => (
                      <tr key={log.id} className="group">
                        <td className="py-6">
                           <div className="text-xs font-bold uppercase tracking-widest text-brand-midnight">{log.entityType}</div>
                        </td>
                        <td className="py-6">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                            log.status === 'success' ? 'bg-green-100 text-green-700' :
                            log.status === 'error' ? 'bg-red-50 text-red-600' :
                            'bg-brand-parchment text-brand-gold'
                          }`}>
                            {log.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-6 font-serif italic text-brand-slate text-sm">{log.provider === 'pco' ? 'Planning Center' : 'CCB'}</td>
                        <td className="py-6 text-xs text-brand-slate font-light">{log.details}</td>
                        <td className="py-6 text-[10px] font-bold text-brand-slate/40 uppercase tracking-tighter">{new Date(log.createdAt).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                    {logs.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-24 text-center">
                          <p className="font-serif italic text-brand-slate text-lg text-balance">The stream is quiet. No synchronization events recorded.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
