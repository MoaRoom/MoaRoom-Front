import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import "../style/home.css";
type SomeComponentProps = RouteComponentProps;
const Home: FC<SomeComponentProps> = ({ history }) => {
  const login = () => {
    localStorage.clear();
    history.push("/login");
  };
  return (
    <>
      <div className="navbar">
        <div
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
            <button type="submit" className="homeloginbtn" onClick={login}>
              로그인
            </button>
          </div>
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
    </>
  );
};
export default Home;
