#!/usr/bin/env ts-node

/**
 * Database Utility Script
 * 
 * This script provides utilities to interact with the SQLite database.
 * 
 * Usage:
 *   npx tsx scripts/db-utils.ts <command> [options]
 * 
 * Commands:
 *   list          - List all projects
 *   get <slug>    - Get a project by slug
 *   count         - Get total project count
 *   reset         - Reset database (WARNING: deletes all data)
 *   query <sql>   - Run a custom SQL query
 */

import { getDatabase, closeDatabase } from '../src/lib/db';

const command = process.argv[2];
const args = process.argv.slice(3);

async function main() {
  const db = getDatabase();

  try {
    switch (command) {
      case 'list':
        listProjects(db);
        break;
      
      case 'get':
        if (!args[0]) {
          console.error('Error: Please provide a project slug');
          process.exit(1);
        }
        getProject(db, args[0]);
        break;
      
      case 'count':
        countProjects(db);
        break;
      
      case 'reset':
        if (args[0] !== '--confirm') {
          console.error('WARNING: This will delete all data!');
          console.error('Run with --confirm flag to proceed: npm run db:reset');
          process.exit(1);
        }
        resetDatabase(db);
        break;
      
      case 'query':
        if (!args[0]) {
          console.error('Error: Please provide a SQL query');
          process.exit(1);
        }
        runQuery(db, args.join(' '));
        break;
      
      case 'schema':
        showSchema(db);
        break;
      
      default:
        console.log(`
Database Utility Script

Usage: npx tsx scripts/db-utils.ts <command> [options]

Commands:
  list              List all projects
  get <slug>        Get a project by slug
  count             Get total project count
  reset             Reset database (requires --confirm flag)
  query <sql>       Run a custom SQL query
  schema            Show database schema

Examples:
  npx tsx scripts/db-utils.ts list
  npx tsx scripts/db-utils.ts get ecommerce-redesign
  npx tsx scripts/db-utils.ts count
  npx tsx scripts/db-utils.ts query "SELECT * FROM projects WHERE status = 'Completed'"
  npx tsx scripts/db-utils.ts schema
        `);
        process.exit(1);
    }
  } finally {
    closeDatabase();
  }
}

function listProjects(db: any) {
  const stmt = db.prepare('SELECT id, slug, name, client, status, date FROM projects ORDER BY date DESC');
  const projects = stmt.all() as any[];

  console.log(`\nFound ${projects.length} projects:\n`);
  console.table(projects);
}

function getProject(db: any, slug: string) {
  const stmt = db.prepare('SELECT * FROM projects WHERE slug = ?');
  const project = stmt.get(slug) as any;

  if (!project) {
    console.error(`Project with slug "${slug}" not found`);
    process.exit(1);
  }

  console.log('\nProject Details:');
  console.log('================');
  console.log(`ID: ${project.id}`);
  console.log(`Slug: ${project.slug}`);
  console.log(`Name: ${project.name}`);
  console.log(`Client: ${project.client}`);
  console.log(`Status: ${project.status}`);
  console.log(`Date: ${project.date}`);
  console.log(`Impact Area: ${project.impact_area}`);
  console.log(`Service Type: ${project.service_type}`);
  if (project.project_url) console.log(`Project URL: ${project.project_url}`);
  if (project.tools) {
    console.log(`Tools: ${JSON.parse(project.tools).join(', ')}`);
  }
  console.log(`Created: ${project.created_at}`);
  console.log(`Updated: ${project.updated_at}`);
  console.log('');
}

function countProjects(db: any) {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM projects');
  const result = stmt.get() as { count: number };
  
  const statusStmt = db.prepare(`
    SELECT status, COUNT(*) as count 
    FROM projects 
    GROUP BY status
  `);
  const statusCounts = statusStmt.all() as any[];

  console.log(`\nTotal Projects: ${result.count}\n`);
  console.log('By Status:');
  statusCounts.forEach((row: any) => {
    console.log(`  ${row.status}: ${row.count}`);
  });
  console.log('');
}

function resetDatabase(db: any) {
  console.log('Resetting database...');
  db.exec('DELETE FROM projects');
  console.log('Database reset complete. Initial data will be seeded on next API call.');
}

function runQuery(db: any, sql: string) {
  try {
    const stmt = db.prepare(sql);
    const results = stmt.all();
    console.log('\nQuery Results:');
    console.table(results);
  } catch (error: any) {
    console.error('Query Error:', error.message);
    process.exit(1);
  }
}

function showSchema(db: any) {
  const stmt = db.prepare(`
    SELECT sql 
    FROM sqlite_master 
    WHERE type='table' AND name='projects'
  `);
  const result = stmt.get() as { sql: string };
  
  console.log('\nDatabase Schema:');
  console.log('================');
  console.log(result.sql);
  console.log('\nIndexes:');
  
  const indexStmt = db.prepare(`
    SELECT name, sql 
    FROM sqlite_master 
    WHERE type='index' AND tbl_name='projects'
  `);
  const indexes = indexStmt.all() as any[];
  indexes.forEach((idx: any) => {
    console.log(`  - ${idx.name}`);
  });
  console.log('');
}

main().catch(console.error);

