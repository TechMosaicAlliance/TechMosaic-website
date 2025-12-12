import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Get the database path
const dbPath = path.join(process.cwd(), 'data', 'projects.db');

// Ensure the data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database connection
let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (db) {
    return db;
  }

  db = new Database(dbPath);
  
  // Enable foreign keys
  db.pragma('foreign_keys = ON');
  
  // Initialize schema
  initializeSchema(db);
  
  return db;
}

function initializeSchema(database: Database.Database) {
  // Create projects table
  database.exec(`
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
      tools TEXT, -- JSON array stored as text
      media_files TEXT, -- JSON array stored as text
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create users table
  database.exec(`
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

  // Create index for faster queries
  database.exec(`
    CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
    CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
    CREATE INDEX IF NOT EXISTS idx_projects_impact_area ON projects(impact_area);
    CREATE INDEX IF NOT EXISTS idx_projects_service_type ON projects(service_type);
    CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
  `);

  // Seed initial data if tables are empty
  const projectCount = database.prepare('SELECT COUNT(*) as count FROM projects').get() as { count: number };
  if (projectCount.count === 0) {
    seedInitialData(database);
  }

  const userCount = database.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  if (userCount.count === 0) {
    seedInitialUsers(database);
  }
}

function seedInitialData(database: Database.Database) {
  const insert = database.prepare(`
    INSERT INTO projects (
      slug, name, client, status, date, impact_area, service_type, image,
      project_overview, scope_of_work, project_summary, project_url, tools
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

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
      projectOverview: 'Complete redesign of the e-commerce platform with modern UI/UX principles and improved conversion rates.',
      scopeOfWork: 'User research, wireframing, UI design, frontend development, payment integration, testing, and deployment.',
      projectSummary: 'Successfully launched a modern e-commerce platform that increased conversion rates by 45% and improved user satisfaction scores by 60%.',
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
      projectOverview: 'Developing a mobile banking application to provide financial services to underserved rural communities.',
      scopeOfWork: 'Mobile app design, backend development, payment gateway integration, security implementation, testing.',
      projectSummary: 'In progress: Mobile banking app reaching 5,000+ users in rural areas with secure transaction capabilities.',
      projectUrl: 'https://fintech.example.com',
      tools: JSON.stringify(['React', 'Node.js', 'Figma']),
    },
    {
      slug: 'refugee-support-platform',
      name: 'Refugee Support Platform',
      client: 'Humanity First',
      status: 'Completed',
      date: '2024-03-10',
      impactArea: 'Humanity Hub & Missions',
      serviceType: 'Web Development',
      image: '/assets/portfolio1.png',
      projectOverview: 'Platform connecting refugees with essential resources, services, and support networks.',
      scopeOfWork: 'Platform design, database architecture, resource management system, multi-language support, deployment.',
      projectSummary: 'Platform serving 2,000+ refugees with access to housing, employment, education, and healthcare resources.',
      projectUrl: 'https://humanityfirst.example.com',
      tools: JSON.stringify(['WordPress', 'Figma']),
    },
    {
      slug: 'climate-tracking-dashboard',
      name: 'Climate Data Tracking Dashboard',
      client: 'Green Earth Initiative',
      status: 'Ongoing',
      date: '2024-03-25',
      impactArea: 'Climate Impact Projects',
      serviceType: 'Web Development',
      image: '/assets/portfolio2.png',
      projectOverview: 'Building an advanced analytics dashboard with real-time climate data visualization and reporting capabilities.',
      scopeOfWork: 'Data integration, dashboard design, real-time visualization development, reporting system, API development.',
      projectSummary: 'Dashboard tracking climate metrics across 50+ regions, providing actionable insights for environmental organizations.',
      projectUrl: 'https://greenearth.example.com',
      tools: JSON.stringify(['React', 'Python', 'Figma']),
    },
    {
      slug: 'ai-education-assistant',
      name: 'AI-Powered Education Assistant',
      client: 'EduTech Labs',
      status: 'Completed',
      date: '2024-02-05',
      impactArea: 'Intelligent Systems & AI Innovation',
      serviceType: 'Mobile App Development',
      image: '/assets/portfolio1.png',
      projectOverview: 'AI-powered mobile application that provides personalized learning assistance and study recommendations.',
      scopeOfWork: 'AI model development, mobile app design, content management system, recommendation engine, performance analytics.',
      projectSummary: 'App adopted by 10,000+ students, showing 35% improvement in learning outcomes and 80% user retention rate.',
      projectUrl: 'https://edutech.example.com',
      tools: JSON.stringify(['React', 'Python', 'Adobe XD']),
    },
    {
      slug: 'skills-training-portal',
      name: 'Skills Training Portal',
      client: 'Career Development Corp',
      status: 'Ongoing',
      date: '2024-04-01',
      impactArea: 'Skills & Capacity Development',
      serviceType: 'Web Development',
      image: '/assets/portfolio2.png',
      projectOverview: 'Comprehensive online platform for skills training, certification, and career development resources.',
      scopeOfWork: 'Learning management system, video hosting, assessment tools, certification system, progress tracking.',
      projectSummary: 'Platform delivering training to 2,000+ learners with 500+ courses and 85% course completion rate.',
      projectUrl: 'https://careerdev.example.com',
      tools: JSON.stringify(['WordPress', 'Canva', 'Figma']),
    },
  ];

  const insertMany = database.transaction((projects) => {
    for (const project of projects) {
      insert.run(
        project.slug,
        project.name,
        project.client,
        project.status,
        project.date,
        project.impactArea,
        project.serviceType,
        project.image,
        project.projectOverview,
        project.scopeOfWork,
        project.projectSummary,
        project.projectUrl,
        project.tools
      );
    }
  });

  insertMany(initialProjects);
}

function seedInitialUsers(database: Database.Database) {
  // Default password: "admin123" - hashed using bcrypt
  // In production, this should be changed immediately
  const bcrypt = require('bcryptjs');
  const defaultPassword = bcrypt.hashSync('admin123', 10);

  const insert = database.prepare(`
    INSERT INTO users (name, username, email, password, role, status, avatar)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const initialUsers = [
    {
      name: 'Super Administrator',
      username: 'superadmin',
      email: 'superadmin@techmosaic.com',
      password: defaultPassword,
      role: 'Super Admin',
      status: 'Active',
      avatar: 'SA',
    },
    {
      name: 'Admin User',
      username: 'admin',
      email: 'admin@techmosaic.com',
      password: defaultPassword,
      role: 'Admin',
      status: 'Active',
      avatar: 'AU',
    },
  ];

  const insertMany = database.transaction((users) => {
    for (const user of users) {
      insert.run(
        user.name,
        user.username,
        user.email,
        user.password,
        user.role,
        user.status,
        user.avatar
      );
    }
  });

  insertMany(initialUsers);
}

// Close database connection (useful for cleanup)
export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}

