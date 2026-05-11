import { inngest } from "./client";

export const preVisitFollowUp = inngest.createFunction(
  { 
    id: "pre-visit-follow-up",
    triggers: [{ event: "visitor/planned-visit" }]
  },
  async ({ event, step }) => {
    const { visitorName, churchName, hostName, phone, email, serviceTime } = event.data as {
      visitorName: string;
      churchName: string;
      hostName: string;
      phone: string;
      email: string;
      serviceTime: string;
    };

    // 1. Immediate SMS Confirmation
    await step.run("send-immediate-sms", async () => {
      console.log(`[SMS to ${phone}]: Hi ${visitorName}! This is ${hostName} from ${churchName}. I just saw you planned a visit for this Sunday—we're so excited to meet you! I'll be at the 'New Here' area in the lobby to show you around. Do you have any questions I can answer for you today?`);
      return { success: true };
    });

    // 2. Wait 24 hours for "What to Expect" Email
    await step.sleep("wait-24h", "24h");

    await step.run("send-24h-email", async () => {
      console.log(`[Email to ${email}]: Subject: ☕ Coffee is on us this Sunday, ${visitorName}!
Hi ${visitorName}, We know visiting a new church can be a little intimidating... [What to Expect Guide copy from templates] ...Best, ${hostName}, ${churchName}`);
      return { success: true };
    });

    // 3. Wait until Saturday 10:00 AM before the visit
    await step.sleep("wait-for-saturday", "24h");

    await step.run("send-saturday-reminder", async () => {
      console.log(`[SMS to ${phone}]: Hey ${visitorName}, it's ${hostName}! Just a reminder that we'll see you tomorrow at ${serviceTime}. Don't forget—guest parking is right up front with the orange flags. See you then!`);
      return { success: true };
    });
  }
);
