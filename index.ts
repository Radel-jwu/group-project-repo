import express from 'express';
import userRoutes from './routes/user';

const app = express();
app.use(express.json());

// Register routes
app.use('/api', userRoutes); // Prefix all user routes with /api

app.listen(3000, () => {
  console.log('Server running on port 3000');
});