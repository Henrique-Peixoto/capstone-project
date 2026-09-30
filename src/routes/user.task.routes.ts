import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware'
import { 
  createUserTask, 
  getUserTaskById, 
  getUserTasks 
} from '../services/user.task.service';

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

userTaskRouter.get('/', async (req, res, next) => {
  try {
    const tasks = await getUserTasks(req.user!.user_id);
    
    res.status(200).json({
      success: true,
      data: { tasks }
    });
  } catch (error) {
    next(error);
  }
});

userTaskRouter.get('/:taskId', async (req, res, next) => {
  try {
    const task = await getUserTaskById(req.params.taskId, req.user!.user_id);

    res.status(200).json({
      success: true,
      data: { task }
    });
  } catch (error) {
    next(error);
  }
});