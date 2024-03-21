import { Routes, Route } from "react-router-dom";
// import Login from "./Login";
import Page from "./page";
import Home from "./Home";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Page />}></Route>
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
