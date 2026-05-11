import { ChMSIntegration, ChMSPerson } from './types';

export class CCBIntegration implements ChMSIntegration {
  private apiToken: string;

  constructor(config: { apiToken: string }) {
    this.apiToken = config.apiToken;
  }

  async getPeople(query: string): Promise<ChMSPerson[]> {
    console.log(`[CCB] Searching for people with query: ${query}`);
    return [];
  }

  async createPerson(person: ChMSPerson): Promise<ChMSPerson> {
    console.log(`[CCB] Creating person in CCB: ${person.firstName} ${person.lastName}`);
    return { ...person, id: 'ccb-new-id' };
  }

  async addNote(personId: string, note: string): Promise<void> {
    console.log(`[CCB] Adding note in CCB to person ${personId}: ${note}`);
  }

  async triggerWorkflow(personId: string, workflowId: string): Promise<void> {
    console.log(`[CCB] Triggering process ${workflowId} for person ${personId}`);
  }
}
