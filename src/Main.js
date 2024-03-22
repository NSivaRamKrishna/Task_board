import React, { useState, useEffect } from "react";
import "./main.css";
import AddModal from "./Modal";
import { Button, Menu, MenuItem } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NewEditModal from "./NewEditModal";

const Main = ({ taskInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openForm, setOpenForm] = useState(false);
  const [data, setData] = useState();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const userData = location.state?.userData;
  const [anchorElArray, setAnchorElArray] = React.useState([]);
  const [editModalData, setEditModalData] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://todobackend-production-cb7d.up.railway.app/todo/${taskInfo.id}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [taskInfo]);

  const handleAddTodo = async (data) => {
    const id = taskInfo.id;
    axios
      .post(`https://todobackend-production-cb7d.up.railway.app/todo/add/${id}`, {
        content: data.name,
        created_at: data.startDate,
        completed_at: data.deadLine,
        status: data.status,
      })
      .then((res) => {
        if (res.status === 200) {
          fetchData();
        }
      })
      .catch((error) => {
        console.error("Failed to add data", error);
      });
  };

  const handleMenuOpen = (index) => (event) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleMenuClose = (index) => () => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdate = (itemId, index) => {
    console.log("Update item with ID:", itemId);
    const todoData = data.todo;
    const itemToUpdate = todoData.find((item) => item.id === itemId);
    setEditModalData(itemToUpdate);
    setOpenEditModal(true);
    handleMenuClose(index)();
  };

  const handleEditSubmit = (editedData) => {
    axios.post(`https://todobackend-production-cb7d.up.railway.app/todo/update/${editedData.id}`,{
      content: editedData.name,
        created_at: editedData.startDate,
        completed_at: editedData.deadLine,
        status: editedData.status,
    }).then((res) =>{
      if(res.status === 200){
        console.log(res.data.message);
        fetchData();
      }
    }).catch(error =>{
      console.log("Failed to update data",error)
    })
  };

  const handleDelete = (itemId, index) => {
    axios
      .post(`https://todobackend-production-cb7d.up.railway.app/todo/remove/${itemId}`)
      .then((res) => {
        if (res.status === 200) {
          fetchData();
        }
      })
      .catch((error) => {
        console.error("Failed to delete data:", error);
      });
    console.log("Delete item with ID:", itemId);
    setSelectedItemId(null);
    handleMenuClose(index)();
  };

  return (
    <div className="Main">
      <div className="logout">
        <Button
          variant="contained"
          style={{ width: "100px" }}
          onClick={() => navigate("/")}
        >
          Logout
        </Button>
      </div>
      <div className="user">
        <div className="user-name">hello {userData.username}</div>
        <div className="new">Your Project : {taskInfo.task}</div>
      </div>
      <div className="tasks">
        <div className="todo">
          <div className="title">
            <div className="title-name">ToDo</div>
            <div className="title-name">
              <input
                type="button"
                value="+"
                onClick={() => {
                  setOpenForm(true);
                }}
              />
              <AddModal
                open={openForm}
                setOpen={setOpenForm}
                setAdd={handleAddTodo}
              />
            </div>
          </div>
          {data?.todo &&
            data.todo.map(
              (item, index) =>
                item.status === "todo" && (
                  <div className="card" key={index}>
                    <div className="card-header">
                      <div className="card-title">{item.content}</div>
                      <Button
                        className="menu-button"
                        style={{ width: "10px" }}
                        aria-controls={`task-menu-${index}`}
                        aria-haspopup="true"
                        onClick={handleMenuOpen(index)}
                      >
                        &#8942;
                      </Button>
                    </div>
                    <Menu
                      id={`task-menu-${index}`}
                      anchorEl={anchorElArray[index]}
                      open={Boolean(anchorElArray[index])}
                      onClose={handleMenuClose(index)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuItem onClick={() => handleUpdate(item.id, index)}>
                        Update
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(item.id, index)}>
                        Delete
                      </MenuItem>
                    </Menu>
                    <div className="time">
                      <div className="start">
                        <div className="t1">Start date</div>
                        <div className="t2">{item.created_at}</div>
                      </div>
                      <div className="start">
                        <div className="t1">Deadline</div>
                        <div className="t2">{item.completed_at}</div>
                      </div>
                    </div>
                  </div>
                )
            )}
          <NewEditModal
            open={openEditModal}
            setOpen={setOpenEditModal}
            initialValues={editModalData} // Pass the edit modal data as initial values
            onSubmit={(editedData) => handleEditSubmit(editedData)} // Pass the handleEditSubmit function
          />
        </div>
        <div className="todo">
          <div className="title">
            <div className="title-name">In Progress</div>
            <div className="title-name">
              <input
                type="button"
                value="+"
                onClick={() => {
                  setOpenForm(true);
                }}
              />
              <AddModal
                open={openForm}
                setOpen={setOpenForm}
                setAdd={handleAddTodo}
              />
            </div>
          </div>
          {data?.todo &&
            data.todo.map(
              (item, index) =>
                item.status === "inprogress" && (
                  <div className="card" key={index}>
                    <div className="card-header">
                      <div className="card-title">{item.content}</div>
                      <Button
                        className="menu-button"
                        style={{ width: "10px" }}
                        aria-controls={`task-menu-${index}`}
                        aria-haspopup="true"
                        onClick={handleMenuOpen(index)}
                      >
                        &#8942;
                      </Button>
                    </div>
                    <Menu
                      id={`task-menu-${index}`}
                      anchorEl={anchorElArray[index]}
                      open={Boolean(anchorElArray[index])}
                      onClose={handleMenuClose(index)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuItem onClick={() => handleUpdate(item.id, index)}>
                        Update
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(item.id, index)}>
                        Delete
                      </MenuItem>
                    </Menu>
                    <div className="time">
                      <div className="start">
                        <div className="t1">Start date</div>
                        <div className="t2">{item.created_at}</div>
                      </div>
                      <div className="start">
                        <div className="t1">Deadline</div>
                        <div className="t2">{item.completed_at}</div>
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
        <div className="todo">
          <div className="title">
            <div className="title-name">Submitted</div>
            <div className="title-name">
              <input
                type="button"
                value="+"
                onClick={() => {
                  setOpenForm(true);
                }}
              />
              <AddModal
                open={openForm}
                setOpen={setOpenForm}
                setAdd={handleAddTodo}
              />
            </div>
          </div>
          {data?.todo &&
            data.todo.map(
              (item, index) =>
                item.status === "submitted" && (
                  <div className="card" key={index}>
                    <div className="card-header">
                      <div className="card-title">{item.content}</div>
                      <Button
                        className="menu-button"
                        style={{ width: "10px" }}
                        aria-controls={`task-menu-${index}`}
                        aria-haspopup="true"
                        onClick={handleMenuOpen(index)}
                      >
                        &#8942;
                      </Button>
                    </div>
                    <Menu
                      id={`task-menu-${index}`}
                      anchorEl={anchorElArray[index]}
                      open={Boolean(anchorElArray[index])}
                      onClose={handleMenuClose(index)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuItem onClick={() => handleUpdate(item.id, index)}>
                        Update
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(item.id, index)}>
                        Delete
                      </MenuItem>
                    </Menu>
                    <div className="time">
                      <div className="start">
                        <div className="t1">Start date</div>
                        <div className="t2">{item.created_at}</div>
                      </div>
                      <div className="start">
                        <div className="t1">Deadline</div>
                        <div className="t2">{item.completed_at}</div>
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
        <div className="todo">
          <div className="title">
            <div className="title-name">Completed</div>
            <div className="title-name">
              <input
                type="button"
                value="+"
                onClick={() => {
                  setOpenForm(true);
                }}
              />
              <AddModal
                open={openForm}
                setOpen={setOpenForm}
                setAdd={handleAddTodo}
              />
            </div>
          </div>
          {data?.todo &&
            data.todo.map(
              (item, index) =>
                item.status === "completed" && (
                  <div className="card" key={index}>
                    <div className="card-header">
                      <div className="card-title">{item.content}</div>
                      <Button
                        className="menu-button"
                        style={{ width: "10px" }}
                        aria-controls={`task-menu-${index}`}
                        aria-haspopup="true"
                        onClick={handleMenuOpen(index)}
                      >
                        &#8942;
                      </Button>
                    </div>
                    <Menu
                      id={`task-menu-${index}`}
                      anchorEl={anchorElArray[index]}
                      open={Boolean(anchorElArray[index])}
                      onClose={handleMenuClose(index)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuItem onClick={() => handleUpdate(item.id, index)}>
                        Update
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(item.id, index)}>
                        Delete
                      </MenuItem>
                    </Menu>
                    <div className="time">
                      <div className="start">
                        <div className="t1">Start date</div>
                        <div className="t2">{item.created_at}</div>
                      </div>
                      <div className="start">
                        <div className="t1">Deadline</div>
                        <div className="t2">{item.completed_at}</div>
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default Main;
