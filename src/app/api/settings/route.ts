import { NextRequest, NextResponse } from 'next/server';
import { getTursoClient, ensureInitialized } from '@/lib/db-turso';

// GET /api/settings - Get all settings or a specific setting by key
export async function GET(request: NextRequest) {
  try {
    await ensureInitialized();
    const db = getTursoClient();
    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get('key');

    if (key) {
      // Get specific setting
      const result = await db.execute({
        sql: 'SELECT * FROM settings WHERE key = ?',
        args: [key]
      });

      if (result.rows.length === 0) {
        return NextResponse.json({ setting: null }, { status: 200 });
      }

      return NextResponse.json({ setting: result.rows[0] }, { status: 200 });
    } else {
      // Get all settings
      const result = await db.execute({
        sql: 'SELECT * FROM settings ORDER BY key'
      });

      return NextResponse.json({ settings: result.rows }, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT /api/settings - Update or create a setting
export async function PUT(request: NextRequest) {
  try {
    await ensureInitialized();
    const db = getTursoClient();
    const body = await request.json();

    const { key, value } = body;

    if (!key) {
      return NextResponse.json(
        { error: 'Setting key is required' },
        { status: 400 }
      );
    }

    // Check if setting exists
    const existing = await db.execute({
      sql: 'SELECT id FROM settings WHERE key = ?',
      args: [key]
    });

    if (existing.rows.length > 0) {
      // Update existing setting
      await db.execute({
        sql: 'UPDATE settings SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?',
        args: [value || null, key]
      });
    } else {
      // Create new setting
      await db.execute({
        sql: 'INSERT INTO settings (key, value) VALUES (?, ?)',
        args: [key, value || null]
      });
    }

    // Return updated setting
    const result = await db.execute({
      sql: 'SELECT * FROM settings WHERE key = ?',
      args: [key]
    });

    return NextResponse.json({ setting: result.rows[0] }, { status: 200 });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

