import React, { useState } from "react";
import "./home.css";
import "./Taskbar";
import Taskbar from "./Taskbar";
import Main from "./Main";
import { Button } from "@mui/material";
import {  useNavigate } from "react-router-dom";

function App() {
  const [selectedTaskInfo, setSelectedTaskInfo] = useState(null);
  const navigate = useNavigate();
  const handleTaskSelected = (taskInfo) => {
    console.log("Selected Task:", taskInfo);
    setSelectedTaskInfo(taskInfo);
  };
  const customStyle = {
    width: "100px",
  };

  return (
    <div className="Container">
      <div className="Taskbar">
        <Taskbar onTaskSelected={handleTaskSelected} />
      </div>
      <div className="main">
        {selectedTaskInfo ? (
          <Main taskInfo={selectedTaskInfo} />
        ) : (
          <div className="logout">
            <Button
          variant="contained"
          style={customStyle}
          onClick={() => navigate("/")}
        >
          Logout
        </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
