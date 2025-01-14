import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Modal,
} from "@mui/material";
import React, { useState } from "react";
import SubmitTaskForm from "../SubmitTask/SubmitTask";
import { UserListModel } from "./UserListModel";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteTask } from "../../../ReduxToolkit/TaskSlice";
import UpdateTaskForm from "../UpdateTask/UpdateTask";
import { useLocation, useNavigate } from "react-router-dom";
import SubmissionListModal from "./SubmissionListModal";
import CloseIcon from "@mui/icons-material/Close"; 

export const TaskCard = ({ item }) => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("image details:",item.image);
  const searchParams = new URLSearchParams(location.search);
  const taskId = searchParams.get("taskId");

  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openUpdateTaskModel, setOpenUpdateTaskModel] = useState(false);

  const handleOpenUpdateTaskModel = () => {
    setOpenUpdateTaskModel(true);
    handleClose();
    handleSetTaskIdInUrl(item.id);
  };
  const handleCloseUpdateTaskModel = () => {
    setOpenUpdateTaskModel(false);
    handleRemoveTaskIdInUrl();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openSubmitForm, setOpenSubmitForm] = useState(false);
  const handleOpenSubmitForm = () => {
    handleSetTaskIdInUrl(item.id);
    setOpenSubmitForm(true);
    handleClose();
  };
  const handleCloseSubmitForm = () => {
    setOpenSubmitForm(false);
    handleRemoveTaskIdInUrl();
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    // Determine the suffix for the day (1st, 2nd, 3rd, 4th, etc.)
    const suffix = (day) => {
      if (day === 1 || day === 21 || day === 31) return 'st';
      if (day === 2 || day === 22) return 'nd';
      if (day === 3 || day === 23) return 'rd';
      return 'th';
    };
  
    return `${day}${suffix(day)} ${month} ${year}`;
  };
  
  const [openUserList, setOpenUserList] = useState(false);
  const handleOpenUserList = () => {
    setOpenUserList(true);
    handleSetTaskIdInUrl(item.id);
    handleClose();
  };
  const handleCloseUserList = () => {
    setOpenUserList(false);
    handleRemoveTaskIdInUrl();
  };

  const [openSubmissionList, setOpenSubmissionList] = useState(false);
  const handleOpenSubmissionList = () => {
    setOpenSubmissionList(true);
    handleSetTaskIdInUrl(item.id);
    handleClose();
  };
  const handleCloseSubmissionList = () => {
    setOpenSubmissionList(false);
    handleRemoveTaskIdInUrl();
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(item.id));
  };

  const handleSetTaskIdInUrl = (taskId) => {
    const currentSearchParams = new URLSearchParams(location.search);
    currentSearchParams.append("taskId", taskId);
    navigate(`?${currentSearchParams.toString()}`);
  };
  const handleRemoveTaskIdInUrl = () => {
    const currentSearchParams = new URLSearchParams(location.search);
    currentSearchParams.delete("taskId");
    navigate(`?${currentSearchParams.toString()}`);
  };

  const handleOpenImageModal = (imageSrc) => {
    setSelectedImage(imageSrc);
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
  };

  const style = {
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    outline: "none",
    p: 4,
    boxShadow: "rgba(215, 106, 255, 0.507) 0px 0px 100px",
  };

  return (
    <>
      <div
        className="card lg:flex items-center gap-5 p-4 rounded-md shadow-md"
        style={style}
      >
        
        <div className="flex-shrink-0">
          <img
            src={item?.image || 'https://pix4free.org/assets/library/2021-05-25/originals/project.jpg'}
            alt="Task Image"
            style={{
              display: "block",
              width: "150px",
              height: "150px",
              objectFit: "cover",
              cursor: "pointer", 
            }}
            onClick={() => handleOpenImageModal(item.image)} 
          />
        </div>
        <div className="flex-grow text-center">
          <div className="space-y-2">
            <h1 className="font-semibold text-lg">{item?.title}</h1>
            <p className="text-gray-500 text-sm">{item?.description}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="py-1 px-4 bg-black border-2 border-yellow-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span
    className="text-xs bottom-2 left-2 w-24 text-yellow-600"
  >Due By: <br />
        {item?.deadline ? formatDate(item.deadline) : "No deadline set"}
  </span>
        <div>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            color="white"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {auth.user.role === "ROLE_ADMIN" ? (
              <>
                <MenuItem onClick={handleOpenUserList}>Assign Task</MenuItem>
                <MenuItem onClick={handleOpenSubmissionList}>See Submissions</MenuItem>
                <MenuItem onClick={handleOpenUpdateTaskModel}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleOpenSubmitForm}>Submit</MenuItem>
            )}
          </Menu>
        </div>
      </div>

      <Modal
        open={openImageModal}
        onClose={handleCloseImageModal}
        aria-labelledby="full-screen-image-modal"
        aria-describedby="full-screen-image-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "60%",
            maxHeight: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            padding: 2,
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleCloseImageModal}
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              color: "white",
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>

          <img
            src={selectedImage}
            alt="Full-Screen"
            style={{
              width: "150%",
              height: "auto",
              maxHeight: "95vh",
              objectFit: "contain",
            }}
          />
        </Box>
      </Modal>

      <SubmitTaskForm
        open={openSubmitForm}
        handleClose={handleCloseSubmitForm}
        taskId={taskId}
      />
      <UserListModel
        taskId={taskId}
        open={openUserList}
        handleClose={handleCloseUserList}
      />
      <UpdateTaskForm
        taskId={taskId}
        open={openUpdateTaskModel}
        handleClose={handleCloseUpdateTaskModel}
      />
      <SubmissionListModal
        open={openSubmissionList}
        handleClose={handleCloseSubmissionList}
        taskId={taskId}
      />
    </>
  );
};
