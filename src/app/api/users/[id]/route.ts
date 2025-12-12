import { NextRequest, NextResponse } from 'next/server';
import { getTursoClient, ensureInitialized } from '@/lib/db-turso';
import bcrypt from 'bcryptjs';

// GET single user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ensureInitialized();
    const db = getTursoClient();
    
    const result = await db.execute({
      sql: `SELECT id, name, username, email, role, status, avatar, created_at, updated_at
            FROM users WHERE id = ?`,
      args: [params.id]
    });

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user: result.rows[0] }, { status: 200 });
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
    const body = await request.json();
    const { name, username, email, password, role, status, avatar } = body;

    await ensureInitialized();
    const db = getTursoClient();

    // Check if user exists
    const checkResult = await db.execute({
      sql: 'SELECT id FROM users WHERE id = ?',
      args: [params.id]
    });

    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Build update query dynamically
    const updates: string[] = [];
    const values: any[] = [];

    if (name) {
      updates.push('name = ?');
      values.push(name);
    }

    if (username) {
      // Check if username already exists for another user
      const usernameCheck = await db.execute({
        sql: 'SELECT id FROM users WHERE username = ? AND id != ?',
        args: [username, params.id]
      });
      
      if (usernameCheck.rows.length > 0) {
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
      const emailCheck = await db.execute({
        sql: 'SELECT id FROM users WHERE email = ? AND id != ?',
        args: [email, params.id]
      });
      
      if (emailCheck.rows.length > 0) {
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
    
    await db.execute({
      sql: updateQuery,
      args: values
    });

    // Get updated user
    const updatedUserResult = await db.execute({
      sql: `SELECT id, name, username, email, role, status, avatar, created_at, updated_at
            FROM users WHERE id = ?`,
      args: [params.id]
    });

    return NextResponse.json(
      { message: 'User updated successfully', user: updatedUserResult.rows[0] },
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
    await ensureInitialized();
    const db = getTursoClient();

    // Check if user exists
    const checkResult = await db.execute({
      sql: 'SELECT id, username FROM users WHERE id = ?',
      args: [params.id]
    });

    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const existingUser = checkResult.rows[0] as any;

    // Prevent deleting super admin accounts
    if (existingUser.username === 'superadmin') {
      return NextResponse.json(
        { error: 'Cannot delete super admin account' },
        { status: 403 }
      );
    }

    // Delete user
    await db.execute({
      sql: 'DELETE FROM users WHERE id = ?',
      args: [params.id]
    });

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
