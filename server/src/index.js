import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import connectDB from './config/db.js';
import healthRoutes from './routes/health.routes.js';

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import requestRoutes from "./routes/requestsRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/health', healthRoutes);
// route for auth
app.use("/auth",authRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'Swap Skills API is running' });
});

// user route
app.use("/user",userRoutes);

// requests route
app.use("/requests",requestRoutes);

// review route
app.use("/reviews",reviewRoutes);

//search filter route
app.use("/search",searchRoutes);

// notification route
app.use("/notification",notificationRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
