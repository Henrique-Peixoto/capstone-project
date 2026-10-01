import { AppError } from "../errors/AppError";
import { AdminTaskQueryParams, Task } from "../types/task";
import * as adminTaskRepository from "../repositories/admin.task.repository";

const TASK_STATUSES = ['OPEN', 'IN_PROGRESS', 'RESOLVED'] as const;
type TaskStatus = (typeof TASK_STATUSES)[number];

export async function getAdminTasks(query: AdminTaskQueryParams): Promise<Task[]> {
  const search = query.search?.trim() || undefined;
  const status = query.status?.trim() || undefined;
  
  if (!isStatusValid(status)) {
    throw new AppError(400, 'Invalid status value! Valid values are: OPEN, IN_PROGRESS, RESOLVED');
  }

  const tasks = await adminTaskRepository.getAdminTasks({ search, status });
  return tasks;
}

export async function updateAdminTaskStatus(taskId: string, status: unknown): Promise<Task> {
  if (!isStatusValid(status)) {
    throw new AppError(400, 'Invalid status value! Valid values are: OPEN, IN_PROGRESS, RESOLVED');
  }

  const updatedTask = await adminTaskRepository.updateAdminTaskStatus(taskId, status as string);
  
  if (!updatedTask) {
    throw new AppError(404, 'Task not found!');
  }

  return updatedTask;
}

function isStatusValid(status: unknown): boolean {
  return typeof status === 'string' && TASK_STATUSES.includes(status as TaskStatus);
}