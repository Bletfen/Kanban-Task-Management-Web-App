import data from "../data/data.json";
import { redirect } from "next/navigation";

export default function HomePage() {
  if (!data.boards.length) {
    return <h1>No boards yet. Create your first board!</h1>;
  }

  const firstBoard = data.boards[0].name;

  redirect(`/boards/${firstBoard}`);
}
