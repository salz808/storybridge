"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(slug: string) {
  const cookieStore = await cookies();
  cookieStore.delete(`auth_${slug}`);
  redirect(`/admin/${slug}/login`);
}
