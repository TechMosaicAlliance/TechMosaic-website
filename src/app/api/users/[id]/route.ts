import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';

// GET single user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Note: In production, add proper authentication check here
    // const user = await getSessionUser(request);
    // if (user.role !== 'Super Admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT id, name, username, email, role, status, avatar, created_at, updated_at
      FROM users WHERE id = ?
    `);
    const user = stmt.get(params.id);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// PUT - Update user (Super Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Note: In production, add proper authentication check here
    // const user = await getSessionUser(request);
    // if (user.role !== 'Super Admin') {
    //   return NextResponse.json({ error: 'Forbidden - Super Admin access required' }, { status: 403 });
    // }
    
    const body = await request.json();
    const { name, username, email, password, role, status, avatar } = body;

    const db = getDatabase();

    // Check if user exists
    const checkStmt = db.prepare('SELECT id FROM users WHERE id = ?');
    const existingUser = checkStmt.get(params.id);

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Build update query dynamically based on provided fields
    const updates: string[] = [];
    const values: any[] = [];

    if (name) {
      updates.push('name = ?');
      values.push(name);
    }

    if (username) {
      // Check if username already exists for another user
      const usernameCheck = db.prepare('SELECT id FROM users WHERE username = ? AND id != ?');
      const duplicateUsername = usernameCheck.get(username, params.id);
      
      if (duplicateUsername) {
        return NextResponse.json(
          { error: 'Username already exists' },
          { status: 409 }
        );
      }
      updates.push('username = ?');
      values.push(username);
    }

    if (email) {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }

      // Check if email already exists for another user
      const emailCheck = db.prepare('SELECT id FROM users WHERE email = ? AND id != ?');
      const duplicateEmail = emailCheck.get(email, params.id);
      
      if (duplicateEmail) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 409 }
        );
      }
      updates.push('email = ?');
      values.push(email);
    }

    if (password) {
      // Hash new password (Admin resetting user password)
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push('password = ?');
      values.push(hashedPassword);
    }

    if (role) {
      const validRoles = ['Super Admin', 'Admin', 'Editor', 'Viewer'];
      if (!validRoles.includes(role)) {
        return NextResponse.json(
          { error: 'Invalid role' },
          { status: 400 }
        );
      }
      updates.push('role = ?');
      values.push(role);
    }

    if (status) {
      updates.push('status = ?');
      values.push(status);
    }

    if (avatar !== undefined) {
      updates.push('avatar = ?');
      values.push(avatar);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(params.id);

    const updateQuery = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    const updateStmt = db.prepare(updateQuery);
    updateStmt.run(...values);

    // Get updated user
    const getUser = db.prepare(`
      SELECT id, name, username, email, role, status, avatar, created_at, updated_at
      FROM users WHERE id = ?
    `);
    const updatedUser = getUser.get(params.id);

    return NextResponse.json(
      { message: 'User updated successfully', user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE - Delete user (Super Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Note: In production, add proper authentication check here
    // const user = await getSessionUser(request);
    // if (user.role !== 'Super Admin') {
    //   return NextResponse.json({ error: 'Forbidden - Super Admin access required' }, { status: 403 });
    // }
    
    const db = getDatabase();

    // Check if user exists
    const checkStmt = db.prepare('SELECT id, username FROM users WHERE id = ?');
    const existingUser = checkStmt.get(params.id) as any;

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Prevent deleting super admin accounts
    if (existingUser.username === 'superadmin') {
      return NextResponse.json(
        { error: 'Cannot delete super admin account' },
        { status: 403 }
      );
    }

    // Delete user
    const deleteStmt = db.prepare('DELETE FROM users WHERE id = ?');
    deleteStmt.run(params.id);

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}

