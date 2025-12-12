import { NextRequest, NextResponse } from 'next/server';
import { getTursoClient, ensureInitialized } from '@/lib/db-turso';

// GET /api/projects - Get all projects with optional filters
export async function GET(request: NextRequest) {
  try {
    await ensureInitialized();
    const db = getTursoClient();
    const searchParams = request.nextUrl.searchParams;
    
    const search = searchParams.get('search') || '';
    const impactArea = searchParams.get('impactArea');
    const status = searchParams.get('status');
    const serviceType = searchParams.get('serviceType');

    let query = 'SELECT * FROM projects WHERE 1=1';
    const args: any[] = [];

    if (search) {
      query += ' AND (name LIKE ? OR client LIKE ?)';
      const searchPattern = `%${search}%`;
      args.push(searchPattern, searchPattern);
    }

    if (impactArea && impactArea !== 'All') {
      query += ' AND impact_area = ?';
      args.push(impactArea);
    }

    if (status && status !== 'All') {
      query += ' AND status = ?';
      args.push(status);
    }

    if (serviceType && serviceType !== 'All') {
      query += ' AND service_type = ?';
      args.push(serviceType);
    }

    query += ' ORDER BY date DESC';

    const result = await db.execute({ sql: query, args });

    // Parse JSON fields
    const formattedProjects = result.rows.map((project: any) => ({
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
    }));

    return NextResponse.json({ projects: formattedProjects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    await ensureInitialized();
    const db = getTursoClient();
    const body = await request.json();

    // Generate slug from name
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const result = await db.execute({
      sql: `INSERT INTO projects (
              slug, name, client, status, date, impact_area, service_type, image,
              project_overview, scope_of_work, project_summary, project_url,
              case_study_url, tools, media_files
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        slug,
        body.name,
        body.client,
        body.status || 'Ongoing',
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
        body.mediaFiles ? JSON.stringify(body.mediaFiles) : null
      ]
    });

    // Get the created project
    const createdProject = await db.execute({
      sql: 'SELECT * FROM projects WHERE id = ?',
      args: [Number(result.lastInsertRowid)]
    });

    const project = createdProject.rows[0] as any;
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
      { message: 'Project created successfully', project: formattedProject },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
