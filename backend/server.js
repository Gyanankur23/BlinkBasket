import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { MongoMemoryServer } from 'mongodb-memory-server';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import { seedDatabase } from './seed.js';
import Product from './models/productModel.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const isServerless = Boolean(process.env.VERCEL);

// MongoDB Connection with in-memory fallback for development
let mongoServer = null;
let dbConnected = false;

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL;

    // Vercel serverless does not support local/in-memory MongoDB fallback reliably.
    if (isServerless && !mongoUrl) {
      console.error('MONGODB_URL is required on Vercel for database-backed APIs.');
      dbConnected = false;
      return;
    }
    
    // If no MongoDB URL is set, use in-memory MongoDB for development
    if (!mongoUrl || mongoUrl.includes('localhost')) {
      if (isServerless) {
        console.error('Local MongoDB URLs are not supported on Vercel.');
        dbConnected = false;
        return;
      }
      try {
        // Try connecting to local MongoDB first
        await mongoose.connect(mongoUrl || 'mongodb://localhost/blinkbasket', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 3000,
        });
        console.log('✓ MongoDB Connected to Local Database!');
        dbConnected = true;
        return;
      } catch (localError) {
        console.log('Local MongoDB not available, starting in-memory MongoDB...');
        
        try {
          // Start in-memory MongoDB with longer timeout
          mongoServer = await MongoMemoryServer.create({
            instance: {
              dbName: 'blinkbasket',
            },
            binary: {
              downloadTimeout: 120000, // 2 minutes
            }
          });
          const mongoUri = mongoServer.getUri();
          
          await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          console.log('✓ In-Memory MongoDB Started Successfully!');
          console.log('  URI:', mongoUri);
          dbConnected = true;
          
          // Seed comprehensive data
          console.log('\n→ Seeding database with realistic products...');
          await seedDatabase();
          
          // Verify products were created
          const productCount = await Product.countDocuments();
          console.log(`✓ Total products in database: ${productCount}`);
          return;
        } catch (memError) {
          console.error('In-memory MongoDB failed:', memError.message);
          console.log('\n⚠️  Running in LIMITED MODE - Database features unavailable');
          console.log('   To fix: Install MongoDB locally or set MONGODB_URL in .env\n');
          dbConnected = false;
          return; // Continue without DB
        }
      }
    }
    
    // Connect to provided MongoDB URL (e.g., Atlas)
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ MongoDB Connected to Cloud Database!');
    dbConnected = true;
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    console.log('\n⚠️  Running in LIMITED MODE - Database features unavailable');
    dbConnected = false;
  }
};


// Handle mongoose connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

app.use('/api/uploads', uploadRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/api/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || '');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));

// DB Connection Check Middleware
const checkDB = (req, res, next) => {
  if (!dbConnected && req.originalUrl.startsWith('/api')) {
    return res.status(503).json({ 
      message: 'Database not available. Please try again later or contact support.',
      dbStatus: 'disconnected'
    });
  }
  next();
};

// API routes with DB check
app.use('/api/products', checkDB, productRouter);
app.use('/api/users', checkDB, userRouter);
app.use('/api/orders', checkDB, orderRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    dbConnected,
    timestamp: new Date().toISOString()
  });
});

// React app fallback
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ 
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const port = process.env.PORT || 5000;
const setupSocket = (httpServer) => {
  const io = new Server(httpServer, { cors: { origin: '*' } });
  const users = [];

  io.on('connection', (socket) => {
    console.log('connection', socket.id);
    socket.on('disconnect', () => {
      const user = users.find((x) => x.socketId === socket.id);
      if (user) {
        user.online = false;
        console.log('Offline', user.name);
        const admin = users.find((x) => x.isAdmin && x.online);
        if (admin) {
          io.to(admin.socketId).emit('updateUser', user);
        }
      }
    });
    socket.on('onLogin', (user) => {
      const updatedUser = {
        ...user,
        online: true,
        socketId: socket.id,
        messages: [],
      };
      const existUser = users.find((x) => x._id === updatedUser._id);
      if (existUser) {
        existUser.socketId = socket.id;
        existUser.online = true;
      } else {
        users.push(updatedUser);
      }
      console.log('Online', user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('updateUser', updatedUser);
      }
      if (updatedUser.isAdmin) {
        io.to(updatedUser.socketId).emit('listUsers', users);
      }
    });

    socket.on('onUserSelected', (user) => {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        const existUser = users.find((x) => x._id === user._id);
        io.to(admin.socketId).emit('selectUser', existUser);
      }
    });

    socket.on('onMessage', (message) => {
      if (message.isAdmin) {
        const user = users.find((x) => x._id === message._id && x.online);
        if (user) {
          io.to(user.socketId).emit('message', message);
          user.messages.push(message);
        }
      } else {
        const admin = users.find((x) => x.isAdmin && x.online);
        if (admin) {
          io.to(admin.socketId).emit('message', message);
          const user = users.find((x) => x._id === message._id && x.online);
          user.messages.push(message);
        } else {
          io.to(socket.id).emit('message', {
            name: 'Admin',
            body: 'Sorry. I am not online right now',
          });
        }
      }
    });
  });
};

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    const httpServer = http.Server(app);
    setupSocket(httpServer);
    httpServer.listen(port, () => {
      console.log(`Serve at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

if (!isServerless) {
  startServer();
} else {
  await connectDB();
}

export default app;
