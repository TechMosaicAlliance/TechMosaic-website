import { createClient } from '@libsql/client';

// Initialize Turso client
let client: ReturnType<typeof createClient> | null = null;

export function getTursoClient() {
  if (client) return client;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error('TURSO_DATABASE_URL environment variable is not set');
  }

  client = createClient({
    url,
    authToken: authToken || undefined,
  });

  return client;
}

// Initialize database schema
export async function initializeSchema() {
  const db = getTursoClient();

  try {
    // Create users table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('Super Admin', 'Admin', 'Editor', 'Viewer')),
        status TEXT NOT NULL CHECK(status IN ('Active', 'Inactive')),
        avatar TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create projects table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        client TEXT NOT NULL,
        status TEXT NOT NULL CHECK(status IN ('Planning', 'Ongoing', 'Completed')),
        date TEXT NOT NULL,
        impact_area TEXT NOT NULL,
        service_type TEXT NOT NULL,
        image TEXT,
        project_overview TEXT,
        scope_of_work TEXT,
        project_summary TEXT,
        project_url TEXT,
        case_study_url TEXT,
        tools TEXT,
        media_files TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create settings table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE NOT NULL,
        value TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create page_visits table for analytics
    await db.execute(`
      CREATE TABLE IF NOT EXISTS page_visits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        page_path TEXT NOT NULL,
        page_title TEXT,
        referrer TEXT,
        user_agent TEXT,
        visitor_id TEXT,
        session_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create stats table for hero section stats
    await db.execute(`
      CREATE TABLE IF NOT EXISTS stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value TEXT NOT NULL,
        label TEXT NOT NULL,
        display_order INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes
    await db.execute('CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug)');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status)');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_projects_impact_area ON projects(impact_area)');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_projects_service_type ON projects(service_type)');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key)');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_page_visits_path ON page_visits(page_path)');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_page_visits_created ON page_visits(created_at)');
    await db.execute('CREATE INDEX IF NOT EXISTS idx_stats_display_order ON stats(display_order)');

    console.log('Turso database schema initialized successfully');
  } catch (error) {
    console.error('Schema initialization error:', error);
    throw error;
  }
}

// Seed initial data if tables are empty
export async function seedInitialData() {
  const db = getTursoClient();

  try {
    // Check if users exist
    const userCount = await db.execute('SELECT COUNT(*) as count FROM users');
    const count = userCount.rows[0].count as number;

    if (count === 0) {
      console.log('Seeding initial users...');
      
      const bcrypt = require('bcryptjs');
      const defaultPassword = bcrypt.hashSync('admin123', 10);

      // Insert Super Admin
      await db.execute({
        sql: `INSERT INTO users (name, username, email, password, role, status, avatar)
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: ['Super Administrator', 'superadmin', 'superadmin@techmosaic.com', defaultPassword, 'Super Admin', 'Active', 'SA']
      });

      // Insert Admin
      await db.execute({
        sql: `INSERT INTO users (name, username, email, password, role, status, avatar)
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: ['Admin User', 'admin', 'admin@techmosaic.com', defaultPassword, 'Admin', 'Active', 'AU']
      });

      console.log('Initial users seeded successfully');
    }

    // Check if projects exist
    const projectCount = await db.execute('SELECT COUNT(*) as count FROM projects');
    const pCount = projectCount.rows[0].count as number;

    if (pCount === 0) {
      console.log('Seeding initial projects...');
      await seedInitialProjects(db);
      console.log('Initial projects seeded successfully');
    }

    // Check if stats exist
    const statsCount = await db.execute('SELECT COUNT(*) as count FROM stats');
    const sCount = statsCount.rows[0].count as number;

    if (sCount === 0) {
      console.log('Seeding initial stats...');
      const initialStats = [
        { value: '72+', label: 'Happy Clients' },
        { value: '128+', label: 'Projects' },
        { value: '57+', label: 'Team Members' },
        { value: '99%', label: 'Satisfaction' }
      ];

      for (let i = 0; i < initialStats.length; i++) {
        await db.execute({
          sql: 'INSERT INTO stats (value, label, display_order) VALUES (?, ?, ?)',
          args: [initialStats[i].value, initialStats[i].label, i]
        });
      }
      console.log('Initial stats seeded successfully');
    }
  } catch (error) {
    console.error('Seeding error:', error);
    throw error;
  }
}

async function seedInitialProjects(db: ReturnType<typeof createClient>) {
  const initialProjects = [
    {
      slug: 'ecommerce-redesign',
      name: 'E-Commerce Platform for Local Artisans',
      client: 'ShopFlow Inc',
      status: 'Completed',
      date: '2024-01-15',
      impactArea: 'Digital Solutions & Innovation',
      serviceType: 'Web Development',
      image: '/assets/portfolio1.png',
      projectOverview: 'Complete redesign of the e-commerce platform with modern UI/UX principles.',
      scopeOfWork: 'User research, wireframing, UI design, frontend development, payment integration.',
      projectSummary: 'Successfully launched a modern e-commerce platform that increased conversion rates by 45%.',
      projectUrl: 'https://shopflow.example.com',
      tools: JSON.stringify(['Figma', 'React', 'Node.js']),
    },
    {
      slug: 'mobile-banking-app',
      name: 'Mobile Banking for Rural Communities',
      client: 'FinTech Solutions',
      status: 'Ongoing',
      date: '2024-02-20',
      impactArea: 'Digital Solutions & Innovation',
      serviceType: 'Mobile App Development',
      image: '/assets/portfolio2.png',
      projectOverview: 'Developing a mobile banking application for underserved rural communities.',
      scopeOfWork: 'Mobile app design, backend development, payment gateway integration.',
      projectSummary: 'Mobile banking app reaching 5,000+ users in rural areas.',
      projectUrl: 'https://fintech.example.com',
      tools: JSON.stringify(['React', 'Node.js', 'Figma']),
    },
  ];

  for (const project of initialProjects) {
    await db.execute({
      sql: `INSERT INTO projects (slug, name, client, status, date, impact_area, service_type, image,
            project_overview, scope_of_work, project_summary, project_url, tools)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        project.slug, project.name, project.client, project.status, project.date,
        project.impactArea, project.serviceType, project.image, project.projectOverview,
        project.scopeOfWork, project.projectSummary, project.projectUrl, project.tools
      ]
    });
  }
}

// Initialize database on first import
let initialized = false;

export async function ensureInitialized() {
  if (!initialized) {
    await initializeSchema();
    await seedInitialData();
    initialized = true;
  }
}

