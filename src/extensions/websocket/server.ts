// src/extensions/websocket/server.ts
import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

let io: Server | null = null;

export const initIO = (httpServer: any) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*', // แนะนำให้เจาะจง origin ใน production
    },
  });

  io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);
  });

  return io;
};

// ใช้ใน controller
export const getIO = (): Server => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
