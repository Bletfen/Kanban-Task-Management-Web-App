import { redirect } from "next/navigation";
import { getBoards } from "./lib/mongodb";
import { getUserId } from "./lib/session";

export default async function HomePage() {
  const userId = await getUserId();
  const boards = await getBoards(userId);

  if (!boards.length) {
    return <h1>No boards yet. Create your first board!</h1>;
  }

  const firstBoard = boards[0].name;

  redirect(`/boards/${firstBoard}`);
}
