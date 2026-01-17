import { useEffect } from "react";
import socketService from "../service/socket.service";
const useSocket = (chatId, onMessage, onTyping) => {
  useEffect(() => {
    if (!chatId) return;

    socketService.connect();
    socketService.joinChat(chatId);

    socketService.onMessage(onMessage);
    socketService.onTyping(onTyping);

    return () => {
      socketService.cleanup();
    };
  }, [chatId]);
};

export default useSocket;
