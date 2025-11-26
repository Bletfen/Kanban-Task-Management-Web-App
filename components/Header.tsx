import HeaderTitle from "./HeaderTitle";
import ThreeDotMenu from "./ThreeDotMenu";

export default async function Header() {
  const fetchBoards = await fetch("http://localhost:3000/api/boards");
  const boards = await fetchBoards.json();
  return (
    <div
      className="flex items-center justify-between
     p-[1.6rem]"
    >
      <HeaderTitle boards={boards} />
      <div className="flex items-center gap-[1.6rem]">
        <button>+</button>
        <ThreeDotMenu type={"board"} />
      </div>
    </div>
  );
}
