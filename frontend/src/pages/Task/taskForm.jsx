import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

const statusList = ["todo", "in-progress", "done"];
const priorityList = ["low", "medium", "high"];

const TaskForm = ({ open, onClose, onSubmit, editTask }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "todo",
    priority: "medium",
  });

  useEffect(() => {
    if (editTask) {
      setForm(editTask);
    }
  }, [editTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {editTask ? "Edit Task" : "Add Task"}
      </DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <TextField
          fullWidth
          label="Task Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
        />

        <TextField
          select
          fullWidth
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          margin="normal"
        >
          {statusList.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Priority"
          name="priority"
          value={form.priority}
          onChange={handleChange}
          margin="normal"
        >
          {priorityList.map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {editTask ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
