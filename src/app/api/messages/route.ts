import { NextRequest, NextResponse } from 'next/server';
import { getTursoClient, ensureInitialized } from '@/lib/db-turso';

// Disable caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// POST /api/messages - Create a new message
export async function POST(request: NextRequest) {
  try {
    await ensureInitialized();
    const db = getTursoClient();
    const body = await request.json();

    const { fullName, email, phone, companyName, projectDetails, source } = body;

    if (!fullName || !email || !projectDetails) {
      return NextResponse.json(
        { error: 'Full name, email, and project details are required' },
        { status: 400 }
      );
    }

    const result = await db.execute({
      sql: `INSERT INTO messages (full_name, email, phone, company_name, project_details, source)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [
        fullName.trim(),
        email.trim(),
        phone?.trim() || null,
        companyName?.trim() || null,
        projectDetails.trim(),
        source || 'contact_form'
      ]
    });

    return NextResponse.json(
      { message: 'Message saved successfully', id: result.lastInsertRowid },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json(
      { error: 'Failed to save message' },
      { status: 500 }
    );
  }
}

// GET /api/messages - Get all messages (Super Admin only)
export async function GET(request: NextRequest) {
  try {
    await ensureInitialized();
    const db = getTursoClient();
    const searchParams = request.nextUrl.searchParams;
    const unreadOnly = searchParams.get('unread') === 'true';

    let sql = 'SELECT * FROM messages';
    const args: any[] = [];

    if (unreadOnly) {
      sql += ' WHERE is_read = 0';
    }

    sql += ' ORDER BY created_at DESC';

    const result = await db.execute({ sql, args });

    const messages = result.rows.map((row: any) => ({
      id: row.id,
      fullName: row.full_name,
      email: row.email,
      phone: row.phone,
      companyName: row.company_name,
      projectDetails: row.project_details,
      source: row.source,
      isRead: row.is_read === 1,
      createdAt: row.created_at
    }));

    return NextResponse.json({ messages }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

