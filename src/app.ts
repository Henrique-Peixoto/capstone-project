// Entry file for express
// Contains express related logic

import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import { apiRouter } from './routes';

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/api', apiRouter);
  app.use(errorHandler);
  app.use(notFound);
  return app;
};