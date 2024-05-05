import express from "express";
import http from "http";
import { Server as socketIo } from "socket.io";
import cors from "cors";
import config from "./config/index.js";

// import routes
import channelRoutes from "./api/routes/channelRoutes.js";
import channelController from "./api/controllers/channelController.js";
import channels from "./data/channel.js";
import errorHandler from "./middleware/errorHandler.js";
import socketHandler from "./websockets/socketHandler.js";

const app = express();
app.use(express.json());

app.use(cors(config.corsOptions));

// Create HTTP Server
const server = http.createServer(app);

// Initialize WebSocket Server (Socket.IO)
const io = new socketIo(server, { cors: config.corsOptions });

// WebSocket Handling
io.on("connection", (socket) => socketHandler(socket, io));

// Set Up Routes and Error Handling Middleware
app.use("/api", channelRoutes(channelController(io)));
app.use(errorHandler);

const startServer = () => {
  // Initialize In-Memory Data
  channels.initialize();

  server.listen(config.port, () =>
    console.log(`Server listening on port ${config.port}`)
  );
};

// Start the server
startServer();
