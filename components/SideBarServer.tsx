import SideBar from "./SideBar";

export default async function SideBarServer() {
  const fetchBoards = await fetch("http://localhost:3000/api/boards");
  const boards = await fetchBoards.json();
  return (
    <>
      <SideBar boards={boards} />
    </>
  );
}
