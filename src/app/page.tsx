'use client';

import React from 'react';
import { Reveal, FadeIn } from '@/components/premium/Reveal';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { motion } from 'framer-motion';

export default function SalesPage() {
  return (
    <div className="min-h-screen bg-brand-parchment text-brand-midnight selection:bg-brand-gold/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-brand-parchment/80 backdrop-blur-md border-b border-brand-midnight/5 px-8 py-6 flex justify-between items-center">
        <div className="text-2xl font-serif font-bold tracking-tighter text-brand-midnight">
          StoryBridge
        </div>
        <div className="hidden md:flex gap-12 text-sm font-sans font-medium uppercase tracking-widest text-brand-slate">
          <a href="#problem" className="hover:text-brand-gold transition-colors">The Gap</a>
          <a href="#solution" className="hover:text-brand-gold transition-colors">The Bridge</a>
          <a href="#pricing" className="hover:text-brand-gold transition-colors">Pricing</a>
        </div>
        <PremiumButton variant="outline" className="hidden md:block py-2 px-6 text-xs">
          Login
        </PremiumButton>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-24 px-8 md:pt-60 md:pb-40 premium-padding overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center luxury-spacing">
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-8xl leading-[1.1] mb-4">
              Transform Your Church from a <br className="hidden md:block" /> 
              <span className="italic">"Sunday Stop"</span> into a Place of <br className="hidden md:block" />
              <span className="gold-text">True Belonging.</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.3}>
            <p className="text-xl md:text-2xl max-w-3xl text-brand-slate font-light leading-relaxed">
              Stop losing visitors to the "Digital Gap." StoryBridge turns your congregation's authentic stories into a scalable outreach engine that attracts, welcomes, and retains the unchurched.
            </p>
          </Reveal>
          
          <Reveal delay={0.5}>
            <div className="flex flex-col md:flex-row gap-6 mt-4">
              <PremiumButton variant="primary">
                Begin Your Growth Journey
              </PremiumButton>
              <PremiumButton variant="secondary">
                Book a Private Demo
              </PremiumButton>
            </div>
            <p className="mt-6 text-xs font-sans uppercase tracking-[0.2em] text-brand-gold font-bold">
              Essential Growth Infrastructure | $400/mo
            </p>
          </Reveal>
        </div>

        {/* Decorative element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] -z-10 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.05)_0%,transparent_70%)] pointer-events-none" />
      </header>

      {/* Problem Section: The Ghosting Visitor */}
      <section id="problem" className="bg-brand-midnight text-brand-parchment premium-padding py-24 md:py-40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl mb-8 leading-tight">
              Why do 80% of your <br /> first-time guests <br /> <span className="text-brand-gold italic text-7xl md:text-8xl">never return?</span>
            </h2>
          </Reveal>
          
          <div className="luxury-spacing">
            <FadeIn delay={0.4}>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-brand-parchment/80">
                It's not your worship or your sermon. It's the <span className="text-brand-gold font-medium">"Social Anxiety Gap."</span> 
              </p>
              <p className="mt-8 text-lg text-brand-parchment/60 leading-relaxed">
                Walking into a new church is intimidating. StoryBridge bridges that gap by providing visitors with the stories of people just like them who found home here before they ever step through your doors.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Solution Section: Content Burden & StoryBox */}
      <section id="solution" className="premium-padding py-24 md:py-40 bg-brand-silk">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-brand-midnight/10 pb-12">
            <Reveal>
              <h2 className="text-4xl md:text-6xl max-w-2xl leading-tight">
                You have a thousand stories. <br />
                <span className="gold-text">Let's stop letting them go untold.</span>
              </h2>
            </Reveal>
            <FadeIn delay={0.3}>
              <div className="uppercase tracking-widest text-sm font-bold text-brand-gold mb-4">
                Automated Hospitality
              </div>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <Reveal delay={0.2}>
              <div>
                <h3 className="text-2xl font-serif mb-6 text-brand-midnight">The Content Burden</h3>
                <p className="text-brand-slate leading-relaxed">
                  Your communications director is burnt out. Most "marketing" feels fake. StoryBridge's <span className="text-brand-midnight font-bold">StoryBox</span> automates the collection of raw, powerful testimonies from your members.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div>
                <h3 className="text-2xl font-serif mb-6 text-brand-midnight">AI Matchmaking</h3>
                <p className="text-brand-slate leading-relaxed">
                  Our system vets stories with AI and places them exactly where a searching visitor needs to see them. It's follow-up that feels like a friend, not a machine.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Feature Section: Follow-up Burnout */}
      <section className="bg-brand-midnight text-brand-parchment py-24 md:py-40 overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 relative">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div className="order-2 lg:order-1">
               <Reveal>
                 <h2 className="text-4xl md:text-5xl mb-8 leading-tight">
                   Personal follow-up shouldn't require a 40-hour work week.
                 </h2>
                 <p className="text-xl text-brand-parchment/70 font-light leading-relaxed mb-12">
                   Scale your hospitality without losing your soul. Our AI Communication Assistant drafts personal, story-driven responses for your team, matching a visitor's specific needs with the exact testimony that will resonate with them.
                 </p>
                 <PremiumButton variant="outline">
                   Explore the AI Matchmaker
                 </PremiumButton>
               </Reveal>
             </div>
             
             <div className="order-1 lg:order-2 relative">
               <FadeIn>
                 <div className="aspect-square bg-gradient-to-br from-brand-gold/20 to-transparent rounded-3xl border border-brand-gold/10 p-8 flex items-center justify-center">
                    {/* Abstract placeholder for AI UI */}
                    <div className="w-full space-y-4">
                      <div className="h-4 bg-brand-gold/30 rounded-full w-3/4 animate-pulse" />
                      <div className="h-4 bg-brand-gold/20 rounded-full w-1/2 animate-pulse" />
                      <div className="h-4 bg-brand-gold/10 rounded-full w-5/6 animate-pulse" />
                    </div>
                 </div>
               </FadeIn>
             </div>
           </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="premium-padding py-24 md:py-40 flex flex-col items-center">
        <Reveal>
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl mb-6 font-serif underline decoration-brand-gold decoration-4 underline-offset-8">
              Essential Growth Infrastructure
            </h2>
            <p className="text-xl text-brand-slate uppercase tracking-widest mt-8 font-bold">
              $400 / Month
            </p>
          </div>
        </Reveal>

        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12">
          <FadeIn delay={0.2}>
            <div className="p-12 bg-white rounded-3xl shadow-2xl border border-brand-gold/10">
              <h3 className="text-2xl font-serif mb-8 text-brand-midnight">The Professional Tier</h3>
              <ul className="space-y-4 text-brand-slate mb-12">
                <li className="flex gap-4">
                  <span className="text-brand-gold font-bold">✓</span> Full StoryBox Syndication
                </li>
                <li className="flex gap-4">
                  <span className="text-brand-gold font-bold">✓</span> AI Matchmaker & Drafts
                </li>
                <li className="flex gap-4">
                  <span className="text-brand-gold font-bold">✓</span> Unlimited Visitor Journeys
                </li>
                <li className="flex gap-4">
                  <span className="text-brand-gold font-bold">✓</span> Dedicated Success Partner
                </li>
              </ul>
              <PremiumButton className="w-full">Get Started</PremiumButton>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
             <div className="p-12 flex flex-col justify-center luxury-spacing">
               <h3 className="text-3xl italic font-serif text-brand-midnight">
                 "If StoryBridge helps you retain just two more families this year, the platform has already paid for itself."
               </h3>
               <p className="text-brand-slate font-sans uppercase tracking-[0.2em] text-xs font-bold">
                 Value over Utility. Impact over Efficiency.
               </p>
             </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-midnight text-brand-parchment/40 py-24 px-8 border-t border-brand-gold/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-2xl font-serif font-bold text-brand-parchment">
            StoryBridge
          </div>
          <div className="flex gap-12 text-xs uppercase tracking-widest">
            <a href="#" className="hover:text-brand-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Contact</a>
          </div>
          <div className="text-xs">
            © 2026 StoryBridge. Built for the Kingdom.
          </div>
        </div>
      </footer>
    </div>
  );
}
