export default async function BoardPage({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  const { board } = await params;
  const boardName = decodeURIComponent(board);
  console.log(boardName);
  const fetchData = await fetch(`http://localhost:3000/boards/${boardName}`);
  const boardList = await fetchData.json();
  console.log("say");

  if (!boardList || boardList.error) {
    return <h1>{boardList?.error || "Board Not Found"}</h1>;
  }

  return <div>123</div>;
}
