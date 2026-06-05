import { query } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function DashboardPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const churches = await query<any>(
    `SELECT * FROM churches WHERE slug = '${slug}'`
  );

  if (churches.length === 0) {
    notFound();
  }

  const church = churches[0];

  const guests = await query<any>(
    `SELECT * FROM guests WHERE church_id = '${church.id}' ORDER BY joined_at DESC`
  );

  const messages = await query<any>(
    `SELECT m.*, g.name as guest_name 
     FROM app_messages m 
     JOIN guests g ON m.guest_id = g.id 
     WHERE g.church_id = '${church.id}' 
     ORDER BY m.sent_at DESC`
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{church.name} Dashboard</h1>
            <p className="text-gray-600">Welcome back, Pastor {church.pastor_name}</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow sm">
            <span className="text-sm font-medium text-gray-500">Church Phone:</span>
            <span className="ml-2 font-bold">{church.phone_number}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Guests" value={guests.length} />
          <StatCard title="Active Sequences" value={guests.filter((g: any) => g.status === 'active').length} />
          <StatCard title="Total Replies" value={messages.filter((m: any) => m.direction === 'inbound').length} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Guest List */}
          <section className="bg-white rounded-xl shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Recent Guests</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Joined</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {guests.map((guest: any) => (
                    <tr key={guest.id}>
                      <td className="px-6 py-4 font-medium text-gray-900">{guest.name}</td>
                      <td className="px-6 py-4 text-gray-600">{guest.phone}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(guest.joined_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          guest.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {guest.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Reply Log */}
          <section className="bg-white rounded-xl shadow overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Message Log</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[500px]">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No messages yet.</p>
              ) : (
                messages.map((msg: any) => (
                  <div key={msg.id} className={`flex flex-col ${msg.direction === 'inbound' ? 'items-start' : 'items-end'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.direction === 'inbound' 
                        ? 'bg-gray-200 text-gray-800 rounded-bl-none' 
                        : 'bg-blue-600 text-white rounded-br-none'
                    }`}>
                      <p className="text-sm font-bold mb-1">
                        {msg.direction === 'inbound' ? msg.guest_name : 'System'}
                      </p>
                      <p>{msg.content}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1">
                      {new Date(msg.sent_at).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Prayer Requests */}
        <section className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Prayer Requests</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guests.filter((g: any) => g.prayer_request).map((guest: any) => (
              <div key={guest.id} className="border border-gray-200 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900">{guest.name}</h3>
                  <span className="text-xs text-gray-400">{new Date(guest.joined_at).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-600 italic">"{guest.prayer_request}"</p>
              </div>
            ))}
            {guests.filter((g: any) => g.prayer_request).length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-4">No prayer requests yet.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-600">
      <h3 className="text-sm font-medium text-gray-500 uppercase">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}
