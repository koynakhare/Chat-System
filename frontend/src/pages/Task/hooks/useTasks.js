import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskAction,
  deleteTaskAction,
  getTasksAction,
  updateTaskAction,
} from "../../../redux/action/taskAction";

export const useTasks = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);

  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    dispatch(getTasksAction());
  }, [dispatch]);

  const refresh = () => dispatch(getTasksAction());

  const submitTask = async (data) => {
    const action = editTask
      ? updateTaskAction({ ...data, taskId: data._id })
      : addTaskAction(data);

    const res = await dispatch(action);
    if (res?.payload?.success) refresh();
    setOpen(false);
  };

  const deleteTask = async (id) => {
    const res = await dispatch(deleteTaskAction(id));
    if (res?.payload?.success) refresh();
  };

  const updateStatus = async (task, status) => {
    await dispatch(
      updateTaskAction({ ...task, taskId: task._id, status })
    );
    refresh();
  };

  return {
    tasks,
    open,
    setOpen,
    editTask,
    setEditTask,
    submitTask,
    deleteTask,
    updateStatus,
  };
};
