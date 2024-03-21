import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import "./modal.css";

const NewEditModal = ({ open, setOpen, initialValues, onSubmit }) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (initialValues) {
      setName(initialValues?.content || "");
      setStartDate(initialValues?.created_at || "");
      setDeadline(initialValues?.completed_at || "");
      setStatus(initialValues?.status || "");
    }
  }, [initialValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = {
      id: initialValues.id,
      name: name || initialValues?.content || "",
      startDate: startDate || initialValues?.created_at || "",
      deadline: deadline || initialValues?.completed_at || "",
      status: status || initialValues?.status || "",
    };
    setName("");
    setStartDate("");
    setDeadline("");
    setStatus("todo");
    setOpen(false);
    onSubmit(newData); // Pass the updated data to the onSubmit callback
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 670,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-content">
          <div className="a1">
            <div className="a2">Edit Project</div>
            <div className="a3" onClick={handleClose}>
              <CloseIcon />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="a4">
              <label htmlFor="name">Name of the task</label>
            </div>
            <div className="a6">
              <input
                type="text"
                placeholder="Task"
                className="a5"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="a7">
              <div>
                <div className="a4">
                  <label htmlFor="start-date">Start date</label>
                </div>
                <div>
                  <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="a4">
                  <label htmlFor="start-date">Deadline</label>
                </div>
                <div>
                  <input
                    type="date"
                    id="deadline"
                    value={deadline}
                    onChange={(event) => setDeadline(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="a4">
                <label htmlFor="name">Status</label>
              </div>
              <div>
                <select
                  id="status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="todo">To Do</option>
                  <option value="inprogress">In Progress</option>
                  <option value="submitted">Submitted</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="form-buttons">
              <button
                type="button"
                className="cancel-button"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button type="submit" className="add-button">
                Update
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default NewEditModal;
