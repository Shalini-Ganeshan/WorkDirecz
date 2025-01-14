import { Box, Modal, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SubmissionCard from "./SubmissionCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubmissionsByTaskId } from "../../../ReduxToolkit/SubmissionSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SubmissionListModal = ({ open, handleClose, taskId }) => {
  const dispatch = useDispatch();
  const { submission } = useSelector((store) => store);
  console.log("submission details:", submission);

  useEffect(() => {
    if (taskId) {
      dispatch(fetchSubmissionsByTaskId({ taskId }));
    }
  }, [taskId, dispatch]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between items-center">
            <h2>Submissions</h2>
            <IconButton onClick={handleClose} color="primary">
              <CloseIcon />
            </IconButton>
          </div>
          <div className="space-y-2">
            {submission.submissions.length > 0 ? (
              submission.submissions.map((item) => (
                <SubmissionCard key={item.id} submission={item} />
              ))
            ) : (
              <div className="text-center">No Submissions Found</div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SubmissionListModal;
