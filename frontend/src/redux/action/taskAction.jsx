import { deleletRequest, getRequest, postRequest } from '../../utils/axios';
import { TaskApiUrl } from '../../constant';
import { handleAsyncAction } from '../helper';

const getTaskApiUrl = (endPoints) => {
  return endPoints ? `${TaskApiUrl}/${endPoints}` : TaskApiUrl
}

export const getTasks = async (data, dispatch) => {
  const response = await getRequest(getTaskApiUrl(''), data, true, dispatch);
  return response?.data;
};

export const getTask = async (data, dispatch) => {
  const response = await getRequest(getTaskApiUrl(data), data, true, dispatch);
  return response?.data;
};

export const addTask = async (data, dispatch) => {
  const response = await postRequest(getTaskApiUrl('add'), data, true, dispatch);
  return response?.data;
};

export const updateTask = async (data, dispatch) => {
  const response = await postRequest(getTaskApiUrl('edit'), data, true, dispatch);
  return response?.data;
};
export const deleteTask = async (data, dispatch) => {
  const response = await deleletRequest(getTaskApiUrl(`delete/${data}`), data, true, dispatch);
  return response?.data;
};


export const getTasksAction = handleAsyncAction('sign/getTasksAction', getTasks, 'get');
export const getTaskAction = handleAsyncAction('sign/getTaskAction', getTask, 'get');
export const addTaskAction = handleAsyncAction('sign/addTaskAction', addTask,);
export const updateTaskAction = handleAsyncAction('sign/updateTaskAction', updateTask,);
export const deleteTaskAction = handleAsyncAction('sign/deleteTaskAction', deleteTask,);