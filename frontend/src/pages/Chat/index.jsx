import { Box } from "@mui/material";
import ChatList from "./chatList";
import ChatWindow from "./chatWindow";
import { useDispatch, useSelector } from "react-redux";
import { getChatAction, getChatsAction } from "../../redux/action/chatAction";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { getAllUserAction } from "../../redux/action/userAction";
import { getUserDetail } from "../../utils/auth";

const ChatLayout = () => {
  const chatState = useSelector((state) => state.chat)
  const [chat, setChat] = useState('')
  const dispatch = useDispatch();
  const userDetail = getUserDetail();
  const userId = userDetail?.id;

  useEffect(() => {
    dispatch(getAllUserAction())
  }, [])

  const onSelectedUser = (user) => {
    setChat({...user})
    dispatch(getChatAction(user?._id))
  }

  return (
    <Box display="flex" height="100vh">
      <ChatList onSelectedUser={onSelectedUser} loggedInUser={userId}/>
      <ChatWindow
        userId={userId}
        chatId={chat?._id}
        userName={chat?.name}
        messages={get(chatState, "chat", [])}
      />
    </Box>
  );
};

export default ChatLayout;
