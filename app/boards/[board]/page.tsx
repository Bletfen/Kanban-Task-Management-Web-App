import ColumnsClient from "@/components/ColumnsClient";

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
  const boardsData = await fetchBoards.json();

  if (!boardsData || boardsData.error) {
    return <h1>{boardsData?.error || "Board Not Found"}</h1>;
  }

  return (
    <div className="bg-[#f4f7fd] min-h-screen">
      <ColumnsClient boardsData={boardsData} boardName={boardName} />
    </div>
  );
}
