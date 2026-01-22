import { NextResponse } from "next/server";
import { updateTask, deleteTask } from "@/app/lib/mongodb";
import { getUserId } from "@/app/lib/session";

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ board: string; columnName: string; taskName: string }>;
  },
) {
  try {
    const userId = await getUserId();
    const { board, columnName, taskName } = await params;
    const body = await req.json();

    await updateTask(board, columnName, taskName, body, userId);

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
    const userId = await getUserId();
    const { board, columnName, taskName } = await params;

    await deleteTask(board, columnName, taskName, userId);

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
