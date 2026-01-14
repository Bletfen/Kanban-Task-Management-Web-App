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
  { params }: { params: Promise<{ board: string }> }
) {
  const { board } = await params;
  const body = await req.json();
  const columnName = body?.status;
  const boardData = data.boards.find((b) => b.name === board);

  if (!boardData) {
    return NextResponse.json({ error: "Board not found" }, { status: 400 });
  }
  if (!columnName) {
    return NextResponse.json(
      { error: "Column name is required" },
      { status: 400 }
    );
  }

  const findColumn = boardData.columns.find((c) => c.name === columnName);
  if (!findColumn) {
    return NextResponse.json({ error: "Column not found" }, { status: 400 });
  }
  const newTask = {
    title: body?.title,
    description: body?.description,
    status: columnName,
    subtasks: body?.subtasks,
  };
  const newColumnData = boardData.columns.map((col) => {
    if (col.name === columnName) {
      col.tasks.push(newTask);
    }
    return col;
  });
  const updatedBoards = data.boards.map((b) => {
    if (b.name === board) {
      return {
        ...b,
        columns: newColumnData,
      };
    }
    return b;
  });
  data.boards = updatedBoards;

  return NextResponse.json({ message: "Task added successfully" });
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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ board: string }> }
) {
  const { board } = await params;
  const existingBoard = data.boards.find((b) => b.name === board);
  if (!existingBoard) {
    return NextResponse.json({ error: "Board not found" }, { status: 400 });
  }
  const updatedBoards = (data.boards = data.boards.filter(
    (b) => b.name !== board
  ));
  data.boards = updatedBoards;
  return NextResponse.json({ message: "Board deleted" });
}
