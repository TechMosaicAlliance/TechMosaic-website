# Quick Start: Database Access

## ✅ Setup (Already Done!)

The database is **automatically set up** - no configuration needed! Just start your dev server:

```bash
npm run dev
```

The database file will be created at `data/projects.db` on first use.

## 🚀 Quick Access Methods

### 1. Via API Routes (Easiest)

```bash
# Get all projects
curl http://localhost:3000/api/projects

# Get filtered projects
curl "http://localhost:3000/api/projects?status=Completed"

# Get single project
curl http://localhost:3000/api/projects/ecommerce-redesign
```

### 2. Via NPM Scripts

```bash
# List all projects
npm run db:list

# Get project count
npm run db:count

# Get specific project
npm run db:get ecommerce-redesign

# Show database schema
npm run db:schema

# Run custom query
npm run db:query "SELECT name, status FROM projects"
```

### 3. In Your Code (Server-side)

```typescript
// In API routes, Server Components, or Server Actions
import { getAllProjects, getProjectBySlug, createProject } from '@/lib/db-helpers';

// Get all projects
const projects = getAllProjects();

// Get with filters
const filtered = getAllProjects({ 
  status: 'Completed',
  impactArea: 'Digital Solutions & Innovation' 
});

// Get single project
const project = getProjectBySlug('ecommerce-redesign');

// Create project
const newProject = createProject({
  name: 'My New Project',
  client: 'Client Name',
  status: 'Ongoing',
  date: '2024-01-01',
  impactArea: 'Digital Solutions & Innovation',
  serviceType: 'Web Development',
});
```

### 4. Direct Database Access

```typescript
import { getDatabase } from '@/lib/db';

const db = getDatabase();
const stmt = db.prepare('SELECT * FROM projects WHERE status = ?');
const projects = stmt.all('Completed');
```

## 📍 Database Location

- **File**: `data/projects.db`
- **Auto-created**: Yes, on first API call
- **Backup**: Just copy the `.db` file

## 🔧 Common Tasks

### View all projects
```bash
npm run db:list
```

### Check database stats
```bash
npm run db:count
```

### Reset database (WARNING: deletes all data)
```bash
npm run db:reset
```

### Use SQLite CLI directly
```bash
sqlite3 data/projects.db
```

Then run SQL:
```sql
SELECT * FROM projects;
.schema
.quit
```

## 📚 Full Documentation

See [DATABASE.md](./DATABASE.md) for complete documentation.

