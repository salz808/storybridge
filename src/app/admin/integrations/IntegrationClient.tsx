'use client';

import { useState } from 'react';

export default function IntegrationClient({ initialSettings, logs }: { initialSettings: any, logs: any[] }) {
  const [provider, setProvider] = useState(initialSettings?.provider || 'pco');
  const [apiKey, setApiKey] = useState('');
  const [activeTab, setActiveTab] = useState<'settings' | 'logs'>('settings');

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex border-b border-gray-100">
        <button 
          onClick={() => setActiveTab('settings')}
          className={`px-8 py-4 font-bold text-sm transition ${activeTab === 'settings' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Connection Settings
        </button>
        <button 
          onClick={() => setActiveTab('logs')}
          className={`px-8 py-4 font-bold text-sm transition ${activeTab === 'logs' ? 'text-blue-900 border-b-2 border-blue-900' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Sync Logs
        </button>
      </div>

      <div className="p-8">
        {activeTab === 'settings' ? (
          <div className="max-w-2xl">
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-4">Choose Your Provider</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setProvider('pco')}
                  className={`p-6 rounded-2xl border-2 transition text-left ${provider === 'pco' ? 'border-blue-900 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className="font-bold text-lg mb-1">Planning Center</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">OAuth2 / API Key</div>
                </button>
                <button 
                  onClick={() => setProvider('ccb')}
                  className={`p-6 rounded-2xl border-2 transition text-left ${provider === 'ccb' ? 'border-blue-900 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className="font-bold text-lg mb-1">Church Community Builder</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">API Key</div>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  {provider === 'pco' ? 'PCO API Key' : 'CCB API Token'}
                </label>
                <input 
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your key here..."
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-900 transition"
                />
              </div>

              <div className="pt-4">
                <h3 className="font-bold text-gray-900 mb-4">Workflow Mappings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-sm font-medium">Plan Your Visit Submission</span>
                    <select className="bg-white border border-gray-200 rounded-lg p-2 text-sm outline-none">
                      <option>Add to "First-Time Guest" Workflow</option>
                      <option>Add to "Newcomer Follow-up"</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-sm font-medium">StoryBox Submission</span>
                    <select className="bg-white border border-gray-200 rounded-lg p-2 text-sm outline-none">
                      <option>Add to "Testimony Review" Workflow</option>
                      <option>Internal Review Only</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-900 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition shadow-lg mt-8">
                Save Connection Settings
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="pb-4">Entity</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Provider</th>
                  <th className="pb-4">Details</th>
                  <th className="pb-4">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {logs.map((log: any) => (
                  <tr key={log.id} className="text-sm">
                    <td className="py-4 capitalize font-medium">{log.entityType}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        log.status === 'success' ? 'bg-green-100 text-green-600' :
                        log.status === 'error' ? 'bg-red-100 text-red-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {log.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 uppercase font-bold text-xs text-gray-400">{log.provider}</td>
                    <td className="py-4 text-gray-500">{log.details}</td>
                    <td className="py-4 text-gray-400">{new Date(log.createdAt).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
