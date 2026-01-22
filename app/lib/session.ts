import { cookies } from "next/headers";

export async function getUserId(): Promise<string> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  return userId || "default";
}
