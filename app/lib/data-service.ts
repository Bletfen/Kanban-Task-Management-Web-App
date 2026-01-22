
import { kv } from "@vercel/kv";
import initialData from "@/data/data.json";

export async function getBoards(): Promise<TBoards> {
  let boards = await kv.get<TBoards>("boards");
  
  if (!boards) {
    boards = initialData.boards;
    await kv.set("boards", boards);
  }
  
  return boards;
}

export async function saveBoards(boards: TBoards): Promise<void> {
  await kv.set("boards", boards);
}

export async function getBoard(boardName: string): Promise<IBoard | null> {
  const boards = await getBoards();
  return boards.find((b) => b.name === boardName) || null;
}