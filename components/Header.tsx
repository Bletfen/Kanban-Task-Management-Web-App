import HeaderClient from "./HeaderClient";
import { getBoards } from "../app/lib/mongodb";
import { getUserId } from "../app/lib/session";

export default async function Header() {
  const userId = await getUserId();
  const boards = await getBoards(userId);

  return (
    <div className="w-full shrink-0">
      <HeaderClient boards={boards} />
    </div>
  );
}
