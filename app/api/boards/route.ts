import { NextResponse } from "next/server";
import { getBoards, insertBoard } from "@/app/lib/mongodb";
import { getUserId } from "@/app/lib/session";

export async function GET() {
  const userId = await getUserId();
  const boards = await getBoards(userId);
  return NextResponse.json(boards);
}

export async function POST(req: Request) {
  const userId = await getUserId();
  const body = await req.json();

  const newBoard = {
    name: body.name,
    columns: body.columns.map((c: any) => ({
      name: c.name,
      tasks: [],
    })),
  };

  await insertBoard(newBoard, userId);

  return NextResponse.json(
    { message: "Board created", board: newBoard },
    { status: 201 },
  );
}
