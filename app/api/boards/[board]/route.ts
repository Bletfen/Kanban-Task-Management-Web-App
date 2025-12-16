import { NextResponse } from "next/server";
import data from "@data/data.json";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ board: string }> }
) {
  const boardName = await params;
  const boardData = data.boards.find((b) => b.name === boardName.board);

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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ board: string }> }
) {
  const { board } = await params;
  const existing = data.boards.find((b) => b.name === board);
  if (!existing) {
    return NextResponse.json({ error: "Board not found" }, { status: 400 });
  }

  const body = await req.json();
  const nextName = (body?.name as string | undefined)?.trim();
  const nextColumns = body?.columns as TColumns | undefined;

  if (!nextName) {
    return NextResponse.json(
      { error: "Board name cannot be empty" },
      { status: 400 }
    );
  }

  if (nextColumns && !Array.isArray(nextColumns)) {
    return NextResponse.json(
      { error: "Columns must be an array" },
      { status: 400 }
    );
  }

  const sanitizedColumns =
    nextColumns?.map((col: TColumns) => ({
      ...col,
      name: (col.name || "").trim(),
    })) ?? existing.columns;

  const emptyColumn = sanitizedColumns.find((c) => !c.name);
  if (emptyColumn) {
    return NextResponse.json(
      { error: "Column names cannot be empty" },
      { status: 400 }
    );
  }

  data.boards = data.boards.map((b) =>
    b.name === board
      ? {
          ...b,
          name: nextName,
          columns: sanitizedColumns,
        }
      : b
  );

  return NextResponse.json({ message: "Board updated" });
}
