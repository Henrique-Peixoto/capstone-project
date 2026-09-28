import { DBUserRow, DBUserWithPasswordRow, User } from '../types/user';
import { pool } from '../lib/db';

export async function findUserByEmail(email: string): Promise<User | null> {
  const sql = `
    SELECT id, email, role, created_at
    FROM users
    WHERE email = $1
  `;

  const result = await pool.query(sql, [email]);

  return result.rows[0] ?? null; 
}

export async function createUser(email: string, hashedPassword: string): Promise<User> {
  const sql = `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING id, email, role, created_at;
  `;

  const result = await pool.query<DBUserRow>(sql, [email, hashedPassword]);
  return result.rows[0];
}

export async function findUserByEmailWithPassword(email: string): Promise<DBUserWithPasswordRow | null> {
  const sql = `
    SELECT id, email, role, password_hash, created_at
    FROM users
    WHERE email = $1;
  `;

  const result = await pool.query<DBUserWithPasswordRow>(sql, [email]);
  return result.rows[0] ?? null;
}