import { NextResponse } from 'next/server';

export async function GET() {
  const isProduction = process.env.NODE_ENV === 'production';
  const isVercel = process.env.VERCEL === '1';
  
  let dbStatus = 'unknown';
  let dbError = null;

  try {
    // Try to import and initialize database
    const { getDatabase } = await import('@/lib/db');
    const db = getDatabase();
    dbStatus = 'connected';
  } catch (error: any) {
    dbStatus = 'failed';
    dbError = error.message;
  }

  return NextResponse.json({
    status: 'ok',
    environment: {
      isProduction,
      isVercel,
      nodeVersion: process.version,
      platform: process.platform,
    },
    database: {
      status: dbStatus,
      error: dbError,
      type: 'better-sqlite3',
      note: isVercel ? 'SQLite does not work on Vercel serverless functions' : undefined,
    },
    recommendation: isVercel && dbStatus === 'failed' 
      ? 'Please switch to Vercel Postgres, Turso, or Supabase for production deployment'
      : undefined,
  });
}

