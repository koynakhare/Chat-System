import { Box, Typography, Chip, Divider } from "@mui/material";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./taskCard";

const KanbanColumn = ({
  status,
  tasks,
  onEdit,
  onDelete,
  onCardClick,
}) => {
  return (
    <Box minWidth={350}>
      <Box
        p={2}
        bgcolor="#f9fafb"
        borderRadius={3}
        boxShadow="0 2px 6px rgba(0,0,0,0.08)"
      >
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight={600} color={status.color}>
            {status.label}
          </Typography>
          <Chip label={tasks.length} size="small" />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Droppable droppableId={status.id}>
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              minHeight={400}
            >
              {tasks.map((task, index) => (
                <Draggable
                  key={task._id}
                  draggableId={task._id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard
                        task={task}
                        statusColor={status.color}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onClick={() => onCardClick(task)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Box>
    </Box>
  );
};

export default KanbanColumn;
