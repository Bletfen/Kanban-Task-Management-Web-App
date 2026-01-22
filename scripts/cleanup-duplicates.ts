import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import * as path from "path";

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const uri = process.env.MONGODB_URI!;

async function cleanupDuplicates() {
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

    // Get all boards grouped by userId and name
    const boards = await collection.find({}).toArray();

    const boardMap = new Map<string, any[]>();

    for (const board of boards) {
      const userId = board.userId || "undefined";
      const name = board.name || "unknown";
      const key = `${userId}-${name}`;
      if (!boardMap.has(key)) {
        boardMap.set(key, []);
      }
      boardMap.get(key)!.push(board);
    }

    let deletedCount = 0;

    // Keep only the first instance of each userId-name combination
    for (const [key, instances] of boardMap) {
      if (instances.length > 1) {
        console.log(`Found ${instances.length} duplicates for ${key}`);

        // Delete all except the first one
        for (let i = 1; i < instances.length; i++) {
          await collection.deleteOne({ _id: instances[i]._id });
          deletedCount++;
          console.log(`  Deleted duplicate: ${instances[i]._id}`);
        }
      }
    }

    console.log(`\nTotal duplicates deleted: ${deletedCount}`);

    // List remaining boards
    const remainingBoards = await collection.find({}).toArray();
    const uniqueUsers = new Set(
      remainingBoards.map((b: any) => b.userId || "undefined"),
    );

    console.log(`\nRemaining boards: ${remainingBoards.length}`);
    console.log(`Unique users: ${uniqueUsers.size}`);

    uniqueUsers.forEach((userId) => {
      const userBoards = remainingBoards.filter(
        (b: any) => (b.userId || "undefined") === userId,
      );
      console.log(`  User ${userId}: ${userBoards.length} boards`);
      userBoards.forEach((board: any) => {
        console.log(`    - ${board.name}`);
      });
    });
  } catch (error) {
    console.error("Cleanup failed:", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("\nCleanup completed!");
  }
}

cleanupDuplicates();
