import LoginForm from "./LoginForm";
import { query } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function LoginPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const churches = await query<any>(
    `SELECT name FROM churches WHERE slug = '${slug}'`
  );

  if (churches.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">{churches[0].name}</h1>
          <p className="text-gray-600 mt-2">Pastor Dashboard Login</p>
        </div>

        <LoginForm slug={slug} />
      </div>
    </div>
  );
}
