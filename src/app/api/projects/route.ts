import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

// GET /api/projects - Get all projects with optional filters
export async function GET(request: NextRequest) {
  try {
    const db = getDatabase();
    const searchParams = request.nextUrl.searchParams;
    
    const search = searchParams.get('search') || '';
    const impactArea = searchParams.get('impactArea');
    const status = searchParams.get('status');
    const serviceType = searchParams.get('serviceType');

    let query = 'SELECT * FROM projects WHERE 1=1';
    const params: any[] = [];

    if (search) {
      query += ' AND (name LIKE ? OR client LIKE ?)';
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern);
    }

    if (impactArea && impactArea !== 'All') {
      query += ' AND impact_area = ?';
      params.push(impactArea);
    }

    if (status && status !== 'All') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (serviceType && serviceType !== 'All') {
      query += ' AND service_type = ?';
      params.push(serviceType);
    }

    query += ' ORDER BY date DESC';

    const stmt = db.prepare(query);
    const projects = stmt.all(...params) as any[];

    // Parse JSON fields
    const formattedProjects = projects.map((project) => ({
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
    const db = getDatabase();
    const body = await request.json();

    // Generate slug from name
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const insert = db.prepare(`
      INSERT INTO projects (
        slug, name, client, status, date, impact_area, service_type, image,
        project_overview, scope_of_work, project_summary, project_url,
        case_study_url, tools, media_files
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
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
    );

    return NextResponse.json({
      id: result.lastInsertRowid,
      slug,
      message: 'Project created successfully',
    });
  } catch (error: any) {
    console.error('Error creating project:', error);
    
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json(
        { error: 'A project with this name already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

