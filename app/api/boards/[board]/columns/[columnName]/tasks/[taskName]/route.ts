import { NextResponse } from "next/server";
import { updateTask, deleteTask } from "@/app/lib/mongodb";

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ board: string; columnName: string; taskName: string }>;
  },
) {
  try {
    const { board, columnName, taskName } = await params;
    const body = await req.json();

    await updateTask(board, columnName, taskName, body);

    return NextResponse.json({
      message: "Task updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update task" },
      { status: error.message?.includes("not found") ? 404 : 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ board: string; columnName: string; taskName: string }>;
  },
) {
  try {
    const { board, columnName, taskName } = await params;

    await deleteTask(board, columnName, taskName);

    return NextResponse.json({
      message: "Task deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete task" },
      { status: 500 },
    );
  }
}
