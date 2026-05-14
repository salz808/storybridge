'use client';

import { motion } from 'framer-motion';
import { Reveal, FadeIn } from '@/components/premium/Reveal';
import Link from 'next/link';

export default function InviteKitPage({ params }: { params: { member: string, slug: string } }) {
  const memberName = params.member.charAt(0).toUpperCase() + params.member.slice(1);
  
  return (
    <div className="min-h-screen bg-brand-parchment/30 selection:bg-brand-gold/30">
      {/* Mobile Top Bar */}
      <nav className="bg-white border-b border-brand-midnight/5 p-6 sticky top-0 z-50">
         <div className="max-w-xl mx-auto flex justify-between items-center">
            <span className="font-serif font-bold text-brand-midnight">StoryBridge <span className="text-brand-gold text-[8px] uppercase tracking-widest ml-1">Invite Kit</span></span>
            <div className="px-3 py-1 bg-brand-midnight text-brand-gold text-[8px] font-bold rounded-full uppercase tracking-widest">Active</div>
         </div>
      </nav>

      <main className="max-w-xl mx-auto p-6 pt-12 pb-24">
        <header className="text-center mb-12">
          <Reveal delay={0.1}>
            <div className="w-20 h-20 bg-brand-midnight rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-2xl">🤝</div>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-3xl font-serif font-bold text-brand-midnight mb-4">Your Invite Kit is Ready, {memberName}.</h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-brand-slate font-light leading-relaxed">
              We've prepared everything you need to share this story with your friends. One tap to copy, one tap to send.
            </p>
          </Reveal>
        </header>

        <div className="space-y-12">
          {/* Share Preview Card */}
          <FadeIn delay={0.4}>
             <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-brand-midnight/5">
                <div className="aspect-video bg-brand-midnight relative overflow-hidden flex items-center justify-center">
                    <div className="text-5xl">🎞️</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                        <p className="text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-1">Previewing Story</p>
                        <p className="text-white font-serif text-lg font-bold">"Finding Peace in the Chaos"</p>
                    </div>
                </div>
                <div className="p-8">
                    <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mb-4">The Landing Page Message</p>
                    <p className="text-brand-midnight font-light italic leading-relaxed mb-6">
                        "Hey! {memberName} wanted you to see this story. They thought it might encourage you today."
                    </p>
                    <div className="flex items-center gap-3 p-4 bg-brand-parchment/50 rounded-2xl border border-brand-midnight/5">
                        <div className="w-10 h-10 rounded-full bg-brand-midnight flex items-center justify-center text-brand-gold font-bold text-xs">{memberName[0]}</div>
                        <div>
                            <p className="text-[10px] font-black text-brand-midnight uppercase tracking-widest">{memberName}</p>
                            <p className="text-[8px] text-brand-slate uppercase font-bold tracking-tighter">Personal Invitation Active</p>
                        </div>
                    </div>
                </div>
             </div>
          </FadeIn>

          {/* Quick Share Actions */}
          <div className="space-y-4">
             <FadeIn delay={0.5}>
                <button 
                  onClick={() => {
                    const text = `Hey! I was thinking of you. This story really reminded me of what we talked about. Check it out: https://demo.storybridge.io/invite/${params.member}/${params.slug}`;
                    navigator.clipboard.writeText(text);
                    alert('Invite message copied to clipboard!');
                  }}
                  className="w-full bg-brand-midnight text-brand-gold font-bold py-6 rounded-[2rem] text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-all"
                >
                   <span className="text-xl">💬</span> Copy SMS/WhatsApp Link
                </button>
             </FadeIn>

             <FadeIn delay={0.6}>
                <button 
                   className="w-full bg-white border-2 border-brand-midnight text-brand-midnight font-bold py-6 rounded-[2rem] text-xs uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-brand-parchment transition-all"
                >
                   <span className="text-xl">📸</span> Share to Instagram Stories
                </button>
             </FadeIn>
          </div>

          {/* Stats Bar */}
          <FadeIn delay={0.7}>
             <div className="bg-brand-midnight text-brand-parchment p-8 rounded-[2rem] flex justify-around items-center">
                <div className="text-center">
                    <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1">Clicks</p>
                    <p className="text-2xl font-serif font-bold">12</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                    <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1">Visits</p>
                    <p className="text-2xl font-serif font-bold">2</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                    <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1">Impact</p>
                    <p className="text-2xl font-serif font-bold text-brand-gold">Top 5%</p>
                </div>
             </div>
          </FadeIn>
        </div>

        <footer className="mt-16 text-center">
            <p className="text-[8px] font-bold text-brand-slate uppercase tracking-[0.3em] mb-4 opacity-40">Your Private Invite Dashboard</p>
            <Link href="/admin" className="text-[10px] font-bold text-brand-gold hover:text-brand-midnight transition-colors uppercase tracking-widest">Return to Launchpad</Link>
        </footer>
      </main>
    </div>
  );
}
