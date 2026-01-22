import SideBar from "./SideBar";
import { getBoards } from "../app/lib/mongodb";

export default async function SideBarServer() {
  const boards = await getBoards();

  return <SideBar boards={boards} />;
}
