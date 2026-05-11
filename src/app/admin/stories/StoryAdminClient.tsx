'use client';

import { useState } from 'react';

type Story = {
  id: string;
  type: 'text' | 'video';
  firstName: string;
  lastName: string;
  content?: string;
  videoUrl?: string;
  transcript?: string;
  status: 'pending' | 'approved' | 'featured' | 'archived';
  tags: string[];
  createdAt: string;
};

export default function StoryAdminClient({ initialStories }: { initialStories: Story[] }) {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [filter, setFilter] = useState<string>('all');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const filteredStories = stories.filter(s => {
    if (filter === 'all') return true;
    return s.status === filter;
  });

  const updateStatus = (id: string, newStatus: Story['status']) => {
    setStories(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    if (selectedStory?.id === id) {
      setSelectedStory(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-4 mb-8 border-b border-gray-100 pb-4">
        {['all', 'pending', 'approved', 'featured', 'archived'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition capitalize ${
              filter === tab 
                ? 'bg-blue-900 text-white' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map(story => (
          <div 
            key={story.id} 
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition cursor-pointer"
            onClick={() => setSelectedStory(story)}
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                story.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                story.status === 'approved' ? 'bg-green-100 text-green-600' :
                story.status === 'featured' ? 'bg-blue-100 text-blue-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {story.status}
              </span>
              <span className="text-gray-400 text-sm">{story.type === 'video' ? '📹 Video' : '📄 Text'}</span>
            </div>
            
            <h3 className="font-bold text-lg text-gray-900 mb-2">{story.firstName} {story.lastName}</h3>
            
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
              {story.type === 'text' ? story.content : story.transcript}
            </p>

            <div className="flex flex-wrap gap-2">
              {story.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedStory.firstName} {selectedStory.lastName}'s Story</h2>
                <p className="text-gray-500">Submitted on {new Date(selectedStory.createdAt).toLocaleDateString()}</p>
              </div>
              <button 
                onClick={() => setSelectedStory(null)}
                className="text-gray-400 hover:text-gray-900 text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Side: Content */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Submission</h4>
                  {selectedStory.type === 'video' ? (
                    <div className="aspect-video bg-black rounded-2xl flex items-center justify-center text-white">
                      <p>Video Player Placeholder</p>
                      <p className="text-xs mt-2 text-gray-400">{selectedStory.videoUrl}</p>
                    </div>
                  ) : (
                    <div className="prose max-w-none text-gray-800 leading-relaxed text-lg italic">
                      "{selectedStory.content}"
                    </div>
                  )}
                </div>

                {/* Right Side: Admin Tools */}
                <div className="space-y-8">
                  {selectedStory.type === 'video' && (
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">AI Transcript</h4>
                      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-sm text-blue-900 leading-relaxed">
                        {selectedStory.transcript}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Content Editor</h4>
                    <textarea 
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={6}
                      defaultValue={selectedStory.type === 'text' ? selectedStory.content : selectedStory.transcript}
                    />
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Marriage', 'Anxiety', 'Parenting', 'Purpose', 'Healing', 'Community', 'Faith', 'Life Change'].map(tag => (
                        <button 
                          key={tag}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                            selectedStory.tags.includes(tag)
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                      <button className="px-4 py-2 rounded-full text-xs font-bold bg-white border border-dashed border-gray-300 text-gray-400">+ Add Tag</button>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-4">
                    <button 
                      onClick={() => updateStatus(selectedStory.id, 'approved')}
                      className={`flex-1 py-3 px-6 rounded-xl font-bold transition shadow-sm ${
                        selectedStory.status === 'approved' 
                          ? 'bg-green-600 text-white shadow-inner cursor-default' 
                          : 'bg-green-100 text-green-700 hover:bg-green-600 hover:text-white'
                      }`}
                    >
                      {selectedStory.status === 'approved' ? '✓ Approved' : 'Approve'}
                    </button>
                    <button 
                      onClick={() => updateStatus(selectedStory.id, 'featured')}
                      className={`flex-1 py-3 px-6 rounded-xl font-bold transition shadow-sm ${
                        selectedStory.status === 'featured' 
                          ? 'bg-blue-900 text-white shadow-inner cursor-default' 
                          : 'bg-blue-50 text-blue-900 hover:bg-blue-900 hover:text-white'
                      }`}
                    >
                      {selectedStory.status === 'featured' ? '★ Featured' : 'Feature'}
                    </button>
                    <button 
                      onClick={() => updateStatus(selectedStory.id, 'archived')}
                      className="py-3 px-6 rounded-xl font-bold bg-white border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition"
                    >
                      Archive
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
