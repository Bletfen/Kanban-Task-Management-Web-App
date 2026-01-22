# Kanban Task Management Web Application

A modern, full-stack task management application built with Next.js 15, MongoDB, and TypeScript. Features a clean interface for organizing projects using the Kanban methodology with boards, columns, and tasks.

## Features

- **Board Management**: Create, edit, and delete multiple project boards
- **Column Organization**: Customize workflow stages with flexible column management
- **Task Tracking**: Create detailed tasks with descriptions and subtasks
- **Drag and Drop**: Move tasks between columns to track progress
- **Status Updates**: Update task status and mark subtasks as complete
- **Private Workspaces**: Each user gets their own isolated workspace with personal data
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices
- **Dark/Light Theme**: Toggle between dark and light modes for comfortable viewing
- **Real-time Updates**: Changes persist immediately to the database

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with connection pooling
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel-ready with serverless functions
- **Session Management**: Cookie-based user identification
- **UI Components**: Custom React components with Embla Carousel

## Prerequisites

- Node.js 20.x or higher
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd kanban-task-management-web-app
```

2. Install dependencies:

```bash
npm install
```

3. Create environment variables:

```bash
# Create .env.local file in the root directory
echo "MONGODB_URI=your_mongodb_connection_string" > .env.local
```

4. Initialize the database with sample data:

```bash
npm run migrate
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kanban?retryWrites=true&w=majority
```

### MongoDB Connection String

For MongoDB Atlas:

1. Create a cluster at [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a database user with read/write permissions
3. Whitelist your IP address (use 0.0.0.0/0 for Vercel deployments)
4. Get the connection string from the "Connect" button
5. Replace `username` and `password` with your credentials
6. Ensure the database name is set to `kanban`

For local MongoDB:

```env
MONGODB_URI=mongodb://localhost:27017/kanban
```

## Project Structure

```
kanban-task-management-web-app/
├── app/
│   ├── api/
│   │   └── boards/
│   │       ├── route.ts                    # Board CRUD operations
│   │       └── [board]/
│   │           ├── route.ts                # Single board operations
│   │           └── columns/
│   │               ├── route.ts            # Column management
│   │               └── [columnName]/tasks/
│   │                   └── [taskName]/
│   │                       └── route.ts    # Task operations
│   ├── boards/
│   │   ├── page.tsx                        # Boards listing page
│   │   └── [board]/
│   │       └── page.tsx                    # Board detail page
│   ├── lib/
│   │   ├── mongodb.ts                      # Database functions
│   │   └── session.ts                      # User session management
│   ├── globals.css                         # Global styles
│   ├── layout.tsx                          # Root layout
│   └── page.tsx                            # Home page
├── components/
│   ├── Header.tsx                          # Application header
│   ├── SideBar.tsx                         # Navigation sidebar
│   ├── ColumnsClient.tsx                   # Board columns view
│   ├── Task.tsx                            # Individual task card
│   ├── Form.tsx                            # Task/Board forms
│   └── ...                                 # Other components
├── data/
│   └── data.json                           # Initial seed data
├── scripts/
│   └── migrate-data.ts                     # Database migration script
├── middleware.ts                           # Session middleware
└── types.d.ts                              # TypeScript type definitions
```

## API Routes

### Boards

- `GET /api/boards` - Fetch all boards for current user
- `POST /api/boards` - Create a new board

### Single Board

- `GET /api/boards/[board]` - Fetch specific board
- `POST /api/boards/[board]` - Add task to board
- `PUT /api/boards/[board]` - Update board details
- `DELETE /api/boards/[board]` - Delete board

### Columns

- `POST /api/boards/[board]/columns` - Add column to board

### Tasks

- `PUT /api/boards/[board]/columns/[columnName]/tasks/[taskName]` - Update task
- `DELETE /api/boards/[board]/columns/[columnName]/tasks/[taskName]` - Delete task

## Database Schema

### Board Document

```typescript
{
  userId: string,
  name: string,
  columns: [
    {
      name: string,
      tasks: [
        {
          title: string,
          description: string,
          status: string,
          subtasks: [
            {
              title: string,
              isCompleted: boolean
            }
          ]
        }
      ]
    }
  ]
}
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Import to Vercel:
   - Go to [https://vercel.com/new](https://vercel.com/new)
   - Select your GitHub repository
   - Click "Import"

3. Configure environment variables:
   - Navigate to Project Settings > Environment Variables
   - Add `MONGODB_URI` with your MongoDB Atlas connection string
   - Select all environments (Production, Preview, Development)

4. Deploy:
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Post-Deployment

After deployment, your application will be available at `https://your-project.vercel.app`

Subsequent deployments happen automatically on every push to the main branch.

## User Session Management

The application uses cookie-based sessions to provide isolated workspaces:

- Each user receives a unique identifier stored in an HTTP-only cookie
- First-time users are automatically initialized with sample boards
- Data isolation ensures each user only sees their own boards and tasks
- Sessions persist for 1 year

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run migrate` - Import initial data from data.json to MongoDB

## Development

### Adding New Features

1. Create necessary API routes in `app/api/`
2. Add database functions in `app/lib/mongodb.ts`
3. Build UI components in `components/`
4. Update TypeScript types in `types.d.ts`

### Database Functions

All database operations use the functions exported from `app/lib/mongodb.ts`:

- `getBoards(userId)` - Retrieve all boards for a user
- `getBoardByName(name, userId)` - Get specific board
- `insertBoard(board, userId)` - Create new board
- `updateBoard(name, data, userId)` - Update board data
- `deleteBoard(name, userId)` - Remove board
- `updateBoardColumns(boardName, column, userId)` - Add column
- `updateTask(board, column, task, data, userId)` - Modify task
- `deleteTask(board, column, task, userId)` - Remove task
- `initializeUserBoards(userId)` - Set up new user workspace

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue in the GitHub repository.
