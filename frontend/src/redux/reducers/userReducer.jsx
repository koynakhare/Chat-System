import { createSlice } from '@reduxjs/toolkit';
import { getAllUserAction, loginUserAction, registerUserAction } from '../action/userAction';
import { handleAsyncThunk } from '../helper';

const initialState = {
  user: null,
  token: '',
  status: 'idle',
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeToken: (state, action) => {
      state.token = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.token = '';
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    handleAsyncThunk(builder, loginUserAction, 'token');
    handleAsyncThunk(builder, registerUserAction, 'token');
    handleAsyncThunk(builder, getAllUserAction, 'users');
  },
});

export const { logoutSuccess,storeToken } = authSlice.actions;
export default authSlice.reducer;
