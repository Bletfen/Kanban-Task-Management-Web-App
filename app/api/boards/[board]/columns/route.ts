import { NextResponse } from "next/server";
import data from "@data/data.json";
import { error } from "console";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ board: string }> }
) {
  const { board } = await params;
  const body = await req.json();
  if (!body?.name) {
    return NextResponse.json({ error: "Can't be empty" }, { status: 400 });
  }
  const updatedBoard = data.boards.map((b) => {
    if (b.name === board) {
      return {
        ...b,
        columns: [...b.columns, body],
      };
    }
    return b;
  });
  data.boards = updatedBoard;
  return NextResponse.json(
    { message: "Task added successfully" },
    { status: 200 }
  );
}
