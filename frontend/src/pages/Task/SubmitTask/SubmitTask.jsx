import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Modal,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { submitTask } from "../../../ReduxToolkit/SubmissionSlice";

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

const successModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  outline: "none",
  p: 4,
  textAlign: "center",
};

const SubmitTaskForm = ({ open, handleClose, taskId }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const { submissionStatus } = useSelector((store) => store.submission);

  const [formData, setFormData] = useState({
    title: "",
    githubLink: "",
  });

  const [successModalOpen, setSuccessModalOpen] = useState(false); 

  useEffect(() => {
   
    if (submissionStatus === "SUBMITTED") {
      handleClose(); 
    }
  }, [submissionStatus, handleClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submissionStatus === "SUBMITTED") {
      return;
    }
    dispatch(submitTask({ taskId, githubLink: formData.githubLink }));
    setSuccessModalOpen(true); 
    console.log("Form data: submit task", formData);
    handleClose();

    setTimeout(() => {
      setSuccessModalOpen(false);
    }, 3000);
  };

  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
  };

  return (
    <div>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  disabled={submissionStatus === "SUBMITTED"} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Github URL"
                  fullWidth
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  disabled={submissionStatus === "SUBMITTED"} 
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  sx={{ padding: ".8rem" }}
                  fullWidth
                  className="customeButton"
                  variant="contained"
                  type="submit"
                  disabled={submissionStatus === "SUBMITTED"} 
                >
                  Submit Work
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
      <Modal
        open={successModalOpen}
        onClose={handleSuccessClose}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <Box sx={successModalStyle}>
          <h2 style={{ color: "#00FF00" }}>Task Submitted Successfully!</h2>
        </Box>
      </Modal>
    </div>
  );
};

export default SubmitTaskForm;
