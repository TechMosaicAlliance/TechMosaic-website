import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

// GET /api/projects/[slug] - Get a single project by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const db = getDatabase();

    const stmt = db.prepare('SELECT * FROM projects WHERE slug = ?');
    const project = stmt.get(slug) as any;

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const formattedProject = {
      id: project.id,
      slug: project.slug,
      name: project.name,
      client: project.client,
      status: project.status,
      date: project.date,
      impactArea: project.impact_area,
      serviceType: project.service_type,
      image: project.image,
      projectOverview: project.project_overview,
      scopeOfWork: project.scope_of_work,
      projectSummary: project.project_summary,
      projectUrl: project.project_url,
      caseStudyUrl: project.case_study_url,
      tools: project.tools ? JSON.parse(project.tools) : [],
      mediaFiles: project.media_files ? JSON.parse(project.media_files) : [],
      createdAt: project.created_at,
      updatedAt: project.updated_at,
    };

    return NextResponse.json({ project: formattedProject });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[slug] - Update a project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const db = getDatabase();
    const body = await request.json();

    // Check if project exists
    const checkStmt = db.prepare('SELECT id FROM projects WHERE slug = ?');
    const existing = checkStmt.get(slug) as { id: number } | undefined;

    if (!existing) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Generate new slug if name changed
    const newSlug = body.name
      ? body.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      : slug;

    const update = db.prepare(`
      UPDATE projects SET
        slug = ?,
        name = ?,
        client = ?,
        status = ?,
        date = ?,
        impact_area = ?,
        service_type = ?,
        image = ?,
        project_overview = ?,
        scope_of_work = ?,
        project_summary = ?,
        project_url = ?,
        case_study_url = ?,
        tools = ?,
        media_files = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE slug = ?
    `);

    update.run(
      newSlug,
      body.name,
      body.client,
      body.status,
      body.date,
      body.impactArea,
      body.serviceType,
      body.image || null,
      body.projectOverview || null,
      body.scopeOfWork || null,
      body.projectSummary || null,
      body.projectUrl || null,
      body.caseStudyUrl || null,
      body.tools ? JSON.stringify(body.tools) : null,
      body.mediaFiles ? JSON.stringify(body.mediaFiles) : null,
      slug
    );

    return NextResponse.json({
      slug: newSlug,
      message: 'Project updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating project:', error);
    
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json(
        { error: 'A project with this name already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[slug] - Delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const db = getDatabase();

    const deleteStmt = db.prepare('DELETE FROM projects WHERE slug = ?');
    const result = deleteStmt.run(slug);

    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}

