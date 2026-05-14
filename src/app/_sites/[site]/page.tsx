import { db } from '@/lib/db';
import { churches } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import PlanYourVisitForm from './PlanYourVisitForm';
import { Reveal, FadeIn } from '@/components/premium/Reveal';
import { PremiumButton } from '@/components/ui/PremiumButton';

export default async function TenantLandingPage({ params }: { params: Promise<{ site: string }> }) {
  const { site } = await params;

  let church;
  try {
    const results = await db.select().from(churches).where(eq(churches.slug, site));
    church = results[0];
  } catch (e) {
    console.error("Failed to fetch church from DB, using fallback", e);
  }

  if (!church && site !== 'demo') {
    church = {
      id: 'demo-id',
      name: 'Grace Community Church',
      slug: 'demo',
      logoUrl: null,
      parkingTitle: 'Arriving & Parking',
      parkingDescription: 'We’ve saved a spot for you! As you pull into the campus, look for our Guest Parking signs. They are located right near the main entrance to make your walk as short as possible.',
      enteringTitle: 'Entering the Building',
      enteringDescription: 'From the moment you walk through the doors, you\'ll be greeted by a friendly face. Head straight to the \'New Here\' area in the center of the lobby—that’s our home base for guests.',
      kidsTitle: 'Kids Check-In',
      kidsDescription: 'Your kids are going to love it here! Follow the signs to the Kids Wing. Our background-checked volunteers will help you check them in securely and show them to their room.',
      seatingTitle: 'Finding a Seat',
      seatingDescription: 'Grab a free cup of coffee in the lobby and head into the auditorium. There are no \'assigned\' seats—feel free to sit anywhere you feel comfortable.',
    };
  } else if (!church) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-brand-parchment text-brand-midnight selection:bg-brand-gold/30">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-brand-parchment/80 backdrop-blur-md border-b border-brand-midnight/5 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-xl font-serif font-bold tracking-tight uppercase">{church.name}</h1>
          <a href="#plan-visit">
            <PremiumButton variant="primary" className="py-2 px-6 text-xs">
              Plan Your Visit
            </PremiumButton>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden premium-padding">
        <div className="absolute inset-0 bg-brand-midnight opacity-5 z-0"></div>
        <div className="relative z-10 text-center max-w-4xl luxury-spacing">
          <Reveal delay={0.1}>
            <h2 className="text-6xl md:text-8xl font-serif mb-6 leading-tight">
              You <span className="italic underline decoration-brand-gold decoration-4 underline-offset-8">Belong</span> Here.
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-xl md:text-2xl font-light text-brand-slate leading-relaxed">
              Experience community, purpose, and faith at {church.name}. <br /> We can't wait to meet you this Sunday.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="mt-8">
               <a href="#plan-visit">
                 <PremiumButton variant="secondary">
                   Schedule Your First Visit
                 </PremiumButton>
               </a>
            </div>
          </Reveal>
        </div>
        
        {/* Abstract background decorative element */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-midnight/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Parking to Pew Section */}
      <section className="py-32 md:py-48 bg-white border-y border-brand-midnight/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight">
                What to Expect <br />
                <span className="text-brand-gold italic">Your first 15 minutes.</span>
              </h2>
            </Reveal>
            <FadeIn delay={0.4}>
              <p className="text-brand-slate max-w-md font-light leading-relaxed">
                We know visiting a new place can be intimidating. Here is exactly what happens when you step onto our campus.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { num: '01', title: church.parkingTitle, desc: church.parkingDescription },
              { num: '02', title: church.enteringTitle, desc: church.enteringDescription },
              { num: '03', title: church.kidsTitle, desc: church.kidsDescription },
              { num: '04', title: church.seatingTitle, desc: church.seatingDescription }
            ].map((step, i) => (
              <Reveal key={step.num} delay={0.1 * (i + 1)}>
                <div className="group">
                  <div className="text-4xl font-serif text-brand-gold/30 mb-6 group-hover:text-brand-gold transition-colors duration-500">{step.num}</div>
                  <h3 className="text-xl font-bold mb-4 tracking-tight uppercase">{step.title}</h3>
                  <p className="text-brand-slate leading-relaxed font-light">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="plan-visit" className="py-32 md:py-48 bg-brand-parchment">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-brand-midnight text-brand-parchment p-12 md:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            
            <div className="relative z-10">
              <Reveal>
                <h2 className="text-4xl md:text-6xl font-serif mb-6 text-center">Plan Your Visit</h2>
                <p className="text-brand-parchment/60 text-center mb-16 text-lg font-light max-w-2xl mx-auto leading-relaxed text-balance">
                  Let us know you're coming and we'll have a host waiting to welcome you and show you around!
                </p>
              </Reveal>
              
              <FadeIn delay={0.4}>
                <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
                  <PlanYourVisitForm churchId={church.id} churchName={church.name} />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 md:py-48 bg-white overflow-hidden">
        <div className="container mx-auto px-6 text-center max-w-4xl relative luxury-spacing">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight text-balance">
              Your Story <span className="gold-text italic">Matters.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-xl text-brand-slate mb-12 leading-relaxed font-light text-balance">
              Has God moved in your life through this community? We believe that your story is the greatest outreach tool we have. Share it today.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <a href={`/submit`}>
              <PremiumButton variant="outline" className="px-12 py-5">
                Share My Story
              </PremiumButton>
            </a>
          </Reveal>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] -z-10 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.03)_0%,transparent_70%)] pointer-events-none" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-midnight text-brand-parchment/40 py-24 px-8 border-t border-brand-gold/10">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-12 text-sm uppercase tracking-widest">
          <div className="font-serif font-bold text-brand-parchment text-lg">
            {church.name}
          </div>
          <div className="flex gap-12">
            <a href="#" className="hover:text-brand-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Contact</a>
          </div>
          <div>
            © {new Date().getFullYear()} {church.name}. Powered by StoryBridge.
          </div>
        </div>
      </footer>
    </div>
  );
}
