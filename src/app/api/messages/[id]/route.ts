import { NextRequest, NextResponse } from 'next/server';
import { getTursoClient, ensureInitialized } from '@/lib/db-turso';

// Disable caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// PUT /api/messages/[id] - Mark message as read/unread
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ensureInitialized();
    const db = getTursoClient();
    const body = await request.json();

    const { isRead } = body;

    await db.execute({
      sql: 'UPDATE messages SET is_read = ? WHERE id = ?',
      args: [isRead ? 1 : 0, params.id]
    });

    return NextResponse.json(
      { message: 'Message updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

// DELETE /api/messages/[id] - Delete a message
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await ensureInitialized();
    const db = getTursoClient();

    await db.execute({
      sql: 'DELETE FROM messages WHERE id = ?',
      args: [params.id]
    });

    return NextResponse.json(
      { message: 'Message deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}

