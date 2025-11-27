import ColumnsClient from "@/components/ColumnsClient";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  const { board } = await params;
  const boardName = decodeURIComponent(board);
  const fetchData = await fetch(
    `http://localhost:3000/api/boards/${boardName}`
  );
  const boardList = await fetchData.json();

  if (!boardList || boardList.error) {
    return <h1>{boardList?.error || "Board Not Found"}</h1>;
  }

  return (
    <div className="bg-[#f4f7fd] min-h-screen">
      <ColumnsClient boardList={boardList} />
    </div>
  );
}
