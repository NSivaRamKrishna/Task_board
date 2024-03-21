import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import UpdatedTask from "./UpdateModal";

const Taskbarevent = ({ taskData, setTempAdd }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [updateTask, setUpdateTask] = React.useState("");
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updatedTask, setUpdatedTask] = useState();
  
  const handleRightClick = (event, task) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const handleDelete = () => {
    axios
      .post(`http://localhost:9000/task/remove/${selectedTask.id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setTempAdd((prevCount) => prevCount + 1);
        }
      });
    console.log("Delete task:", selectedTask);
    handleClose();
  };

  const handleUpdate = () => {
    setUpdateOpen(true);
    handleClose();
  };

  const handleAddUpdate = (taskId, updatedTask) => {
    console.log({ updatedTask, taskId });
    axios
      .post(`http://localhost:9000/task/update/${taskId}`, { task: updatedTask })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
        } else {
          console.log("Failed to update data");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };

  const newEvent = (taskInfo) => {
    console.log("Task Info:", taskInfo);
  };

  return (
    <div>
      {taskData.tasks &&
        taskData.tasks.map((task, index) => (
          <div
            key={index}
            onContextMenu={(e) => handleRightClick(e, task)}
            onClick={() =>
              newEvent({ id: task.id, task: task.task, userId: task.userId })
            }
          >
            <Button style={{ width: "150px" }}>{task.task}</Button>
          </div>
        ))}

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleUpdate}>Update</MenuItem>
          <UpdatedTask
            open={updateOpen}
            setOpen={setUpdateOpen}
            task={selectedTask?.task}
            setUpdateTask={setUpdateTask}
            onUpdate={(updatedTask) => {
              console.log({ updatedTask });
              handleAddUpdate(selectedTask.id, updatedTask);
            }}
          />
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default Taskbarevent;
