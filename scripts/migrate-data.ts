import { MongoClient } from "mongodb";
import data from "../data/data.json";
import * as dotenv from "dotenv";
import * as path from "path";

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const uri = process.env.MONGODB_URI!;

async function migrate() {
  if (!uri) {
    console.error("MONGODB_URI is not set in environment variables");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("kanban");
    const collection = db.collection("boards");

    // Clear existing data (optional - remove these lines if you want to keep existing data)
    await collection.deleteMany({});
    console.log("Cleared existing boards");

    // Insert boards from data.json
    if (data.boards.length > 0) {
      const result = await collection.insertMany(data.boards);
      console.log(`Successfully inserted ${result.insertedCount} boards`);
    } else {
      console.log("No boards to insert");
    }

    // List all boards
    const boards = await collection.find({}).toArray();
    console.log("\nBoards in database:");
    boards.forEach((board: any) => {
      console.log(`- ${board.name} (${board.columns.length} columns)`);
    });
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("\nMigration completed!");
  }
}

migrate();
