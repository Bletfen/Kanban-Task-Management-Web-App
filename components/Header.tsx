import HeaderClient from "./HeaderClient";
import { getBoards, initializeUserBoards } from "../app/lib/mongodb";
import { getUserId } from "../app/lib/session";

export default async function Header() {
  const userId = await getUserId();
  await initializeUserBoards(userId);
  const boards = await getBoards(userId);

  return (
    <div className="w-full shrink-0">
      <HeaderClient boards={boards} />
    </div>
  );
}
