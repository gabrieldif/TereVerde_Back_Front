import sqlite3 from 'sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from '../config/env.js';

sqlite3.verbose();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultDbPath = path.resolve(__dirname, '../../data/tereverde.db');
const dbPath = env.dbPath ? path.resolve(env.dbPath) : defaultDbPath;

// Garante que a pasta do banco exista (ex.: projeto clonado do Git, sem a pasta data/).
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

export const db = new sqlite3.Database(dbPath);

// O SQLite não aplica chaves estrangeiras por padrão: sem isto, excluir uma atração
// deixaria avisos apontando para um registro que não existe mais.
db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON');
});

export function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(error) {
      if (error) reject(error);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

export function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) reject(error);
      else resolve(row);
    });
  });
}

export function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
}

export function closeDb() {
  return new Promise((resolve, reject) => {
    db.close((error) => error ? reject(error) : resolve());
  });
}
