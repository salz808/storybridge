'use server';

import { db } from '@/lib/db';
import { visitors } from '@/db/schema';
import { inngest } from '@/lib/inngest/client';

export async function submitPlanVisit(formData: FormData) {
  const churchId = formData.get('churchId') as string;
  const churchName = formData.get('churchName') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const visitDate = formData.get('visitDate') as string;
  const kidsInfo = formData.get('kidsInfo') as string;

  try {
    // In a real app with a working DB:
    /*
    await db.insert(visitors).values({
      churchId,
      firstName,
      lastName,
      email,
      phone,
      visitDate,
      kidsInfo,
    });
    */

    // Mocking the DB insert for now since we're in a bootstrap phase
    console.log(`[PYV Submission] Church: ${churchName}, Visitor: ${firstName} ${lastName}, Phone: ${phone}`);
    
    // Trigger the automated follow-up workflow
    await inngest.send({
      name: "visitor/planned-visit",
      data: {
        visitorName: firstName,
        churchName: churchName,
        hostName: "Church Host", // In a real app, this would be an assigned host from the DB
        phone: phone,
        email: email,
        serviceTime: "10:00 AM", // In a real app, this would be a selected service time
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to submit plan your visit:', error);
    return { success: false };
  }
}
