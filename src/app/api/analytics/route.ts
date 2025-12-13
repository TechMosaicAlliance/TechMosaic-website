import { NextRequest, NextResponse } from 'next/server';
import { getTursoClient, ensureInitialized } from '@/lib/db-turso';

export async function GET(request: NextRequest) {
  try {
    await ensureInitialized();
    const db = getTursoClient();

    // Projects Statistics
    const totalProjects = await db.execute('SELECT COUNT(*) as count FROM projects');
    const totalProjectsCount = (totalProjects.rows[0]?.count as number) || 0;

    // Projects by Status
    const projectsByStatus = await db.execute(`
      SELECT status, COUNT(*) as count 
      FROM projects 
      GROUP BY status
    `);

    // Projects by Impact Area
    const projectsByImpactArea = await db.execute(`
      SELECT impact_area, COUNT(*) as count 
      FROM projects 
      GROUP BY impact_area
      ORDER BY count DESC
    `);

    // Projects by Service Type
    const projectsByServiceType = await db.execute(`
      SELECT service_type, COUNT(*) as count 
      FROM projects 
      GROUP BY service_type
      ORDER BY count DESC
    `);

    // Projects by Month (timeline)
    const projectsByMonth = await db.execute(`
      SELECT 
        strftime('%Y-%m', date) as month,
        COUNT(*) as count
      FROM projects
      GROUP BY strftime('%Y-%m', date)
      ORDER BY month DESC
      LIMIT 12
    `);

    // Recent Projects (last 5)
    const recentProjects = await db.execute(`
      SELECT name, status, date, created_at
      FROM projects
      ORDER BY created_at DESC
      LIMIT 5
    `);

    // Users Statistics
    const totalUsers = await db.execute('SELECT COUNT(*) as count FROM users');
    const totalUsersCount = (totalUsers.rows[0]?.count as number) || 0;

    // Users by Role
    const usersByRole = await db.execute(`
      SELECT role, COUNT(*) as count 
      FROM users 
      GROUP BY role
    `);

    // Users by Status
    const usersByStatus = await db.execute(`
      SELECT status, COUNT(*) as count 
      FROM users 
      GROUP BY status
    `);

    // Users by Month (growth)
    const usersByMonth = await db.execute(`
      SELECT 
        strftime('%Y-%m', created_at) as month,
        COUNT(*) as count
      FROM users
      GROUP BY strftime('%Y-%m', created_at)
      ORDER BY month DESC
      LIMIT 12
    `);

    // Recent Users (last 5)
    const recentUsers = await db.execute(`
      SELECT name, role, status, created_at
      FROM users
      ORDER BY created_at DESC
      LIMIT 5
    `);

    // Project Completion Rate
    const completedProjects = await db.execute(`
      SELECT COUNT(*) as count 
      FROM projects 
      WHERE status = 'Completed'
    `);
    const completedCount = (completedProjects.rows[0]?.count as number) || 0;
    const completionRate = totalProjectsCount > 0 
      ? Math.round((completedCount / totalProjectsCount) * 100) 
      : 0;

    // Active Projects (Ongoing)
    const activeProjects = await db.execute(`
      SELECT COUNT(*) as count 
      FROM projects 
      WHERE status = 'Ongoing'
    `);
    const activeCount = (activeProjects.rows[0]?.count as number) || 0;

    // Planning Projects
    const planningProjects = await db.execute(`
      SELECT COUNT(*) as count 
      FROM projects 
      WHERE status = 'Planning'
    `);
    const planningCount = (planningProjects.rows[0]?.count as number) || 0;

    // Active Users
    const activeUsers = await db.execute(`
      SELECT COUNT(*) as count 
      FROM users 
      WHERE status = 'Active'
    `);
    const activeUsersCount = (activeUsers.rows[0]?.count as number) || 0;

    // Most Popular Tools (from projects)
    const toolsData = await db.execute(`
      SELECT tools 
      FROM projects 
      WHERE tools IS NOT NULL AND tools != ''
    `);
    
    const toolCounts: Record<string, number> = {};
    toolsData.rows.forEach((row: any) => {
      try {
        const tools = JSON.parse(row.tools || '[]');
        if (Array.isArray(tools)) {
          tools.forEach((tool: string) => {
            toolCounts[tool] = (toolCounts[tool] || 0) + 1;
          });
        }
      } catch (e) {
        // Ignore parse errors
      }
    });

    const popularTools = Object.entries(toolCounts)
      .map(([tool, count]) => ({ tool, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Projects with URLs (live projects)
    const liveProjects = await db.execute(`
      SELECT COUNT(*) as count 
      FROM projects 
      WHERE project_url IS NOT NULL AND project_url != ''
    `);
    const liveProjectsCount = (liveProjects.rows[0]?.count as number) || 0;

    // Page Visit Analytics
    const totalPageVisits = await db.execute('SELECT COUNT(*) as count FROM page_visits');
    const totalPageVisitsCount = (totalPageVisits.rows[0]?.count as number) || 0;

    // Unique visitors (by visitor_id)
    const uniqueVisitors = await db.execute(`
      SELECT COUNT(DISTINCT visitor_id) as count 
      FROM page_visits 
      WHERE visitor_id IS NOT NULL AND visitor_id != ''
    `);
    const uniqueVisitorsCount = (uniqueVisitors.rows[0]?.count as number) || 0;

    // Page visits by page
    const visitsByPage = await db.execute(`
      SELECT page_path, COUNT(*) as count 
      FROM page_visits 
      GROUP BY page_path 
      ORDER BY count DESC 
      LIMIT 10
    `);

    // Page visits by day (last 30 days)
    const visitsByDay = await db.execute(`
      SELECT 
        strftime('%Y-%m-%d', created_at) as date,
        COUNT(*) as count
      FROM page_visits
      WHERE created_at >= datetime('now', '-30 days')
      GROUP BY strftime('%Y-%m-%d', created_at)
      ORDER BY date DESC
    `);

    // Page visits this month
    const visitsThisMonth = await db.execute(`
      SELECT COUNT(*) as count 
      FROM page_visits 
      WHERE strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')
    `);
    const visitsThisMonthCount = (visitsThisMonth.rows[0]?.count as number) || 0;

    // Page visits today
    const visitsToday = await db.execute(`
      SELECT COUNT(*) as count 
      FROM page_visits 
      WHERE date(created_at) = date('now')
    `);
    const visitsTodayCount = (visitsToday.rows[0]?.count as number) || 0;

    // Average visits per day (last 30 days)
    const avgVisitsPerDay = await db.execute(`
      SELECT AVG(daily_count) as avg_count
      FROM (
        SELECT COUNT(*) as daily_count
        FROM page_visits
        WHERE created_at >= datetime('now', '-30 days')
        GROUP BY strftime('%Y-%m-%d', created_at)
      )
    `);
    const avgVisitsPerDayCount = Math.round((avgVisitsPerDay.rows[0]?.avg_count as number) || 0);

    // Top referrers
    const topReferrers = await db.execute(`
      SELECT referrer, COUNT(*) as count 
      FROM page_visits 
      WHERE referrer IS NOT NULL AND referrer != ''
      GROUP BY referrer 
      ORDER BY count DESC 
      LIMIT 5
    `);

    return NextResponse.json({
      projects: {
        total: totalProjectsCount,
        byStatus: projectsByStatus.rows.map((row: any) => ({
          status: row.status,
          count: row.count,
        })),
        byImpactArea: projectsByImpactArea.rows.map((row: any) => ({
          impactArea: row.impact_area,
          count: row.count,
        })),
        byServiceType: projectsByServiceType.rows.map((row: any) => ({
          serviceType: row.service_type,
          count: row.count,
        })),
        byMonth: projectsByMonth.rows.map((row: any) => ({
          month: row.month,
          count: row.count,
        })),
        recent: recentProjects.rows.map((row: any) => ({
          name: row.name,
          status: row.status,
          date: row.date,
          createdAt: row.created_at,
        })),
        completed: completedCount,
        active: activeCount,
        planning: planningCount,
        completionRate,
        live: liveProjectsCount,
      },
      users: {
        total: totalUsersCount,
        byRole: usersByRole.rows.map((row: any) => ({
          role: row.role,
          count: row.count,
        })),
        byStatus: usersByStatus.rows.map((row: any) => ({
          status: row.status,
          count: row.count,
        })),
        byMonth: usersByMonth.rows.map((row: any) => ({
          month: row.month,
          count: row.count,
        })),
        recent: recentUsers.rows.map((row: any) => ({
          name: row.name,
          role: row.role,
          status: row.status,
          createdAt: row.created_at,
        })),
        active: activeUsersCount,
      },
      tools: {
        popular: popularTools,
      },
      pageVisits: {
        total: totalPageVisitsCount,
        uniqueVisitors: uniqueVisitorsCount,
        today: visitsTodayCount,
        thisMonth: visitsThisMonthCount,
        avgPerDay: avgVisitsPerDayCount,
        byPage: visitsByPage.rows.map((row: any) => ({
          pagePath: row.page_path,
          count: row.count,
        })),
        byDay: visitsByDay.rows.map((row: any) => ({
          date: row.date,
          count: row.count,
        })),
        topReferrers: topReferrers.rows.map((row: any) => ({
          referrer: row.referrer,
          count: row.count,
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

