import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { get } from "lodash";
import { useSelector } from "react-redux";

const ChatList = ({ onSelectedUser, loggedInUser }) => {
  const userState = useSelector((state) => state.login)

  return (
    <Box width="25%" bgcolor="#f0f2f5" p={2}>
      <Typography variant="h6">Chats</Typography>
      <List>
        {get(userState, 'users', [])?.map((user) => (
          user?._id !== loggedInUser && <ListItem button key={user?._id} onClick={() => onSelectedUser(user)}>
            <ListItemText primary={user?.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatList;
