import { db } from '@/lib/db';
import { churches, visitors } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import PlanYourVisitForm from './PlanYourVisitForm';

export default async function TenantLandingPage({ params }: { params: Promise<{ site: string }> }) {
  const { site } = await params;

  // In a real app, we'd fetch this from the DB
  // Since we might not have a working DB in this environment yet, we'll use fallback data
  let church;
  try {
    const results = await db.select().from(churches).where(eq(churches.slug, site));
    church = results[0];
  } catch (e) {
    console.error("Failed to fetch church from DB, using fallback", e);
  }

  if (!church && site !== 'demo') {
    // For demo purposes, we'll provide a mock church if 'demo' is used
    church = {
      id: 'demo-id',
      name: 'Grace Community Church',
      slug: 'demo',
      logoUrl: null,
      parkingTitle: 'Arriving & Parking',
      parkingDescription: 'We’ve saved a spot for you! As you pull into the campus, look for our Guest Parking signs. They are located right near the main entrance to make your walk as short as possible.',
      enteringTitle: 'Entering the Building',
      enteringDescription: 'From the moment you walk through the doors, you\'ll be greeted by a friendly face. Head straight to the \'New Here\' area in the center of the lobby—that’s our home base for guests, and we have a small gift for you there!',
      kidsTitle: 'Kids Check-In',
      kidsDescription: 'Your kids are going to love it here! Follow the signs to the Kids Wing. Our background-checked volunteers will help you check them in securely, give you a matching claim tag, and show them to their age-appropriate room.',
      seatingTitle: 'Finding a Seat',
      seatingDescription: 'Grab a free cup of coffee in the lobby and head into the auditorium. There are no \'assigned\' seats—feel free to sit anywhere you feel comfortable. If you need help finding a spot, our ushers are happy to assist!',
    };
  } else if (!church) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{church.name}</h1>
          <a href="#plan-visit" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-bold transition">
            Plan Your Visit
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gray-200">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h2 className="text-5xl font-extrabold mb-4 uppercase tracking-wider">You Belong Here</h2>
          <p className="text-xl max-w-2xl mx-auto">
            Experience community, purpose, and faith at {church.name}. We can't wait to meet you this Sunday!
          </p>
        </div>
      </section>

      {/* Parking to Pew Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-900 tracking-tight">What to Expect</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center text-2xl font-bold mb-6">1</div>
              <h3 className="text-xl font-bold mb-4 text-blue-900">{church.parkingTitle}</h3>
              <p className="text-gray-600 leading-relaxed">{church.parkingDescription}</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center text-2xl font-bold mb-6">2</div>
              <h3 className="text-xl font-bold mb-4 text-blue-900">{church.enteringTitle}</h3>
              <p className="text-gray-600 leading-relaxed">{church.enteringDescription}</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center text-2xl font-bold mb-6">3</div>
              <h3 className="text-xl font-bold mb-4 text-blue-900">{church.kidsTitle}</h3>
              <p className="text-gray-600 leading-relaxed">{church.kidsDescription}</p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center text-2xl font-bold mb-6">4</div>
              <h3 className="text-xl font-bold mb-4 text-blue-900">{church.seatingTitle}</h3>
              <p className="text-gray-600 leading-relaxed">{church.seatingDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="plan-visit" className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-blue-900 text-white p-12 rounded-3xl shadow-2xl">
            <h2 className="text-4xl font-bold mb-4 text-center">Plan Your Visit</h2>
            <p className="text-blue-100 text-center mb-10 text-lg">
              Let us know you're coming and we'll have someone waiting to show you around!
            </p>
            <PlanYourVisitForm churchId={church.id} churchName={church.name} />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-4xl font-bold mb-6 text-blue-900">Your Story Matters</h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            Has God moved in your life through this community? We'd love to hear your story of life change.
          </p>
          <a 
            href={`/submit`} 
            className="inline-block bg-white text-blue-900 border-2 border-blue-900 hover:bg-blue-900 hover:text-white px-8 py-3 rounded-full font-bold transition shadow-sm"
          >
            Share My Story
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} {church.name}. Built with StoryBridge.</p>
        </div>
      </footer>
    </div>
  );
}
