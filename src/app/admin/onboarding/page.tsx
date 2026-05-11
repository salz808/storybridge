'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const [formData, setStepData] = useState({
    subdomain: '',
    logo: null,
    primaryColor: '#1e3a8a',
    chmsProvider: 'pco',
    senderName: '',
    serviceTimes: '10:00 AM',
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-blue-900 p-6 text-white text-center">
          <h1 className="text-2xl font-bold mb-2">The StoryBridge Launchpad</h1>
          <div className="flex justify-between items-center max-w-xs mx-auto mt-4">
            {[1, 2, 3, 4].map(s => (
              <div 
                key={s} 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition ${
                  step >= s ? 'bg-orange-500 border-orange-500' : 'border-blue-700 text-blue-700'
                }`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="p-10">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Step 1: Church Identity & URL</h2>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Church Subdomain</label>
                <div className="flex items-center">
                  <input 
                    type="text" 
                    placeholder="grace-church"
                    className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-l-xl outline-none focus:ring-2 focus:ring-blue-900"
                    onChange={(e) => setStepData({ ...formData, subdomain: e.target.value })}
                  />
                  <span className="bg-gray-100 border border-l-0 border-gray-200 p-4 rounded-r-xl text-gray-500">.storybridge.io</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Brand Palette (Primary Color)</label>
                <input 
                  type="color" 
                  value={formData.primaryColor}
                  onChange={(e) => setStepData({ ...formData, primaryColor: e.target.value })}
                  className="w-full h-12 rounded-xl cursor-pointer"
                />
              </div>
              <div className="mt-4 p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center gap-4">
                <button 
                  style={{ backgroundColor: formData.primaryColor }}
                  className="px-6 py-2 rounded-full text-white font-bold pointer-events-none"
                >
                  Preview Button
                </button>
                <p className="text-xs text-gray-500 italic">This is how your brand looks on components.</p>
              </div>
              <button onClick={nextStep} className="w-full bg-blue-900 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition shadow-lg mt-8">
                Continue to ChMS
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Step 2: ChMS Integration</h2>
                <div className="group relative">
                  <span className="text-blue-900 cursor-help underline text-sm">Why connect?</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 text-white text-[10px] p-3 rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                    Connecting your ChMS allows us to automatically sync new visitors and avoid duplicate records.
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setStepData({ ...formData, chmsProvider: 'pco' })}
                  className={`p-6 rounded-2xl border-2 transition text-left ${formData.chmsProvider === 'pco' ? 'border-blue-900 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className="font-bold text-lg mb-1">Planning Center</div>
                </button>
                <button 
                  onClick={() => setStepData({ ...formData, chmsProvider: 'ccb' })}
                  className={`p-6 rounded-2xl border-2 transition text-left ${formData.chmsProvider === 'ccb' ? 'border-blue-900 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className="font-bold text-lg mb-1">CCB</div>
                </button>
              </div>
              <div className="p-6 border border-green-100 bg-green-50 rounded-2xl text-center">
                <p className="text-green-700 font-medium">Connection Verified - 1,240 people found.</p>
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={prevStep} className="flex-1 border border-gray-200 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-50 transition">
                  Back
                </button>
                <button onClick={nextStep} className="flex-[2] bg-blue-900 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition shadow-lg">
                  Next: Setting the Voice
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Step 3: Setting the Voice</h2>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Who should messages come from?</label>
                <input 
                  type="text" 
                  placeholder="e.g. Pastor David"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900"
                  onChange={(e) => setStepData({ ...formData, senderName: e.target.value })}
                />
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-gray-500 uppercase tracking-widest">Review Templates</h3>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                  <span className="text-sm font-medium">Immediate SMS Confirmation</span>
                  <button className="text-blue-900 text-xs font-bold hover:underline">Edit</button>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                  <span className="text-sm font-medium">"What to Expect" Email</span>
                  <button className="text-blue-900 text-xs font-bold hover:underline">Edit</button>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={prevStep} className="flex-1 border border-gray-200 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-50 transition">
                  Back
                </button>
                <button onClick={nextStep} className="flex-[2] bg-blue-900 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition shadow-lg">
                  Next: Launch "The Bridge"
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-900 text-center">Step 4: Launching "The Bridge"</h2>
                <div className="group relative">
                  <span className="text-blue-900 cursor-help text-sm">ⓘ</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-[10px] p-3 rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                    Why ask for a visit plan? Scheduling a visit reduces the "social anxiety" of walking into a new building alone.
                  </div>
                </div>
              </div>
              <p className="text-gray-500 mb-8">Ready to publish your first Plan Your Visit page?</p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`aspect-[3/4] rounded-xl border-2 transition cursor-pointer flex items-center justify-center ${i === 1 ? 'border-blue-900 bg-blue-50' : 'border-gray-100'}`}>
                    <span className="text-xs font-bold text-gray-400">Template {i}</span>
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Service Times</label>
                <input 
                  type="text" 
                  value={formData.serviceTimes}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-900 text-center"
                  onChange={(e) => setStepData({ ...formData, serviceTimes: e.target.value })}
                />
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={prevStep} className="flex-1 border border-gray-200 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-50 transition">
                  Back
                </button>
                <button 
                  onClick={() => router.push('/admin?welcome=true')}
                  className="flex-[2] bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg"
                >
                  Publish & Finish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
