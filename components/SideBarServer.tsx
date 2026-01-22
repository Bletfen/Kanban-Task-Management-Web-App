import SideBar from "./SideBar";
import { getBoards, initializeUserBoards } from "../app/lib/mongodb";
import { getUserId } from "../app/lib/session";

export default async function SideBarServer() {
  const userId = await getUserId();
  await initializeUserBoards(userId);
  const boards = await getBoards(userId);

  return <SideBar boards={boards} />;
}
