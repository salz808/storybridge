import { db } from '@/lib/db';
import { churches } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import StorySubmissionForm from './StorySubmissionForm';

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
    <div className="min-h-screen bg-blue-900 flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-white text-4xl font-extrabold mb-4 uppercase tracking-wider">Share Your Story</h1>
          <p className="text-blue-100 text-lg">
            What is God doing in your life at {finalChurch.name}? Your story could be the bridge that helps someone else find faith.
          </p>
        </div>

        <div className="bg-blue-950 p-8 md:p-12 rounded-3xl shadow-2xl border border-blue-800">
          <StorySubmissionForm churchId={finalChurch.id} churchName={finalChurch.name} />
        </div>

        <div className="mt-12 text-center text-blue-300 text-sm">
          <p>&copy; {new Date().getFullYear()} {finalChurch.name}. Powered by StoryBridge.</p>
        </div>
      </div>
    </div>
  );
}
