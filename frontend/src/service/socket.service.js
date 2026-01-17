import { io } from "socket.io-client";

class SocketService {
  socket;

  connect() {
    if (!this.socket) {
      this.socket = io("http://localhost:5000", {
        transports: ["websocket"],
      });
    }
  }

  joinChat(chatId) {
    this.socket.emit("join_chat", chatId);
  }

  sendMessage(message) {
    this.socket.emit("send_message", message);
  }

  onMessage(callback) {
    this.socket.on("receive_message", callback);
  }

  emitTyping(chatId, userId) {
    this.socket.emit("typing", { chatId, userId });
  }

  onTyping(callback) {
    this.socket.on("typing", callback);
  }

  cleanup() {
    this.socket.off("receive_message");
    this.socket.off("typing");
  }
}

export default new SocketService();
