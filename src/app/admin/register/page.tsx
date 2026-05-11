'use client';

import { useState } from 'react';
import { registerChurch } from './actions';

export default function RegisterChurch() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [slug, setSlug] = useState('');

  async function handleSubmit(formData: FormData) {
    setStatus('submitting');
    const result = await registerChurch(formData);
    if (result.success) {
      setSlug(result.slug || '');
      setStatus('success');
    } else {
      setStatus('idle');
      alert('Error registering church');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-50">
        <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md w-full text-center">
          <div className="text-6xl mb-6">⛪</div>
          <h1 className="text-3xl font-bold mb-4 text-blue-900">Church Registered!</h1>
          <p className="text-gray-600 mb-8">
            Your church is now on StoryBridge. You can view your landing page here:
          </p>
          <a 
            href="/admin/onboarding" 
            className="block w-full bg-blue-900 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition"
          >
            Start Setup Wizard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-50">
      <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold mb-8 text-blue-900 text-center">Register Your Church</h1>
        <form action={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Church Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Grace Community Church"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Subdomain Slug</label>
            <input
              type="text"
              name="slug"
              placeholder="e.g. grace-church"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Logo URL (Optional)</label>
            <input
              type="url"
              name="logoUrl"
              placeholder="https://..."
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="bg-blue-900 text-white p-4 rounded-xl font-bold hover:bg-blue-800 transition shadow-lg disabled:bg-blue-300"
          >
            {status === 'submitting' ? 'Registering...' : 'Start My Church Story'}
          </button>
        </form>
      </div>
    </div>
  );
}
