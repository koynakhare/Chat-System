import { Box } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { useTasks } from "./hooks/useTasks";
import BoardHeader from "./boardHeader";
import KanbanColumn from "./kanbanColumn";
import TaskForm from "./taskForm";
import TaskDetailModal from "./TaskDetailModal";
import { useState } from "react";

const statuses = [
  { id: "todo", label: "To Do", color: "#FF8A65" },
  { id: "in-progress", label: "In Progress", color: "#4FC3F7" },
  { id: "done", label: "Done", color: "#81C784" },
];

const Tasks = () => {
  const chatState = useSelector((state) => state.chat);

  const {
    tasks,
    open,
    setOpen,
    editTask,
    setEditTask,
    submitTask,
    deleteTask,
    updateStatus,
  } = useTasks();

  const [selectedTask, setSelectedTask] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleDragEnd = ({ destination, source, draggableId }) => {
    if (!destination || destination.droppableId === source.droppableId) return;
    const task = tasks.find((t) => t._id === draggableId);
    if (task) updateStatus(task, destination.droppableId);
  };

  const openTaskDetail = (task) => {
    setSelectedTask(task);
    setDetailOpen(true);
  };

  return (
    <Box p={3}>
      <BoardHeader
        onCreate={() => {
          setEditTask(null);
          setOpen(true);
        }}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Box display="flex" gap={3} mt={3} overflow="auto">
          {statuses?.map((status) => (
            <KanbanColumn
              key={status.id}
              status={status}
              tasks={tasks.filter((t) => t.status === status.id)}
              onEdit={(t) => {
                setEditTask(t);
                setOpen(true);
              }}
              onDelete={deleteTask}
              onCardClick={openTaskDetail}
            />
          ))}
        </Box>
      </DragDropContext>

      <TaskForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={submitTask}
        editTask={editTask}
      />

      <TaskDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        task={selectedTask}
        messages={get(chatState, "chat", [])}
      />
    </Box>
  );
};

export default Tasks;
