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
  console.log(boardList);

  if (!boardList || boardList.error) {
    return <h1>{boardList?.error || "Board Not Found"}</h1>;
  }

  return (
    <div>
      {boardList.columns.map((col: TColumns) => (
        <div>
          <p>{col.name}</p>
          {col.tasks.map((task) => (
            <div>
              <h1>{task.title}</h1>
              <p>
                <span>
                  {
                    task.subtasks.filter(
                      (subTask: TSubtasks) => subTask.isCompleted
                    ).length
                  }
                </span>
                of
                <span>{task.subtasks.length}</span>
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
