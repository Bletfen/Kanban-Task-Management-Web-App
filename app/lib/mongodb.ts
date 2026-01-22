import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getBoards(): Promise<IBoard[]> {
  const client = await clientPromise;
  const db = client.db("kanban");
  const boards = await db.collection("boards").find().toArray();
  return boards.map(({ _id, ...board }) => board) as IBoard[];
}

export async function getBoardByName(name: string): Promise<IBoard | null> {
  const client = await clientPromise;
  const db = client.db("kanban");
  const board = await db.collection("boards").findOne({ name });
  if (!board) return null;
  const { _id, ...boardData } = board;
  return boardData as IBoard;
}

export async function insertBoard(board: any) {
  const client = await clientPromise;
  const db = client.db("kanban");
  return db.collection("boards").insertOne(board);
}

export async function updateBoard(name: string, data: any) {
  const client = await clientPromise;
  const db = client.db("kanban");
  return db.collection("boards").updateOne({ name }, { $set: data });
}

export async function deleteBoard(name: string) {
  const client = await clientPromise;
  const db = client.db("kanban");
  return db.collection("boards").deleteOne({ name });
}

export async function updateBoardColumns(boardName: string, newColumn: any) {
  const client = await clientPromise;
  const db = client.db("kanban");
  return db
    .collection("boards")
    .updateOne({ name: boardName }, { $push: { columns: newColumn } as any });
}

export async function updateTask(
  boardName: string,
  columnName: string,
  taskTitle: string,
  updateData: any,
) {
  const client = await clientPromise;
  const db = client.db("kanban");

  const board = await db.collection("boards").findOne({ name: boardName });
  if (!board) throw new Error("Board not found");

  const column = board.columns.find((c: any) => c.name === columnName);
  if (!column) throw new Error("Column not found");

  const taskIndex = column.tasks.findIndex((t: any) => t.title === taskTitle);
  if (taskIndex === -1) throw new Error("Task not found");

  const newStatus = updateData.status;

  if (newStatus && newStatus !== columnName) {
    const targetColumn = board.columns.find((c: any) => c.name === newStatus);
    if (!targetColumn) throw new Error("Target column not found");

    const updatedTask = { ...column.tasks[taskIndex], ...updateData };

    return await db
      .collection("boards")
      .updateOne(
        { name: boardName },
        {
          $pull: {
            "columns.$[col].tasks": { title: taskTitle } as any,
          },
        },
        { arrayFilters: [{ "col.name": columnName }] },
      )
      .then(() =>
        db.collection("boards").updateOne(
          { name: boardName },
          {
            $push: {
              "columns.$[col].tasks": updatedTask,
            },
          },
          { arrayFilters: [{ "col.name": newStatus }] },
        ),
      );
  } else {
    return await db.collection("boards").updateOne(
      { name: boardName },
      {
        $set: {
          "columns.$[col].tasks.$[task]": {
            ...column.tasks[taskIndex],
            ...updateData,
          },
        },
      },
      {
        arrayFilters: [{ "col.name": columnName }, { "task.title": taskTitle }],
      },
    );
  }
}

export async function deleteTask(
  boardName: string,
  columnName: string,
  taskTitle: string,
) {
  const client = await clientPromise;
  const db = client.db("kanban");
  return db.collection("boards").updateOne(
    { name: boardName },
    {
      $pull: {
        "columns.$[col].tasks": { title: taskTitle } as any,
      },
    },
    { arrayFilters: [{ "col.name": columnName }] },
  );
}
