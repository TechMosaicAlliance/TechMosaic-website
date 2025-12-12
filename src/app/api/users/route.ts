import { NextRequest, NextResponse } from 'next/server';
import { getTursoClient, ensureInitialized } from '@/lib/db-turso';
import bcrypt from 'bcryptjs';

// GET all users
export async function GET(request: NextRequest) {
  try {
    await ensureInitialized();
    const db = getTursoClient();
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get('role');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let query = 'SELECT id, name, username, email, role, status, avatar, created_at, updated_at FROM users WHERE 1=1';
    const args: any[] = [];

    if (role) {
      query += ' AND role = ?';
      args.push(role);
    }

    if (status) {
      query += ' AND status = ?';
      args.push(status);
    }

    if (search) {
      query += ' AND (name LIKE ? OR username LIKE ? OR email LIKE ?)';
      const searchTerm = `%${search}%`;
      args.push(searchTerm, searchTerm, searchTerm);
    }

    query += ' ORDER BY created_at DESC';

    const result = await db.execute({ sql: query, args });

    return NextResponse.json({ users: result.rows }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST - Create new user (Super Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, username, email, password, role, status, avatar } = body;

    // Validate required fields
    if (!name || !username || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Name, username, email, password, and role are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ['Super Admin', 'Admin', 'Editor', 'Viewer'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    await ensureInitialized();
    const db = getTursoClient();

    // Check if username already exists
    const usernameCheck = await db.execute({
      sql: 'SELECT id FROM users WHERE username = ?',
      args: [username]
    });
    
    if (usernameCheck.rows.length > 0) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 409 }
      );
    }

    // Check if email already exists
    const emailCheck = await db.execute({
      sql: 'SELECT id FROM users WHERE email = ?',
      args: [email]
    });
    
    if (emailCheck.rows.length > 0) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate avatar initials if not provided
    const userAvatar = avatar || name
      .split(' ')
      .map((word: string) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    // Insert user
    const insertResult = await db.execute({
      sql: `INSERT INTO users (name, username, email, password, role, status, avatar)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [name, username, email, hashedPassword, role, status || 'Active', userAvatar]
    });

    // Get the created user
    const newUserResult = await db.execute({
      sql: `SELECT id, name, username, email, role, status, avatar, created_at, updated_at
            FROM users WHERE id = ?`,
      args: [Number(insertResult.lastInsertRowid)]
    });

    return NextResponse.json(
      { message: 'User created successfully', user: newUserResult.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
