import { NextRequest, NextResponse } from 'next/server';
import { getTursoClient, ensureInitialized } from '@/lib/db-turso';

export async function POST(request: NextRequest) {
  try {
    await ensureInitialized();
    const db = getTursoClient();
    const body = await request.json();

    const { pagePath, pageTitle, referrer, visitorId, sessionId } = body;

    // Get user agent from headers
    const userAgent = request.headers.get('user-agent') || '';

    // Log the page visit
    await db.execute({
      sql: `INSERT INTO page_visits (page_path, page_title, referrer, user_agent, visitor_id, session_id)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [
        pagePath || '/',
        pageTitle || '',
        referrer || '',
        userAgent,
        visitorId || '',
        sessionId || '',
      ],
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error tracking page visit:', error);
    return NextResponse.json(
      { error: 'Failed to track page visit' },
      { status: 500 }
    );
  }
}

