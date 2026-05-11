'use client';

import { useState } from 'react';
import { submitPlanVisit } from './actions';

export default function PlanYourVisitForm({ churchId, churchName }: { churchId: string, churchName: string }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [visitorName, setVisitorName] = useState('');

  async function handleSubmit(formData: FormData) {
    setStatus('submitting');
    setVisitorName(formData.get('firstName') as string);
    
    try {
      const result = await submitPlanVisit(formData);
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="text-6xl mb-6">🎉</div>
        <h3 className="text-3xl font-bold mb-4 text-white">We can't wait to meet you, {visitorName}!</h3>
        <p className="text-blue-100 text-xl leading-relaxed">
          Keep an eye on your phone for a message from our team. We'll see you this Sunday!
        </p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <input type="hidden" name="churchId" value={churchId} />
      <input type="hidden" name="churchName" value={churchName} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-blue-200">First Name</label>
          <input
            type="text"
            name="firstName"
            required
            className="w-full px-4 py-3 rounded-xl bg-blue-800 border border-blue-700 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            placeholder="Jane"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-blue-200">Last Name</label>
          <input
            type="text"
            name="lastName"
            required
            className="w-full px-4 py-3 rounded-xl bg-blue-800 border border-blue-700 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-blue-200">Email Address</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl bg-blue-800 border border-blue-700 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-blue-200">Phone Number</label>
          <input
            type="tel"
            name="phone"
            required
            className="w-full px-4 py-3 rounded-xl bg-blue-800 border border-blue-700 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            placeholder="(555) 000-0000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-blue-200">When are you visiting?</label>
        <select
          name="visitDate"
          required
          className="w-full px-4 py-3 rounded-xl bg-blue-800 border border-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition appearance-none"
        >
          <option value="">Select a Sunday</option>
          <option value="This Sunday">This Sunday</option>
          <option value="Next Sunday">Next Sunday</option>
          <option value="In a few weeks">In a few weeks</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-blue-200">Bringing kids? (Ages/Grades)</label>
        <textarea
          name="kidsInfo"
          rows={2}
          className="w-full px-4 py-3 rounded-xl bg-blue-800 border border-blue-700 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          placeholder="e.g. 5 year old girl, 2nd grade boy"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transform transition active:scale-95 ${
          status === 'submitting' 
            ? 'bg-blue-700 cursor-not-allowed' 
            : 'bg-orange-500 hover:bg-orange-600 text-white'
        }`}
      >
        {status === 'submitting' ? 'Saving Your Spot...' : 'I\'m Coming This Sunday!'}
      </button>

      {status === 'error' && (
        <p className="text-red-400 text-center font-medium">
          Oops! Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
