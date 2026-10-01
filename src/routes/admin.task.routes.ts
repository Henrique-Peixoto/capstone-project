import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/admin.middleware';
import * as adminTaskService from '../services/admin.task.service';

export const adminTaskRouter = Router();

adminTaskRouter.use(authenticate, requireAdmin);

adminTaskRouter.get('/', async (req, res, next) => {
  try {
    const data = await adminTaskService.getAdminTasks(req.query);

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
});

adminTaskRouter.patch('/:task_id/status', async (req, res, next) => {
  try {
    const task = await adminTaskService.updateAdminTaskStatus(req.params.task_id, req.body.status);

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
});
