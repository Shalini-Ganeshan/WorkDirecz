import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Modal,
  Box,
  Autocomplete,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from "react-redux";
import { createNewTask } from "../../../ReduxToolkit/TaskSlice";

const tags = ["Angular", "React", "Vuejs", "Spring Boot", "Node js", "Python"];

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

const CreateTaskForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    deadline: null,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    const { title, image, description, deadline } = formData;
    setIsFormValid(
      title.trim() &&
        image.trim() &&
        description.trim() &&
        deadline &&
        selectedTags.length > 0
    );
  }, [formData, selectedTags]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (event, value) => {
    setSelectedTags(value);
  };

  const handleDeadlineChange = (date) => {
    setFormData((prev) => ({ ...prev, deadline: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formattedData = {
      ...formData,
      tags: selectedTags,
      deadline: formData.deadline.toISOString(),
    };
  
    dispatch(createNewTask(formattedData));
  
    setFormData({
      title: "",
      image: "",
      description: "",
      deadline: null,
    });
    setSelectedTags([]);
  
    handleClose(); 
  };

  return (
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
                label="Title"
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                fullWidth
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                multiline
                rows={4}
                fullWidth
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="multiple-limit-tags"
                options={tags}
                onChange={handleTagsChange}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} label="Tags" placeholder="Favorites" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Deadline"
                  value={formData.deadline}
                  onChange={handleDeadlineChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
            <Button
  sx={{
    padding: ".8rem",
    color: "white", 
   
  }}
  fullWidth
  variant="contained"
  type="submit"
  disabled={!isFormValid}
>
  Create
</Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateTaskForm;
