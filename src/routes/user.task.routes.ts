import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware'
import { createUserTask } from '../services/user.task.service';

export const userTaskRouter = Router();

userTaskRouter.use(authenticate);

userTaskRouter.post('/', async (req, res, next) => {
  try {
    const task = await createUserTask(req.user!.user_id, req.body.title);

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