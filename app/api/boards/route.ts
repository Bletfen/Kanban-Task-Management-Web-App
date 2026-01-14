import { NextResponse } from "next/server";
import data from "@data/data.json";

export async function GET(res: Request) {
  const boards = data.boards;
  if (!boards) {
    return NextResponse.json(
      {
        error: "No board found",
      },
      { status: 400 }
    );
  }
  return NextResponse.json(boards, { status: 200 });
}

export async function POST(req: Request) {
  const reqBody = await req.json();
  const newBoard = reqBody;
  data.boards.push(newBoard);
  return NextResponse.json(
    { message: "Board added successfully" },
    { status: 201 }
  );
}
