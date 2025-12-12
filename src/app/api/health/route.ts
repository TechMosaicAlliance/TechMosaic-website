import { NextResponse } from 'next/server';

export async function GET() {
  const isProduction = process.env.NODE_ENV === 'production';
  const isVercel = process.env.VERCEL === '1';
  const hasTursoUrl = !!process.env.TURSO_DATABASE_URL;
  
  let dbStatus = 'unknown';
  let dbError = null;
  let dbType = 'turso';

  try {
    // Try to connect to Turso database
    const { getTursoClient, ensureInitialized } = await import('@/lib/db-turso');
    const db = getTursoClient();
    await ensureInitialized();
    dbStatus = 'connected';
  } catch (error: any) {
    dbStatus = 'failed';
    dbError = error.message;
  }

  return NextResponse.json({
    status: dbStatus === 'connected' ? 'ok' : 'error',
    environment: {
      isProduction,
      isVercel,
      nodeVersion: process.version,
      platform: process.platform,
    },
    database: {
      status: dbStatus,
      error: dbError,
      type: dbType,
      configured: hasTursoUrl,
      note: !hasTursoUrl ? 'TURSO_DATABASE_URL environment variable not set' : undefined,
    },
    recommendation: !hasTursoUrl 
      ? 'Please set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN environment variables. See TURSO_SETUP.md for instructions.'
      : dbStatus === 'failed'
      ? 'Database connection failed. Check your Turso credentials.'
      : undefined,
  });
}
