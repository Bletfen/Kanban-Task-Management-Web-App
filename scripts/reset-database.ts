import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import * as path from "path";

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const uri = process.env.MONGODB_URI!;

async function resetDatabase() {
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

    // Delete all boards
    const result = await collection.deleteMany({});
    console.log(`Deleted ${result.deletedCount} boards from database`);

    console.log("\nDatabase reset complete!");
    console.log("Run 'npm run migrate' to initialize with fresh data");
  } catch (error) {
    console.error("Reset failed:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

resetDatabase();
