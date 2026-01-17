import { Box, IconButton, TextField, List, ListItem, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import socketService from "../../service/socket.service";

const MessageInput = ({ chatId, userId, allUsers = [] }) => {
  const [text, setText] = useState("");
  const [mentionSuggestions, setMentionSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const sendMessage = (targetUserId = null) => {
    if (!text.trim()) return;

    socketService.sendMessage({
      chatId,              
      senderId: userId,
      text,
      createdAt: new Date(),
      targetUserId, // optional: only visible to this user
    });

    setText("");
    setShowSuggestions(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    const lastWord = value.split(" ").pop();
    if (lastWord.startsWith("@")) {
      const query = lastWord.slice(1).toLowerCase();
      const filtered = allUsers.filter(
        (u) => u.name.toLowerCase().includes(query) && u._id !== userId
      );
      setMentionSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }

    socketService.emitTyping(chatId, userId);
  };

  const handleMentionClick = (user) => {
    const words = text.split(" ");
    words[words.length - 1] = `@${user.name}`;
    setText(words.join(" ") + " ");
    setShowSuggestions(false);
  };

  return (
    <Box position="relative">
      <Box display="flex" p={2} borderTop="1px solid #ddd">
        <TextField
          fullWidth
          placeholder="Type a message"
          value={text}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <IconButton color="primary" onClick={() => sendMessage()}>
          <SendIcon />
        </IconButton>
      </Box>

      {showSuggestions && mentionSuggestions?.length > 0 && (
        <Paper
          sx={{
            position: "absolute",
            bottom: 60,
            left: 16,
            right: 16,
            maxHeight: 150,
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          <List>
            {mentionSuggestions?.map((user) => (
              <ListItem
                key={user._id}
                button
                onClick={() => handleMentionClick(user)}
              >
                {user.name}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default MessageInput;
