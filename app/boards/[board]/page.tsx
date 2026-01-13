import ColumnsClient from "@/components/ColumnsClient";
import { redirect } from "next/navigation";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  const { board } = await params;
  const boardName = decodeURIComponent(board);
  const fetchBoards = await fetch(
    `http://localhost:3000/api/boards/${boardName}`,
    {
      cache: "no-cache",
    }
  );
  const fetchAllBoards = await fetch(`http://localhost:3000/api/boards`, {
    cache: "no-cache",
  });
  const fetchedAllBoardsData = await fetchAllBoards.json();
  const boardsData = await fetchBoards.json();
  const boardsNamesArray = fetchedAllBoardsData.map((b: IBoard) => b.name);
  const firstBoard = boardsNamesArray[0];

  if (!boardsData || boardsData.error) {
    return redirect(`/boards/${firstBoard || ""}`);
  }

  return (
    <div className="bg-[#f4f7fd] min-h-screen">
      <ColumnsClient boardsData={boardsData} boardName={boardName} />
    </div>
  );
}
