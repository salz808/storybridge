export type ChMSProvider = 'pco' | 'ccb';

export interface ChMSPerson {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface ChMSIntegration {
  getPeople(query: string): Promise<ChMSPerson[]>;
  createPerson(person: ChMSPerson): Promise<ChMSPerson>;
  addNote(personId: string, note: string): Promise<void>;
  triggerWorkflow(personId: string, workflowId: string): Promise<void>;
}
