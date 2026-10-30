import bcrypt from 'bcryptjs';
import { all, get, run } from './db.js';

export async function initializeDatabase() {
  await run(`CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);

  await run(`CREATE TABLE IF NOT EXISTS attractions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('ABERTA','FECHADA','EM_MANUTENCAO')),
    closure_reason TEXT,
    image_url TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);

  await run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    event_date TEXT NOT NULL,
    event_time TEXT,
    location TEXT NOT NULL,
    image_url TEXT,
    published INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);

  // Migrações simples para bases criadas por versões anteriores do MVP.
  const attractionColumns = await all('PRAGMA table_info(attractions)');
  if (!attractionColumns.some((column) => column.name === 'image_url')) {
    await run('ALTER TABLE attractions ADD COLUMN image_url TEXT');
  }

  const eventColumns = await all('PRAGMA table_info(events)');
  if (!eventColumns.some((column) => column.name === 'image_url')) {
    await run('ALTER TABLE events ADD COLUMN image_url TEXT');
  }

  await run(`CREATE TABLE IF NOT EXISTS notices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    urgent INTEGER NOT NULL DEFAULT 0,
    active INTEGER NOT NULL DEFAULT 1,
    attraction_id INTEGER,
    image_url TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(attraction_id) REFERENCES attractions(id) ON DELETE SET NULL
  )`);

  const noticeColumns = await all('PRAGMA table_info(notices)');
  if (!noticeColumns.some((column) => column.name === 'image_url')) {
    await run('ALTER TABLE notices ADD COLUMN image_url TEXT');
  }

  const admin = await get('SELECT id FROM admins WHERE email = ?', ['admin@tereverde.local']);
  if (!admin) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await run('INSERT INTO admins (name, email, password_hash) VALUES (?, ?, ?)', [
      'Administrador Terê Verde',
      'admin@tereverde.local',
      passwordHash
    ]);
  }

  const attractionCount = await get('SELECT COUNT(*) AS total FROM attractions');
  if (attractionCount.total === 0) {
    await run(`INSERT INTO attractions (name, description, category, location, status, closure_reason, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)`, [
      'Trilha Pedra do Sino',
      'Uma das trilhas mais conhecidas do Parque Nacional da Serra dos Órgãos.',
      'Trilha',
      'Parque Nacional da Serra dos Órgãos',
      'ABERTA',
      null,
      '/images/trilha.jpg'
    ]);
    await run(`INSERT INTO attractions (name, description, category, location, status, closure_reason, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)`, [
      'Cachoeira dos Frades',
      'Atração natural de Teresópolis para visitação e contemplação.',
      'Cachoeira',
      'Teresópolis - RJ',
      'ABERTA',
      null,
      '/images/cachoeira.jpg'
    ]);
  }
  const eventCount = await get('SELECT COUNT(*) AS total FROM events');
  if (eventCount.total === 0) {
    await run(`INSERT INTO events (title, description, event_date, event_time, location, image_url, published)
      VALUES (?, ?, ?, ?, ?, ?, ?)`, [
      'Caminhada guiada na Serra',
      'Atividade de integração com a natureza e orientação sobre visitação responsável.',
      '2026-10-18',
      '08:30',
      'Parque Nacional da Serra dos Órgãos',
      null,
      1
    ]);
  }

  await run('CREATE INDEX IF NOT EXISTS idx_attractions_status ON attractions(status)');
  await run('CREATE INDEX IF NOT EXISTS idx_attractions_category ON attractions(category)');
  await run('CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date)');
  await run('CREATE INDEX IF NOT EXISTS idx_events_published ON events(published)');
  await run('CREATE INDEX IF NOT EXISTS idx_notices_active_urgent ON notices(active, urgent)');

  const noticeCount = await get('SELECT COUNT(*) AS total FROM notices');
  if (noticeCount.total === 0) {
    const attraction = await get('SELECT id FROM attractions ORDER BY id LIMIT 1');
    await run(`INSERT INTO notices (title, description, urgent, active, attraction_id, image_url)
      VALUES (?, ?, ?, ?, ?, ?)`, [
      'Condições da trilha',
      'Verifique sempre as condições climáticas e os avisos antes de iniciar a visita.',
      1,
      1,
      attraction?.id || null,
      '/images/mirante.jpg'
    ]);
  }

}
