"use client";

import { useState } from "react";
import { submitConnection } from "./actions";

export default function ConnectionForm({ 
  churchId,
  churchName 
}: { 
  churchId: string;
  churchName: string;
}) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    try {
      const result = await submitConnection(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (e) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center space-y-4 py-8">
        <div className="text-4xl">🎉</div>
        <h2 className="text-xl font-semibold text-green-600">You're connected!</h2>
        <p className="text-gray-600">
          Thanks for joining us at {churchName}! Check your texts in a moment.
        </p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="churchId" value={churchId} />
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="First & Last Name"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="(555) 000-0000"
        />
      </div>

      <div>
        <label htmlFor="prayer" className="block text-sm font-medium text-gray-700">
          Prayer Request (Optional)
        </label>
        <textarea
          name="prayer"
          id="prayer"
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="How can we pray for you?"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
      >
        {loading ? "Connecting..." : "Connect"}
      </button>
    </form>
  );
}
