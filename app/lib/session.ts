import { cookies } from "next/headers";

export async function getUserId(): Promise<string> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  // If no userId, return a default - middleware will set it
  return userId || "default";
}
