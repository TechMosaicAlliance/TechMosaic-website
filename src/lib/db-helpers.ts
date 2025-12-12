/**
 * Database Helper Functions
 * 
 * Convenient helper functions for common database operations.
 * Use these in your API routes, Server Components, or Server Actions.
 */

import { getDatabase } from './db';

export interface Project {
  id: number;
  slug: string;
  name: string;
  client: string;
  status: 'Planning' | 'Ongoing' | 'Completed';
  date: string;
  impactArea: string;
  serviceType: string;
  image?: string;
  projectOverview?: string;
  scopeOfWork?: string;
  projectSummary?: string;
  projectUrl?: string;
  caseStudyUrl?: string;
  tools?: string[];
  mediaFiles?: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Get all projects with optional filters
 */
export function getAllProjects(filters?: {
  search?: string;
  impactArea?: string;
  status?: string;
  serviceType?: string;
}): Project[] {
  const db = getDatabase();
  
  let query = 'SELECT * FROM projects WHERE 1=1';
  const params: any[] = [];

  if (filters?.search) {
    query += ' AND (name LIKE ? OR client LIKE ?)';
    const searchPattern = `%${filters.search}%`;
    params.push(searchPattern, searchPattern);
  }

  if (filters?.impactArea && filters.impactArea !== 'All') {
    query += ' AND impact_area = ?';
    params.push(filters.impactArea);
  }

  if (filters?.status && filters.status !== 'All') {
    query += ' AND status = ?';
    params.push(filters.status);
  }

  if (filters?.serviceType && filters.serviceType !== 'All') {
    query += ' AND service_type = ?';
    params.push(filters.serviceType);
  }

  query += ' ORDER BY date DESC';

  const stmt = db.prepare(query);
  const projects = stmt.all(...params) as any[];

  return projects.map(formatProject);
}

/**
 * Get a single project by slug
 */
export function getProjectBySlug(slug: string): Project | null {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM projects WHERE slug = ?');
  const project = stmt.get(slug) as any;

  if (!project) {
    return null;
  }

  return formatProject(project);
}

/**
 * Get a single project by ID
 */
export function getProjectById(id: number): Project | null {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM projects WHERE id = ?');
  const project = stmt.get(id) as any;

  if (!project) {
    return null;
  }

  return formatProject(project);
}

/**
 * Create a new project
 */
export function createProject(data: {
  name: string;
  client: string;
  status: 'Planning' | 'Ongoing' | 'Completed';
  date: string;
  impactArea: string;
  serviceType: string;
  slug?: string;
  image?: string;
  projectOverview?: string;
  scopeOfWork?: string;
  projectSummary?: string;
  projectUrl?: string;
  caseStudyUrl?: string;
  tools?: string[];
  mediaFiles?: string[];
}): { id: number; slug: string } {
  const db = getDatabase();

  // Generate slug from name if not provided
  const slug = data.slug || data.name
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
    data.name,
    data.client,
    data.status,
    data.date,
    data.impactArea,
    data.serviceType,
    data.image || null,
    data.projectOverview || null,
    data.scopeOfWork || null,
    data.projectSummary || null,
    data.projectUrl || null,
    data.caseStudyUrl || null,
    data.tools ? JSON.stringify(data.tools) : null,
    data.mediaFiles ? JSON.stringify(data.mediaFiles) : null
  );

  return {
    id: Number(result.lastInsertRowid),
    slug,
  };
}

/**
 * Update an existing project
 */
export function updateProject(
  slug: string,
  data: Partial<{
    name: string;
    client: string;
    status: 'Planning' | 'Ongoing' | 'Completed';
    date: string;
    impactArea: string;
    serviceType: string;
    image: string;
    projectOverview: string;
    scopeOfWork: string;
    projectSummary: string;
    projectUrl: string;
    caseStudyUrl: string;
    tools: string[];
    mediaFiles: string[];
  }>
): boolean {
  const db = getDatabase();

  // Check if project exists
  const checkStmt = db.prepare('SELECT id FROM projects WHERE slug = ?');
  const existing = checkStmt.get(slug);

  if (!existing) {
    return false;
  }

  // Build update query dynamically based on provided fields
  const fields: string[] = [];
  const values: any[] = [];

  if (data.name !== undefined) {
    fields.push('name = ?');
    values.push(data.name);
  }
  if (data.client !== undefined) {
    fields.push('client = ?');
    values.push(data.client);
  }
  if (data.status !== undefined) {
    fields.push('status = ?');
    values.push(data.status);
  }
  if (data.date !== undefined) {
    fields.push('date = ?');
    values.push(data.date);
  }
  if (data.impactArea !== undefined) {
    fields.push('impact_area = ?');
    values.push(data.impactArea);
  }
  if (data.serviceType !== undefined) {
    fields.push('service_type = ?');
    values.push(data.serviceType);
  }
  if (data.image !== undefined) {
    fields.push('image = ?');
    values.push(data.image);
  }
  if (data.projectOverview !== undefined) {
    fields.push('project_overview = ?');
    values.push(data.projectOverview);
  }
  if (data.scopeOfWork !== undefined) {
    fields.push('scope_of_work = ?');
    values.push(data.scopeOfWork);
  }
  if (data.projectSummary !== undefined) {
    fields.push('project_summary = ?');
    values.push(data.projectSummary);
  }
  if (data.projectUrl !== undefined) {
    fields.push('project_url = ?');
    values.push(data.projectUrl);
  }
  if (data.caseStudyUrl !== undefined) {
    fields.push('case_study_url = ?');
    values.push(data.caseStudyUrl);
  }
  if (data.tools !== undefined) {
    fields.push('tools = ?');
    values.push(JSON.stringify(data.tools));
  }
  if (data.mediaFiles !== undefined) {
    fields.push('media_files = ?');
    values.push(JSON.stringify(data.mediaFiles));
  }

  if (fields.length === 0) {
    return true; // Nothing to update
  }

  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(slug);

  const update = db.prepare(`
    UPDATE projects 
    SET ${fields.join(', ')}
    WHERE slug = ?
  `);

  update.run(...values);
  return true;
}

/**
 * Delete a project
 */
export function deleteProject(slug: string): boolean {
  const db = getDatabase();
  const deleteStmt = db.prepare('DELETE FROM projects WHERE slug = ?');
  const result = deleteStmt.run(slug);

  return result.changes > 0;
}

/**
 * Get project statistics
 */
export function getProjectStats() {
  const db = getDatabase();

  const totalStmt = db.prepare('SELECT COUNT(*) as count FROM projects');
  const total = totalStmt.get() as { count: number };

  const statusStmt = db.prepare(`
    SELECT status, COUNT(*) as count 
    FROM projects 
    GROUP BY status
  `);
  const byStatus = statusStmt.all() as Array<{ status: string; count: number }>;

  const impactAreaStmt = db.prepare(`
    SELECT impact_area, COUNT(*) as count 
    FROM projects 
    GROUP BY impact_area
  `);
  const byImpactArea = impactAreaStmt.all() as Array<{ impact_area: string; count: number }>;

  return {
    total: total.count,
    byStatus: byStatus.reduce((acc, row) => {
      acc[row.status] = row.count;
      return acc;
    }, {} as Record<string, number>),
    byImpactArea: byImpactArea.reduce((acc, row) => {
      acc[row.impact_area] = row.count;
      return acc;
    }, {} as Record<string, number>),
  };
}

/**
 * Format database row to Project interface
 */
function formatProject(row: any): Project {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    client: row.client,
    status: row.status as 'Planning' | 'Ongoing' | 'Completed',
    date: row.date,
    impactArea: row.impact_area,
    serviceType: row.service_type,
    image: row.image || undefined,
    projectOverview: row.project_overview || undefined,
    scopeOfWork: row.scope_of_work || undefined,
    projectSummary: row.project_summary || undefined,
    projectUrl: row.project_url || undefined,
    caseStudyUrl: row.case_study_url || undefined,
    tools: row.tools ? JSON.parse(row.tools) : undefined,
    mediaFiles: row.media_files ? JSON.parse(row.media_files) : undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

