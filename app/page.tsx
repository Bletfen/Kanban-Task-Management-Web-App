import { redirect } from "next/navigation";
import { getBoards, initializeUserBoards } from "./lib/mongodb";
import { getUserId } from "./lib/session";

export default async function HomePage() {
  const userId = await getUserId();
  await initializeUserBoards(userId);
  const boards = await getBoards(userId);

  if (!boards.length) {
    return <h1>No boards yet. Create your first board!</h1>;
  }

  const firstBoard = boards[0].name;

  redirect(`/boards/${firstBoard}`);
}
