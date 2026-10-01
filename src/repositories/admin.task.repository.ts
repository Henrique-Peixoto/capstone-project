import { pool } from "../lib/db";
import { AdminTaskQueryParams, Task } from "../types/task";

export async function getAdminTasks(filters: AdminTaskQueryParams): Promise<Task[]> {
  const conditions: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  if (filters.search) {
    conditions.push(`title ILIKE $${paramIndex}`);
    values.push(`%${filters.search}%`);
    paramIndex++;
  }

  if (filters.status) {
    conditions.push(`status = $${paramIndex}`);
    values.push(filters.status);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const sql = `
    SELECT id, title, status, user_id, created_at, updated_at
    FROM support_tasks
    ${whereClause}
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(sql, values);
  return result.rows;
}

export async function updateAdminTaskStatus(taskId: string, status: string): Promise<Task | null> {
  const sql = `
    UPDATE support_tasks
    SET status = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING id, title, status, user_id, created_at, updated_at;
  `;

  const result = await pool.query(sql, [status, taskId]);
  return result.rows[0] ?? null;
}