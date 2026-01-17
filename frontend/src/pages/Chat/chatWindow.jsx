import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MessageInput from "./messageInput";
import useSocket from "../../hooks/useSocket";
import { getUserDetail } from "../../utils/auth";
import { getAllUserAction } from "../../redux/action/userAction";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";

const ChatWindow = ({ chatId, messages: apiMessages, userName, userId }) => {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const userState = useSelector((state) => state.login)
  const dispatch = useDispatch()

  useEffect(() => {
    if (chatId) {
      setMessages(apiMessages);
    }
  }, [apiMessages, chatId]);

  useEffect(() => {
    dispatch(getAllUserAction())
  }, [])

  useSocket(
    chatId,
    (message) => {
      setMessages((prev) => [...prev, message]);
    },

    (userId) => {
      setTypingUser(userId);
      setTimeout(() => setTypingUser(null), 1000);
    }
  );

  return (
    <Box width="75%" display="flex" flexDirection="column">
      <Box p={2} borderBottom="1px solid #ddd">
        <Typography variant="h6">{userName}</Typography>
      </Box>

      <Box flex={1} p={2} overflow="auto">
        {messages.map((msg, index) => (
          <Box
            key={index}
            textAlign={msg.senderId === userId ? "right" : "left"}
            mb={1}
          >
            <Typography
              sx={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 2,
                bgcolor:
                  msg.senderId === userId
                    ? "#dcf8c6"
                    : msg.text.includes(`@${userName}`)
                      ? "#fff3e0"
                      : "#fff",
              }}
            >
              {msg.text}
            </Typography>

          </Box>
        ))}

        {typingUser && <Typography variant="caption">typing...</Typography>}
      </Box>

      <MessageInput
        chatId={chatId}
        userId={userId}
        allUsers={get(userState, 'users', [])}
      />

    </Box>
  );
};

export default ChatWindow;
