'use server';

import { db } from '@/lib/db';
import { prayerRequests, stories } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { matchVisitorToStory } from '@/lib/ai';
import { eq, and } from 'drizzle-orm';

export async function submitPrayerRequest(formData: {
  firstName: string;
  email: string;
  request: string;
}) {
  const churchId = 'demo-id'; // Demo church

  try {
    // 1. Fetch approved stories for this church to match against
    const churchStories = await db.query.stories.findMany({
      where: and(
        eq(stories.churchId, churchId),
        eq(stories.status, 'approved')
      )
    });

    // 2. Get AI match
    const aiMatch = await matchVisitorToStory(
        formData.firstName,
        formData.request,
        churchStories.map(s => ({
            id: s.id,
            firstName: s.firstName,
            tags: s.tags as string[] || [],
            transcript: s.transcript || '',
            content: s.content || ''
        }))
    );

    // 3. Insert into database
    const [result] = await db.insert(prayerRequests).values({
      churchId,
      firstName: formData.firstName,
      email: formData.email,
      request: formData.request,
      aiSummary: aiMatch?.reasoning || 'General prayer request.',
      matchedStoryId: aiMatch?.storyId,
      status: 'pending',
    }).returning({ id: prayerRequests.id });

    // 4. Revalidate admin views
    revalidatePath('/admin/prayer');
    
    return { 
      success: true, 
      requestId: result.id,
      match: aiMatch 
    };
  } catch (e) {
    console.error("Failed to submit prayer request", e);
    return { success: false, error: "Internal Server Error" };
  }
}

export async function markAsPrayed(requestId: string) {
  try {
    await db.update(prayerRequests)
      .set({ status: 'prayed' })
      .where(eq(prayerRequests.id, requestId));
    
    console.log(`[Notification] Staff marked prayer request ${requestId} as PRAYED.`);
    revalidatePath('/admin/prayer');
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}
