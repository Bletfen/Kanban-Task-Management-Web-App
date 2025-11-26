import HeaderTitle from "./HeaderTitle";

export default async function Header() {
  const fetchBoards = await fetch("http://localhost:3000/api/boards");
  const boards = await fetchBoards.json();
  return (
    <div className="flex items-center justify-between">
      <HeaderTitle boards={boards} />
      <div className="flex items-center gap-[1.6rem]">
        <button>+</button>
        <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
          <g fill="#828FA3" fillRule="evenodd">
            <circle cx="2.308" cy="2.308" r="2.308" />
            <circle cx="2.308" cy="10" r="2.308" />
            <circle cx="2.308" cy="17.692" r="2.308" />
          </g>
        </svg>
      </div>
    </div>
  );
}
