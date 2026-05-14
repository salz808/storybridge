'use server';

import { db } from '@/lib/db';
import { stories } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function processSermon(url: string) {
  console.log(`[Sermon Studio] Starting processing for: ${url}`);
  
  // Simulate heavy processing time
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Simulated AI clips extracted from the sermon
  const mockClips = [
    {
      id: 'clip-1',
      title: 'Finding Hope in the Valley',
      summary: 'A powerful illustration about trusting God during financial hardship.',
      startTime: '12:45',
      endTime: '14:20',
      funnelStage: 'Discovery',
      transcript: 'I remember a time when our bank account was empty, but our hearts were full. God provided in ways we couldn\'t imagine...',
      tags: ['Hope', 'Finances', 'Trust']
    },
    {
      id: 'clip-2',
      title: 'The Power of Community',
      summary: 'Pastor David shares why "lone wolf" Christianity doesn\'t work.',
      startTime: '25:10',
      endTime: '26:45',
      funnelStage: 'Belonging',
      transcript: 'We weren\'t meant to walk this path alone. The church isn\'t a building, it\'s the people around you right now...',
      tags: ['Community', 'Belonging', 'Faith']
    },
    {
      id: 'clip-3',
      title: 'Next Steps for Newcomers',
      summary: 'A clear invitation to join a Small Group this fall.',
      startTime: '38:00',
      endTime: '39:15',
      funnelStage: 'Impact',
      transcript: 'If you\'re new here, we want to help you find your people. Join us this Wednesday for our Small Group kickoff...',
      tags: ['Groups', 'Welcome', 'Next Steps']
    }
  ];

  return {
    success: true,
    clips: mockClips
  };
}

export async function publishClipToStoryBox(clipData: any) {
  const churchId = 'demo-id';

  try {
    await db.insert(stories).values({
      churchId,
      type: 'video',
      firstName: 'Pastor David', // Mocking the speaker
      lastName: '(Sermon)',
      email: 'office@grace.org',
      content: clipData.summary,
      transcript: clipData.transcript,
      tags: clipData.tags,
      status: 'approved',
      videoUrl: 'https://example.com/sermon-clip.mp4', // Mock URL
      consent: true,
    });

    revalidatePath('/admin/stories');
    return { success: true };
  } catch (e) {
    console.error("Failed to publish clip", e);
    return { success: false };
  }
}
