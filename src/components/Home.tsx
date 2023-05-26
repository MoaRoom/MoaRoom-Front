import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import "../style/home.css";
const Home: FC = () => {
  const navigate = useNavigate();
  const login = () => {
    navigate("/login", {
      state: {},
    });
  };
  return (
    <>
      <div className="background">
        <div
          className="navbar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: 50,
            paddingRight: 50,
          }}
        >
          <div>
            <h3 className="m-3">Logo</h3>
          </div>
          <div>
            <button type="submit" className="navbtn" onClick={login}>
              로그인
            </button>
          </div>
        </div>

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
