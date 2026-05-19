'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { Reveal, FadeIn } from '@/components/premium/Reveal';
import { scrapeChurchWebsite } from './actions';
import ScraperSuccess from './ScraperSuccess';

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [isScraping, setIsScraping] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [url, setUrl] = useState('');

  const [formData, setStepData] = useState({
    name: '',
    subdomain: '',
    logo: null,
    primaryColor: '#C5A059',
    brandColorName: 'Burnished Gold',
    themeName: 'Aged Parchment',
    address: '123 Grace Way, Atlanta, GA 30303',
    mission: 'To build a bridge between our stories and the community.',
    chmsProvider: 'pco',
    senderName: '',
    serviceTimes: '10:00 AM',
  });

  const handleAutoImport = async () => {
    if (!url) return;
    setIsScraping(true);
    const result = await scrapeChurchWebsite(url);
    if (result.success && result.data) {
      setStepData({
        ...formData,
        name: result.data.name,
        subdomain: result.data.subdomain,
        primaryColor: result.data.primaryColor,
        brandColorName: result.data.brandColorName,
        themeName: result.data.themeName,
        address: result.data.address,
        mission: result.data.mission,
        serviceTimes: result.data.serviceTimes,
      });
      
      // Delay slightly for dramatic effect before showing success screen
      setTimeout(() => {
        setIsScraping(false);
        setShowSuccess(true);
      }, 1000);
    } else {
      setIsScraping(false);
      alert(result.error || "Failed to import. Please try manual entry.");
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="min-h-screen bg-brand-parchment flex items-center justify-center p-6 selection:bg-brand-gold/30">
      <div className={`w-full transition-all duration-1000 ${showSuccess ? 'max-w-6xl' : 'max-w-3xl'} bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-brand-midnight/5`}>
        <AnimatePresence mode="wait">
          {!showSuccess ? (
            <motion.div 
              key="wizard"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Progress Bar */}
              <div className="bg-brand-midnight p-10 text-brand-parchment text-center relative overflow-hidden">
                <Reveal delay={0.1}>
                  <h1 className="text-3xl font-serif font-bold mb-6">The Launchpad</h1>
                </Reveal>
                <div className="flex justify-between items-center max-w-sm mx-auto relative z-10">
                  {[1, 2, 3, 4].map(s => (
                    <div key={s} className="flex flex-col items-center gap-3">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all duration-700 border-2 ${
                          step >= s ? 'bg-brand-gold border-brand-gold text-brand-midnight scale-110 shadow-[0_0_20px_rgba(197,160,89,0.4)]' : 'border-brand-gold/20 text-brand-gold/40'
                        }`}
                      >
                        {s}
                      </div>
                    </div>
                  ))}
                  {/* Progress line background */}
                  <div className="absolute top-5 left-0 w-full h-[1px] bg-brand-gold/10 -z-10" />
                </div>
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              </div>

              <div className="p-10 md:p-16">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      <h2 className="text-3xl font-serif font-bold text-brand-midnight">Ecosystem Identity</h2>
                      
                      {/* Auto-Import Feature */}
                      <div className="bg-brand-parchment/50 p-8 rounded-[2rem] border border-brand-midnight/5 space-y-4">
                         <div className="flex justify-between items-center mb-2">
                            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">One-Click Intelligence</p>
                            <span className="bg-brand-midnight text-[8px] text-brand-gold px-2 py-1 rounded-full font-bold uppercase tracking-widest">AI Importer</span>
                         </div>
                         <p className="text-xs text-brand-slate font-light leading-relaxed mb-4">Paste your current website URL and our AI will instantly build your StoryBridge profile.</p>
                         <div className="flex gap-4">
                            <input 
                              type="url" 
                              placeholder="https://gracecommunity.org"
                              value={url}
                              onChange={(e) => setUrl(e.target.value)}
                              className="flex-1 p-4 bg-white border border-brand-midnight/5 rounded-xl outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all text-sm font-light"
                            />
                            <button 
                              onClick={handleAutoImport}
                              disabled={isScraping}
                              className="bg-brand-midnight text-brand-gold px-6 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 min-w-[120px]"
                            >
                              {isScraping ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
                                  <span>Analyzing...</span>
                                </div>
                              ) : 'Auto-Import'}
                            </button>
                         </div>
                         {formData.name && !showSuccess && (
                            <motion.p 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-[10px] text-green-600 font-bold uppercase tracking-widest text-center pt-2"
                            >
                               ✓ Profile Extracted: {formData.name}
                            </motion.p>
                         )}
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">Church Name</label>
                          <input 
                            type="text" 
                            placeholder="Grace Community Church"
                            value={formData.name}
                            className="w-full p-6 bg-brand-parchment border border-brand-midnight/5 rounded-2xl outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all font-light"
                            onChange={(e) => setStepData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">Your Custom URL</label>
                          <div className="flex items-center group">
                            <input 
                              type="text" 
                              placeholder="grace-community"
                              value={formData.subdomain}
                              className="flex-1 p-6 bg-brand-parchment border border-brand-midnight/5 rounded-l-2xl outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all font-light"
                              onChange={(e) => setStepData({ ...formData, subdomain: e.target.value })}
                            />
                            <span className="bg-brand-midnight text-brand-parchment border border-brand-midnight p-6 rounded-r-2xl text-xs font-bold uppercase tracking-widest">.storybridge.io</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">Signature Palette</label>
                          <div className="flex gap-6 items-center">
                             <input 
                              type="color" 
                              value={formData.primaryColor}
                              onChange={(e) => setStepData({ ...formData, primaryColor: e.target.value })}
                              className="w-20 h-20 rounded-2xl cursor-pointer border-4 border-brand-parchment shadow-xl"
                            />
                            <div className="flex-1 p-6 rounded-2xl border border-brand-midnight/5 bg-brand-parchment/50 flex items-center gap-6">
                              <button 
                                style={{ backgroundColor: formData.primaryColor }}
                                className="px-8 py-3 rounded-full text-white text-[10px] font-black uppercase tracking-widest pointer-events-none shadow-lg"
                              >
                                Visual Preview
                              </button>
                              <p className="text-[10px] text-brand-slate uppercase font-bold tracking-wider leading-relaxed">System-wide component styling updated in real-time.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <PremiumButton onClick={nextStep} className="w-full py-6">
                        Initialize Architecture
                      </PremiumButton>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      <div className="flex justify-between items-end">
                        <h2 className="text-3xl font-serif font-bold text-brand-midnight">Intelligence Sync</h2>
                        <div className="group relative">
                          <span className="text-brand-gold cursor-help text-[10px] font-black uppercase tracking-widest border-b border-brand-gold/30 pb-1">Foundational Logic</span>
                          <div className="absolute bottom-full right-0 mb-4 w-64 bg-brand-midnight text-brand-parchment text-[10px] p-6 rounded-2xl opacity-0 group-hover:opacity-100 transition-all shadow-2xl pointer-events-none z-20 font-light leading-relaxed">
                            Connecting your ChMS creates a bi-directional intelligence stream, ensuring your visitor data is always synchronized and deduplicated.
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { id: 'pco', name: 'Planning Center' },
                          { id: 'ccb', name: 'Church Community Builder' }
                        ].map((p) => (
                          <button 
                            key={p.id}
                            onClick={() => setStepData({ ...formData, chmsProvider: p.id })}
                            className={`p-8 rounded-[2rem] border-2 transition-all text-left relative ${formData.chmsProvider === p.id ? 'border-brand-gold bg-brand-parchment' : 'border-brand-midnight/5 hover:border-brand-gold/20'}`}
                          >
                            <div className={`font-serif font-bold text-xl mb-1 ${formData.chmsProvider === p.id ? 'text-brand-midnight' : 'text-brand-slate'}`}>{p.name}</div>
                            <div className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">Active Provider</div>
                          </button>
                        ))}
                      </div>
                      <FadeIn>
                        <div className="p-8 border border-green-100 bg-green-50/50 rounded-[2rem] text-center flex items-center justify-center gap-4">
                          <span className="text-2xl">⚡</span>
                          <p className="text-green-800 text-xs font-bold uppercase tracking-widest">Secure Handshake Established • 1,240 records ready</p>
                        </div>
                      </FadeIn>
                      <div className="flex gap-6 pt-4">
                        <button onClick={prevStep} className="px-10 text-[10px] font-bold uppercase tracking-widest text-brand-slate hover:text-brand-midnight transition-colors">
                          Back
                        </button>
                        <PremiumButton onClick={nextStep} className="flex-1 py-6">
                          Confirm Integration
                        </PremiumButton>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      <h2 className="text-3xl font-serif font-bold text-brand-midnight">The Prophet's Voice</h2>
                      <div>
                        <label className="block text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">Primary Digital Host</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Pastor David"
                          value={formData.senderName}
                          className="w-full p-6 bg-brand-parchment border border-brand-midnight/5 rounded-2xl outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all font-light"
                          onChange={(e) => setStepData({ ...formData, senderName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-6">Messaging Prototypes</h3>
                        {[
                          'Immediate Welcome Sequence',
                          'The "Sunday Expectation" Guide'
                        ].map((t) => (
                          <div key={t} className="p-6 bg-brand-parchment/30 rounded-2xl border border-brand-midnight/5 flex justify-between items-center group hover:bg-white transition-all">
                            <span className="text-xs font-bold uppercase tracking-widest text-brand-midnight">{t}</span>
                            <button className="text-brand-gold text-[10px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all hover:underline">Customize</button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-6 pt-4">
                        <button onClick={prevStep} className="px-10 text-[10px] font-bold uppercase tracking-widest text-brand-slate hover:text-brand-midnight transition-colors">
                          Back
                        </button>
                        <PremiumButton onClick={nextStep} className="flex-1 py-6">
                          Finalize Messaging
                        </PremiumButton>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div 
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10 text-center"
                    >
                      <div className="relative inline-block mb-4">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-midnight leading-tight">Launch <br /><span className="gold-text italic">The Bridge.</span></h2>
                      </div>
                      <p className="text-brand-slate font-light text-lg max-w-md mx-auto leading-relaxed">
                        Your digital hospitality engine is ready to be unveiled. Choose your sanctuary's aesthetic.
                      </p>
                      <div className="grid grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                          <button key={i} className={`aspect-[3/4] rounded-2xl border-2 transition-all relative overflow-hidden group ${i === 1 ? 'border-brand-gold shadow-2xl scale-105' : 'border-brand-midnight/5 hover:border-brand-gold/30'}`}>
                            <div className="absolute inset-0 bg-brand-parchment opacity-50" />
                            <span className="relative z-10 text-[10px] font-black uppercase tracking-tighter text-brand-midnight">Atelier {i}</span>
                          </button>
                        ))}
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">Sabbath Service Hours</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 10:00 AM"
                          value={formData.serviceTimes}
                          className="w-full p-6 bg-brand-parchment border border-brand-midnight/5 rounded-2xl outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all font-serif italic text-xl text-center"
                          onChange={(e) => setStepData({ ...formData, serviceTimes: e.target.value })}
                        />
                      </div>
                      <div className="flex gap-6 pt-10">
                        <button onClick={prevStep} className="px-10 text-[10px] font-bold uppercase tracking-widest text-brand-slate hover:text-brand-midnight transition-colors">
                          Back
                        </button>
                        <PremiumButton 
                          onClick={() => router.push('/admin?welcome=true')}
                          className="flex-1 py-6"
                        >
                          Authorize & Publish
                        </PremiumButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="p-10 md:p-20"
            >
              <ScraperSuccess 
                data={{
                  name: formData.name,
                  primaryColor: formData.primaryColor,
                  brandColorName: formData.brandColorName,
                  themeName: formData.themeName,
                  serviceTimes: formData.serviceTimes,
                  address: formData.address,
                  mission: formData.mission
                }}
                onComplete={() => router.push('/admin?welcome=true')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Background Decorative elements */}
      <div className="fixed -bottom-40 -left-40 w-[30rem] h-[30rem] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-[30rem] h-[30rem] bg-brand-midnight/5 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
}
