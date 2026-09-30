import { AppError } from '../errors/AppError';
import { Task } from '../types/task';
import { TASK_TITLE_MAX_LENGTH } from '../constants';
import * as userTaskRepository from '../repositories/user.task.repository';

export async function createUserTask(userId: string, title: unknown): Promise<Task> {
  const validTitle = validateTitle(title);
  return await userTaskRepository.createUserTask(userId, validTitle);
}

export async function getUserTasks(userId: string): Promise<Task[]> {
  return await userTaskRepository.getUserTasks(userId);
}

export async function getUserTask(taskId: string, userId: string): Promise<Task> {
  const task = await userTaskRepository.getUserTask(taskId, userId);

  if (!task) {
    throw new AppError(404, 'Task not found!');
  }

  return task;
}

export async function updateUserTask(taskId: string, userId: string, title: string): Promise<Task> {
  const validTitle = validateTitle(title);
  const task = await userTaskRepository.updateUserTask(taskId, userId, validTitle);

  if (!task) {
    throw new AppError(404, 'Task not found!');
  }

  return task;
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