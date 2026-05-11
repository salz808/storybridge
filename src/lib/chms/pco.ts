import { ChMSIntegration, ChMSPerson } from './types';

export class PCOIntegration implements ChMSIntegration {
  private apiKey: string;

  constructor(config: { apiKey: string }) {
    this.apiKey = config.apiKey;
  }

  async getPeople(query: string): Promise<ChMSPerson[]> {
    console.log(`[PCO] Searching for people with query: ${query}`);
    // Mock implementation
    return [];
  }

  async createPerson(person: ChMSPerson): Promise<ChMSPerson> {
    console.log(`[PCO] Creating new person: ${person.firstName} ${person.lastName}`);
    return { ...person, id: 'pco-new-id' };
  }

  async addNote(personId: string, note: string): Promise<void> {
    console.log(`[PCO] Adding note to person ${personId}: ${note}`);
  }

  async triggerWorkflow(personId: string, workflowId: string): Promise<void> {
    console.log(`[PCO] Adding person ${personId} to workflow ${workflowId}`);
  }
}
