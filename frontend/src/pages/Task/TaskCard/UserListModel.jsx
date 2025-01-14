import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Modal,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../../../ReduxToolkit/AuthSlice";
import { assignedTaskToUser } from "../../../ReduxToolkit/TaskSlice";
import CloseIcon from '@mui/icons-material/Close';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  outline: "none",
  p: 4,
  boxShadow: "rgba(215, 106, 255, 0.507) 0px 0px 100px",
};

export const UserListModel = ({ open, handleClose, taskId }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  console.log(auth);

  const [assignedUsers, setAssignedUsers] = useState([]);

  useEffect(() => {
    dispatch(getUserList(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleAssignTask = (userId) => {
  
    if (!assignedUsers.includes(userId)) {
      dispatch(assignedTaskToUser({ userId, taskId }));
      setAssignedUsers([...assignedUsers, userId]);
    }
  };

  const usersWithRoleUser = auth.users.filter(user => user.role === 'ROLE_CUSTOMER');

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
      
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "gray",
            }}
          >
            <CloseIcon />
          </IconButton>
     
          <div>
            {usersWithRoleUser.map((item, i) => (
              <div className="flex items-center justify-between w-full" key={i}>
                <div>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Freelancer"
                        src="https://shorturl.at/ns7mc"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.fullName}
                      secondary={`@${item.fullName.toLowerCase().split(" ").join("_")}`}
                    />
                  </ListItem>
                </div>
                <div>
                  <Button
                    onClick={() => handleAssignTask(item.id)}
                    className="customeButton"
                    variant="contained"
                    size="small"
                    disabled={assignedUsers.includes(item.id)}
                  >
                    {assignedUsers.includes(item.id) ? "Assigned" : "Select"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
};
