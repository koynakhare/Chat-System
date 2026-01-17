import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/userReducer';
import chatReducer from './reducers/chatReducer';
import alertReducer from './reducers/alertReducer';
import taskReducer from './reducers/taskReducer';

const store = configureStore({
  reducer: {
    alert:alertReducer,
    login: loginReducer,
    chat: chatReducer,
    task:taskReducer,
  },
});

export default store