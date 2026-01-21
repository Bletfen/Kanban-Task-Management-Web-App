import ColumnsClient from "@/components/ColumnsClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  const { board } = await params;
  const boardName = decodeURIComponent(board);
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const fetchBoards = await fetch(
    `${baseUrl}/api/boards/${encodeURIComponent(boardName)}`,
    { cache: "no-store" },
  );

  const fetchAllBoards = await fetch(`${baseUrl}/api/boards`, {
    cache: "no-store",
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
