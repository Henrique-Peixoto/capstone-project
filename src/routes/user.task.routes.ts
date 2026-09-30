import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware'
import * as userTaskService from '../services/user.task.service';

export const userTaskRouter = Router();

userTaskRouter.use(authenticate);

userTaskRouter.post('/', async (req, res, next) => {
  try {
    const task = await userTaskService.createUserTask(req.user!.user_id, req.body.title);

    res.status(201).json({
      success: true,
      data: {
        task
      }
    })
  } catch (error) {
    next(error);
  } 
});

userTaskRouter.get('/', async (req, res, next) => {
  try {
    const tasks = await userTaskService.getUserTasks(req.user!.user_id);
    
    res.status(200).json({
      success: true,
      data: { tasks }
    });
  } catch (error) {
    next(error);
  }
});

userTaskRouter.get('/:task_id', async (req, res, next) => {
  try {
    const task = await userTaskService.getUserTask(req.params.task_id, req.user!.user_id);

    res.status(200).json({
      success: true,
      data: { task }
    });
  } catch (error) {
    next(error);
  }
});

userTaskRouter.patch('/:task_id', async(req, res, next) => {
  try {
    const task = await userTaskService.updateUserTask(
      req.params.task_id, 
      req.user!.user_id, 
      req.body.title
    );

    res.status(200).json({
      success: true,
      data: { task }
    });
  } catch (error) {
    next(error);
  }
});

userTaskRouter.delete('/:task_id', async(req, res, next) => {
  try {
    await userTaskService.deleteUserTask(req.params.task_id, req.user!.user_id);

    res.status(200).json({
      success: true,
      message: 'Task successfully deleted!'
    });
  } catch (error) {
    next(error);
  }
});