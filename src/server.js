import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;
let server;

const startServer = async () => {
  try {
    await connectDB();
    server = app.listen(PORT, () => {
      console.log(`ICAD API running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error.message);

  if (server) {
    server.close(() => process.exit(1));
    return;
  }

  process.exit(1);
});

process.on('SIGTERM', () => {
  if (server) {
    server.close(() => process.exit(0));
  }
});

startServer();
