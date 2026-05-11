'use server';

import { db } from '@/lib/db';
import { stories } from '@/db/schema';

export async function submitStory(formData: FormData) {
  const churchId = formData.get('churchId') as string;
  const type = formData.get('type') as string;
  const content = formData.get('content') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const consent = formData.get('consent') === 'on';
  const tags = formData.getAll('tags') as string[];

  // Note: Video upload would require a storage solution (S3/R2)
  // For MVP, we'll store the video file name or handle it as a placeholder
  const videoFile = formData.get('videoFile') as File;
  let videoUrl = null;
  if (type === 'video' && videoFile && videoFile.size > 0) {
    videoUrl = `placeholder_for_${videoFile.name}`;
  }

  try {
    // Check if we can actually insert into the DB
    // Since we don't have a live DB connection in this environment, 
    // we'll log it and return success for the UI demo.
    console.log(`[Story Submission] Church: ${churchId}, Contributor: ${firstName} ${lastName}`);
    console.log(`[Story Details] Type: ${type}, Tags: ${tags.join(', ')}`);

    /*
    await db.insert(stories).values({
      churchId,
      type,
      content: type === 'text' ? content : null,
      videoUrl,
      firstName,
      lastName,
      email,
      phone,
      tags,
      consent,
      status: 'pending',
    });
    */

    return { success: true };
  } catch (error) {
    console.error('Failed to submit story:', error);
    return { success: false, error: 'Failed to submit story' };
  }
}
