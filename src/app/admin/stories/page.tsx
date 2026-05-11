import StoryAdminClient from './StoryAdminClient';
import { db } from '@/lib/db';
import { stories } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function StoryAdminPage() {
  // In a real app, we'd get the churchId from the session/auth
  const churchId = 'demo-id'; 

  let initialStories: any[] = [];
  try {
    // initialStories = await db.select().from(stories).where(eq(stories.churchId, churchId));
  } catch (e) {
    console.error("Failed to fetch stories", e);
  }

  // Fallback mock data for demo
  if (initialStories.length === 0) {
    initialStories = [
      {
        id: '1',
        type: 'text',
        firstName: 'Sarah',
        lastName: 'Johnson',
        content: 'I was struggling with so much anxiety about my career until I found the community at Grace. The support and prayer I received helped me find peace...',
        status: 'pending',
        tags: ['Anxiety', 'Community'],
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        type: 'video',
        firstName: 'Michael',
        lastName: 'Smith',
        videoUrl: 'https://example.com/video1.mp4',
        transcript: 'Our marriage was on the rocks, but the Marriage Intensive changed everything for us. We learned how to communicate again and put God at the center...',
        status: 'approved',
        tags: ['Marriage', 'Healing'],
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: '3',
        type: 'text',
        firstName: 'David',
        lastName: 'Wilson',
        content: 'Finding my purpose after retirement was hard. Serving in the Outreach team gave me a new mission...',
        status: 'featured',
        tags: ['Purpose', 'Outreach'],
        createdAt: new Date(Date.now() - 172800000).toISOString(),
      }
    ];
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">StoryBox Dashboard</h1>
          <p className="text-gray-500 text-lg">Review and manage life-change stories</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition">
            Export Stories
          </button>
        </div>
      </div>

      <StoryAdminClient initialStories={initialStories} />
    </div>
  );
}
