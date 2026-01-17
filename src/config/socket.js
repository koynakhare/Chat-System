import { Server } from "socket.io";
import * as chatService from "../services/message.service.js";

const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    // join task chat room
    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
      console.log(`Socket ${socket.id} joined chat ${chatId}`);
    });

    // send message
    socket.on("send_message", async (message) => {
      try {
        // 1️⃣ save message via API/service
        const savedMessage = await chatService.createMessage(message);

        // 2️⃣ emit message
        if (message.targetUserId) {
          // private mention
          const sockets = Array.from(io.sockets.sockets.values());
          const targetSocket = sockets.find((s) => s.userId === message.targetUserId);
          if (targetSocket) targetSocket.emit("receive_message", savedMessage);

          // also send to sender
          socket.emit("receive_message", savedMessage);
        } else {
          // broadcast to everyone in task chat room
          io.to(message.chatId).emit("receive_message", savedMessage);
        }
      } catch (err) {
        console.error("Error saving message:", err.message);
      }
    });

    // typing indicator
    socket.on("typing", ({ chatId, userId }) => {
      socket.to(chatId).emit("typing", userId);
    });

    // attach userId to socket
    socket.on("register_user", (userId) => {
      socket.userId = userId;
    });

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });
};

export default initSocket;
