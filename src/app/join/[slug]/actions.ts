"use server";

import { execute, query } from "@/lib/db";
import { getNextDayOfWeek } from "@/lib/date-utils";
import crypto from "crypto";

export async function submitConnection(formData: FormData) {
  const churchId = formData.get("churchId") as string;
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const prayer = formData.get("prayer") as string;

  if (!name || !phone) {
    return { success: false, error: "Name and Phone are required." };
  }

  // Basic phone validation (could be more robust)
  const cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.length < 10) {
    return { success: false, error: "Please enter a valid phone number." };
  }

  const guestId = crypto.randomUUID();
  const joinedAt = new Date().toISOString();
  const nextSequenceAt = getNextDayOfWeek(2).toISOString(); // First Tuesday

  try {
    // 1. Save Guest
    await execute(
      `INSERT INTO guests (id, church_id, name, phone, prayer_request, joined_at, status, last_sequence_index, next_sequence_at) 
       VALUES ('${guestId}', '${churchId}', '${name.replace(/'/g, "''")}', '${cleanPhone}', '${prayer?.replace(/'/g, "''") || ""}', '${joinedAt}', 'active', 0, '${nextSequenceAt}')`
    );

    // 2. Fetch Church Info for the message
    const churches = await query<any>(`SELECT * FROM churches WHERE id = '${churchId}'`);
    const church = churches[0];

    // 3. Trigger Auto-Reply (Instant)
    const messageContent = `Hi ${name.split(" ")[0]}, welcome to ${church.name}! We are so glad you joined us today. We've received your prayer request and our team is already praying for you. We'll be in touch soon!`;
    
    // Log outbound message
    const messageId = crypto.randomUUID();
    await execute(
      `INSERT INTO app_messages (id, guest_id, direction, content, sent_at)
       VALUES ('${messageId}', '${guestId}', 'outbound', '${messageContent.replace(/'/g, "''")}', '${new Date().toISOString()}')`
    );

    // TODO: Actually send SMS via Twilio here
    console.log(`[SMS] Sending to ${cleanPhone}: ${messageContent}`);

    return { success: true };
  } catch (error) {
    console.error("Failed to submit connection:", error);
    return { success: false, error: "Database error occurred." };
  }
}
