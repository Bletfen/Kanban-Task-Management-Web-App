// import data from "@data/data.json";
// import { NextResponse } from "next/server";

// export async function PUT(
//   req: Request,
//   {
//     params,
//   }: {
//     params: Promise<{ board: string; columnName: string; taskName: string }>;
//   }
// ) {
//   const { board, columnName, taskName } = await params;

//   const findBoard = data.boards.find((b) => b.name === board);
//   if (!findBoard) {
//     return NextResponse.json({ error: "Board not found" }, { status: 400 });
//   }
//   const findColumn = findBoard?.columns.find((c) => c.name === columnName);
//   if (!findColumn) {
//     return NextResponse.json({ error: "Column not found" }, { status: 400 });
//   }
//   const findTask = findColumn?.tasks.find((t) => t.title === taskName);
//   if (!findTask) {
//     return NextResponse.json({ error: "Task not found" }, { status: 400 });
//   }

//   const body = await req.json();

//   const newStatus = body.status;

//   if (newStatus && newStatus !== columnName) {
//     const targetColumn = findBoard.columns.find((c) => c.name === newStatus);
//     if (!targetColumn) {
//       return NextResponse.json(
//         { error: "Target column not found" },
//         { status: 400 }
//       );
//     }
//     const updatedBoard = data.boards.map((b) =>
//       b.name === board
//         ? {
//             ...b,
//             columns: b.columns.map((c) => {
//               if (c.name === columnName) {
//                 return {
//                   ...c,
//                   tasks: c.tasks.filter((t) => t.title !== taskName),
//                 };
//               } else if (c.name === newStatus) {
//                 return {
//                   ...c,
//                   tasks: [...c.tasks, { ...findTask, ...body }],
//                 };
//               }
//               return c;
//             }),
//           }
//         : b
//     );
//     data.boards = updatedBoard;
//   } else {
//     const updatedBoard = data.boards.map((b) =>
//       b.name === board
//         ? {
//             ...b,
//             columns: b.columns.map((c) =>
//               c.name === columnName
//                 ? {
//                     ...c,
//                     tasks: c.tasks.map((t) =>
//                       t.title === taskName ? { ...t, ...body } : t
//                     ),
//                   }
//                 : c
//             ),
//           }
//         : b
//     );
//     data.boards = updatedBoard;
//   }

//   return NextResponse.json({
//     message: "Data changed",
//   });
// }

// export async function DELETE(
//   req: Request,
//   {
//     params,
//   }: {
//     params: Promise<{ board: string; columnName: string; taskName: string }>;
//   }
// ) {
//   const { board, columnName, taskName } = await params;

//   const findBoard = data.boards.find((b) => b.name === board);
//   if (!findBoard) {
//     return NextResponse.json({ error: "Board not found" }, { status: 400 });
//   }
//   const findColumn = findBoard?.columns.find((c) => c.name === columnName);
//   if (!findColumn) {
//     return NextResponse.json({ error: "Column not found" }, { status: 400 });
//   }
//   const findTask = findColumn?.tasks.find((t) => t.title === taskName);
//   if (!findTask) {
//     return NextResponse.json({ error: "Task not found" }, { status: 400 });
//   }

//   const updatedBoard = data.boards.map((b) =>
//     b.name === board
//       ? {
//           ...b,
//           columns: b.columns.map((c) =>
//             c.name === columnName
//               ? { ...c, tasks: c.tasks.filter((t) => t.title !== taskName) }
//               : c
//           ),
//         }
//       : b
//   );

//   data.boards = updatedBoard;

//   return NextResponse.json({
//     message: "Task Deleted",
//   });
// }

import { NextResponse } from "next/server";
import { getBoards, saveBoards } from "../../../../../../../lib/data-service";

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ board: string; columnName: string; taskName: string }>;
  },
) {
  const { board, columnName, taskName } = await params;
  const boards = await getBoards();

  const findBoard = boards.find((b: IBoard) => b.name === board);
  if (!findBoard) {
    return NextResponse.json({ error: "Board not found" }, { status: 404 });
  }

  const findColumn = findBoard.columns.find(
    (c: TColumns) => c.name === columnName,
  );
  if (!findColumn) {
    return NextResponse.json({ error: "Column not found" }, { status: 404 });
  }

  const findTask = findColumn.tasks.find((t: ITask) => t.title === taskName);
  if (!findTask) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  const body = await req.json();
  const newStatus = body.status;

  if (newStatus && newStatus !== columnName) {
    // Status შეცვლა - task გადატანა სხვა column-ში
    const targetColumn = findBoard.columns.find(
      (c: TColumns) => c.name === newStatus,
    );
    if (!targetColumn) {
      return NextResponse.json(
        { error: "Target column not found" },
        { status: 404 },
      );
    }

    const updatedBoards = boards.map((b: IBoard) =>
      b.name === board
        ? {
            ...b,
            columns: b.columns.map((c: TColumns) => {
              if (c.name === columnName) {
                return {
                  ...c,
                  tasks: c.tasks.filter((t: ITask) => t.title !== taskName),
                };
              } else if (c.name === newStatus) {
                return {
                  ...c,
                  tasks: [...c.tasks, { ...findTask, ...body }],
                };
              }
              return c;
            }),
          }
        : b,
    );

    await saveBoards(updatedBoards); // ✅ შენახვა
  } else {
    // Task-ის რედაქტირება იმავე column-ში
    const updatedBoards = boards.map((b: IBoard) =>
      b.name === board
        ? {
            ...b,
            columns: b.columns.map((c: TColumns) =>
              c.name === columnName
                ? {
                    ...c,
                    tasks: c.tasks.map((t: ITask) =>
                      t.title === taskName ? { ...t, ...body } : t,
                    ),
                  }
                : c,
            ),
          }
        : b,
    );

    await saveBoards(updatedBoards); // ✅ შენახვა
  }

  return NextResponse.json({ message: "Task updated" });
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ board: string; columnName: string; taskName: string }>;
  },
) {
  const { board, columnName, taskName } = await params;
  const boards = await getBoards();

  const findBoard = boards.find((b: IBoard) => b.name === board);
  if (!findBoard) {
    return NextResponse.json({ error: "Board not found" }, { status: 404 });
  }

  const findColumn = findBoard.columns.find(
    (c: TColumns) => c.name === columnName,
  );
  if (!findColumn) {
    return NextResponse.json({ error: "Column not found" }, { status: 404 });
  }

  const findTask = findColumn.tasks.find((t: ITask) => t.title === taskName);
  if (!findTask) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  const updatedBoards = boards.map((b: IBoard) =>
    b.name === board
      ? {
          ...b,
          columns: b.columns.map((c: TColumns) =>
            c.name === columnName
              ? { ...c, tasks: c.tasks.filter((t) => t.title !== taskName) }
              : c,
          ),
        }
      : b,
  );

  await saveBoards(updatedBoards); // ✅ შენახვა

  return NextResponse.json({ message: "Task deleted" });
}
