'use server';

import { db } from '@/lib/db';
import { churches } from '@/db/schema';
import { redirect } from 'next/navigation';

export async function registerChurch(formData: FormData) {
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const logoUrl = formData.get('logoUrl') as string;

  try {
    // In a real app with working DB:
    /*
    await db.insert(churches).values({
      name,
      slug,
      logoUrl,
      // Default descriptions from templates
      parkingDescription: 'We’ve saved a spot for you! As you pull into the campus, look for our Guest Parking signs. They are located right near the main entrance to make your walk as short as possible.',
      enteringDescription: 'From the moment you walk through the doors, you\'ll be greeted by a friendly face. Head straight to the \'New Here\' area in the center of the lobby—that’s our home base for guests, and we have a small gift for you there!',
      kidsDescription: 'Your kids are going to love it here! Follow the signs to the Kids Wing. Our background-checked volunteers will help you check them in securely, give you a matching claim tag, and show them to their age-appropriate room.',
      seatingDescription: 'Grab a free cup of coffee in the lobby and head into the auditorium. There are no \'assigned\' seats—feel free to sit anywhere you feel comfortable. If you need help finding a spot, our ushers are happy to assist!',
    });
    */
    
    console.log(`[Church Registration] Name: ${name}, Slug: ${slug}`);
    
    // Redirect to the new subdomain (mocked)
    // redirect(`http://${slug}.storybridge.com`);
    
    return { success: true, slug };
  } catch (error) {
    console.error('Failed to register church:', error);
    return { success: false, error: 'Failed to register church' };
  }
}
