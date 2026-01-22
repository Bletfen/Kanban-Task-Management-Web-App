import HeaderClient from "./HeaderClient";
import { getBoards } from "../app/lib/mongodb";

export default async function Header() {
  const boards = await getBoards();

  return (
    <div className="w-full shrink-0">
      <HeaderClient boards={boards} />
    </div>
  );
}
