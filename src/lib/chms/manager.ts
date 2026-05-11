import { ChMSProvider, ChMSIntegration, ChMSPerson } from './types';
import { PCOIntegration } from './pco';
import { CCBIntegration } from './ccb';
import { db } from '@/lib/db';
import { chmsSettings, syncLogs } from '@/db/schema';
import { eq } from 'drizzle-orm';

export class ChMSManager {
  static async getIntegration(churchId: string): Promise<ChMSIntegration | null> {
    const settings = await db.select().from(chmsSettings).where(eq(chmsSettings.churchId, churchId));
    if (!settings.length) return null;

    const { provider, config } = settings[0];
    if (provider === 'pco') return new PCOIntegration(config as any);
    if (provider === 'ccb') return new CCBIntegration(config as any);
    return null;
  }

  static async syncActivity(
    churchId: string,
    person: ChMSPerson,
    entityType: 'visitor' | 'story',
    entityId: string
  ) {
    const integration = await this.getIntegration(churchId);
    if (!integration) return { status: 'no_integration' };

    try {
      // 1. Match by Email
      let people = await integration.getPeople(person.email);
      let match = people.find(p => p.email.toLowerCase() === person.email.toLowerCase());

      // 2. Match by Phone
      if (!match && person.phone) {
        people = await integration.getPeople(person.phone);
        match = people.find(p => p.phone === person.phone);
      }

      if (match) {
        await integration.addNote(match.id!, `StoryBridge Activity (${entityType}): ${entityId}`);
        return { status: 'success', personId: match.id, matched: true };
      }

      // 3. Fuzzy/Manual Review check (simplified)
      people = await integration.getPeople(person.lastName);
      const fuzzy = people.find(p => p.firstName.toLowerCase() === person.firstName.toLowerCase());
      
      if (fuzzy) {
        return { status: 'manual_review', personId: fuzzy.id };
      }

      // 4. Create New
      const newPerson = await integration.createPerson(person);
      
      // Trigger mapping if exists
      const settings = await db.select().from(chmsSettings).where(eq(chmsSettings.churchId, churchId));
      const mappings = settings[0].mappings as any;
      const workflowId = mappings?.[entityType];
      if (workflowId) {
        await integration.triggerWorkflow(newPerson.id!, workflowId);
      }

      return { status: 'success', personId: newPerson.id, matched: false };
    } catch (error: any) {
      console.error('ChMS Sync Error:', error);
      return { status: 'error', error: error.message };
    }
  }
}
