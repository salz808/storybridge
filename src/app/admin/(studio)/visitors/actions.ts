'use server';

import { db } from '@/lib/db';
import { personalizedVideos, visitors } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function sendPersonalizedVideo(visitorId: string, videoUrl: string) {
  const churchId = 'demo-id'; // In a real app, get from session

  try {
    // 1. Create the record in the database
    const result = await db.insert(personalizedVideos).values({
      churchId,
      visitorId,
      videoUrl,
      thumbnailUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400',
    }).returning({ id: personalizedVideos.id });

    // 2. Simulate SMS Sending
    console.log(`[SMS Simulation] To visitor ${visitorId}: Hi! I've made a quick video for your visit: https://demo-church.storybridge.io/v/${result[0].id}`);

    revalidatePath('/admin/visitors');
    return { success: true };
  } catch (e) {
    console.error("Failed to send personalized video", e);
    return { success: false, error: "Internal Server Error" };
  }
}

export async function markVideoAsWatched(videoId: string) {
  try {
    await db.update(personalizedVideos)
      .set({ watchedAt: new Date() })
      .where(eq(personalizedVideos.id, videoId));
    
    // In a real app, this would trigger a notification to the host
    console.log(`[Notification] Video ${videoId} has been watched by the visitor!`);
    
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}
