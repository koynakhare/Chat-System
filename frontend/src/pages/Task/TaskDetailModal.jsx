import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  Chip,
  Divider,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChatWindow from "../Chat/chatWindow";
import { getUserDetail } from "../../utils/auth";
import { getChatAction } from "../../redux/action/chatAction";
import { useDispatch } from "react-redux";

const TaskDetailModal = ({ open, onClose, task, messages }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const userDetail = getUserDetail();
  const dispatch = useDispatch();

  if (!task) return null;

  const handleOpenChat = () => {
    setChatOpen(!chatOpen);
    if (!chatOpen) dispatch(getChatAction(task._id));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 720,
          maxHeight: "85vh",
          overflowY: "auto",
          bgcolor: "#FAFBFC",
          borderRadius: 2,
          boxShadow: 24,
          mx: "auto",
          mt: "4vh",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            bgcolor: "#fff",
            p: 2.5,
            borderBottom: "1px solid #e0e0e0",
            zIndex: 1,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {task.name}
              </Typography>
              <Stack direction="row" spacing={1} mt={1}>
                <Chip size="small" label={task.status} color="info" />
                <Chip
                  size="small"
                  label={task.priority || "Medium"}
                  color="warning"
                />
              </Stack>
            </Box>

            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* Content */}
        <Box p={3}>
          {/* Description */}
          <Box mb={3}>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Description
            </Typography>
            <Typography variant="body2">
              {task.description || "No description provided"}
            </Typography>
          </Box>

          <Divider />

          {/* Assignees */}
          <Box mt={3}>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Assignees
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {task.assignees?.length ? (
                task.assignees.map((user, idx) => (
                  <Chip
                    key={idx}
                    label={user.initials || user.name}
                    size="small"
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.disabled">
                  No assignees
                </Typography>
              )}
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Actions */}
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleOpenChat}>
              {chatOpen ? "Hide Activity" : "View Activity"}
            </Button>
            <Button variant="outlined" color="error" onClick={onClose}>
              Close
            </Button>
          </Stack>

          {/* Activity / Chat */}
          {chatOpen && (
            <Box
              mt={3}
              p={2}
              bgcolor="#fff"
              borderRadius={2}
              border="1px solid #e0e0e0"
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                mb={1}
              >
                Activity
              </Typography>

              <Box height={280}>
                <ChatWindow
                  chatId={task._id}
                  userId={userDetail?.id}
                  userName={task.name}
                  messages={messages || []}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskDetailModal;
