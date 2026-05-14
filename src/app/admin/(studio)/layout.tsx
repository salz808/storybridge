'use client';

import { AdminNavbar } from '@/components/admin/AdminNavbar';

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-parchment/30 selection:bg-brand-gold/30">
      <AdminNavbar />
      <main>
        {children}
      </main>
    </div>
  );
}
