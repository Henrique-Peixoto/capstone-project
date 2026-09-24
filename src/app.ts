// Entry file for express
// Contains express related logic

import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export function createApp(){
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(errorHandler);
  app.use(notFound);
};