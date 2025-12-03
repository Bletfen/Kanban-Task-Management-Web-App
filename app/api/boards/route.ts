import { NextResponse } from "next/server";
import data from "@data/data.json";

export async function GET(res: Request) {
  const boards = data.boards;
  if (!boards) {
    return NextResponse.json(
      {
        error: "No board found",
      },
      { status: 400 }
    );
  }
  return NextResponse.json(boards, { status: 200 });
}
