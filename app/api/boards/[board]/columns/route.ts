// import { NextResponse } from "next/server";
// import data from "@data/data.json";

// export async function POST(
//   req: Request,
//   { params }: { params: Promise<{ board: string }> },
// ) {
//   const { board } = await params;
//   const body = await req.json();
//   if (!body?.name) {
//     return NextResponse.json({ error: "Can't be empty" }, { status: 400 });
//   }
//   const updatedBoard = data.boards.map((b) => {
//     if (b.name === board) {
//       return {
//         ...b,
//         columns: [...b.columns, body],
//       };
//     }
//     return b;
//   });
//   data.boards = updatedBoard;
//   return NextResponse.json(
//     { message: "Task added successfully" },
//     { status: 200 },
//   );
// }

import { NextResponse } from "next/server";
import { getBoards, saveBoards } from "../../../../lib/data-service";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ board: string }> },
) {
  const { board } = await params;
  const body = await req.json();
  const boards = await getBoards();

  if (!body?.name) {
    return NextResponse.json({ error: "Can't be empty" }, { status: 400 });
  }

  const updatedBoards = boards.map((b) => {
    if (b.name === board) {
      return {
        ...b,
        columns: [...b.columns, { name: body.name, tasks: [] }],
      };
    }
    return b;
  });

  await saveBoards(updatedBoards); // ✅ შენახვა

  return NextResponse.json({ message: "Column added successfully" });
}
