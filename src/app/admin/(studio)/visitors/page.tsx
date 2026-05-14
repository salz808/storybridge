import { db } from '@/lib/db';
import { visitors, personalizedVideos, stories } from '@/db/schema';
import { desc, eq, and } from 'drizzle-orm';
import VisitorListClient from './VisitorListClient';
import { Reveal } from '@/components/premium/Reveal';
import { matchVisitorToStory } from '@/lib/ai';

export default async function VisitorsPage() {
  const churchId = 'demo-id'; // In a real app, get from session

  let initialVisitors: any[] = [];
  try {
    // initialVisitors = await db.select().from(visitors).where(eq(visitors.churchId, churchId)).orderBy(desc(visitors.createdAt));
  } catch (e) {
    console.error("Failed to fetch visitors", e);
  }

  // Fallback mock data for demo
  if (initialVisitors.length === 0) {
    initialVisitors = [
      {
        id: 'v1',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.j@example.com',
        phone: '555-0123',
        visitDate: '2026-05-17',
        kidsInfo: '2 kids (ages 5 and 7)',
        needs: 'I have been struggling with a lot of anxiety lately and I am looking for a community that offers peace.',
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'v2',
        firstName: 'Mark',
        lastName: 'Davis',
        email: 'mark.d@example.com',
        phone: '555-0456',
        visitDate: '2026-05-17',
        kidsInfo: 'None',
        needs: 'Looking for purpose after career change.',
        status: 'pending',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ];
  }

  // Fetch approved stories for the matchmaker
  let approvedStories: any[] = [];
  try {
    // approvedStories = await db.select().from(stories).where(and(eq(stories.churchId, churchId), eq(stories.status, 'approved')));
  } catch (e) {
    console.error("Failed to fetch stories", e);
  }

  // Fallback stories for demo
  if (approvedStories.length === 0) {
    approvedStories = [
      { id: 's1', firstName: 'Michael', lastName: 'Smith', transcript: 'Our marriage was on the rocks, but the Marriage Intensive changed everything for us.', tags: ['Marriage', 'Healing'] },
      { id: 's2', firstName: 'Emily', lastName: 'White', transcript: 'I found such peace here after months of dealing with crippling anxiety.', tags: ['Anxiety', 'Peace'] },
      { id: 's3', firstName: 'David', lastName: 'Wilson', content: 'Finding my purpose after retirement was hard. Serving in the Outreach team gave me a new mission.', tags: ['Purpose'] },
    ];
  }

  // Run matchmaker for each visitor
  const visitorsWithMatches = await Promise.all(initialVisitors.map(async (visitor) => {
    const match = await matchVisitorToStory(visitor.firstName, visitor.needs || '', approvedStories);
    const story = match ? approvedStories.find(s => s.id === match.storyId) : null;
    return {
      ...visitor,
      aiMatch: story ? {
        storyId: story.id,
        storyName: `${story.firstName}'s Story`,
        reasoning: match?.reasoning,
        suggestedDraft: match?.suggestedDraft
      } : null
    };
  }));

  // Fetch videos to show sent status
  let sentVideos: any[] = [];
  try {
    // sentVideos = await db.select().from(personalizedVideos).where(eq(personalizedVideos.churchId, churchId));
  } catch (e) {
    console.error("Failed to fetch videos", e);
  }

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      <header className="mb-12 border-b border-brand-midnight/5 pb-8 flex justify-between items-end">
        <div>
          <Reveal delay={0.1}>
            <h1 className="text-4xl font-serif font-bold text-brand-midnight mb-2">Visitor Pipeline</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-brand-slate font-light uppercase tracking-widest text-xs">Closing the hospitality gap with human connection</p>
          </Reveal>
        </div>
      </header>

      <VisitorListClient initialVisitors={visitorsWithMatches} sentVideos={sentVideos} />
    </div>
  );
}
