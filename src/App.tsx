import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import MyPage from "./components/MyPage";
import Assignment from "./components/Assignment";
import Score from "./components/Score";
// import PrivateRoute from "./auth/PrivateRoute";
import Home from "./components/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/assignment" component={Assignment} />
        <Route exact path="/score" component={Score} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
