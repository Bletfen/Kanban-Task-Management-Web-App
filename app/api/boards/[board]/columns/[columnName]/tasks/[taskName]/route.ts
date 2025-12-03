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

  const updatedBoard = {...findBoard,columns:{...findColumn, tasks:{...findTask,...body}} }

  const updatedTaks = { ...findTask, ...body };
  data = 
  return NextResponse.json({
    updatedTaks,
  });
}
