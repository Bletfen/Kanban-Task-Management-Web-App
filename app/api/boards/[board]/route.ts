import { NextResponse } from "next/server";
import data from "../../../../data/data.json";

export async function GET(
  req: Request,
  { params }: { params: { board: string } }
) {
  const boardName = params.board;

  const boardData = data.boards.find((b: TBoards) => b.name === boardName);
  if (!boardData) {
    return NextResponse.json({ error: "Board not found" }, { status: 400 });
  }
  return NextResponse.json(boardData, { status: 200 });
}

export async function POST(
  req: Request,
  { params }: { params: { board: string } }
) {
  const boardName = params.board;
  const body = await req.json();

  return NextResponse.json({
    message: "New Task added",
    boardName,
    received: body,
  });
}
