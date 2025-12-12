# 🚀 Vercel Deployment Guide - Database Issue Fix

## ⚠️ The Problem

**SQLite (better-sqlite3) does NOT work on Vercel** because:
- Vercel uses serverless functions (AWS Lambda)
- Serverless functions have read-only file systems
- SQLite requires write access to persist data
- Native Node.js addons (like better-sqlite3) don't work reliably

**Error you're seeing:**
```
SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input
```

This happens because the API route crashes when trying to initialize the SQLite database, returning an empty response.

---

## ✅ Solution Options

### Option 1: Use Vercel Postgres (Recommended) ⭐

**Pros:**
- Native Vercel integration
- Fast and reliable
- Easy setup
- Free tier available

**Setup:**

1. **Install Vercel Postgres SDK:**
```bash
npm install @vercel/postgres
```

2. **Add Database to Vercel:**
- Go to your project on Vercel dashboard
- Click "Storage" tab
- Click "Create Database"
- Select "Postgres"
- Follow the setup wizard

3. **Environment Variables (Auto-added by Vercel):**
```env
POSTGRES_URL="..."
POSTGRES_PRISMA_URL="..."
POSTGRES_URL_NON_POOLING="..."
POSTGRES_USER="..."
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="..."
```

---

### Option 2: Use Turso (SQLite for Edge) 🔥

**Pros:**
- Still uses SQLite
- Works on edge/serverless
- Fast
- Free tier with 500 databases

**Setup:**

1. **Sign up at [turso.tech](https://turso.tech)**

2. **Install Turso CLI:**
```bash
npm install @libsql/client
```

3. **Create Database:**
```bash
turso db create techmosaic-db
turso db show techmosaic-db
```

4. **Add to Environment Variables:**
```env
TURSO_DATABASE_URL="..."
TURSO_AUTH_TOKEN="..."
```

---

### Option 3: Use Supabase (PostgreSQL) 🟢

**Pros:**
- Full Postgres database
- Generous free tier
- Built-in auth (optional)
- Real-time subscriptions

**Setup:**

1. **Create project at [supabase.com](https://supabase.com)**

2. **Install Supabase client:**
```bash
npm install @supabase/supabase-js
```

3. **Get connection string from Supabase dashboard**

---

## 🔧 Implementation Guide (Vercel Postgres)

### Step 1: Install Dependencies

```bash
npm install @vercel/postgres
```

### Step 2: Create New Database Helper

Create `src/lib/db-vercel.ts`:

```typescript
import { sql } from '@vercel/postgres';

export async function initializeDatabase() {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('Super Admin', 'Admin', 'Editor', 'Viewer')),
        status TEXT NOT NULL CHECK(status IN ('Active', 'Inactive')),
        avatar TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create projects table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
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
        tools TEXT,
        media_files TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug)`;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Check if user exists
export async function getUserByEmail(email: string) {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email} LIMIT 1
  `;
  return result.rows[0];
}

// Create user
export async function createUser(userData: any) {
  const { name, username, email, password, role, status, avatar } = userData;
  
  const result = await sql`
    INSERT INTO users (name, username, email, password, role, status, avatar)
    VALUES (${name}, ${username}, ${email}, ${password}, ${role}, ${status}, ${avatar})
    RETURNING *
  `;
  
  return result.rows[0];
}

// Get all users
export async function getAllUsers() {
  const result = await sql`
    SELECT id, name, username, email, role, status, avatar, created_at, updated_at 
    FROM users 
    ORDER BY created_at DESC
  `;
  return result.rows;
}

// Update user
export async function updateUser(id: number, updates: any) {
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  Object.entries(updates).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = $${paramIndex}`);
      values.push(value);
      paramIndex++;
    }
  });

  if (fields.length === 0) return null;

  fields.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(id);

  const query = `
    UPDATE users 
    SET ${fields.join(', ')} 
    WHERE id = $${paramIndex}
    RETURNING *
  `;

  const result = await sql.query(query, values);
  return result.rows[0];
}

// Delete user
export async function deleteUser(id: number) {
  await sql`DELETE FROM users WHERE id = ${id}`;
}

// Similar functions for projects...
```

### Step 3: Update Login Route

Update `src/app/api/auth/login/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/db-vercel';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get user from Vercel Postgres
    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (user.status !== 'Active') {
      return NextResponse.json(
        { error: 'Your account has been deactivated.' },
        { status: 403 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: 'Login successful',
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
```

### Step 4: Update Other API Routes

Apply similar changes to:
- `src/app/api/users/route.ts`
- `src/app/api/users/[id]/route.ts`
- `src/app/api/projects/route.ts`
- `src/app/api/projects/[slug]/route.ts`

---

## 🔄 Migration Steps

### 1. Export Existing Data

Before switching, export your current SQLite data:

```bash
npm run db:list > users_backup.txt
```

### 2. Set Up New Database

Choose one of the solutions above and set it up.

### 3. Seed Initial Data

Create a seed script to populate the new database with your default admin users.

### 4. Test Locally

Set environment variables in `.env.local` and test:

```bash
npm run dev
```

### 5. Deploy to Vercel

```bash
git add .
git commit -m "Switch to Vercel Postgres for production"
git push origin main
```

---

## 🚨 Quick Fix (Temporary)

If you need to deploy quickly without changing databases, you can use **Vercel Edge Config** or **Redis** for session management, but this is not recommended for production user data.

---

## 📊 Comparison

| Feature | SQLite | Vercel Postgres | Turso | Supabase |
|---------|--------|-----------------|-------|----------|
| **Works on Vercel** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **Setup Difficulty** | Easy | Easy | Medium | Medium |
| **Free Tier** | N/A | 60 hours | 500 DBs | 500MB |
| **Performance** | Fast | Fast | Very Fast | Fast |
| **Scalability** | Limited | High | High | High |

---

## 🎯 Recommended Path

1. **For Production:** Use **Vercel Postgres** (easiest integration)
2. **For SQLite fans:** Use **Turso** (keeps SQLite syntax)
3. **For full features:** Use **Supabase** (auth + database + storage)

---

## 📝 Next Steps

1. Choose your database solution
2. Install required packages
3. Update database helper functions
4. Update all API routes
5. Test locally with new database
6. Deploy to Vercel

---

## 🆘 Need Help?

If you want me to implement any of these solutions, just let me know which one you prefer:
- **Option 1:** Vercel Postgres (recommended)
- **Option 2:** Turso (keep SQLite)
- **Option 3:** Supabase

I can create all the migration code for you! 🚀

---

**Note:** This is a one-time migration. Once done, your app will work perfectly on Vercel with persistent data storage.

