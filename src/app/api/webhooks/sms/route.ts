import { execute, query } from "@/lib/db";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const from = formData.get("From") as string; // E.164 format: +15551234567
  const body = formData.get("Body") as string;

  if (!from || !body) {
    return new Response("Missing parameters", { status: 400 });
  }

  const cleanPhone = from.replace(/\D/g, "");
  // Remove leading 1 if it exists and length is 11
  const searchPhone = (cleanPhone.length === 11 && cleanPhone.startsWith("1")) 
    ? cleanPhone.substring(1) 
    : cleanPhone;

  try {
    // 1. Find Guest by phone
    // Note: This matches the last 10 digits for better compatibility
    const guests = await query<any>(
      `SELECT * FROM guests WHERE phone LIKE '%${searchPhone.slice(-10)}' LIMIT 1`
    );

    if (guests.length > 0) {
      const guest = guests[0];
      
      // 2. Log inbound message
      const messageId = crypto.randomUUID();
      await execute(
        `INSERT INTO app_messages (id, guest_id, direction, content, sent_at)
         VALUES ('${messageId}', '${guest.id}', 'inbound', '${body.replace(/'/g, "''")}', '${new Date().toISOString()}')`
      );

      console.log(`[SMS Webhook] Received from ${guest.name} (${from}): ${body}`);
      
      // OPTIONAL: Auto-respond to keywords if needed, or just log
    } else {
      console.log(`[SMS Webhook] Received from unknown number ${from}: ${body}`);
    }

    // Twilio expects a TwiML response (empty is fine if we don't want to reply via webhook)
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("SMS Webhook failed:", error);
    return new Response("Internal Error", { status: 500 });
  }
}
