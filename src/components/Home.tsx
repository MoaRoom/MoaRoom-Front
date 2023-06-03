import React, { FC } from "react";
import "../style/home.css";
import Navbar from "./Navbar";
const Home: FC = () => {
  return (
    <>
      <div className="background">
        <Navbar/>

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
