import CampaignCommandCenter from './CampaignCommandCenter';
import { db } from '@/lib/db';
import { stories } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export default async function CampaignsPage() {
  const churchId = 'demo-id';

  let initialStories: any[] = [];
  try {
    // In a real app:
    // initialStories = await db.select().from(stories).where(and(eq(stories.churchId, churchId), eq(stories.status, 'approved')));
  } catch (e) {}

  // Mock stories for demo
  if (initialStories.length === 0) {
    initialStories = [
      {
        id: '1',
        firstName: 'Sarah',
        lastName: 'Johnson',
        title: 'Finding Peace in Anxiety',
        tags: ['Anxiety', 'Peace'],
        thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400',
        type: 'video'
      },
      {
        id: '2',
        firstName: 'Michael',
        lastName: 'Smith',
        title: 'Restored Marriage',
        tags: ['Marriage', 'Healing'],
        thumbnail: 'https://images.unsplash.com/photo-1522673607200-164883efbfc1?auto=format&fit=crop&q=80&w=400',
        type: 'video'
      }
    ];
  }

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto">
      <CampaignCommandCenter initialStories={initialStories} />
    </div>
  );
}
