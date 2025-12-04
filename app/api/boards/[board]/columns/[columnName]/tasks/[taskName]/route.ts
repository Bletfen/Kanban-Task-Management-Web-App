import data from "@data/data.json";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ board: string; columnName: string; taskName: string }>;
  }
) {
  const { board, columnName, taskName } = await params;

  const findBoard = data.boards.find((b) => b.name === board);
  if (!findBoard) {
    return NextResponse.json({ error: "Board not found" }, { status: 400 });
  }
  const findColumn = findBoard?.columns.find((c) => c.name === columnName);
  if (!findColumn) {
    return NextResponse.json({ error: "Column not found" }, { status: 400 });
  }
  const findTask = findColumn?.tasks.find((t) => t.title === taskName);
  if (!findTask) {
    return NextResponse.json({ error: "Task not found" }, { status: 400 });
  }

  const body = await req.json();

  const newStatus = body.status;

  // თუ status შეიცვალა და სხვა column-შია
  if (newStatus && newStatus !== columnName) {
    const targetColumn = findBoard.columns.find((c) => c.name === newStatus);
    if (!targetColumn) {
      return NextResponse.json(
        { error: "Target column not found" },
        { status: 400 }
      );
    }

    // გადაიტანე task ახალ column-ში
    const updatedBoard = data.boards.map((b) =>
      b.name === board
        ? {
            ...b,
            columns: b.columns.map((c) => {
              if (c.name === columnName) {
                // წაშალე ძველი column-დან
                return {
                  ...c,
                  tasks: c.tasks.filter((t) => t.title !== taskName),
                };
              } else if (c.name === newStatus) {
                // დაამატე ახალ column-ში
                return {
                  ...c,
                  tasks: [...c.tasks, { ...findTask, ...body }],
                };
              }
              return c;
            }),
          }
        : b
    );
    data.boards = updatedBoard;
  } else {
    // უბრალოდ განაახლე task იგივე column-ში
    const updatedBoard = data.boards.map((b) =>
      b.name === board
        ? {
            ...b,
            columns: b.columns.map((c) =>
              c.name === columnName
                ? {
                    ...c,
                    tasks: c.tasks.map((t) =>
                      t.title === taskName ? { ...t, ...body } : t
                    ),
                  }
                : c
            ),
          }
        : b
    );
    data.boards = updatedBoard;
  }

  return NextResponse.json({
    message: "Data changed",
  });
}
