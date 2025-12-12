import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';

// Helper to check if user is Super Admin (in production, get from session/JWT)
function isSuperAdmin(request: NextRequest): boolean {
  // In production, you would verify JWT token or session
  // For now, we'll check localStorage on client side
  // API should verify with proper session management
  return true; // Placeholder - implement proper auth middleware
}

// GET all users
export async function GET(request: NextRequest) {
  try {
    // Note: In production, add proper authentication check here
    // const user = await getSessionUser(request);
    // if (user.role !== 'Super Admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    
    const db = getDatabase();
    
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get('role');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let query = 'SELECT id, name, username, email, role, status, avatar, created_at, updated_at FROM users WHERE 1=1';
    const params: any[] = [];

    if (role) {
      query += ' AND role = ?';
      params.push(role);
    }

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (name LIKE ? OR username LIKE ? OR email LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    query += ' ORDER BY created_at DESC';

    const stmt = db.prepare(query);
    const users = stmt.all(...params);

    return NextResponse.json({ users }, { status: 200 });
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
    // Note: In production, add proper authentication check here
    // const user = await getSessionUser(request);
    // if (user.role !== 'Super Admin') {
    //   return NextResponse.json({ error: 'Forbidden - Super Admin access required' }, { status: 403 });
    // }
    
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

    const db = getDatabase();

    // Check if username already exists
    const usernameCheck = db.prepare('SELECT id FROM users WHERE username = ?');
    const existingUsername = usernameCheck.get(username);
    
    if (existingUsername) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 409 }
      );
    }

    // Check if email already exists
    const emailCheck = db.prepare('SELECT id FROM users WHERE email = ?');
    const existingEmail = emailCheck.get(email);
    
    if (existingEmail) {
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
    const insert = db.prepare(`
      INSERT INTO users (name, username, email, password, role, status, avatar)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      name,
      username,
      email,
      hashedPassword,
      role,
      status || 'Active',
      userAvatar
    );

    // Get the created user (without password)
    const getUser = db.prepare(`
      SELECT id, name, username, email, role, status, avatar, created_at, updated_at
      FROM users WHERE id = ?
    `);
    const newUser = getUser.get(result.lastInsertRowid);

    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
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

