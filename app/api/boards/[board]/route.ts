import { NextResponse } from "next/server";
import data from "../../../../data/data.json";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ board: string }> }
) {
  const boardName = await params;
  const nameFromData = data.boards.some(
    (board: IBoard) => board.name !== boardName.board
  );
  const boardData = data.boards.find((b) => b.name === boardName.board);

  console.log(boardData);
  if (!boardData || !nameFromData) {
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
