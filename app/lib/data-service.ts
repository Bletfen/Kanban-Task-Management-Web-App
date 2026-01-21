import fs from "fs/promises";
import path from "path";

export async function getBoards(): Promise<TBoards> {
  try {
    const filePath = path.join(process.cwd(), "data", "data.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    return data.boards;
  } catch (error) {
    console.error("Error reading boards:", error);
    return [];
  }
}

export async function getBoard(boardName: string): Promise<IBoard | null> {
  const boards = await getBoards();
  return boards.find((b) => b.name === boardName) || null;
}
