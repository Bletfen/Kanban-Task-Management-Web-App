import SideBar from "./SideBar";
import { getBoards } from "../app/lib/mongodb";
import { getUserId } from "../app/lib/session";

export default async function SideBarServer() {
  const userId = await getUserId();
  const boards = await getBoards(userId);

  return <SideBar boards={boards} />;
}
