import { query } from "@/lib/db";
import { notFound } from "next/navigation";
import ConnectionForm from "./ConnectionForm";

export default async function JoinPage({
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">{church.name}</h1>
          <p className="text-gray-600 mt-2">
            We're so glad you're here! Fill out this card so we can connect with you.
          </p>
        </div>

        <ConnectionForm churchId={church.id} churchName={church.name} />
      </div>
    </div>
  );
}
