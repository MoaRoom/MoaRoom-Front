import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import MyPage from "./components/MyPage";
import Assignment from "./components/Assignment";
import Score from "./components/Score";
import Home from "./components/Home";
import Submit from "./components/Submit";
import LecturePage from "./components/LecturePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AssignmentPage from "./components/AssignmentPage";
import NewAssignment from "./components/NewAssignment";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/assignment" element={<Assignment />} />
        <Route path="/score" element={<Score />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/lecture" element={<LecturePage />} />
        <Route path="/assignmentList" element={<AssignmentPage />} />
        <Route path="/newassignment" element={<NewAssignment />}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
