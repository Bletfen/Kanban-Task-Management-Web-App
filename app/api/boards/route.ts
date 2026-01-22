import { NextResponse } from "next/server";
import data from "@data/data.json";
import { getBoards, saveBoards } from "@/app/lib/data-service";

export async function GET(res: Request) {
  const boards = await getBoards();
  if (!boards) {
    return NextResponse.json(
      {
        error: "No board found",
      },
      { status: 400 },
    );
  }
  return NextResponse.json(boards, { status: 200 });
}

// export async function POST(req: Request) {
//   const reqBody = await req.json();
//   const newBoard = reqBody;
//   data.boards.push(newBoard);
//   await saveBoards(boards);
//   return NextResponse.json(
//     { message: "Board added successfully" },
//     { status: 201 },
//   );
// }

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const boards = await getBoards();

    const newBoard = {
      name: body.name,
      columns: body.columns.map((col: any) => ({
        name: col.name,
        tasks: [],
      })),
    };

    boards.push(newBoard);
    await saveBoards(boards);

    return NextResponse.json(
      { message: "Board created", board: newBoard },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create board" },
      { status: 500 },
    );
  }
}
