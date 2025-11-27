import data from "../../../../../../../../data/data.json";
export async function PUT({
  req,

  params,
}: {
  req: Request;

  params: Promise<{ taskId: string; board: string }>;
}) {
  const { taskId, board } = await params;
  //   const currentBoard = data.boards.find((b) => b.name === board);
  //   const currentTask = currentBoard.find((task) => task.id === taskId);
  console.log(taskId, board);
}
