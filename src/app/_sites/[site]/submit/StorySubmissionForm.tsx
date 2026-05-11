'use client';

import { useState } from 'react';
import { submitStory } from './actions';

export default function StorySubmissionForm({ churchId, churchName }: { churchId: string, churchName: string }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [type, setType] = useState<'text' | 'video'>('text');
  
  const tags = [
    'Marriage', 'Anxiety', 'Parenting', 'Finding Purpose', 
    'Healing', 'Community', 'Faith', 'Life Change'
  ];

  async function handleSubmit(formData: FormData) {
    setStatus('submitting');
    try {
      const result = await submitStory(formData);
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
        <div className="text-6xl mb-6">🙏</div>
        <h3 className="text-3xl font-bold mb-4 text-white">Thank you for sharing!</h3>
        <p className="text-blue-100 text-xl leading-relaxed">
          Your story has been submitted for review. We are so encouraged by what God is doing in your life!
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 text-blue-200 underline hover:text-white"
        >
          Submit another story
        </button>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <input type="hidden" name="churchId" value={churchId} />
      <input type="hidden" name="type" value={type} />
      
      <div className="flex gap-4 p-1 bg-blue-800 rounded-xl">
        <button
          type="button"
          onClick={() => setType('text')}
          className={`flex-1 py-2 px-4 rounded-lg font-bold transition ${type === 'text' ? 'bg-blue-600 text-white shadow' : 'text-blue-300 hover:text-white'}`}
        >
          Write My Story
        </button>
        <button
          type="button"
          onClick={() => setType('video')}
          className={`flex-1 py-2 px-4 rounded-lg font-bold transition ${type === 'video' ? 'bg-blue-600 text-white shadow' : 'text-blue-300 hover:text-white'}`}
        >
          Record/Upload Video
        </button>
      </div>

      {type === 'text' ? (
        <div>
          <label className="block text-sm font-medium mb-2 text-blue-200">What is your story?</label>
          <textarea
            name="content"
            rows={8}
            required
            className="w-full px-4 py-3 rounded-xl bg-blue-800 border border-blue-700 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            placeholder="Share what life was like before, what changed, and how God met you..."
          ></textarea>
        </div>
      ) : (
        <div className="p-8 border-2 border-dashed border-blue-700 rounded-2xl text-center bg-blue-800/50">
          <div className="text-4xl mb-4">📹</div>
          <p className="text-blue-100 mb-4">Video submission is coming soon!</p>
          <input 
            type="file" 
            name="videoFile" 
            accept="video/*"
            className="block w-full text-sm text-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
          />
          <p className="mt-2 text-xs text-blue-300">Max 3 minutes. MP4, MOV preferred.</p>
        </div>
      )}

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
          <label className="block text-sm font-medium mb-2 text-blue-200">Phone (Optional)</label>
          <input
            type="tel"
            name="phone"
            className="w-full px-4 py-3 rounded-xl bg-blue-800 border border-blue-700 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            placeholder="(555) 000-0000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-4 text-blue-200">Themes (Select all that apply)</label>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <label key={tag} className="inline-flex items-center">
              <input type="checkbox" name="tags" value={tag} className="sr-only peer" />
              <span className="px-4 py-2 rounded-full border border-blue-700 bg-blue-800 text-blue-200 peer-checked:bg-orange-500 peer-checked:text-white peer-checked:border-orange-500 cursor-pointer transition text-sm">
                {tag}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 bg-blue-800/50 rounded-xl border border-blue-700">
        <input 
          type="checkbox" 
          name="consent" 
          id="consent" 
          required 
          className="mt-1 h-4 w-4 rounded border-blue-700 text-orange-500 focus:ring-orange-500" 
        />
        <label htmlFor="consent" className="text-sm text-blue-100">
          I give {churchName} permission to share my story to encourage others. I understand it may be edited for length and clarity.
        </label>
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
        {status === 'submitting' ? 'Submitting Your Story...' : 'Submit My Story'}
      </button>

      {status === 'error' && (
        <p className="text-red-400 text-center font-medium">
          Oops! Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
