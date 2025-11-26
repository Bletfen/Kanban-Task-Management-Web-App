import HeaderClient from "./HeaderClient";

export default async function Header() {
  const fetchBoards = await fetch("http://localhost:3000/api/boards");
  const boards = await fetchBoards.json();
  return (
    <>
      <HeaderClient boards={boards} />
    </>
  );
}
