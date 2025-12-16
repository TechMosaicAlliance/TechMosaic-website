import { NextRequest, NextResponse } from 'next/server';
import { getTursoClient, ensureInitialized } from '@/lib/db-turso';

// Disable caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET /api/stats - Get all stats
export async function GET(request: NextRequest) {
  try {
    await ensureInitialized();
    const db = getTursoClient();

    const result = await db.execute({
      sql: 'SELECT * FROM stats ORDER BY display_order ASC'
    });

    const stats = result.rows.map((row: any) => ({
      id: row.id,
      value: row.value,
      label: row.label,
      displayOrder: row.display_order
    }));

    return NextResponse.json({ stats }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

// PUT /api/stats - Update stats
export async function PUT(request: NextRequest) {
  try {
    await ensureInitialized();
    const db = getTursoClient();
    const body = await request.json();

    const { stats } = body;

    if (!Array.isArray(stats)) {
      return NextResponse.json(
        { error: 'Stats must be an array' },
        { status: 400 }
      );
    }

    // Delete all existing stats
    const deleteResult = await db.execute({
      sql: 'DELETE FROM stats'
    });
    console.log('Deleted stats:', deleteResult);

    // Insert updated stats
    for (let i = 0; i < stats.length; i++) {
      const stat = stats[i];
      if (!stat.value || !stat.label) {
        continue; // Skip empty stats
      }
      const insertResult = await db.execute({
        sql: 'INSERT INTO stats (value, label, display_order) VALUES (?, ?, ?)',
        args: [stat.value.trim(), stat.label.trim(), i]
      });
      console.log('Inserted stat:', insertResult, stat);
    }

    // Return updated stats
    const result = await db.execute({
      sql: 'SELECT * FROM stats ORDER BY display_order ASC'
    });

    const updatedStats = result.rows.map((row: any) => ({
      id: row.id,
      value: row.value,
      label: row.label,
      displayOrder: row.display_order
    }));

    console.log('Updated stats from DB:', updatedStats);

    return NextResponse.json({ stats: updatedStats }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error updating stats:', error);
    return NextResponse.json(
      { error: 'Failed to update stats', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

