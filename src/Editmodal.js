import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const EditModal = ({ open, setOpen, task, setTask, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task); 
    setOpen(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  const handleClose = () => {
    setOpen(false);
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
            <div className="a4">
              <label htmlFor="name">Edit Project Name</label>
            </div>
            <div className="a6">
              <input
                type="text"
                placeholder="Task"
                className="a5"
                value={task.task}
                onChange={(event) => setTask(event.target.value)}
              />
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
                Save
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditModal;
