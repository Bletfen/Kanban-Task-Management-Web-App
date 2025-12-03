import data from "@data/data.json";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ board: string; columnName: string; taskName: string }>;
  }
) {
  const { board, columnName, taskName } = await params;

  const findBoard = data.boards.find((b) => b.name === board);
  if (!findBoard) {
    return NextResponse.json({ error: "Board not found" }, { status: 400 });
  }
  const findColumn = findBoard?.columns.find((c) => c.name === columnName);
  if (!findColumn) {
    return NextResponse.json({ error: "Column not found" }, { status: 400 });
  }
  const findTask = findColumn?.tasks.find((t) => t.title === taskName);
  if (!findTask) {
    return NextResponse.json({ error: "Task not found" }, { status: 400 });
  }

  const body = await req.json();

  if (body.subtasks) {
    findTask.subtasks = body.subtasks;
  }
  if (body.status) {
    findTask.status = body.status;
  }

  return NextResponse.json({
    success: true,
    task: findTask,
  });
}
