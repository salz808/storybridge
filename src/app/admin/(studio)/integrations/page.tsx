import { db } from '@/lib/db';
import { chmsSettings, syncLogs } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import IntegrationClient from './IntegrationClient';
import { Reveal } from '@/components/premium/Reveal';

export default async function IntegrationsPage() {
  const churchId = 'demo-id'; // In a real app, get from session

  let settings;
  let logs: any[] = [];

  try {
    const settingsResult = await db.select().from(chmsSettings).where(eq(chmsSettings.churchId, churchId));
    settings = settingsResult[0] || null;

    logs = await db.select().from(syncLogs)
      .where(eq(syncLogs.churchId, churchId))
      .orderBy(desc(syncLogs.createdAt))
      .limit(20);
  } catch (e) {
    console.error("Failed to fetch integration data", e);
    settings = null;
    logs = [];
  }

  // Fallback logs for demo
  if (logs.length === 0) {
    logs = [
      { id: '1', entityType: 'visitor', entityId: 'v1', status: 'success', details: 'Matched by email', provider: 'pco', createdAt: new Date().toISOString() },
      { id: '2', entityType: 'story', entityId: 's1', status: 'manual_review', details: 'Fuzzy match found: Sarah Johnson', provider: 'pco', createdAt: new Date(Date.now() - 3600000).toISOString() },
      { id: '3', entityType: 'visitor', entityId: 'v2', status: 'error', details: 'Invalid API Key', provider: 'ccb', createdAt: new Date(Date.now() - 86400000).toISOString() },
    ];
  }

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      <header className="mb-12 border-b border-brand-midnight/5 pb-8">
        <Reveal delay={0.1}>
          <h1 className="text-4xl font-serif font-bold text-brand-midnight mb-2">Intelligence Sync</h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-brand-slate font-light uppercase tracking-widest text-xs">Architecting the bi-directional stream</p>
        </Reveal>
      </header>

      <IntegrationClient initialSettings={settings} logs={logs} />
    </div>
  );
}
