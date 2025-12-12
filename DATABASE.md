# Database Setup & Access Guide

## 🚀 Automatic Setup

The SQLite database is **automatically set up** when you first use it. No manual setup required!

1. **Start your dev server**: `npm run dev`
2. **Access any API route** (e.g., visit `/api/projects` or use the dashboard)
3. The database file will be created at: `data/projects.db`
4. Initial schema and sample data will be seeded automatically

## 📍 Database Location

The database file is located at:
```
/data/projects.db
```

This is in the root of your project directory. The `data/` folder is automatically created if it doesn't exist.

## 🔧 Accessing the Database

### Method 1: Using API Routes (Recommended)

The easiest way to interact with the database is through the API routes:

```typescript
// Get all projects
fetch('/api/projects')

// Get filtered projects
fetch('/api/projects?status=Completed&impactArea=Digital Solutions & Innovation')

// Get single project
fetch('/api/projects/ecommerce-redesign')

// Create project
fetch('/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New Project',
    client: 'Client Name',
    status: 'Ongoing',
    date: '2024-01-01',
    impactArea: 'Digital Solutions & Innovation',
    serviceType: 'Web Development',
    // ... other fields
  })
})

// Update project
fetch('/api/projects/ecommerce-redesign', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ /* updated fields */ })
})

// Delete project
fetch('/api/projects/ecommerce-redesign', {
  method: 'DELETE'
})
```

### Method 2: Using Database Utility Scripts

We've created convenient npm scripts to interact with the database:

```bash
# List all projects
npm run db:list

# Get a specific project by slug
npm run db:get ecommerce-redesign

# Get project count and statistics
npm run db:count

# Show database schema
npm run db:schema

# Run custom SQL query
npm run db:query "SELECT * FROM projects WHERE status = 'Completed'"

# Reset database (WARNING: deletes all data)
npm run db:reset
```

### Method 3: Programmatic Access in Your Code

You can directly access the database in your server-side code:

```typescript
import { getDatabase } from '@/lib/db';

// In API routes, Server Components, or Server Actions
const db = getDatabase();

// Query projects
const stmt = db.prepare('SELECT * FROM projects WHERE status = ?');
const projects = stmt.all('Completed');

// Get single project
const getStmt = db.prepare('SELECT * FROM projects WHERE slug = ?');
const project = getStmt.get('ecommerce-redesign');

// Insert project
const insert = db.prepare(`
  INSERT INTO projects (slug, name, client, status, date, impact_area, service_type)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);
insert.run('new-project', 'Project Name', 'Client', 'Ongoing', '2024-01-01', 'Impact Area', 'Service Type');

// Update project
const update = db.prepare('UPDATE projects SET status = ? WHERE slug = ?');
update.run('Completed', 'new-project');

// Delete project
const deleteStmt = db.prepare('DELETE FROM projects WHERE slug = ?');
deleteStmt.run('new-project');
```

### Method 4: Using SQLite CLI Directly

You can also use the SQLite command-line tool directly:

```bash
# Open the database
sqlite3 data/projects.db

# Then run SQL commands:
sqlite> SELECT * FROM projects;
sqlite> SELECT COUNT(*) FROM projects;
sqlite> .schema projects
sqlite> .quit
```

**Note**: SQLite CLI might need to be installed separately:
- **macOS**: `brew install sqlite`
- **Linux**: Usually pre-installed
- **Windows**: Download from [sqlite.org](https://www.sqlite.org/download.html)

## 📊 Database Schema

### Projects Table

```sql
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  client TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('Planning', 'Ongoing', 'Completed')),
  date TEXT NOT NULL,
  impact_area TEXT NOT NULL,
  service_type TEXT NOT NULL,
  image TEXT,
  project_overview TEXT,
  scope_of_work TEXT,
  project_summary TEXT,
  project_url TEXT,
  case_study_url TEXT,
  tools TEXT,              -- JSON array stored as text
  media_files TEXT,        -- JSON array stored as text
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Indexes

- `idx_projects_slug` - On `slug` column
- `idx_projects_status` - On `status` column
- `idx_projects_impact_area` - On `impact_area` column
- `idx_projects_service_type` - On `service_type` column

## 🔍 Example Queries

### Get all completed projects
```sql
SELECT * FROM projects WHERE status = 'Completed';
```

### Get projects by impact area
```sql
SELECT * FROM projects WHERE impact_area = 'Digital Solutions & Innovation';
```

### Search projects by name or client
```sql
SELECT * FROM projects 
WHERE name LIKE '%ecommerce%' OR client LIKE '%shopflow%';
```

### Get project statistics
```sql
SELECT 
  status, 
  COUNT(*) as count 
FROM projects 
GROUP BY status;
```

### Get recent projects
```sql
SELECT * FROM projects 
ORDER BY created_at DESC 
LIMIT 10;
```

## 🛠️ Common Operations

### Reset Database

If you need to reset the database and start fresh:

```bash
npm run db:reset
```

This will delete all data. The database will be automatically re-seeded with initial sample data on the next API call.

### Backup Database

To backup your database:

```bash
# Copy the database file
cp data/projects.db data/projects.db.backup

# Or use SQLite dump
sqlite3 data/projects.db ".backup data/projects.db.backup"
```

### Restore Database

To restore from a backup:

```bash
cp data/projects.db.backup data/projects.db
```

## ⚠️ Important Notes

1. **File-based Database**: SQLite is file-based, so the database file must be accessible to your application
2. **Server-side Only**: The database can only be accessed from server-side code (API routes, Server Components, Server Actions)
3. **Single Connection**: The database uses a single connection that's reused across requests
4. **Automatic Initialization**: Schema and initial data are created automatically on first use
5. **JSON Fields**: `tools` and `media_files` are stored as JSON strings - parse them when reading

## 🐛 Troubleshooting

### Database not found
- Make sure you've started the dev server at least once
- Check that the `data/` directory exists
- Verify file permissions

### Connection errors
- Ensure no other process is using the database file
- Check that `better-sqlite3` is properly installed
- Try deleting `data/projects.db` and restarting (it will be recreated)

### Data not persisting
- SQLite writes are synchronous, so data should persist immediately
- Check file permissions on the `data/` directory
- Verify you're writing to the correct database file

## 📚 Additional Resources

- [better-sqlite3 Documentation](https://github.com/WiseLibs/better-sqlite3)
- [SQLite SQL Syntax](https://www.sqlite.org/lang.html)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

