import { execute, query } from "@/lib/db";
import { getNextDayOfWeek } from "@/lib/date-utils";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const now = new Date().toISOString();
  
  try {
    // 1. Find guests due for the next message
    const guests = await query<any>(
      `SELECT g.*, c.name as church_name, c.pastor_name, c.welcome_video_url, c.small_group_url 
       FROM guests g 
       JOIN churches c ON g.church_id = c.id 
       WHERE g.status = 'active' AND g.next_sequence_at <= '${now}'`
    );

    for (const guest of guests) {
      let content = "";
      let nextIndex = guest.last_sequence_index + 1;
      let nextAt = null;

      if (nextIndex === 1) {
        // Week 1: Welcome Video
        content = `Hey ${guest.name.split(" ")[0]}, Pastor ${guest.pastor_name} here! I wanted to send a quick personal welcome. Check out this 1-minute video to see what we're all about: ${guest.welcome_video_url}. Hope to see you next Sunday!`;
        nextAt = getNextDayOfWeek(2, new Date(guest.next_sequence_at)).toISOString(); // Next Tuesday
      } else if (nextIndex === 2) {
        // Week 2: Conversation Request
        content = `Hi ${guest.name.split(" ")[0]}, we're still thinking about you at ${guest.church_name}! Would you like to have a quick call or coffee with one of our leaders this week? Reply YES if you'd like to chat!`;
        nextAt = getNextDayOfWeek(2, new Date(guest.next_sequence_at)).toISOString(); // Next Tuesday
      } else if (nextIndex === 3) {
        // Week 3: Community Invitation
        content = `Hi ${guest.name.split(" ")[0]}, community is what we do best here. We have local small groups meeting this week and we'd love for you to visit one. Reply GROUP and I'll send you the list: ${guest.small_group_url}`;
        // End of sequence
      }

      if (content) {
        // Log outbound message
        const messageId = crypto.randomUUID();
        await execute(
          `INSERT INTO app_messages (id, guest_id, direction, content, sent_at)
           VALUES ('${messageId}', '${guest.id}', 'outbound', '${content.replace(/'/g, "''")}', '${new Date().toISOString()}')`
        );

        // Update guest
        if (nextAt) {
          await execute(
            `UPDATE guests SET last_sequence_index = ${nextIndex}, next_sequence_at = '${nextAt}' WHERE id = '${guest.id}'`
          );
        } else {
          await execute(
            `UPDATE guests SET last_sequence_index = ${nextIndex}, status = 'completed' WHERE id = '${guest.id}'`
          );
        }

        console.log(`[SMS Drip] Sent to ${guest.phone}: ${content}`);
      }
    }

    return NextResponse.json({ processed: guests.length });
  } catch (error) {
    console.error("Cron job failed:", error);
    return NextResponse.json({ error: "Failed to process sequences" }, { status: 500 });
  }
}
