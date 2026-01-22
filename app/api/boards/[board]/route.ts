import { NextResponse } from "next/server";
import { getBoardByName, updateBoard, deleteBoard } from "@/app/lib/mongodb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ board: string }> },
) {
  try {
    const { board } = await params;
    const boardData = await getBoardByName(board);

    if (!boardData) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }
    return NextResponse.json(boardData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch board" },
      { status: 500 },
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ board: string }> },
) {
  try {
    const { board } = await params;
    const body = await req.json();
    const columnName = body?.status;

    const boardData = await getBoardByName(board);
    if (!boardData) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    if (!columnName) {
      return NextResponse.json(
        { error: "Column name is required" },
        { status: 400 },
      );
    }

    const findColumn = boardData.columns.find(
      (c: any) => c.name === columnName,
    );
    if (!findColumn) {
      return NextResponse.json({ error: "Column not found" }, { status: 404 });
    }

    const newTask = {
      title: body?.title,
      description: body?.description,
      status: columnName,
      subtasks: body?.subtasks || [],
    };

    const updatedColumns = boardData.columns.map((col: any) => {
      if (col.name === columnName) {
        return {
          ...col,
          tasks: [...col.tasks, newTask],
        };
      }
      return col;
    });

    await updateBoard(board, { columns: updatedColumns });

    return NextResponse.json(
      { message: "Task added successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to add task" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ board: string }> },
) {
  try {
    const { board } = await params;
    const body = await req.json();

    const existing = await getBoardByName(board);
    if (!existing) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    const nextName = (body?.name as string | undefined)?.trim();
    const nextColumns = body?.columns as any[] | undefined;

    if (!nextName) {
      return NextResponse.json(
        { error: "Board name cannot be empty" },
        { status: 400 },
      );
    }

    if (nextColumns && !Array.isArray(nextColumns)) {
      return NextResponse.json(
        { error: "Columns must be an array" },
        { status: 400 },
      );
    }

    const sanitizedColumns =
      nextColumns?.map((col: any) => ({
        ...col,
        name: (col.name || "").trim(),
        tasks: col.tasks || [],
      })) ?? existing.columns;

    const emptyColumn = sanitizedColumns.find((c: any) => !c.name);
    if (emptyColumn) {
      return NextResponse.json(
        { error: "Column names cannot be empty" },
        { status: 400 },
      );
    }

    await updateBoard(board, {
      name: nextName,
      columns: sanitizedColumns,
    });

    return NextResponse.json({ message: "Board updated" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update board" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ board: string }> },
) {
  try {
    const { board } = await params;
    const existingBoard = await getBoardByName(board);

    if (!existingBoard) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    await deleteBoard(board);

    return NextResponse.json({ message: "Board deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete board" },
      { status: 500 },
    );
  }
}
