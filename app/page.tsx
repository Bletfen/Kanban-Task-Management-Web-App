import { redirect } from "next/navigation";
import { getBoards } from "./lib/mongodb";

export default async function HomePage() {
  const boards = await getBoards();

  if (!boards.length) {
    return <h1>No boards yet. Create your first board!</h1>;
  }

  const firstBoard = boards[0].name;

  redirect(`/boards/${firstBoard}`);
}
