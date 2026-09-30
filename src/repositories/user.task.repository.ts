import { pool } from '../lib/db';
import { Task } from '../types/task';

type TaskRow = Task;

export async function createTask(userId: string, title: string): Promise<Task> {
  const sql = `
    INSERT INTO support_tasks (title, user_id)
    VALUES ($1, $2)
    RETURNING id, title, status, user_id, created_at, updated_at;
  `;

  const result = await pool.query<TaskRow>(sql, [title, userId]);
  return result.rows[0];
}

export async function fetchTaskByUserId(userId: string): Promise<Task[]> {
  const sql = `
    SELECT id, title, status, user_id, created_at, updated_at
    FROM support_tasks
    WHERE user_id = $1
    ORDER BY created_at DESC;
  `;

  const result = await pool.query<TaskRow>(sql, [userId]);
  return result.rows;
}

export async function fetchTaskById(taskId: string, userId: string): Promise<TaskRow | null> {
  const sql = `
    SELECT id, title, status, user_id, created_at, updated_at
    FROM support_tasks
    WHERE id = $1 AND user_id = $2
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(sql, [taskId, userId]);
  return result.rows[0] ?? null;
}