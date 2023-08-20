import React, { FC } from "react";
import "../style/home.css";
import Navbar from "./Navbar";
import { navPropsType } from "./Navbar";
import { useLocation } from "react-router-dom";
const Home: FC = () => {
  const location = useLocation();
  var user_id = null;
  var isProfessor = null;
  if(localStorage.getItem("isLogin")){
    user_id = location.state.user_id;
    isProfessor = location.state.isProfessor;
  }
  return (
    <>
      <div className="background">
        <Navbar
          navProps={
            { user_id: user_id, isProfessor: isProfessor } as navPropsType
          }
        />

        <div className="container">
          <div
            className="row d-flex justify-content-center align-items-center text-center"
            style={{ height: "100vh" }}
          >
            <p className="muted display-6">Hello User👋</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
