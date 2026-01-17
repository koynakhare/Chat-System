import { createSlice } from '@reduxjs/toolkit';
import { handleAsyncThunk } from '../helper';
import { addTaskAction, deleteTaskAction, getTaskAction, getTasksAction, updateTaskAction } from '../action/taskAction';

const initialState = {
  tasks: [],
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    handleAsyncThunk(builder, getTasksAction, 'tasks');
    handleAsyncThunk(builder, getTaskAction, 'task');
    handleAsyncThunk(builder, addTaskAction, );
    handleAsyncThunk(builder, updateTaskAction, );
    handleAsyncThunk(builder, deleteTaskAction, );
  },
});

export default taskSlice.reducer;
