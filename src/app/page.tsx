import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-900 text-white font-sans">
      <main className="container mx-auto px-6 py-24 flex flex-col items-center text-center">
        <h1 className="text-6xl font-extrabold mb-8">StoryBridge</h1>
        <p className="text-2xl max-w-2xl mb-12 text-blue-100">
          Helping local churches attract, engage, and retain new visitors through authentic storytelling and automated follow-up.
        </p>
        <div className="flex gap-6">
          <a href="/admin/register" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-xl transition shadow-lg">
            Register Your Church
          </a>
          <a href="http://demo.storybridge.com" className="bg-white hover:bg-gray-100 text-blue-900 px-8 py-4 rounded-xl font-bold text-xl transition shadow-lg">
            View Demo Page
          </a>
        </div>
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          <div className="bg-blue-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Authentic Stories</h3>
            <p className="text-blue-100 leading-relaxed">
              Collect and share real life-change testimonies from your congregation to build trust with new visitors.
            </p>
          </div>
          <div className="bg-blue-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Visitor Journey</h3>
            <p className="text-blue-100 leading-relaxed">
              Optimize the path from discovery to belonging with "Plan Your Visit" funnels and digital connection cards.
            </p>
          </div>
          <div className="bg-blue-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Automated Follow-up</h3>
            <p className="text-blue-100 leading-relaxed">
              Personalized SMS and email workflows that make every guest feel seen and welcomed.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
