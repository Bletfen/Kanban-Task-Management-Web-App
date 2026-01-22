import { cookies } from "next/headers";
import { randomBytes } from "crypto";

export async function getUserId(): Promise<string> {
  const cookieStore = await cookies();
  let userId = cookieStore.get("userId")?.value;

  if (!userId) {
    userId = randomBytes(16).toString("hex");
    cookieStore.set("userId", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return userId;
}
