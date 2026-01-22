import { NextResponse } from "next/server";
import { getBoardByName, updateBoardColumns } from "@/app/lib/mongodb";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ board: string }> },
) {
  try {
    const { board } = await params;
    const body = await req.json();

    if (!body?.name) {
      return NextResponse.json(
        { error: "Column name cannot be empty" },
        { status: 400 },
      );
    }

    const boardData = await getBoardByName(board);
    if (!boardData) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    const newColumn = {
      name: body.name,
      tasks: [],
    };

    await updateBoardColumns(board, newColumn);

    return NextResponse.json(
      { message: "Column added successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add column" },
      { status: 500 },
    );
  }
}
