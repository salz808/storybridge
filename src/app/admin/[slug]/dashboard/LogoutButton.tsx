"use client";

import { logout } from "./logout-action";

export default function LogoutButton({ slug }: { slug: string }) {
  return (
    <button
      onClick={() => logout(slug)}
      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
    >
      Logout
    </button>
  );
}
