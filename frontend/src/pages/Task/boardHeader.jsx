import { Stack, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const BoardHeader = ({ onCreate }) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h5" fontWeight={600}>
        Kanban Board
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onCreate}
      >
        Create Task
      </Button>
    </Stack>
  );
};

export default BoardHeader;
