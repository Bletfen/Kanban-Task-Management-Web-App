import { NextResponse } from "next/server";
import { getBoards, insertBoard } from "@/app/lib/mongodb";

export async function GET() {
  const boards = await getBoards();
  return NextResponse.json(boards);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newBoard = {
    name: body.name,
    columns: body.columns.map((c: any) => ({
      name: c.name,
      tasks: [],
    })),
  };

  await insertBoard(newBoard);

  return NextResponse.json(
    { message: "Board created", board: newBoard },
    { status: 201 },
  );
}
