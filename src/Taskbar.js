import React, { useState, useEffect } from 'react';
import './taskbar.css';
import Newmodal from './Newmodal';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import { Button, Menu, MenuItem } from '@mui/material';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import EditModal from './Editmodal';

const Taskbar = ({ onTaskSelected }) => {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState("");
  const [tempCounter, setTempCounter] = useState(0);
  const [taskData, setTaskData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false); 
  const location = useLocation();
  const userData = location.state?.userData;
  const customStyle = {
    width: '240px',
    backgroundColor: 'rgba(235, 238, 252, 1)',
    color: 'rgba(54, 89, 226, 1)',
  };
  const newCustomStyle = {
    width:'180px',
  };
  const newStyle={
    width:'20px'
  };

  const fetchTaskData = async () => {
    try {
      const id = userData.userid;
      const res = await axios.get(`https://todobackend-production-cb7d.up.railway.app/task/${id}`);
      if (res.status === 200) {
        setTaskData(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch task data", error);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, [tempCounter]);

  const handleAddTask = async (task) => {
    const id = userData.userid;
    try {
      const res = await axios.post(`https://todobackend-production-cb7d.up.railway.app/task/add/${id}`, { task });
      if (res.status === 200) {
        setTempCounter((prevCount) => prevCount + 1);
        setTask("");
      } else {
        console.log("Failed to add project");
      }
    } catch (error) {
      console.error("Failed to add project", error);
    }
  };

  const handleMenuOpen = (event, task) => {
    setSelectedTask(task);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    console.log(selectedTask.id);
    axios
      .post(`https://todobackend-production-cb7d.up.railway.app/task/remove/${selectedTask.id}`)
      .then((res) => {
        if (res.status === 200) {
          setTempCounter((prevCount) => prevCount + 1);
        }
      })
      .catch(error => {
        console.error("Failed to delete task:", error);
      });
    handleMenuClose();
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setEditModalOpen(true);
    handleMenuClose();
  };

  const handleEditSubmit = (editedTask) => {
    axios.post(`https://todobackend-production-cb7d.up.railway.app/task/update/${selectedTask.id}`,{task:editedTask})
    .then((res)=>{
      if(res.status === 200){
        setTempCounter((prevCount)=> prevCount + 1);
      }
    })
    .catch(error=>{
      console.error("Failed to update data:",error);
    });
    setEditModalOpen(false);
  };

  const newEvent = (taskInfo) => {
    onTaskSelected(taskInfo);
  };

  return (
    <div>
      <div className='taskboard'>
        <div className='icon'>
          <AutoAwesomeMosaicIcon sx={{ fontSize: 20 }} color="primary" />
        </div>
        <div className='heading'><h3>Task Board</h3></div>
      </div>
      <div className='p1'>{userData.username}</div>
      <div className='profile'>
        <div className='name'>
          <div className='align'>
            {taskData.tasks &&
              taskData.tasks.map((task, index) => (
                <div key={index} className="task-container">
                  <div className="button-container">
                    <Button
                      className="task-button"
                      style={newCustomStyle}
                      onClick={() =>
                        newEvent({ id: task.id, task: task.task })
                      }
                    >
                      {task.task}
                    </Button>
                    <Button
                      className="menu-button"
                      style={newStyle}
                      aria-controls={`task-menu-${index}`}
                      aria-haspopup="true"
                      onClick={(event) => handleMenuOpen(event, task)}
                    >
                      &#8942;
                    </Button>
                    <Menu
                      id={`task-menu-${index}`}
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={() => openEditModal(task)}>Update</MenuItem>
                      <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    </Menu>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className='p2'>
        <Button variant="text" style={customStyle} onClick={() => setOpen(true)}>
          + Add Project
        </Button>
        <Newmodal open={open} setOpen={setOpen} setAdd={handleAddTask} setTempAdd={setTempCounter} />
      </div>
      {editingTask && (
        <EditModal    
          open={editModalOpen}
          setOpen={setEditModalOpen}
          task={editingTask}
          setTask={setEditingTask}
          onSubmit={(editedTask) => handleEditSubmit(editedTask)}
        />
      )}
    </div>
  );
};

export default Taskbar;
