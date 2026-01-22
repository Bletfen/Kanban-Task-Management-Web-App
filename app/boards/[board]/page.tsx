import ColumnsClient from "@/components/ColumnsClient";
import { redirect } from "next/navigation";
import { getBoardByName, getBoards } from "@/app/lib/mongodb";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  const { board } = await params;
  const boardName = decodeURIComponent(board);

  const boardsData = await getBoardByName(boardName);
  const allBoards = await getBoards();

  if (!boardsData) {
    const firstBoard = allBoards[0]?.name;
    return redirect(`/boards/${encodeURIComponent(firstBoard || "")}`);
  }

  return (
    <div className="bg-[#f4f7fd] min-h-screen">
      <ColumnsClient boardsData={boardsData} boardName={boardName} />
    </div>
  );
}
