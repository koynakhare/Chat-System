import {
  Card,
  Box,
  Typography,
  Chip,
  Divider,
  Stack,
  Button,
} from "@mui/material";

const TaskCard = ({
  task,
  statusColor,
  onEdit,
  onDelete,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        mb: 2,
        cursor: "grab",
        borderLeft: `6px solid ${statusColor}`,
        "&:hover": { boxShadow: "0 6px 16px rgba(0,0,0,0.18)" },
      }}
    >
      <Box px={2} py={1} display="flex" justifyContent="space-between">
        <Typography fontWeight={700}>
          {task.name}
        </Typography>

        <Chip
          label={task.priority || "Medium"}
          size="small"
        />
      </Box>

      <Divider />

      <Box px={2} py={1}>
        <Typography variant="body2" color="text.secondary">
          {task.description || "No description"}
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt={1}
        >
          <Typography variant="caption">
            {new Date(task.createdAt).toLocaleDateString()}
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
            >
              Edit
            </Button>

            <Button
              size="small"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task._id);
              }}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

export default TaskCard;
