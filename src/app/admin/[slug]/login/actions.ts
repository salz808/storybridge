"use server";

import { query } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const slug = formData.get("slug") as string;
  const password = formData.get("password") as string;

  const churches = await query<any>(
    `SELECT id, admin_password FROM churches WHERE slug = '${slug}'`
  );

  if (churches.length === 0) {
    return { success: false, error: "Church not found." };
  }

  const church = churches[0];

  if (church.admin_password !== password) {
    return { success: false, error: "Invalid password." };
  }

  // Set auth cookie
  // In a real app, use a session token/JWT. For MVP, we'll use church ID.
  const cookieStore = await cookies();
  cookieStore.set(`auth_${slug}`, church.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: `/admin/${slug}`,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  redirect(`/admin/${slug}/dashboard`);
}
