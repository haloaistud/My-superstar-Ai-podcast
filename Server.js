const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const logger = require('./utils/logger');
const { connectDB } = require('./config/database');
const { initializeRedis } = require('./config/redis');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const channelRoutes = require('./routes/channels');
const streamRoutes = require('./routes/streams');
const chatRoutes = require('./routes/chat');
const adminRoutes = require('./routes/admin');

// Import socket handlers
const { initializeSocketHandlers } = require('./socket/socketHandlers');

class BroadcastHubServer {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIo(this.server, {
            cors: {
                origin: process.env.FRONTEND_URL || "http://localhost:3000",
                methods: ["GET", "POST"],
                credentials: true
            },
            transports: ['websocket', 'polling']
        });
        
        this.port = process.env.PORT || 3001;
        this.setupMiddleware();
        this.setupRoutes();
        this.setupSocketHandlers();
        this.setupErrorHandling();
    }

    setupMiddleware() {
        // Security middleware
        this.app.use(helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    scriptSrc: ["'self'"],
                    imgSrc: ["'self'", "data:", "https:"],
                    connectSrc: ["'self'", "ws:", "wss:"]
                }
            }
        }));

        // CORS configuration
        this.app.use(cors({
            origin: process.env.FRONTEND_URL || "http://localhost:3000",
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

        // Rate limiting
        this.app.use(rateLimiter);

        // Body parsing middleware
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

        // Static file serving
        this.app.use(express.static(path.join(__dirname, '../public')));

        // Request logging
        this.app.use((req, res, next) => {
            logger.info(`${req.method} ${req.path} - ${req.ip}`);
            next();
        });
    }

    setupRoutes() {
        // Health check endpoint
        this.app.get('/health', (req, res) => {
            res.status(200).json({
                status: 'healthy',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                version: process.env.npm_package_version || '1.0.0'
            });
        });

        // API routes
        this.app.use('/api/channels', channelRoutes);
        this.app.use('/api/streams', streamRoutes);
        this.app.use('/api/chat', chatRoutes);
        this.app.use('/api/admin', adminRoutes);

        // Serve the main application
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });

        // Handle 404 for API routes
        this.app.use('/api/*', (req, res) => {
            res.status(404).json({
                error: 'API endpoint not found',
                path: req.path,
                method: req.method
            });
        });

        // Catch-all for frontend routes (SPA support)
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });
    }

    setupSocketHandlers() {
        initializeSocketHandlers(this.io);
    }

    setupErrorHandling() {
        this.app.use(errorHandler);
        
        // Handle uncaught exceptions
        process.on('uncaughtException', (error) => {
            logger.error('Uncaught Exception:', error);
            process.exit(1);
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (reason, promise) => {
            logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
            process.exit(1);
        });

        // Graceful shutdown
        process.on('SIGTERM', () => {
            logger.info('SIGTERM received, shutting down gracefully');
            this.gracefulShutdown();
        });

        process.on('SIGINT', () => {
            logger.info('SIGINT received, shutting down gracefully');
            this.gracefulShutdown();
        });
    }

    async gracefulShutdown() {
        try {
            logger.info('Starting graceful shutdown...');
            
            // Close HTTP server
            this.server.close(() => {
                logger.info('HTTP server closed');
            });

            // Close socket connections
            this.io.close(() => {
                logger.info('Socket.IO server closed');
            });

            // Close database connections
            await require('mongoose').connection.close();
            logger.info('Database connections closed');

            process.exit(0);
        } catch (error) {
            logger.error('Error during graceful shutdown:', error);
            process.exit(1);
        }
    }

    async start() {
        try {
            // Initialize database connections
            await connectDB();
            logger.info('Database connected successfully');

            // Initialize Redis connection
            await initializeRedis();
            logger.info('Redis connected successfully');

            // Start the server
            this.server.listen(this.port, () => {
                logger.info(`Superstar Broadcast Hub running on port ${this.port}`);
                logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
                logger.info(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
            });

        } catch (error) {
            logger.error('Failed to start server:', error);
            process.exit(1);
        }
    }
}

// Start the application
const server = new BroadcastHubServer();
server.start();

module.exports = server;
