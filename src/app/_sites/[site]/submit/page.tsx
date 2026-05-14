import { db } from '@/lib/db';
import { churches } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import StorySubmissionForm from './StorySubmissionForm';
import { Reveal, FadeIn } from '@/components/premium/Reveal';

export default async function SubmitStoryPage({ params }: { params: Promise<{ site: string }> }) {
  const { site } = await params;

  let church;
  try {
    const results = await db.select().from(churches).where(eq(churches.slug, site));
    church = results[0];
  } catch (e) {
    console.error("Failed to fetch church from DB", e);
  }

  if (!church && site !== 'demo') {
    return notFound();
  }

  const finalChurch = church || {
    id: 'demo-id',
    name: 'Grace Community Church',
    slug: 'demo',
  };

  return (
    <div className="min-h-screen bg-brand-parchment flex flex-col items-center py-24 px-6 selection:bg-brand-gold/30">
      <div className="max-w-3xl w-full luxury-spacing">
        <div className="text-center mb-16">
          <Reveal delay={0.1}>
            <h1 className="text-brand-midnight text-4xl md:text-6xl font-serif mb-6 leading-tight text-balance">
              Share Your <span className="italic underline decoration-brand-gold decoration-4 underline-offset-8">Story.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-brand-slate text-lg md:text-xl font-light leading-relaxed text-balance">
              What is God doing in your life at {finalChurch.name}? Your story could be the bridge that helps someone else find faith.
            </p>
          </Reveal>
        </div>

        <FadeIn delay={0.5}>
          <div className="bg-white p-8 md:p-16 rounded-[2.5rem] shadow-2xl border border-brand-midnight/5 relative overflow-hidden">
             {/* Background Texture */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
             
             <div className="relative z-10">
               <StorySubmissionForm churchId={finalChurch.id} churchName={finalChurch.name} />
             </div>
          </div>
        </FadeIn>

        <div className="mt-16 text-center text-brand-slate/40 text-xs uppercase tracking-[0.2em] font-bold">
          <p>&copy; {new Date().getFullYear()} {finalChurch.name}. Powered by StoryBridge.</p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="fixed -bottom-40 -left-40 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-brand-midnight/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
