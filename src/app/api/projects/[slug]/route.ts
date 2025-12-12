import { NextRequest, NextResponse } from 'next/server';
import { getTursoClient, ensureInitialized } from '@/lib/db-turso';

// GET /api/projects/[slug] - Get a single project by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await ensureInitialized();
    const db = getTursoClient();
    
    const result = await db.execute({
      sql: 'SELECT * FROM projects WHERE slug = ?',
      args: [params.slug]
    });

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    const project = result.rows[0] as any;

    // Format the project
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
  { params }: { params: { slug: string } }
) {
  try {
    await ensureInitialized();
    const db = getTursoClient();
    const body = await request.json();

    // Check if project exists
    const checkResult = await db.execute({
      sql: 'SELECT id FROM projects WHERE slug = ?',
      args: [params.slug]
    });

    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Build update query dynamically
    const updates: string[] = [];
    const args: any[] = [];

    if (body.name) {
      updates.push('name = ?');
      args.push(body.name);
    }
    if (body.client) {
      updates.push('client = ?');
      args.push(body.client);
    }
    if (body.status) {
      updates.push('status = ?');
      args.push(body.status);
    }
    if (body.date) {
      updates.push('date = ?');
      args.push(body.date);
    }
    if (body.impactArea) {
      updates.push('impact_area = ?');
      args.push(body.impactArea);
    }
    if (body.serviceType) {
      updates.push('service_type = ?');
      args.push(body.serviceType);
    }
    if (body.image !== undefined) {
      updates.push('image = ?');
      args.push(body.image);
    }
    if (body.projectOverview !== undefined) {
      updates.push('project_overview = ?');
      args.push(body.projectOverview);
    }
    if (body.scopeOfWork !== undefined) {
      updates.push('scope_of_work = ?');
      args.push(body.scopeOfWork);
    }
    if (body.projectSummary !== undefined) {
      updates.push('project_summary = ?');
      args.push(body.projectSummary);
    }
    if (body.projectUrl !== undefined) {
      updates.push('project_url = ?');
      args.push(body.projectUrl);
    }
    if (body.caseStudyUrl !== undefined) {
      updates.push('case_study_url = ?');
      args.push(body.caseStudyUrl);
    }
    if (body.tools !== undefined) {
      updates.push('tools = ?');
      args.push(JSON.stringify(body.tools));
    }
    if (body.mediaFiles !== undefined) {
      updates.push('media_files = ?');
      args.push(JSON.stringify(body.mediaFiles));
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    args.push(params.slug);

    const updateQuery = `UPDATE projects SET ${updates.join(', ')} WHERE slug = ?`;
    
    await db.execute({ sql: updateQuery, args });

    // Get updated project
    const updatedResult = await db.execute({
      sql: 'SELECT * FROM projects WHERE slug = ?',
      args: [params.slug]
    });

    const project = updatedResult.rows[0] as any;
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

    return NextResponse.json(
      { message: 'Project updated successfully', project: formattedProject },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[slug] - Delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await ensureInitialized();
    const db = getTursoClient();

    // Check if project exists
    const checkResult = await db.execute({
      sql: 'SELECT id FROM projects WHERE slug = ?',
      args: [params.slug]
    });

    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Delete project
    await db.execute({
      sql: 'DELETE FROM projects WHERE slug = ?',
      args: [params.slug]
    });

    return NextResponse.json(
      { message: 'Project deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
