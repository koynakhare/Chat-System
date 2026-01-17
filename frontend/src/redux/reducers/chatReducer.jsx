import { createSlice } from '@reduxjs/toolkit';
import { handleAsyncThunk } from '../helper';
import { getChatAction, getChatsAction } from '../action/chatAction';

const initialState = {
  chats: [],
}

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    handleAsyncThunk(builder, getChatsAction, 'chats');
    handleAsyncThunk(builder, getChatAction, 'chat');
  },
});

export default chatsSlice.reducer;
