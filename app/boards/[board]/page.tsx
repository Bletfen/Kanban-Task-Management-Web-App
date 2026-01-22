import ColumnsClient from "@/components/ColumnsClient";
import { redirect } from "next/navigation";
import { getBoardByName, getBoards } from "@/app/lib/mongodb";
import { getUserId } from "@/app/lib/session";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  const userId = await getUserId();
  const { board } = await params;
  const boardName = decodeURIComponent(board);

  const boardsData = await getBoardByName(boardName, userId);
  const allBoards = await getBoards(userId);

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
