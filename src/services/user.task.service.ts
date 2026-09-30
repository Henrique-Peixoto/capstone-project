import { AppError } from '../errors/AppError';
import { Task } from '../types/task';
import { TASK_TITLE_MAX_LENGTH } from '../constants';
import { 
  createTask, 
  fetchTaskByUserId 
} from '../repositories/user.task.repository';

export async function createUserTask(userId: string, title: unknown): Promise<Task> {
  const validTitle = validateTitle(title);
  return await createTask(userId, validTitle);
}

export async function getUserTasks(userId: string): Promise<Task[]> {
  return fetchTaskByUserId(userId);
}

function validateTitle(title: unknown): string {
  if (typeof title !== 'string' || title.trim().length === 0) {
    throw new AppError(400, 'Title is required!');
  }

  const trimmedTitle = title.trim();

  if (!isTitleWithinLimits(trimmedTitle)) {
    throw new AppError(400, `Title must have less than ${TASK_TITLE_MAX_LENGTH} characters.`)
  }

  return trimmedTitle;
}

function isTitleWithinLimits(title: string): boolean {
  return title.length <= TASK_TITLE_MAX_LENGTH;
}