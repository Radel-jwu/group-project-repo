import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from './utils/data-source';
import userRouter from './routes/userRoutes';  // Importing the correct router

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/', userRouter);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
