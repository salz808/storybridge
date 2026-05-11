'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const showWelcome = searchParams.get('welcome') === 'true';

  const [checklist, setChecklist] = useState([
    { id: 1, label: 'Launch your first PYV Page', completed: true },
    { id: 2, label: 'Invite 2 more team members (Admin, Communications)', completed: false },
    { id: 3, label: 'Collect your first story in the StoryBox', completed: false },
    { id: 4, label: 'Embed the PYV link on your church website\'s homepage', completed: false },
  ]);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {showWelcome && (
        <div className="bg-green-600 text-white p-6 rounded-3xl mb-8 flex justify-between items-center shadow-lg">
          <div>
            <h2 className="text-2xl font-bold">Welcome to StoryBridge! 🎉</h2>
            <p className="opacity-90">Your church is officially live. Use the checklist below to complete your setup.</p>
          </div>
          <button className="bg-green-700 px-4 py-2 rounded-xl font-bold hover:bg-green-800 transition">Dismiss</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Dashboard Stats (Placeholders) */}
        <div className="md:col-span-2 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Scheduled Visits</p>
              <h3 className="text-4xl font-extrabold text-blue-900">0</h3>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">New Stories</p>
              <h3 className="text-4xl font-extrabold text-blue-900">0</h3>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[300px] flex flex-col items-center justify-center text-center">
             <div className="text-4xl mb-4">📉</div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">No data yet</h3>
             <p className="text-gray-500 max-w-xs">No one has planned a visit yet. Try sharing your new PYV link on your church's Instagram or Facebook page!</p>
          </div>
        </div>

        {/* Success Checklist */}
        <div className="space-y-6">
          <div className="bg-blue-900 text-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              Success Checklist
              <span className="text-xs bg-blue-800 px-2 py-1 rounded text-blue-300">1/4</span>
            </h3>
            <div className="space-y-4">
              {checklist.map(item => (
                <div key={item.id} className="flex items-start gap-3 group">
                  <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${item.completed ? 'bg-orange-500 border-orange-500' : 'border-blue-700'}`}>
                    {item.completed && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                  <span className={`text-sm leading-tight transition ${item.completed ? 'text-blue-300 line-through' : 'text-white'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl">
             <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2 text-sm">
                💡 Philosophy Tip
             </h4>
             <p className="text-xs text-orange-800 leading-relaxed italic">
                "Authentic stories of struggle and hope build more trust with unchurched visitors than polished marketing."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <span className="font-extrabold text-blue-900 text-xl tracking-tighter">StoryBridge Admin</span>
          <div className="flex gap-6 text-sm font-bold text-gray-500">
            <a href="/admin" className="text-blue-900">Launchpad</a>
            <a href="/admin/stories" className="hover:text-blue-900 transition">StoryBox</a>
            <a href="/admin/integrations" className="hover:text-blue-900 transition">Integrations</a>
          </div>
        </div>
      </nav>
      <Suspense fallback={<div className="p-8 text-center">Loading dashboard...</div>}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
