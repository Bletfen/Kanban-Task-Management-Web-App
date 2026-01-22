# MongoDB & Vercel Setup Guide

## What's been updated

All API routes have been converted from using local JSON data to MongoDB:

1. **`app/api/boards/route.ts`** - GET all boards, POST new board
2. **`app/api/boards/[board]/route.ts`** - GET board by name, POST task, PUT/DELETE board
3. **`app/api/boards/[board]/columns/route.ts`** - POST new column
4. **`app/api/boards/[board]/columns/[columnName]/tasks/[taskName]/route.ts`** - PUT/DELETE tasks

## Development Setup

1. Ensure MongoDB URI is set in `.env.local`:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kanban?retryWrites=true&w=majority
```

2. Install dependencies:

```bash
npm install
```

3. Run development server:

```bash
npm run dev
```

## Vercel Deployment

1. **Push code to GitHub**

   ```bash
   git add .
   git commit -m "Add MongoDB integration"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Select your GitHub repository
   - Import the project

3. **Set Environment Variables**
   - In Vercel project settings, go to **Environment Variables**
   - Add `MONGODB_URI` with your MongoDB Atlas connection string:

   ```
   mongodb+srv://username:password@cluster.mongodb.net/kanban?retryWrites=true&w=majority
   ```

4. **Deploy**
   - Vercel will automatically build and deploy
   - Redeploys happen on every git push to main

## MongoDB Atlas Setup (if not already done)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user with a secure password
4. Whitelist all IP addresses (0.0.0.0/0) for Vercel compatibility
5. Get the connection string from "Connect" button
6. Replace `username:password` with your credentials
7. Use this connection string in `.env.local` and Vercel

## Note

- The MongoDB connection uses connection pooling for better performance in serverless environments
- In production (Vercel), a new connection is created per request
- In development, connections are cached globally to avoid exhausting connection limits
